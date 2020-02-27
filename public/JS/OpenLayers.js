/*

  OpenLayers.js -- OpenLayers Map Viewer Library

  Copyright (c) 2006-2013 by OpenLayers Contributors
  Published under the 2-clause BSD license.
  See http://openlayers.org/dev/license.txt for the full text of the license, and http://openlayers.org/dev/authors.txt for full list of contributors.

  Includes compressed code under the following licenses:

  (For uncompressed versions of the code used, please see the
  OpenLayers Github repository: <https://github.com/openlayers/openlayers>)

*/

/**
 * Contains XMLHttpRequest.js <http://code.google.com/p/xmlhttprequest/>
 * Copyright 2007 Sergey Ilinsky (http://www.ilinsky.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * OpenLayers.Util.pagePosition is based on Yahoo's getXY method, which is
 * Copyright (c) 2006, Yahoo! Inc.
 * All rights reserved.
 * 
 * Redistribution and use of this software in source and binary forms, with or
 * without modification, are permitted provided that the following conditions
 * are met:
 * 
 * * Redistributions of source code must retain the above copyright notice,
 *   this list of conditions and the following disclaimer.
 * 
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 * 
 * * Neither the name of Yahoo! Inc. nor the names of its contributors may be
 *   used to endorse or promote products derived from this software without
 *   specific prior written permission of Yahoo! Inc.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
 * POSSIBILITY OF SUCH DAMAGE.
 */
var OpenLayers = { VERSION_NUMBER: "Release 2.13.1", singleFile: !0, _getScriptLocation: function () { for (var a = /(^|(.*?\/))(OpenLayers[^\/]*?\.js)(\?|$)/, b = document.getElementsByTagName("script"), c, d = "", e = 0, f = b.length; e < f; e++)if (c = b[e].getAttribute("src")) if (c = c.match(a)) { d = c[1]; break } return function () { return d } }(), ImgPath: "" }; OpenLayers.Class = function () { var a = arguments.length, b = arguments[0], c = arguments[a - 1], d = "function" == typeof c.initialize ? c.initialize : function () { b.prototype.initialize.apply(this, arguments) }; 1 < a ? (a = [d, b].concat(Array.prototype.slice.call(arguments).slice(1, a - 1), c), OpenLayers.inherit.apply(null, a)) : d.prototype = c; return d };
OpenLayers.inherit = function (a, b) { var c = function () { }; c.prototype = b.prototype; a.prototype = new c; var d, e, c = 2; for (d = arguments.length; c < d; c++)e = arguments[c], "function" === typeof e && (e = e.prototype), OpenLayers.Util.extend(a.prototype, e) }; OpenLayers.Util = OpenLayers.Util || {}; OpenLayers.Util.extend = function (a, b) { a = a || {}; if (b) { for (var c in b) { var d = b[c]; void 0 !== d && (a[c] = d) } "function" == typeof window.Event && b instanceof window.Event || (!b.hasOwnProperty || !b.hasOwnProperty("toString")) || (a.toString = b.toString) } return a }; OpenLayers.String = {
  startsWith: function (a, b) { return 0 == a.indexOf(b) }, contains: function (a, b) { return -1 != a.indexOf(b) }, trim: function (a) { return a.replace(/^\s\s*/, "").replace(/\s\s*$/, "") }, camelize: function (a) { a = a.split("-"); for (var b = a[0], c = 1, d = a.length; c < d; c++)var e = a[c], b = b + (e.charAt(0).toUpperCase() + e.substring(1)); return b }, format: function (a, b, c) {
    b || (b = window); return a.replace(OpenLayers.String.tokenRegEx, function (a, e) {
      for (var f, g = e.split(/\.+/), h = 0; h < g.length; h++) {
      0 == h && (f = b); if (void 0 === f) break;
        f = f[g[h]]
      } "function" == typeof f && (f = c ? f.apply(null, c) : f()); return "undefined" == typeof f ? "undefined" : f
    })
  }, tokenRegEx: /\$\{([\w.]+?)\}/g, numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/, isNumeric: function (a) { return OpenLayers.String.numberRegEx.test(a) }, numericIf: function (a, b) { var c = a; !0 === b && (null != a && a.replace) && (a = a.replace(/^\s*|\s*$/g, "")); return OpenLayers.String.isNumeric(a) ? parseFloat(a) : c }
};
OpenLayers.Number = {
  decimalSeparator: ".", thousandsSeparator: ",", limitSigDigs: function (a, b) { var c = 0; 0 < b && (c = parseFloat(a.toPrecision(b))); return c }, format: function (a, b, c, d) {
    b = "undefined" != typeof b ? b : 0; c = "undefined" != typeof c ? c : OpenLayers.Number.thousandsSeparator; d = "undefined" != typeof d ? d : OpenLayers.Number.decimalSeparator; null != b && (a = parseFloat(a.toFixed(b))); var e = a.toString().split("."); 1 == e.length && null == b && (b = 0); a = e[0]; if (c) for (var f = /(-?[0-9]+)([0-9]{3})/; f.test(a);)a = a.replace(f, "$1" + c + "$2");
    0 == b ? b = a : (c = 1 < e.length ? e[1] : "0", null != b && (c += Array(b - c.length + 1).join("0")), b = a + d + c); return b
  }, zeroPad: function (a, b, c) { for (a = a.toString(c || 10); a.length < b;)a = "0" + a; return a }
};
OpenLayers.Function = { bind: function (a, b) { var c = Array.prototype.slice.apply(arguments, [2]); return function () { var d = c.concat(Array.prototype.slice.apply(arguments, [0])); return a.apply(b, d) } }, bindAsEventListener: function (a, b) { return function (c) { return a.call(b, c || window.event) } }, False: function () { return !1 }, True: function () { return !0 }, Void: function () { } };
OpenLayers.Array = { filter: function (a, b, c) { var d = []; if (Array.prototype.filter) d = a.filter(b, c); else { var e = a.length; if ("function" != typeof b) throw new TypeError; for (var f = 0; f < e; f++)if (f in a) { var g = a[f]; b.call(c, g, f, a) && d.push(g) } } return d } }; OpenLayers.Bounds = OpenLayers.Class({
  left: null, bottom: null, right: null, top: null, centerLonLat: null, initialize: function (a, b, c, d) { OpenLayers.Util.isArray(a) && (d = a[3], c = a[2], b = a[1], a = a[0]); null != a && (this.left = OpenLayers.Util.toFloat(a)); null != b && (this.bottom = OpenLayers.Util.toFloat(b)); null != c && (this.right = OpenLayers.Util.toFloat(c)); null != d && (this.top = OpenLayers.Util.toFloat(d)) }, clone: function () { return new OpenLayers.Bounds(this.left, this.bottom, this.right, this.top) }, equals: function (a) {
    var b = !1; null !=
      a && (b = this.left == a.left && this.right == a.right && this.top == a.top && this.bottom == a.bottom); return b
  }, toString: function () { return [this.left, this.bottom, this.right, this.top].join() }, toArray: function (a) { return !0 === a ? [this.bottom, this.left, this.top, this.right] : [this.left, this.bottom, this.right, this.top] }, toBBOX: function (a, b) {
  null == a && (a = 6); var c = Math.pow(10, a), d = Math.round(this.left * c) / c, e = Math.round(this.bottom * c) / c, f = Math.round(this.right * c) / c, c = Math.round(this.top * c) / c; return !0 === b ? e + "," + d + "," + c + "," + f : d +
    "," + e + "," + f + "," + c
  }, toGeometry: function () { return new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing([new OpenLayers.Geometry.Point(this.left, this.bottom), new OpenLayers.Geometry.Point(this.right, this.bottom), new OpenLayers.Geometry.Point(this.right, this.top), new OpenLayers.Geometry.Point(this.left, this.top)])]) }, getWidth: function () { return this.right - this.left }, getHeight: function () { return this.top - this.bottom }, getSize: function () { return new OpenLayers.Size(this.getWidth(), this.getHeight()) },
  getCenterPixel: function () { return new OpenLayers.Pixel((this.left + this.right) / 2, (this.bottom + this.top) / 2) }, getCenterLonLat: function () { this.centerLonLat || (this.centerLonLat = new OpenLayers.LonLat((this.left + this.right) / 2, (this.bottom + this.top) / 2)); return this.centerLonLat }, scale: function (a, b) {
  null == b && (b = this.getCenterLonLat()); var c, d; "OpenLayers.LonLat" == b.CLASS_NAME ? (c = b.lon, d = b.lat) : (c = b.x, d = b.y); return new OpenLayers.Bounds((this.left - c) * a + c, (this.bottom - d) * a + d, (this.right - c) * a + c, (this.top - d) * a +
    d)
  }, add: function (a, b) { if (null == a || null == b) throw new TypeError("Bounds.add cannot receive null values"); return new OpenLayers.Bounds(this.left + a, this.bottom + b, this.right + a, this.top + b) }, extend: function (a) {
    if (a) switch (a.CLASS_NAME) {
      case "OpenLayers.LonLat": this.extendXY(a.lon, a.lat); break; case "OpenLayers.Geometry.Point": this.extendXY(a.x, a.y); break; case "OpenLayers.Bounds": this.centerLonLat = null; if (null == this.left || a.left < this.left) this.left = a.left; if (null == this.bottom || a.bottom < this.bottom) this.bottom =
        a.bottom; if (null == this.right || a.right > this.right) this.right = a.right; if (null == this.top || a.top > this.top) this.top = a.top
    }
  }, extendXY: function (a, b) { this.centerLonLat = null; if (null == this.left || a < this.left) this.left = a; if (null == this.bottom || b < this.bottom) this.bottom = b; if (null == this.right || a > this.right) this.right = a; if (null == this.top || b > this.top) this.top = b }, containsLonLat: function (a, b) {
  "boolean" === typeof b && (b = { inclusive: b }); b = b || {}; var c = this.contains(a.lon, a.lat, b.inclusive), d = b.worldBounds; d && !c && (c = d.getWidth(),
    d = Math.round((a.lon - (d.left + d.right) / 2) / c), c = this.containsLonLat({ lon: a.lon - d * c, lat: a.lat }, { inclusive: b.inclusive })); return c
  }, containsPixel: function (a, b) { return this.contains(a.x, a.y, b) }, contains: function (a, b, c) { null == c && (c = !0); if (null == a || null == b) return !1; a = OpenLayers.Util.toFloat(a); b = OpenLayers.Util.toFloat(b); var d = !1; return d = c ? a >= this.left && a <= this.right && b >= this.bottom && b <= this.top : a > this.left && a < this.right && b > this.bottom && b < this.top }, intersectsBounds: function (a, b) {
  "boolean" === typeof b && (b =
    { inclusive: b }); b = b || {}; if (b.worldBounds) { var c = this.wrapDateLine(b.worldBounds); a = a.wrapDateLine(b.worldBounds) } else c = this; null == b.inclusive && (b.inclusive = !0); var d = !1, e = c.left == a.right || c.right == a.left || c.top == a.bottom || c.bottom == a.top; if (b.inclusive || !e) var d = a.top >= c.bottom && a.top <= c.top || c.top > a.bottom && c.top < a.top, e = a.left >= c.left && a.left <= c.right || c.left >= a.left && c.left <= a.right, f = a.right >= c.left && a.right <= c.right || c.right >= a.left && c.right <= a.right, d = (a.bottom >= c.bottom && a.bottom <= c.top || c.bottom >=
      a.bottom && c.bottom <= a.top || d) && (e || f); if (b.worldBounds && !d) { var g = b.worldBounds, e = g.getWidth(), f = !g.containsBounds(c), g = !g.containsBounds(a); f && !g ? (a = a.add(-e, 0), d = c.intersectsBounds(a, { inclusive: b.inclusive })) : g && !f && (c = c.add(-e, 0), d = a.intersectsBounds(c, { inclusive: b.inclusive })) } return d
  }, containsBounds: function (a, b, c) {
  null == b && (b = !1); null == c && (c = !0); var d = this.contains(a.left, a.bottom, c), e = this.contains(a.right, a.bottom, c), f = this.contains(a.left, a.top, c); a = this.contains(a.right, a.top, c); return b ?
    d || e || f || a : d && e && f && a
  }, determineQuadrant: function (a) { var b = "", c = this.getCenterLonLat(), b = b + (a.lat < c.lat ? "b" : "t"); return b += a.lon < c.lon ? "l" : "r" }, transform: function (a, b) {
  this.centerLonLat = null; var c = OpenLayers.Projection.transform({ x: this.left, y: this.bottom }, a, b), d = OpenLayers.Projection.transform({ x: this.right, y: this.bottom }, a, b), e = OpenLayers.Projection.transform({ x: this.left, y: this.top }, a, b), f = OpenLayers.Projection.transform({ x: this.right, y: this.top }, a, b); this.left = Math.min(c.x, e.x); this.bottom = Math.min(c.y,
    d.y); this.right = Math.max(d.x, f.x); this.top = Math.max(e.y, f.y); return this
  }, wrapDateLine: function (a, b) { b = b || {}; var c = b.leftTolerance || 0, d = b.rightTolerance || 0, e = this.clone(); if (a) { for (var f = a.getWidth(); e.left < a.left && e.right - d <= a.left;)e = e.add(f, 0); for (; e.left + c >= a.right && e.right > a.right;)e = e.add(-f, 0); c = e.left + c; c < a.right && (c > a.left && e.right - d > a.right) && (e = e.add(-f, 0)) } return e }, CLASS_NAME: "OpenLayers.Bounds"
});
OpenLayers.Bounds.fromString = function (a, b) { var c = a.split(","); return OpenLayers.Bounds.fromArray(c, b) }; OpenLayers.Bounds.fromArray = function (a, b) { return !0 === b ? new OpenLayers.Bounds(a[1], a[0], a[3], a[2]) : new OpenLayers.Bounds(a[0], a[1], a[2], a[3]) }; OpenLayers.Bounds.fromSize = function (a) { return new OpenLayers.Bounds(0, a.h, a.w, 0) }; OpenLayers.Bounds.oppositeQuadrant = function (a) { var b; b = "" + ("t" == a.charAt(0) ? "b" : "t"); return b += "l" == a.charAt(1) ? "r" : "l" }; OpenLayers.Element = {
  visible: function (a) { return "none" != OpenLayers.Util.getElement(a).style.display }, toggle: function () { for (var a = 0, b = arguments.length; a < b; a++) { var c = OpenLayers.Util.getElement(arguments[a]), d = OpenLayers.Element.visible(c) ? "none" : ""; c.style.display = d } }, remove: function (a) { a = OpenLayers.Util.getElement(a); a.parentNode.removeChild(a) }, getHeight: function (a) { a = OpenLayers.Util.getElement(a); return a.offsetHeight }, hasClass: function (a, b) { var c = a.className; return !!c && RegExp("(^|\\s)" + b + "(\\s|$)").test(c) },
  addClass: function (a, b) { OpenLayers.Element.hasClass(a, b) || (a.className += (a.className ? " " : "") + b); return a }, removeClass: function (a, b) { var c = a.className; c && (a.className = OpenLayers.String.trim(c.replace(RegExp("(^|\\s+)" + b + "(\\s+|$)"), " "))); return a }, toggleClass: function (a, b) { OpenLayers.Element.hasClass(a, b) ? OpenLayers.Element.removeClass(a, b) : OpenLayers.Element.addClass(a, b); return a }, getStyle: function (a, b) {
    a = OpenLayers.Util.getElement(a); var c = null; if (a && a.style) {
      c = a.style[OpenLayers.String.camelize(b)];
      c || (document.defaultView && document.defaultView.getComputedStyle ? c = (c = document.defaultView.getComputedStyle(a, null)) ? c.getPropertyValue(b) : null : a.currentStyle && (c = a.currentStyle[OpenLayers.String.camelize(b)])); var d = ["left", "top", "right", "bottom"]; window.opera && (-1 != OpenLayers.Util.indexOf(d, b) && "static" == OpenLayers.Element.getStyle(a, "position")) && (c = "auto")
    } return "auto" == c ? null : c
  }
}; OpenLayers.LonLat = OpenLayers.Class({
  lon: 0, lat: 0, initialize: function (a, b) { OpenLayers.Util.isArray(a) && (b = a[1], a = a[0]); this.lon = OpenLayers.Util.toFloat(a); this.lat = OpenLayers.Util.toFloat(b) }, toString: function () { return "lon=" + this.lon + ",lat=" + this.lat }, toShortString: function () { return this.lon + ", " + this.lat }, clone: function () { return new OpenLayers.LonLat(this.lon, this.lat) }, add: function (a, b) {
    if (null == a || null == b) throw new TypeError("LonLat.add cannot receive null values"); return new OpenLayers.LonLat(this.lon +
      OpenLayers.Util.toFloat(a), this.lat + OpenLayers.Util.toFloat(b))
  }, equals: function (a) { var b = !1; null != a && (b = this.lon == a.lon && this.lat == a.lat || isNaN(this.lon) && isNaN(this.lat) && isNaN(a.lon) && isNaN(a.lat)); return b }, transform: function (a, b) { var c = OpenLayers.Projection.transform({ x: this.lon, y: this.lat }, a, b); this.lon = c.x; this.lat = c.y; return this }, wrapDateLine: function (a) { var b = this.clone(); if (a) { for (; b.lon < a.left;)b.lon += a.getWidth(); for (; b.lon > a.right;)b.lon -= a.getWidth() } return b }, CLASS_NAME: "OpenLayers.LonLat"
});
OpenLayers.LonLat.fromString = function (a) { a = a.split(","); return new OpenLayers.LonLat(a[0], a[1]) }; OpenLayers.LonLat.fromArray = function (a) { var b = OpenLayers.Util.isArray(a); return new OpenLayers.LonLat(b && a[0], b && a[1]) }; OpenLayers.Pixel = OpenLayers.Class({
  x: 0, y: 0, initialize: function (a, b) { this.x = parseFloat(a); this.y = parseFloat(b) }, toString: function () { return "x=" + this.x + ",y=" + this.y }, clone: function () { return new OpenLayers.Pixel(this.x, this.y) }, equals: function (a) { var b = !1; null != a && (b = this.x == a.x && this.y == a.y || isNaN(this.x) && isNaN(this.y) && isNaN(a.x) && isNaN(a.y)); return b }, distanceTo: function (a) { return Math.sqrt(Math.pow(this.x - a.x, 2) + Math.pow(this.y - a.y, 2)) }, add: function (a, b) {
    if (null == a || null == b) throw new TypeError("Pixel.add cannot receive null values");
    return new OpenLayers.Pixel(this.x + a, this.y + b)
  }, offset: function (a) { var b = this.clone(); a && (b = this.add(a.x, a.y)); return b }, CLASS_NAME: "OpenLayers.Pixel"
}); OpenLayers.Size = OpenLayers.Class({ w: 0, h: 0, initialize: function (a, b) { this.w = parseFloat(a); this.h = parseFloat(b) }, toString: function () { return "w=" + this.w + ",h=" + this.h }, clone: function () { return new OpenLayers.Size(this.w, this.h) }, equals: function (a) { var b = !1; null != a && (b = this.w == a.w && this.h == a.h || isNaN(this.w) && isNaN(this.h) && isNaN(a.w) && isNaN(a.h)); return b }, CLASS_NAME: "OpenLayers.Size" }); OpenLayers.Console = { log: function () { }, debug: function () { }, info: function () { }, warn: function () { }, error: function () { }, userError: function (a) { alert(a) }, assert: function () { }, dir: function () { }, dirxml: function () { }, trace: function () { }, group: function () { }, groupEnd: function () { }, time: function () { }, timeEnd: function () { }, profile: function () { }, profileEnd: function () { }, count: function () { }, CLASS_NAME: "OpenLayers.Console" };
(function () { for (var a = document.getElementsByTagName("script"), b = 0, c = a.length; b < c; ++b)if (-1 != a[b].src.indexOf("firebug.js") && console) { OpenLayers.Util.extend(OpenLayers.Console, console); break } })(); OpenLayers.Lang = {
  code: null, defaultCode: "en", getCode: function () { OpenLayers.Lang.code || OpenLayers.Lang.setCode(); return OpenLayers.Lang.code }, setCode: function (a) {
    var b; a || (a = "msie" == OpenLayers.BROWSER_NAME ? navigator.userLanguage : navigator.language); a = a.split("-"); a[0] = a[0].toLowerCase(); "object" == typeof OpenLayers.Lang[a[0]] && (b = a[0]); if (a[1]) { var c = a[0] + "-" + a[1].toUpperCase(); "object" == typeof OpenLayers.Lang[c] && (b = c) } b || (OpenLayers.Console.warn("Failed to find OpenLayers.Lang." + a.join("-") + " dictionary, falling back to default language"),
      b = OpenLayers.Lang.defaultCode); OpenLayers.Lang.code = b
  }, translate: function (a, b) { var c = OpenLayers.Lang[OpenLayers.Lang.getCode()]; (c = c && c[a]) || (c = a); b && (c = OpenLayers.String.format(c, b)); return c }
}; OpenLayers.i18n = OpenLayers.Lang.translate; OpenLayers.Util = OpenLayers.Util || {}; OpenLayers.Util.getElement = function () { for (var a = [], b = 0, c = arguments.length; b < c; b++) { var d = arguments[b]; "string" == typeof d && (d = document.getElementById(d)); if (1 == arguments.length) return d; a.push(d) } return a }; OpenLayers.Util.isElement = function (a) { return !(!a || 1 !== a.nodeType) }; OpenLayers.Util.isArray = function (a) { return "[object Array]" === Object.prototype.toString.call(a) }; OpenLayers.Util.removeItem = function (a, b) { for (var c = a.length - 1; 0 <= c; c--)a[c] == b && a.splice(c, 1); return a };
OpenLayers.Util.indexOf = function (a, b) { if ("function" == typeof a.indexOf) return a.indexOf(b); for (var c = 0, d = a.length; c < d; c++)if (a[c] == b) return c; return -1 }; OpenLayers.Util.dotless = /\./g;
OpenLayers.Util.modifyDOMElement = function (a, b, c, d, e, f, g, h) { b && (a.id = b.replace(OpenLayers.Util.dotless, "_")); c && (a.style.left = c.x + "px", a.style.top = c.y + "px"); d && (a.style.width = d.w + "px", a.style.height = d.h + "px"); e && (a.style.position = e); f && (a.style.border = f); g && (a.style.overflow = g); 0 <= parseFloat(h) && 1 > parseFloat(h) ? (a.style.filter = "alpha(opacity=" + 100 * h + ")", a.style.opacity = h) : 1 == parseFloat(h) && (a.style.filter = "", a.style.opacity = "") };
OpenLayers.Util.createDiv = function (a, b, c, d, e, f, g, h) { var k = document.createElement("div"); d && (k.style.backgroundImage = "url(" + d + ")"); a || (a = OpenLayers.Util.createUniqueID("OpenLayersDiv")); e || (e = "absolute"); OpenLayers.Util.modifyDOMElement(k, a, b, c, e, f, g, h); return k };
OpenLayers.Util.createImage = function (a, b, c, d, e, f, g, h) { var k = document.createElement("img"); a || (a = OpenLayers.Util.createUniqueID("OpenLayersDiv")); e || (e = "relative"); OpenLayers.Util.modifyDOMElement(k, a, b, c, e, f, null, g); h && (k.style.display = "none", b = function () { k.style.display = ""; OpenLayers.Event.stopObservingElement(k) }, OpenLayers.Event.observe(k, "load", b), OpenLayers.Event.observe(k, "error", b)); k.style.alt = a; k.galleryImg = "no"; d && (k.src = d); return k }; OpenLayers.IMAGE_RELOAD_ATTEMPTS = 0;
OpenLayers.Util.alphaHackNeeded = null; OpenLayers.Util.alphaHack = function () { if (null == OpenLayers.Util.alphaHackNeeded) { var a = navigator.appVersion.split("MSIE"), a = parseFloat(a[1]), b = !1; try { b = !!document.body.filters } catch (c) { } OpenLayers.Util.alphaHackNeeded = b && 5.5 <= a && 7 > a } return OpenLayers.Util.alphaHackNeeded };
OpenLayers.Util.modifyAlphaImageDiv = function (a, b, c, d, e, f, g, h, k) {
  OpenLayers.Util.modifyDOMElement(a, b, c, d, f, null, null, k); b = a.childNodes[0]; e && (b.src = e); OpenLayers.Util.modifyDOMElement(b, a.id + "_innerImage", null, d, "relative", g); OpenLayers.Util.alphaHack() && ("none" != a.style.display && (a.style.display = "inline-block"), null == h && (h = "scale"), a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + b.src + "', sizingMethod='" + h + "')", 0 <= parseFloat(a.style.opacity) && 1 > parseFloat(a.style.opacity) &&
    (a.style.filter += " alpha(opacity=" + 100 * a.style.opacity + ")"), b.style.filter = "alpha(opacity=0)")
}; OpenLayers.Util.createAlphaImageDiv = function (a, b, c, d, e, f, g, h, k) { var l = OpenLayers.Util.createDiv(); k = OpenLayers.Util.createImage(null, null, null, null, null, null, null, k); k.className = "olAlphaImg"; l.appendChild(k); OpenLayers.Util.modifyAlphaImageDiv(l, a, b, c, d, e, f, g, h); return l }; OpenLayers.Util.upperCaseObject = function (a) { var b = {}, c; for (c in a) b[c.toUpperCase()] = a[c]; return b };
OpenLayers.Util.applyDefaults = function (a, b) { a = a || {}; var c = "function" == typeof window.Event && b instanceof window.Event, d; for (d in b) if (void 0 === a[d] || !c && b.hasOwnProperty && b.hasOwnProperty(d) && !a.hasOwnProperty(d)) a[d] = b[d]; !c && (b && b.hasOwnProperty && b.hasOwnProperty("toString") && !a.hasOwnProperty("toString")) && (a.toString = b.toString); return a };
OpenLayers.Util.getParameterString = function (a) { var b = [], c; for (c in a) { var d = a[c]; if (null != d && "function" != typeof d) { if ("object" == typeof d && d.constructor == Array) { for (var e = [], f, g = 0, h = d.length; g < h; g++)f = d[g], e.push(encodeURIComponent(null === f || void 0 === f ? "" : f)); d = e.join(",") } else d = encodeURIComponent(d); b.push(encodeURIComponent(c) + "=" + d) } } return b.join("&") }; OpenLayers.Util.urlAppend = function (a, b) { var c = a; if (b) var d = (a + " ").split(/[?&]/), c = c + (" " === d.pop() ? b : d.length ? "&" + b : "?" + b); return c };
OpenLayers.Util.getImagesLocation = function () { return OpenLayers.ImgPath || OpenLayers._getScriptLocation() + "img/" }; OpenLayers.Util.getImageLocation = function (a) { return OpenLayers.Util.getImagesLocation() + a }; OpenLayers.Util.Try = function () { for (var a = null, b = 0, c = arguments.length; b < c; b++) { var d = arguments[b]; try { a = d(); break } catch (e) { } } return a };
OpenLayers.Util.getXmlNodeValue = function (a) { var b = null; OpenLayers.Util.Try(function () { b = a.text; b || (b = a.textContent); b || (b = a.firstChild.nodeValue) }, function () { b = a.textContent }); return b }; OpenLayers.Util.mouseLeft = function (a, b) { for (var c = a.relatedTarget ? a.relatedTarget : a.toElement; c != b && null != c;)c = c.parentNode; return c != b }; OpenLayers.Util.DEFAULT_PRECISION = 14; OpenLayers.Util.toFloat = function (a, b) { null == b && (b = OpenLayers.Util.DEFAULT_PRECISION); "number" !== typeof a && (a = parseFloat(a)); return 0 === b ? a : parseFloat(a.toPrecision(b)) };
OpenLayers.Util.rad = function (a) { return a * Math.PI / 180 }; OpenLayers.Util.deg = function (a) { return 180 * a / Math.PI }; OpenLayers.Util.VincentyConstants = { a: 6378137, b: 6356752.3142, f: 1 / 298.257223563 };
OpenLayers.Util.distVincenty = function (a, b) {
  for (var c = OpenLayers.Util.VincentyConstants, d = c.a, e = c.b, c = c.f, f = OpenLayers.Util.rad(b.lon - a.lon), g = Math.atan((1 - c) * Math.tan(OpenLayers.Util.rad(a.lat))), h = Math.atan((1 - c) * Math.tan(OpenLayers.Util.rad(b.lat))), k = Math.sin(g), g = Math.cos(g), l = Math.sin(h), h = Math.cos(h), m = f, n = 2 * Math.PI, p = 20; 1E-12 < Math.abs(m - n) && 0 < --p;) {
    var q = Math.sin(m), r = Math.cos(m), s = Math.sqrt(h * q * h * q + (g * l - k * h * r) * (g * l - k * h * r)); if (0 == s) return 0; var r = k * l + g * h * r, t = Math.atan2(s, r), u = Math.asin(g * h *
      q / s), v = Math.cos(u) * Math.cos(u), q = r - 2 * k * l / v, w = c / 16 * v * (4 + c * (4 - 3 * v)), n = m, m = f + (1 - w) * c * Math.sin(u) * (t + w * s * (q + w * r * (-1 + 2 * q * q)))
  } if (0 == p) return NaN; d = v * (d * d - e * e) / (e * e); c = d / 1024 * (256 + d * (-128 + d * (74 - 47 * d))); return (e * (1 + d / 16384 * (4096 + d * (-768 + d * (320 - 175 * d)))) * (t - c * s * (q + c / 4 * (r * (-1 + 2 * q * q) - c / 6 * q * (-3 + 4 * s * s) * (-3 + 4 * q * q))))).toFixed(3) / 1E3
};
OpenLayers.Util.destinationVincenty = function (a, b, c) {
  var d = OpenLayers.Util, e = d.VincentyConstants, f = e.a, g = e.b, h = e.f, e = a.lon; a = a.lat; var k = d.rad(b); b = Math.sin(k); k = Math.cos(k); a = (1 - h) * Math.tan(d.rad(a)); var l = 1 / Math.sqrt(1 + a * a), m = a * l, n = Math.atan2(a, k); a = l * b; for (var p = 1 - a * a, f = p * (f * f - g * g) / (g * g), q = 1 + f / 16384 * (4096 + f * (-768 + f * (320 - 175 * f))), r = f / 1024 * (256 + f * (-128 + f * (74 - 47 * f))), f = c / (g * q), s = 2 * Math.PI; 1E-12 < Math.abs(f - s);)var t = Math.cos(2 * n + f), u = Math.sin(f), v = Math.cos(f), w = r * u * (t + r / 4 * (v * (-1 + 2 * t * t) - r / 6 * t * (-3 + 4 *
    u * u) * (-3 + 4 * t * t))), s = f, f = c / (g * q) + w; c = m * u - l * v * k; g = Math.atan2(m * v + l * u * k, (1 - h) * Math.sqrt(a * a + c * c)); b = Math.atan2(u * b, l * v - m * u * k); k = h / 16 * p * (4 + h * (4 - 3 * p)); t = b - (1 - k) * h * a * (f + k * u * (t + k * v * (-1 + 2 * t * t))); Math.atan2(a, -c); return new OpenLayers.LonLat(e + d.deg(t), d.deg(g))
};
OpenLayers.Util.getParameters = function (a, b) {
  b = b || {}; a = null === a || void 0 === a ? window.location.href : a; var c = ""; if (OpenLayers.String.contains(a, "?")) var d = a.indexOf("?") + 1, c = OpenLayers.String.contains(a, "#") ? a.indexOf("#") : a.length, c = a.substring(d, c); for (var d = {}, c = c.split(/[&;]/), e = 0, f = c.length; e < f; ++e) {
    var g = c[e].split("="); if (g[0]) {
      var h = g[0]; try { h = decodeURIComponent(h) } catch (k) { h = unescape(h) } g = (g[1] || "").replace(/\+/g, " "); try { g = decodeURIComponent(g) } catch (l) { g = unescape(g) } !1 !== b.splitArgs && (g = g.split(","));
      1 == g.length && (g = g[0]); d[h] = g
    }
  } return d
}; OpenLayers.Util.lastSeqID = 0; OpenLayers.Util.createUniqueID = function (a) { a = null == a ? "id_" : a.replace(OpenLayers.Util.dotless, "_"); OpenLayers.Util.lastSeqID += 1; return a + OpenLayers.Util.lastSeqID }; OpenLayers.INCHES_PER_UNIT = { inches: 1, ft: 12, mi: 63360, m: 39.37, km: 39370, dd: 4374754, yd: 36 }; OpenLayers.INCHES_PER_UNIT["in"] = OpenLayers.INCHES_PER_UNIT.inches; OpenLayers.INCHES_PER_UNIT.degrees = OpenLayers.INCHES_PER_UNIT.dd; OpenLayers.INCHES_PER_UNIT.nmi = 1852 * OpenLayers.INCHES_PER_UNIT.m;
OpenLayers.METERS_PER_INCH = 0.0254000508001016;
OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT, {
  Inch: OpenLayers.INCHES_PER_UNIT.inches, Meter: 1 / OpenLayers.METERS_PER_INCH, Foot: 0.3048006096012192 / OpenLayers.METERS_PER_INCH, IFoot: 0.3048 / OpenLayers.METERS_PER_INCH, ClarkeFoot: 0.3047972651151 / OpenLayers.METERS_PER_INCH, SearsFoot: 0.30479947153867626 / OpenLayers.METERS_PER_INCH, GoldCoastFoot: 0.3047997101815088 / OpenLayers.METERS_PER_INCH, IInch: 0.0254 / OpenLayers.METERS_PER_INCH, MicroInch: 2.54E-5 / OpenLayers.METERS_PER_INCH, Mil: 2.54E-8 / OpenLayers.METERS_PER_INCH,
  Centimeter: 0.01 / OpenLayers.METERS_PER_INCH, Kilometer: 1E3 / OpenLayers.METERS_PER_INCH, Yard: 0.9144018288036576 / OpenLayers.METERS_PER_INCH, SearsYard: 0.914398414616029 / OpenLayers.METERS_PER_INCH, IndianYard: 0.9143985307444408 / OpenLayers.METERS_PER_INCH, IndianYd37: 0.91439523 / OpenLayers.METERS_PER_INCH, IndianYd62: 0.9143988 / OpenLayers.METERS_PER_INCH, IndianYd75: 0.9143985 / OpenLayers.METERS_PER_INCH, IndianFoot: 0.30479951 / OpenLayers.METERS_PER_INCH, IndianFt37: 0.30479841 / OpenLayers.METERS_PER_INCH, IndianFt62: 0.3047996 /
    OpenLayers.METERS_PER_INCH, IndianFt75: 0.3047995 / OpenLayers.METERS_PER_INCH, Mile: 1609.3472186944373 / OpenLayers.METERS_PER_INCH, IYard: 0.9144 / OpenLayers.METERS_PER_INCH, IMile: 1609.344 / OpenLayers.METERS_PER_INCH, NautM: 1852 / OpenLayers.METERS_PER_INCH, "Lat-66": 110943.31648893273 / OpenLayers.METERS_PER_INCH, "Lat-83": 110946.25736872235 / OpenLayers.METERS_PER_INCH, Decimeter: 0.1 / OpenLayers.METERS_PER_INCH, Millimeter: 0.001 / OpenLayers.METERS_PER_INCH, Dekameter: 10 / OpenLayers.METERS_PER_INCH, Decameter: 10 / OpenLayers.METERS_PER_INCH,
  Hectometer: 100 / OpenLayers.METERS_PER_INCH, GermanMeter: 1.0000135965 / OpenLayers.METERS_PER_INCH, CaGrid: 0.999738 / OpenLayers.METERS_PER_INCH, ClarkeChain: 20.1166194976 / OpenLayers.METERS_PER_INCH, GunterChain: 20.11684023368047 / OpenLayers.METERS_PER_INCH, BenoitChain: 20.116782494375872 / OpenLayers.METERS_PER_INCH, SearsChain: 20.11676512155 / OpenLayers.METERS_PER_INCH, ClarkeLink: 0.201166194976 / OpenLayers.METERS_PER_INCH, GunterLink: 0.2011684023368047 / OpenLayers.METERS_PER_INCH, BenoitLink: 0.20116782494375873 / OpenLayers.METERS_PER_INCH,
  SearsLink: 0.2011676512155 / OpenLayers.METERS_PER_INCH, Rod: 5.02921005842012 / OpenLayers.METERS_PER_INCH, IntnlChain: 20.1168 / OpenLayers.METERS_PER_INCH, IntnlLink: 0.201168 / OpenLayers.METERS_PER_INCH, Perch: 5.02921005842012 / OpenLayers.METERS_PER_INCH, Pole: 5.02921005842012 / OpenLayers.METERS_PER_INCH, Furlong: 201.1684023368046 / OpenLayers.METERS_PER_INCH, Rood: 3.778266898 / OpenLayers.METERS_PER_INCH, CapeFoot: 0.3047972615 / OpenLayers.METERS_PER_INCH, Brealey: 375 / OpenLayers.METERS_PER_INCH, ModAmFt: 0.304812252984506 /
    OpenLayers.METERS_PER_INCH, Fathom: 1.8288 / OpenLayers.METERS_PER_INCH, "NautM-UK": 1853.184 / OpenLayers.METERS_PER_INCH, "50kilometers": 5E4 / OpenLayers.METERS_PER_INCH, "150kilometers": 15E4 / OpenLayers.METERS_PER_INCH
});
OpenLayers.Util.extend(OpenLayers.INCHES_PER_UNIT, {
  mm: OpenLayers.INCHES_PER_UNIT.Meter / 1E3, cm: OpenLayers.INCHES_PER_UNIT.Meter / 100, dm: 100 * OpenLayers.INCHES_PER_UNIT.Meter, km: 1E3 * OpenLayers.INCHES_PER_UNIT.Meter, kmi: OpenLayers.INCHES_PER_UNIT.nmi, fath: OpenLayers.INCHES_PER_UNIT.Fathom, ch: OpenLayers.INCHES_PER_UNIT.IntnlChain, link: OpenLayers.INCHES_PER_UNIT.IntnlLink, "us-in": OpenLayers.INCHES_PER_UNIT.inches, "us-ft": OpenLayers.INCHES_PER_UNIT.Foot, "us-yd": OpenLayers.INCHES_PER_UNIT.Yard, "us-ch": OpenLayers.INCHES_PER_UNIT.GunterChain,
  "us-mi": OpenLayers.INCHES_PER_UNIT.Mile, "ind-yd": OpenLayers.INCHES_PER_UNIT.IndianYd37, "ind-ft": OpenLayers.INCHES_PER_UNIT.IndianFt37, "ind-ch": 20.11669506 / OpenLayers.METERS_PER_INCH
}); OpenLayers.DOTS_PER_INCH = 72; OpenLayers.Util.normalizeScale = function (a) { return 1 < a ? 1 / a : a }; OpenLayers.Util.getResolutionFromScale = function (a, b) { var c; a && (null == b && (b = "degrees"), c = 1 / (OpenLayers.Util.normalizeScale(a) * OpenLayers.INCHES_PER_UNIT[b] * OpenLayers.DOTS_PER_INCH)); return c };
OpenLayers.Util.getScaleFromResolution = function (a, b) { null == b && (b = "degrees"); return a * OpenLayers.INCHES_PER_UNIT[b] * OpenLayers.DOTS_PER_INCH };
OpenLayers.Util.pagePosition = function (a) {
  var b = [0, 0], c = OpenLayers.Util.getViewportElement(); if (!a || a == window || a == c) return b; var d = OpenLayers.IS_GECKO && document.getBoxObjectFor && "absolute" == OpenLayers.Element.getStyle(a, "position") && ("" == a.style.top || "" == a.style.left), e = null; if (a.getBoundingClientRect) a = a.getBoundingClientRect(), e = window.pageYOffset || c.scrollTop, b[0] = a.left + (window.pageXOffset || c.scrollLeft), b[1] = a.top + e; else if (document.getBoxObjectFor && !d) a = document.getBoxObjectFor(a), c = document.getBoxObjectFor(c),
    b[0] = a.screenX - c.screenX, b[1] = a.screenY - c.screenY; else { b[0] = a.offsetLeft; b[1] = a.offsetTop; e = a.offsetParent; if (e != a) for (; e;)b[0] += e.offsetLeft, b[1] += e.offsetTop, e = e.offsetParent; c = OpenLayers.BROWSER_NAME; if ("opera" == c || "safari" == c && "absolute" == OpenLayers.Element.getStyle(a, "position")) b[1] -= document.body.offsetTop; for (e = a.offsetParent; e && e != document.body;) { b[0] -= e.scrollLeft; if ("opera" != c || "TR" != e.tagName) b[1] -= e.scrollTop; e = e.offsetParent } } return b
};
OpenLayers.Util.getViewportElement = function () { var a = arguments.callee.viewportElement; void 0 == a && (a = "msie" == OpenLayers.BROWSER_NAME && "CSS1Compat" != document.compatMode ? document.body : document.documentElement, arguments.callee.viewportElement = a); return a };
OpenLayers.Util.isEquivalentUrl = function (a, b, c) { c = c || {}; OpenLayers.Util.applyDefaults(c, { ignoreCase: !0, ignorePort80: !0, ignoreHash: !0, splitArgs: !1 }); a = OpenLayers.Util.createUrlObject(a, c); b = OpenLayers.Util.createUrlObject(b, c); for (var d in a) if ("args" !== d && a[d] != b[d]) return !1; for (d in a.args) { if (a.args[d] != b.args[d]) return !1; delete b.args[d] } for (d in b.args) return !1; return !0 };
OpenLayers.Util.createUrlObject = function (a, b) {
  b = b || {}; if (!/^\w+:\/\//.test(a)) { var c = window.location, d = c.port ? ":" + c.port : "", d = c.protocol + "//" + c.host.split(":").shift() + d; 0 === a.indexOf("/") ? a = d + a : (c = c.pathname.split("/"), c.pop(), a = d + c.join("/") + "/" + a) } b.ignoreCase && (a = a.toLowerCase()); c = document.createElement("a"); c.href = a; d = {}; d.host = c.host.split(":").shift(); d.protocol = c.protocol; d.port = b.ignorePort80 ? "80" == c.port || "0" == c.port ? "" : c.port : "" == c.port || "0" == c.port ? "80" : c.port; d.hash = b.ignoreHash || "#" ===
    c.hash ? "" : c.hash; var e = c.search; e || (e = a.indexOf("?"), e = -1 != e ? a.substr(e) : ""); d.args = OpenLayers.Util.getParameters(e, { splitArgs: b.splitArgs }); d.pathname = "/" == c.pathname.charAt(0) ? c.pathname : "/" + c.pathname; return d
}; OpenLayers.Util.removeTail = function (a) { var b = null, b = a.indexOf("?"), c = a.indexOf("#"); return b = -1 == b ? -1 != c ? a.substr(0, c) : a : -1 != c ? a.substr(0, Math.min(b, c)) : a.substr(0, b) }; OpenLayers.IS_GECKO = function () { var a = navigator.userAgent.toLowerCase(); return -1 == a.indexOf("webkit") && -1 != a.indexOf("gecko") }();
OpenLayers.CANVAS_SUPPORTED = function () { var a = document.createElement("canvas"); return !(!a.getContext || !a.getContext("2d")) }(); OpenLayers.BROWSER_NAME = function () { var a = "", b = navigator.userAgent.toLowerCase(); -1 != b.indexOf("opera") ? a = "opera" : -1 != b.indexOf("msie") ? a = "msie" : -1 != b.indexOf("safari") ? a = "safari" : -1 != b.indexOf("mozilla") && (a = -1 != b.indexOf("firefox") ? "firefox" : "mozilla"); return a }(); OpenLayers.Util.getBrowserName = function () { return OpenLayers.BROWSER_NAME };
OpenLayers.Util.getRenderedDimensions = function (a, b, c) {
  var d, e, f = document.createElement("div"); f.style.visibility = "hidden"; for (var g = c && c.containerElement ? c.containerElement : document.body, h = !1, k = null, l = g; l && "body" != l.tagName.toLowerCase();) { var m = OpenLayers.Element.getStyle(l, "position"); if ("absolute" == m) { h = !0; break } else if (m && "static" != m) break; l = l.parentNode } !h || 0 !== g.clientHeight && 0 !== g.clientWidth || (k = document.createElement("div"), k.style.visibility = "hidden", k.style.position = "absolute", k.style.overflow =
    "visible", k.style.width = document.body.clientWidth + "px", k.style.height = document.body.clientHeight + "px", k.appendChild(f)); f.style.position = "absolute"; b && (b.w ? (d = b.w, f.style.width = d + "px") : b.h && (e = b.h, f.style.height = e + "px")); c && c.displayClass && (f.className = c.displayClass); b = document.createElement("div"); b.innerHTML = a; b.style.overflow = "visible"; if (b.childNodes) for (a = 0, c = b.childNodes.length; a < c; a++)b.childNodes[a].style && (b.childNodes[a].style.overflow = "visible"); f.appendChild(b); k ? g.appendChild(k) : g.appendChild(f);
  d || (d = parseInt(b.scrollWidth), f.style.width = d + "px"); e || (e = parseInt(b.scrollHeight)); f.removeChild(b); k ? (k.removeChild(f), g.removeChild(k)) : g.removeChild(f); return new OpenLayers.Size(d, e)
};
OpenLayers.Util.getScrollbarWidth = function () {
  var a = OpenLayers.Util._scrollbarWidth; if (null == a) {
    var b = null, c = null, b = a = 0, b = document.createElement("div"); b.style.position = "absolute"; b.style.top = "-1000px"; b.style.left = "-1000px"; b.style.width = "100px"; b.style.height = "50px"; b.style.overflow = "hidden"; c = document.createElement("div"); c.style.width = "100%"; c.style.height = "200px"; b.appendChild(c); document.body.appendChild(b); a = c.offsetWidth; b.style.overflow = "scroll"; b = c.offsetWidth; document.body.removeChild(document.body.lastChild);
    OpenLayers.Util._scrollbarWidth = a - b; a = OpenLayers.Util._scrollbarWidth
  } return a
};
OpenLayers.Util.getFormattedLonLat = function (a, b, c) { c || (c = "dms"); a = (a + 540) % 360 - 180; var d = Math.abs(a), e = Math.floor(d), f = d = (d - e) / (1 / 60), d = Math.floor(d), f = Math.round(10 * ((f - d) / (1 / 60))), f = f / 10; 60 <= f && (f -= 60, d += 1, 60 <= d && (d -= 60, e += 1)); 10 > e && (e = "0" + e); e += "\u00b0"; 0 <= c.indexOf("dm") && (10 > d && (d = "0" + d), e += d + "'", 0 <= c.indexOf("dms") && (10 > f && (f = "0" + f), e += f + '"')); return e = "lon" == b ? e + (0 > a ? OpenLayers.i18n("W") : OpenLayers.i18n("E")) : e + (0 > a ? OpenLayers.i18n("S") : OpenLayers.i18n("N")) }; OpenLayers.Format = OpenLayers.Class({ options: null, externalProjection: null, internalProjection: null, data: null, keepData: !1, initialize: function (a) { OpenLayers.Util.extend(this, a); this.options = a }, destroy: function () { }, read: function (a) { throw Error("Read not implemented."); }, write: function (a) { throw Error("Write not implemented."); }, CLASS_NAME: "OpenLayers.Format" }); OpenLayers.Format.CSWGetRecords = function (a) { a = OpenLayers.Util.applyDefaults(a, OpenLayers.Format.CSWGetRecords.DEFAULTS); var b = OpenLayers.Format.CSWGetRecords["v" + a.version.replace(/\./g, "_")]; if (!b) throw "Unsupported CSWGetRecords version: " + a.version; return new b(a) }; OpenLayers.Format.CSWGetRecords.DEFAULTS = { version: "2.0.2" }; OpenLayers.Control = OpenLayers.Class({
  id: null, map: null, div: null, type: null, allowSelection: !1, displayClass: "", title: "", autoActivate: !1, active: null, handlerOptions: null, handler: null, eventListeners: null, events: null, initialize: function (a) {
  this.displayClass = this.CLASS_NAME.replace("OpenLayers.", "ol").replace(/\./g, ""); OpenLayers.Util.extend(this, a); this.events = new OpenLayers.Events(this); if (this.eventListeners instanceof Object) this.events.on(this.eventListeners); null == this.id && (this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME +
    "_"))
  }, destroy: function () { this.events && (this.eventListeners && this.events.un(this.eventListeners), this.events.destroy(), this.events = null); this.eventListeners = null; this.handler && (this.handler.destroy(), this.handler = null); if (this.handlers) { for (var a in this.handlers) this.handlers.hasOwnProperty(a) && "function" == typeof this.handlers[a].destroy && this.handlers[a].destroy(); this.handlers = null } this.map && (this.map.removeControl(this), this.map = null); this.div = null }, setMap: function (a) {
  this.map = a; this.handler &&
    this.handler.setMap(a)
  }, draw: function (a) { null == this.div && (this.div = OpenLayers.Util.createDiv(this.id), this.div.className = this.displayClass, this.allowSelection || (this.div.className += " olControlNoSelect", this.div.setAttribute("unselectable", "on", 0), this.div.onselectstart = OpenLayers.Function.False), "" != this.title && (this.div.title = this.title)); null != a && (this.position = a.clone()); this.moveTo(this.position); return this.div }, moveTo: function (a) {
  null != a && null != this.div && (this.div.style.left = a.x + "px", this.div.style.top =
    a.y + "px")
  }, activate: function () { if (this.active) return !1; this.handler && this.handler.activate(); this.active = !0; this.map && OpenLayers.Element.addClass(this.map.viewPortDiv, this.displayClass.replace(/ /g, "") + "Active"); this.events.triggerEvent("activate"); return !0 }, deactivate: function () {
    return this.active ? (this.handler && this.handler.deactivate(), this.active = !1, this.map && OpenLayers.Element.removeClass(this.map.viewPortDiv, this.displayClass.replace(/ /g, "") + "Active"), this.events.triggerEvent("deactivate"),
      !0) : !1
  }, CLASS_NAME: "OpenLayers.Control"
}); OpenLayers.Control.TYPE_BUTTON = 1; OpenLayers.Control.TYPE_TOGGLE = 2; OpenLayers.Control.TYPE_TOOL = 3; OpenLayers.Event = {
  observers: !1, KEY_SPACE: 32, KEY_BACKSPACE: 8, KEY_TAB: 9, KEY_RETURN: 13, KEY_ESC: 27, KEY_LEFT: 37, KEY_UP: 38, KEY_RIGHT: 39, KEY_DOWN: 40, KEY_DELETE: 46, element: function (a) { return a.target || a.srcElement }, isSingleTouch: function (a) { return a.touches && 1 == a.touches.length }, isMultiTouch: function (a) { return a.touches && 1 < a.touches.length }, isLeftClick: function (a) { return a.which && 1 == a.which || a.button && 1 == a.button }, isRightClick: function (a) { return a.which && 3 == a.which || a.button && 2 == a.button }, stop: function (a,
    b) { b || OpenLayers.Event.preventDefault(a); a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0 }, preventDefault: function (a) { a.preventDefault ? a.preventDefault() : a.returnValue = !1 }, findElement: function (a, b) { for (var c = OpenLayers.Event.element(a); c.parentNode && (!c.tagName || c.tagName.toUpperCase() != b.toUpperCase());)c = c.parentNode; return c }, observe: function (a, b, c, d) {
      a = OpenLayers.Util.getElement(a); d = d || !1; "keypress" == b && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || a.attachEvent) && (b = "keydown");
      this.observers || (this.observers = {}); if (!a._eventCacheID) { var e = "eventCacheID_"; a.id && (e = a.id + "_" + e); a._eventCacheID = OpenLayers.Util.createUniqueID(e) } e = a._eventCacheID; this.observers[e] || (this.observers[e] = []); this.observers[e].push({ element: a, name: b, observer: c, useCapture: d }); a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, stopObservingElement: function (a) { a = OpenLayers.Util.getElement(a)._eventCacheID; this._removeElementObservers(OpenLayers.Event.observers[a]) },
  _removeElementObservers: function (a) { if (a) for (var b = a.length - 1; 0 <= b; b--) { var c = a[b]; OpenLayers.Event.stopObserving.apply(this, [c.element, c.name, c.observer, c.useCapture]) } }, stopObserving: function (a, b, c, d) {
    d = d || !1; a = OpenLayers.Util.getElement(a); var e = a._eventCacheID; "keypress" == b && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || a.detachEvent) && (b = "keydown"); var f = !1, g = OpenLayers.Event.observers[e]; if (g) for (var h = 0; !f && h < g.length;) {
      var k = g[h]; if (k.name == b && k.observer == c && k.useCapture == d) {
        g.splice(h,
          1); 0 == g.length && delete OpenLayers.Event.observers[e]; f = !0; break
      } h++
    } f && (a.removeEventListener ? a.removeEventListener(b, c, d) : a && a.detachEvent && a.detachEvent("on" + b, c)); return f
  }, unloadCache: function () { if (OpenLayers.Event && OpenLayers.Event.observers) { for (var a in OpenLayers.Event.observers) OpenLayers.Event._removeElementObservers.apply(this, [OpenLayers.Event.observers[a]]); OpenLayers.Event.observers = !1 } }, CLASS_NAME: "OpenLayers.Event"
};
OpenLayers.Event.observe(window, "unload", OpenLayers.Event.unloadCache, !1);
OpenLayers.Events = OpenLayers.Class({
  BROWSER_EVENTS: "mouseover mouseout mousedown mouseup mousemove click dblclick rightclick dblrightclick resize focus blur touchstart touchmove touchend keydown".split(" "), listeners: null, object: null, element: null, eventHandler: null, fallThrough: null, includeXY: !1, extensions: null, extensionCount: null, clearMouseListener: null, initialize: function (a, b, c, d, e) {
    OpenLayers.Util.extend(this, e); this.object = a; this.fallThrough = d; this.listeners = {}; this.extensions = {}; this.extensionCount =
      {}; this._msTouches = []; null != b && this.attachToElement(b)
  }, destroy: function () { for (var a in this.extensions) "boolean" !== typeof this.extensions[a] && this.extensions[a].destroy(); this.extensions = null; this.element && (OpenLayers.Event.stopObservingElement(this.element), this.element.hasScrollEvent && OpenLayers.Event.stopObserving(window, "scroll", this.clearMouseListener)); this.eventHandler = this.fallThrough = this.object = this.listeners = this.element = null }, addEventType: function (a) { }, attachToElement: function (a) {
    this.element ?
    OpenLayers.Event.stopObservingElement(this.element) : (this.eventHandler = OpenLayers.Function.bindAsEventListener(this.handleBrowserEvent, this), this.clearMouseListener = OpenLayers.Function.bind(this.clearMouseCache, this)); this.element = a; for (var b = !!window.navigator.msMaxTouchPoints, c, d = 0, e = this.BROWSER_EVENTS.length; d < e; d++)c = this.BROWSER_EVENTS[d], OpenLayers.Event.observe(a, c, this.eventHandler), b && 0 === c.indexOf("touch") && this.addMsTouchListener(a, c, this.eventHandler); OpenLayers.Event.observe(a, "dragstart",
      OpenLayers.Event.stop)
  }, on: function (a) { for (var b in a) "scope" != b && a.hasOwnProperty(b) && this.register(b, a.scope, a[b]) }, register: function (a, b, c, d) { a in OpenLayers.Events && !this.extensions[a] && (this.extensions[a] = new OpenLayers.Events[a](this)); if (null != c) { null == b && (b = this.object); var e = this.listeners[a]; e || (e = [], this.listeners[a] = e, this.extensionCount[a] = 0); b = { obj: b, func: c }; d ? (e.splice(this.extensionCount[a], 0, b), "object" === typeof d && d.extension && this.extensionCount[a]++) : e.push(b) } }, registerPriority: function (a,
    b, c) { this.register(a, b, c, !0) }, un: function (a) { for (var b in a) "scope" != b && a.hasOwnProperty(b) && this.unregister(b, a.scope, a[b]) }, unregister: function (a, b, c) { null == b && (b = this.object); a = this.listeners[a]; if (null != a) for (var d = 0, e = a.length; d < e; d++)if (a[d].obj == b && a[d].func == c) { a.splice(d, 1); break } }, remove: function (a) { null != this.listeners[a] && (this.listeners[a] = []) }, triggerEvent: function (a, b) {
      var c = this.listeners[a]; if (c && 0 != c.length) {
      null == b && (b = {}); b.object = this.object; b.element = this.element; b.type || (b.type =
        a); for (var c = c.slice(), d, e = 0, f = c.length; e < f && (d = c[e], d = d.func.apply(d.obj, [b]), void 0 == d || !1 != d); e++); this.fallThrough || OpenLayers.Event.stop(b, !0); return d
      }
    }, handleBrowserEvent: function (a) { var b = a.type, c = this.listeners[b]; if (c && 0 != c.length) { if ((c = a.touches) && c[0]) { for (var d = 0, e = 0, f = c.length, g, h = 0; h < f; ++h)g = this.getTouchClientXY(c[h]), d += g.clientX, e += g.clientY; a.clientX = d / f; a.clientY = e / f } this.includeXY && (a.xy = this.getMousePosition(a)); this.triggerEvent(b, a) } }, getTouchClientXY: function (a) {
      var b = window.olMockWin ||
        window, c = b.pageXOffset, b = b.pageYOffset, d = a.clientX, e = a.clientY; if (0 === a.pageY && Math.floor(e) > Math.floor(a.pageY) || 0 === a.pageX && Math.floor(d) > Math.floor(a.pageX)) d -= c, e -= b; else if (e < a.pageY - b || d < a.pageX - c) d = a.pageX - c, e = a.pageY - b; a.olClientX = d; a.olClientY = e; return { clientX: d, clientY: e }
    }, clearMouseCache: function () { this.element.scrolls = null; this.element.lefttop = null; this.element.offsets = null }, getMousePosition: function (a) {
      this.includeXY ? this.element.hasScrollEvent || (OpenLayers.Event.observe(window, "scroll",
        this.clearMouseListener), this.element.hasScrollEvent = !0) : this.clearMouseCache(); if (!this.element.scrolls) { var b = OpenLayers.Util.getViewportElement(); this.element.scrolls = [window.pageXOffset || b.scrollLeft, window.pageYOffset || b.scrollTop] } this.element.lefttop || (this.element.lefttop = [document.documentElement.clientLeft || 0, document.documentElement.clientTop || 0]); this.element.offsets || (this.element.offsets = OpenLayers.Util.pagePosition(this.element)); return new OpenLayers.Pixel(a.clientX + this.element.scrolls[0] -
          this.element.offsets[0] - this.element.lefttop[0], a.clientY + this.element.scrolls[1] - this.element.offsets[1] - this.element.lefttop[1])
    }, addMsTouchListener: function (a, b, c) {
      function d(a) { c(OpenLayers.Util.applyDefaults({ stopPropagation: function () { for (var a = e.length - 1; 0 <= a; --a)e[a].stopPropagation() }, preventDefault: function () { for (var a = e.length - 1; 0 <= a; --a)e[a].preventDefault() }, type: b }, a)) } var e = this._msTouches; switch (b) {
        case "touchstart": return this.addMsTouchListenerStart(a, b, d); case "touchend": return this.addMsTouchListenerEnd(a,
          b, d); case "touchmove": return this.addMsTouchListenerMove(a, b, d); default: throw "Unknown touch event type";
      }
    }, addMsTouchListenerStart: function (a, b, c) { var d = this._msTouches; OpenLayers.Event.observe(a, "MSPointerDown", function (a) { for (var b = !1, g = 0, h = d.length; g < h; ++g)if (d[g].pointerId == a.pointerId) { b = !0; break } b || d.push(a); a.touches = d.slice(); c(a) }); OpenLayers.Event.observe(a, "MSPointerUp", function (a) { for (var b = 0, c = d.length; b < c; ++b)if (d[b].pointerId == a.pointerId) { d.splice(b, 1); break } }) }, addMsTouchListenerMove: function (a,
      b, c) { var d = this._msTouches; OpenLayers.Event.observe(a, "MSPointerMove", function (a) { if (a.pointerType != a.MSPOINTER_TYPE_MOUSE || 0 != a.buttons) if (1 != d.length || d[0].pageX != a.pageX || d[0].pageY != a.pageY) { for (var b = 0, g = d.length; b < g; ++b)if (d[b].pointerId == a.pointerId) { d[b] = a; break } a.touches = d.slice(); c(a) } }) }, addMsTouchListenerEnd: function (a, b, c) {
        var d = this._msTouches; OpenLayers.Event.observe(a, "MSPointerUp", function (a) {
          for (var b = 0, g = d.length; b < g; ++b)if (d[b].pointerId == a.pointerId) { d.splice(b, 1); break } a.touches =
            d.slice(); c(a)
        })
      }, CLASS_NAME: "OpenLayers.Events"
}); OpenLayers.Events.buttonclick = OpenLayers.Class({
  target: null, events: "mousedown mouseup click dblclick touchstart touchmove touchend keydown".split(" "), startRegEx: /^mousedown|touchstart$/, cancelRegEx: /^touchmove$/, completeRegEx: /^mouseup|touchend$/, initialize: function (a) { this.target = a; for (a = this.events.length - 1; 0 <= a; --a)this.target.register(this.events[a], this, this.buttonClick, { extension: !0 }) }, destroy: function () {
    for (var a = this.events.length - 1; 0 <= a; --a)this.target.unregister(this.events[a], this, this.buttonClick);
    delete this.target
  }, getPressedButton: function (a) { var b = 3, c; do { if (OpenLayers.Element.hasClass(a, "olButton")) { c = a; break } a = a.parentNode } while (0 < --b && a); return c }, ignore: function (a) { var b = 3, c = !1; do { if ("a" === a.nodeName.toLowerCase()) { c = !0; break } a = a.parentNode } while (0 < --b && a); return c }, buttonClick: function (a) {
    var b = !0, c = OpenLayers.Event.element(a); if (c && (OpenLayers.Event.isLeftClick(a) || !~a.type.indexOf("mouse"))) if (c = this.getPressedButton(c)) {
      if ("keydown" === a.type) switch (a.keyCode) {
        case OpenLayers.Event.KEY_RETURN: case OpenLayers.Event.KEY_SPACE: this.target.triggerEvent("buttonclick",
          { buttonElement: c }), OpenLayers.Event.stop(a), b = !1
      } else if (this.startEvt) { if (this.completeRegEx.test(a.type)) { var b = OpenLayers.Util.pagePosition(c), d = OpenLayers.Util.getViewportElement(), e = window.pageYOffset || d.scrollTop; b[0] -= window.pageXOffset || d.scrollLeft; b[1] -= e; this.target.triggerEvent("buttonclick", { buttonElement: c, buttonXY: { x: this.startEvt.clientX - b[0], y: this.startEvt.clientY - b[1] } }) } this.cancelRegEx.test(a.type) && delete this.startEvt; OpenLayers.Event.stop(a); b = !1 } this.startRegEx.test(a.type) &&
        (this.startEvt = a, OpenLayers.Event.stop(a), b = !1)
    } else b = !this.ignore(OpenLayers.Event.element(a)), delete this.startEvt; return b
  }
}); OpenLayers.Util = OpenLayers.Util || {};
OpenLayers.Util.vendorPrefix = function () {
  function a(a) { return a ? a.replace(/([A-Z])/g, function (a) { return "-" + a.toLowerCase() }).replace(/^ms-/, "-ms-") : null } function b(a, b) { if (void 0 === g[b]) { var c, e = 0, f = d.length, p = "undefined" !== typeof a.cssText; for (g[b] = null; e < f; e++)if ((c = d[e]) ? (p || (c = c.toLowerCase()), c = c + b.charAt(0).toUpperCase() + b.slice(1)) : c = b, void 0 !== a[c]) { g[b] = c; break } } return g[b] } function c(a) { return b(e, a) } var d = ["", "O", "ms", "Moz", "Webkit"], e = document.createElement("div").style, f = {}, g = {}; return {
    css: function (b) {
      if (void 0 ===
        f[b]) { var d = b.replace(/(-[\s\S])/g, function (a) { return a.charAt(1).toUpperCase() }), d = c(d); f[b] = a(d) } return f[b]
    }, js: b, style: c, cssCache: f, jsCache: g
  }
}(); OpenLayers.Animation = function (a) { var b = OpenLayers.Util.vendorPrefix.js(a, "requestAnimationFrame"), c = !!b, d = function () { var c = a[b] || function (b, c) { a.setTimeout(b, 16) }; return function (b, d) { c.apply(a, [b, d]) } }(), e = 0, f = {}; return { isNative: c, requestFrame: d, start: function (a, b, c) { b = 0 < b ? b : Number.POSITIVE_INFINITY; var l = ++e, m = +new Date; f[l] = function () { f[l] && +new Date - m <= b ? (a(), f[l] && d(f[l], c)) : delete f[l] }; d(f[l], c); return l }, stop: function (a) { delete f[a] } } }(window); OpenLayers.Tween = OpenLayers.Class({
  easing: null, begin: null, finish: null, duration: null, callbacks: null, time: null, minFrameRate: null, startTime: null, animationId: null, playing: !1, initialize: function (a) { this.easing = a ? a : OpenLayers.Easing.Expo.easeOut }, start: function (a, b, c, d) {
  this.playing = !0; this.begin = a; this.finish = b; this.duration = c; this.callbacks = d.callbacks; this.minFrameRate = d.minFrameRate || 30; this.time = 0; this.startTime = (new Date).getTime(); OpenLayers.Animation.stop(this.animationId); this.animationId = null;
    this.callbacks && this.callbacks.start && this.callbacks.start.call(this, this.begin); this.animationId = OpenLayers.Animation.start(OpenLayers.Function.bind(this.play, this))
  }, stop: function () { this.playing && (this.callbacks && this.callbacks.done && this.callbacks.done.call(this, this.finish), OpenLayers.Animation.stop(this.animationId), this.animationId = null, this.playing = !1) }, play: function () {
    var a = {}, b; for (b in this.begin) {
      var c = this.begin[b], d = this.finish[b]; if (null == c || null == d || isNaN(c) || isNaN(d)) throw new TypeError("invalid value for Tween");
      a[b] = this.easing.apply(this, [this.time, c, d - c, this.duration])
    } this.time++; this.callbacks && this.callbacks.eachStep && ((new Date).getTime() - this.startTime) / this.time <= 1E3 / this.minFrameRate && this.callbacks.eachStep.call(this, a); this.time > this.duration && this.stop()
  }, CLASS_NAME: "OpenLayers.Tween"
}); OpenLayers.Easing = { CLASS_NAME: "OpenLayers.Easing" }; OpenLayers.Easing.Linear = { easeIn: function (a, b, c, d) { return c * a / d + b }, easeOut: function (a, b, c, d) { return c * a / d + b }, easeInOut: function (a, b, c, d) { return c * a / d + b }, CLASS_NAME: "OpenLayers.Easing.Linear" };
OpenLayers.Easing.Expo = { easeIn: function (a, b, c, d) { return 0 == a ? b : c * Math.pow(2, 10 * (a / d - 1)) + b }, easeOut: function (a, b, c, d) { return a == d ? b + c : c * (-Math.pow(2, -10 * a / d) + 1) + b }, easeInOut: function (a, b, c, d) { return 0 == a ? b : a == d ? b + c : 1 > (a /= d / 2) ? c / 2 * Math.pow(2, 10 * (a - 1)) + b : c / 2 * (-Math.pow(2, -10 * --a) + 2) + b }, CLASS_NAME: "OpenLayers.Easing.Expo" };
OpenLayers.Easing.Quad = { easeIn: function (a, b, c, d) { return c * (a /= d) * a + b }, easeOut: function (a, b, c, d) { return -c * (a /= d) * (a - 2) + b }, easeInOut: function (a, b, c, d) { return 1 > (a /= d / 2) ? c / 2 * a * a + b : -c / 2 * (--a * (a - 2) - 1) + b }, CLASS_NAME: "OpenLayers.Easing.Quad" }; OpenLayers.Projection = OpenLayers.Class({
  proj: null, projCode: null, titleRegEx: /\+title=[^\+]*/, initialize: function (a, b) { OpenLayers.Util.extend(this, b); this.projCode = a; "object" == typeof Proj4js && (this.proj = new Proj4js.Proj(a)) }, getCode: function () { return this.proj ? this.proj.srsCode : this.projCode }, getUnits: function () { return this.proj ? this.proj.units : null }, toString: function () { return this.getCode() }, equals: function (a) {
    var b = !1; a && (a instanceof OpenLayers.Projection || (a = new OpenLayers.Projection(a)), "object" ==
      typeof Proj4js && this.proj.defData && a.proj.defData ? b = this.proj.defData.replace(this.titleRegEx, "") == a.proj.defData.replace(this.titleRegEx, "") : a.getCode && (b = this.getCode(), a = a.getCode(), b = b == a || !!OpenLayers.Projection.transforms[b] && OpenLayers.Projection.transforms[b][a] === OpenLayers.Projection.nullTransform)); return b
  }, destroy: function () { delete this.proj; delete this.projCode }, CLASS_NAME: "OpenLayers.Projection"
}); OpenLayers.Projection.transforms = {};
OpenLayers.Projection.defaults = { "EPSG:4326": { units: "degrees", maxExtent: [-180, -90, 180, 90], yx: !0 }, "CRS:84": { units: "degrees", maxExtent: [-180, -90, 180, 90] }, "EPSG:900913": { units: "m", maxExtent: [-2.003750834E7, -2.003750834E7, 2.003750834E7, 2.003750834E7] } };
OpenLayers.Projection.addTransform = function (a, b, c) { if (c === OpenLayers.Projection.nullTransform) { var d = OpenLayers.Projection.defaults[a]; d && !OpenLayers.Projection.defaults[b] && (OpenLayers.Projection.defaults[b] = d) } OpenLayers.Projection.transforms[a] || (OpenLayers.Projection.transforms[a] = {}); OpenLayers.Projection.transforms[a][b] = c };
OpenLayers.Projection.transform = function (a, b, c) { if (b && c) if (b instanceof OpenLayers.Projection || (b = new OpenLayers.Projection(b)), c instanceof OpenLayers.Projection || (c = new OpenLayers.Projection(c)), b.proj && c.proj) a = Proj4js.transform(b.proj, c.proj, a); else { b = b.getCode(); c = c.getCode(); var d = OpenLayers.Projection.transforms; if (d[b] && d[b][c]) d[b][c](a) } return a }; OpenLayers.Projection.nullTransform = function (a) { return a };
(function () {
  function a(a) { a.x = 180 * a.x / d; a.y = 180 / Math.PI * (2 * Math.atan(Math.exp(a.y / d * Math.PI)) - Math.PI / 2); return a } function b(a) { a.x = a.x * d / 180; var b = Math.log(Math.tan((90 + a.y) * Math.PI / 360)) / Math.PI * d; a.y = Math.max(-2.003750834E7, Math.min(b, 2.003750834E7)); return a } function c(c, d) { var e = OpenLayers.Projection.addTransform, f = OpenLayers.Projection.nullTransform, g, p, q, r, s; g = 0; for (p = d.length; g < p; ++g)for (q = d[g], e(c, q, b), e(q, c, a), s = g + 1; s < p; ++s)r = d[s], e(q, r, f), e(r, q, f) } var d = 2.003750834E7, e = ["EPSG:900913", "EPSG:3857",
    "EPSG:102113", "EPSG:102100"], f = ["CRS:84", "urn:ogc:def:crs:EPSG:6.6:4326", "EPSG:4326"], g; for (g = e.length - 1; 0 <= g; --g)c(e[g], f); for (g = f.length - 1; 0 <= g; --g)c(f[g], e)
})(); OpenLayers.Map = OpenLayers.Class({
  Z_INDEX_BASE: { BaseLayer: 100, Overlay: 325, Feature: 725, Popup: 750, Control: 1E3 }, id: null, fractionalZoom: !1, events: null, allOverlays: !1, div: null, dragging: !1, size: null, viewPortDiv: null, layerContainerOrigin: null, layerContainerDiv: null, layers: null, controls: null, popups: null, baseLayer: null, center: null, resolution: null, zoom: 0, panRatio: 1.5, options: null, tileSize: null, projection: "EPSG:4326", units: null, resolutions: null, maxResolution: null, minResolution: null, maxScale: null, minScale: null,
  maxExtent: null, minExtent: null, restrictedExtent: null, numZoomLevels: 16, theme: null, displayProjection: null, fallThrough: !1, autoUpdateSize: !0, eventListeners: null, panTween: null, panMethod: OpenLayers.Easing.Expo.easeOut, panDuration: 50, zoomTween: null, zoomMethod: OpenLayers.Easing.Quad.easeOut, zoomDuration: 20, paddingForPopups: null, layerContainerOriginPx: null, minPx: null, maxPx: null, initialize: function (a, b) {
  1 === arguments.length && "object" === typeof a && (a = (b = a) && b.div); this.tileSize = new OpenLayers.Size(OpenLayers.Map.TILE_WIDTH,
    OpenLayers.Map.TILE_HEIGHT); this.paddingForPopups = new OpenLayers.Bounds(15, 15, 15, 15); this.theme = OpenLayers._getScriptLocation() + "theme/default/style.css"; this.options = OpenLayers.Util.extend({}, b); OpenLayers.Util.extend(this, b); OpenLayers.Util.applyDefaults(this, OpenLayers.Projection.defaults[this.projection instanceof OpenLayers.Projection ? this.projection.projCode : this.projection]); !this.maxExtent || this.maxExtent instanceof OpenLayers.Bounds || (this.maxExtent = new OpenLayers.Bounds(this.maxExtent));
    !this.minExtent || this.minExtent instanceof OpenLayers.Bounds || (this.minExtent = new OpenLayers.Bounds(this.minExtent)); !this.restrictedExtent || this.restrictedExtent instanceof OpenLayers.Bounds || (this.restrictedExtent = new OpenLayers.Bounds(this.restrictedExtent)); !this.center || this.center instanceof OpenLayers.LonLat || (this.center = new OpenLayers.LonLat(this.center)); this.layers = []; this.id = OpenLayers.Util.createUniqueID("OpenLayers.Map_"); this.div = OpenLayers.Util.getElement(a); this.div || (this.div = document.createElement("div"),
      this.div.style.height = "1px", this.div.style.width = "1px"); OpenLayers.Element.addClass(this.div, "olMap"); var c = this.id + "_OpenLayers_ViewPort"; this.viewPortDiv = OpenLayers.Util.createDiv(c, null, null, null, "relative", null, "hidden"); this.viewPortDiv.style.width = "100%"; this.viewPortDiv.style.height = "100%"; this.viewPortDiv.className = "olMapViewport"; this.div.appendChild(this.viewPortDiv); this.events = new OpenLayers.Events(this, this.viewPortDiv, null, this.fallThrough, { includeXY: !0 }); OpenLayers.TileManager && null !==
        this.tileManager && (this.tileManager instanceof OpenLayers.TileManager || (this.tileManager = new OpenLayers.TileManager(this.tileManager)), this.tileManager.addMap(this)); c = this.id + "_OpenLayers_Container"; this.layerContainerDiv = OpenLayers.Util.createDiv(c); this.layerContainerDiv.style.zIndex = this.Z_INDEX_BASE.Popup - 1; this.layerContainerOriginPx = { x: 0, y: 0 }; this.applyTransform(); this.viewPortDiv.appendChild(this.layerContainerDiv); this.updateSize(); if (this.eventListeners instanceof Object) this.events.on(this.eventListeners);
    !0 === this.autoUpdateSize && (this.updateSizeDestroy = OpenLayers.Function.bind(this.updateSize, this), OpenLayers.Event.observe(window, "resize", this.updateSizeDestroy)); if (this.theme) { for (var c = !0, d = document.getElementsByTagName("link"), e = 0, f = d.length; e < f; ++e)if (OpenLayers.Util.isEquivalentUrl(d.item(e).href, this.theme)) { c = !1; break } c && (c = document.createElement("link"), c.setAttribute("rel", "stylesheet"), c.setAttribute("type", "text/css"), c.setAttribute("href", this.theme), document.getElementsByTagName("head")[0].appendChild(c)) } null ==
      this.controls && (this.controls = [], null != OpenLayers.Control && (OpenLayers.Control.Navigation ? this.controls.push(new OpenLayers.Control.Navigation) : OpenLayers.Control.TouchNavigation && this.controls.push(new OpenLayers.Control.TouchNavigation), OpenLayers.Control.Zoom ? this.controls.push(new OpenLayers.Control.Zoom) : OpenLayers.Control.PanZoom && this.controls.push(new OpenLayers.Control.PanZoom), OpenLayers.Control.ArgParser && this.controls.push(new OpenLayers.Control.ArgParser), OpenLayers.Control.Attribution &&
        this.controls.push(new OpenLayers.Control.Attribution))); e = 0; for (f = this.controls.length; e < f; e++)this.addControlToMap(this.controls[e]); this.popups = []; this.unloadDestroy = OpenLayers.Function.bind(this.destroy, this); OpenLayers.Event.observe(window, "unload", this.unloadDestroy); b && b.layers && (delete this.center, delete this.zoom, this.addLayers(b.layers), b.center && !this.getCenter() && this.setCenter(b.center, b.zoom)); this.panMethod && (this.panTween = new OpenLayers.Tween(this.panMethod)); this.zoomMethod && this.applyTransform.transform &&
          (this.zoomTween = new OpenLayers.Tween(this.zoomMethod))
  }, getViewport: function () { return this.viewPortDiv }, render: function (a) { this.div = OpenLayers.Util.getElement(a); OpenLayers.Element.addClass(this.div, "olMap"); this.viewPortDiv.parentNode.removeChild(this.viewPortDiv); this.div.appendChild(this.viewPortDiv); this.updateSize() }, unloadDestroy: null, updateSizeDestroy: null, destroy: function () {
    if (!this.unloadDestroy) return !1; this.panTween && (this.panTween.stop(), this.panTween = null); this.zoomTween && (this.zoomTween.stop(),
      this.zoomTween = null); OpenLayers.Event.stopObserving(window, "unload", this.unloadDestroy); this.unloadDestroy = null; this.updateSizeDestroy && OpenLayers.Event.stopObserving(window, "resize", this.updateSizeDestroy); this.paddingForPopups = null; if (null != this.controls) { for (var a = this.controls.length - 1; 0 <= a; --a)this.controls[a].destroy(); this.controls = null } if (null != this.layers) { for (a = this.layers.length - 1; 0 <= a; --a)this.layers[a].destroy(!1); this.layers = null } this.viewPortDiv && this.viewPortDiv.parentNode && this.viewPortDiv.parentNode.removeChild(this.viewPortDiv);
    this.viewPortDiv = null; this.tileManager && (this.tileManager.removeMap(this), this.tileManager = null); this.eventListeners && (this.events.un(this.eventListeners), this.eventListeners = null); this.events.destroy(); this.options = this.events = null
  }, setOptions: function (a) { var b = this.minPx && a.restrictedExtent != this.restrictedExtent; OpenLayers.Util.extend(this, a); b && this.moveTo(this.getCachedCenter(), this.zoom, { forceZoomChange: !0 }) }, getTileSize: function () { return this.tileSize }, getBy: function (a, b, c) {
    var d = "function" ==
      typeof c.test; return OpenLayers.Array.filter(this[a], function (a) { return a[b] == c || d && c.test(a[b]) })
  }, getLayersBy: function (a, b) { return this.getBy("layers", a, b) }, getLayersByName: function (a) { return this.getLayersBy("name", a) }, getLayersByClass: function (a) { return this.getLayersBy("CLASS_NAME", a) }, getControlsBy: function (a, b) { return this.getBy("controls", a, b) }, getControlsByClass: function (a) { return this.getControlsBy("CLASS_NAME", a) }, getLayer: function (a) {
    for (var b = null, c = 0, d = this.layers.length; c < d; c++) {
      var e =
        this.layers[c]; if (e.id == a) { b = e; break }
    } return b
  }, setLayerZIndex: function (a, b) { a.setZIndex(this.Z_INDEX_BASE[a.isBaseLayer ? "BaseLayer" : "Overlay"] + 5 * b) }, resetLayersZIndex: function () { for (var a = 0, b = this.layers.length; a < b; a++)this.setLayerZIndex(this.layers[a], a) }, addLayer: function (a) {
    for (var b = 0, c = this.layers.length; b < c; b++)if (this.layers[b] == a) return !1; if (!1 === this.events.triggerEvent("preaddlayer", { layer: a })) return !1; this.allOverlays && (a.isBaseLayer = !1); a.div.className = "olLayerDiv"; a.div.style.overflow =
      ""; this.setLayerZIndex(a, this.layers.length); a.isFixed ? this.viewPortDiv.appendChild(a.div) : this.layerContainerDiv.appendChild(a.div); this.layers.push(a); a.setMap(this); a.isBaseLayer || this.allOverlays && !this.baseLayer ? null == this.baseLayer ? this.setBaseLayer(a) : a.setVisibility(!1) : a.redraw(); this.events.triggerEvent("addlayer", { layer: a }); a.events.triggerEvent("added", { map: this, layer: a }); a.afterAdd(); return !0
  }, addLayers: function (a) { for (var b = 0, c = a.length; b < c; b++)this.addLayer(a[b]) }, removeLayer: function (a,
    b) {
      if (!1 !== this.events.triggerEvent("preremovelayer", { layer: a })) {
      null == b && (b = !0); a.isFixed ? this.viewPortDiv.removeChild(a.div) : this.layerContainerDiv.removeChild(a.div); OpenLayers.Util.removeItem(this.layers, a); a.removeMap(this); a.map = null; if (this.baseLayer == a && (this.baseLayer = null, b)) for (var c = 0, d = this.layers.length; c < d; c++) { var e = this.layers[c]; if (e.isBaseLayer || this.allOverlays) { this.setBaseLayer(e); break } } this.resetLayersZIndex(); this.events.triggerEvent("removelayer", { layer: a }); a.events.triggerEvent("removed",
        { map: this, layer: a })
      }
  }, getNumLayers: function () { return this.layers.length }, getLayerIndex: function (a) { return OpenLayers.Util.indexOf(this.layers, a) }, setLayerIndex: function (a, b) {
    var c = this.getLayerIndex(a); 0 > b ? b = 0 : b > this.layers.length && (b = this.layers.length); if (c != b) {
      this.layers.splice(c, 1); this.layers.splice(b, 0, a); for (var c = 0, d = this.layers.length; c < d; c++)this.setLayerZIndex(this.layers[c], c); this.events.triggerEvent("changelayer", { layer: a, property: "order" }); this.allOverlays && (0 === b ? this.setBaseLayer(a) :
        this.baseLayer !== this.layers[0] && this.setBaseLayer(this.layers[0]))
    }
  }, raiseLayer: function (a, b) { var c = this.getLayerIndex(a) + b; this.setLayerIndex(a, c) }, setBaseLayer: function (a) {
    if (a != this.baseLayer && -1 != OpenLayers.Util.indexOf(this.layers, a)) {
      var b = this.getCachedCenter(), c = OpenLayers.Util.getResolutionFromScale(this.getScale(), a.units); null == this.baseLayer || this.allOverlays || this.baseLayer.setVisibility(!1); this.baseLayer = a; if (!this.allOverlays || this.baseLayer.visibility) this.baseLayer.setVisibility(!0),
        !1 === this.baseLayer.inRange && this.baseLayer.redraw(); null != b && (a = this.getZoomForResolution(c || this.resolution, !0), this.setCenter(b, a, !1, !0)); this.events.triggerEvent("changebaselayer", { layer: this.baseLayer })
    }
  }, addControl: function (a, b) { this.controls.push(a); this.addControlToMap(a, b) }, addControls: function (a, b) { for (var c = 1 === arguments.length ? [] : b, d = 0, e = a.length; d < e; d++)this.addControl(a[d], c[d] ? c[d] : null) }, addControlToMap: function (a, b) {
  a.outsideViewport = null != a.div; this.displayProjection && !a.displayProjection &&
    (a.displayProjection = this.displayProjection); a.setMap(this); var c = a.draw(b); c && !a.outsideViewport && (c.style.zIndex = this.Z_INDEX_BASE.Control + this.controls.length, this.viewPortDiv.appendChild(c)); a.autoActivate && a.activate()
  }, getControl: function (a) { for (var b = null, c = 0, d = this.controls.length; c < d; c++) { var e = this.controls[c]; if (e.id == a) { b = e; break } } return b }, removeControl: function (a) {
  a && a == this.getControl(a.id) && (a.div && a.div.parentNode == this.viewPortDiv && this.viewPortDiv.removeChild(a.div), OpenLayers.Util.removeItem(this.controls,
    a))
  }, addPopup: function (a, b) { if (b) for (var c = this.popups.length - 1; 0 <= c; --c)this.removePopup(this.popups[c]); a.map = this; this.popups.push(a); if (c = a.draw()) c.style.zIndex = this.Z_INDEX_BASE.Popup + this.popups.length, this.layerContainerDiv.appendChild(c) }, removePopup: function (a) { OpenLayers.Util.removeItem(this.popups, a); if (a.div) try { this.layerContainerDiv.removeChild(a.div) } catch (b) { } a.map = null }, getSize: function () { var a = null; null != this.size && (a = this.size.clone()); return a }, updateSize: function () {
    var a = this.getCurrentSize();
    if (a && !isNaN(a.h) && !isNaN(a.w)) { this.events.clearMouseCache(); var b = this.getSize(); null == b && (this.size = b = a); if (!a.equals(b)) { this.size = a; a = 0; for (b = this.layers.length; a < b; a++)this.layers[a].onMapResize(); a = this.getCachedCenter(); null != this.baseLayer && null != a && (b = this.getZoom(), this.zoom = null, this.setCenter(a, b)) } } this.events.triggerEvent("updatesize")
  }, getCurrentSize: function () {
    var a = new OpenLayers.Size(this.div.clientWidth, this.div.clientHeight); if (0 == a.w && 0 == a.h || isNaN(a.w) && isNaN(a.h)) a.w = this.div.offsetWidth,
      a.h = this.div.offsetHeight; if (0 == a.w && 0 == a.h || isNaN(a.w) && isNaN(a.h)) a.w = parseInt(this.div.style.width), a.h = parseInt(this.div.style.height); return a
  }, calculateBounds: function (a, b) { var c = null; null == a && (a = this.getCachedCenter()); null == b && (b = this.getResolution()); if (null != a && null != b) var c = this.size.w * b / 2, d = this.size.h * b / 2, c = new OpenLayers.Bounds(a.lon - c, a.lat - d, a.lon + c, a.lat + d); return c }, getCenter: function () { var a = null, b = this.getCachedCenter(); b && (a = b.clone()); return a }, getCachedCenter: function () {
  !this.center &&
    this.size && (this.center = this.getLonLatFromViewPortPx({ x: this.size.w / 2, y: this.size.h / 2 })); return this.center
  }, getZoom: function () { return this.zoom }, pan: function (a, b, c) { c = OpenLayers.Util.applyDefaults(c, { animate: !0, dragging: !1 }); if (c.dragging) 0 == a && 0 == b || this.moveByPx(a, b); else { var d = this.getViewPortPxFromLonLat(this.getCachedCenter()); a = d.add(a, b); if (this.dragging || !a.equals(d)) d = this.getLonLatFromViewPortPx(a), c.animate ? this.panTo(d) : (this.moveTo(d), this.dragging && (this.dragging = !1, this.events.triggerEvent("moveend"))) } },
  panTo: function (a) {
    if (this.panTween && this.getExtent().scale(this.panRatio).containsLonLat(a)) {
      var b = this.getCachedCenter(); if (!a.equals(b)) {
        var b = this.getPixelFromLonLat(b), c = this.getPixelFromLonLat(a), d = 0, e = 0; this.panTween.start({ x: 0, y: 0 }, { x: c.x - b.x, y: c.y - b.y }, this.panDuration, {
          callbacks: {
            eachStep: OpenLayers.Function.bind(function (a) { this.moveByPx(a.x - d, a.y - e); d = Math.round(a.x); e = Math.round(a.y) }, this), done: OpenLayers.Function.bind(function (b) { this.moveTo(a); this.dragging = !1; this.events.triggerEvent("moveend") },
              this)
          }
        })
      }
    } else this.setCenter(a)
  }, setCenter: function (a, b, c, d) { this.panTween && this.panTween.stop(); this.zoomTween && this.zoomTween.stop(); this.moveTo(a, b, { dragging: c, forceZoomChange: d }) }, moveByPx: function (a, b) {
    var c = this.size.w / 2, d = this.size.h / 2, e = c + a, f = d + b, g = this.baseLayer.wrapDateLine, h = 0, k = 0; this.restrictedExtent && (h = c, k = d, g = !1); a = g || e <= this.maxPx.x - h && e >= this.minPx.x + h ? Math.round(a) : 0; b = f <= this.maxPx.y - k && f >= this.minPx.y + k ? Math.round(b) : 0; if (a || b) {
    this.dragging || (this.dragging = !0, this.events.triggerEvent("movestart"));
      this.center = null; a && (this.layerContainerOriginPx.x -= a, this.minPx.x -= a, this.maxPx.x -= a); b && (this.layerContainerOriginPx.y -= b, this.minPx.y -= b, this.maxPx.y -= b); this.applyTransform(); d = 0; for (e = this.layers.length; d < e; ++d)c = this.layers[d], c.visibility && (c === this.baseLayer || c.inRange) && (c.moveByPx(a, b), c.events.triggerEvent("move")); this.events.triggerEvent("move")
    }
  }, adjustZoom: function (a) {
    if (this.baseLayer && this.baseLayer.wrapDateLine) {
      var b = this.baseLayer.resolutions, c = this.getMaxExtent().getWidth() / this.size.w;
      if (this.getResolutionForZoom(a) > c) if (this.fractionalZoom) a = this.getZoomForResolution(c); else for (var d = a | 0, e = b.length; d < e; ++d)if (b[d] <= c) { a = d; break }
    } return a
  }, getMinZoom: function () { return this.adjustZoom(0) }, moveTo: function (a, b, c) {
  null == a || a instanceof OpenLayers.LonLat || (a = new OpenLayers.LonLat(a)); c || (c = {}); null != b && (b = parseFloat(b), this.fractionalZoom || (b = Math.round(b))); var d = b; b = this.adjustZoom(b); b !== d && (a = this.getCenter()); var d = c.dragging || this.dragging, e = c.forceZoomChange; this.getCachedCenter() ||
    this.isValidLonLat(a) || (a = this.maxExtent.getCenterLonLat(), this.center = a.clone()); if (null != this.restrictedExtent) {
    null == a && (a = this.center); null == b && (b = this.getZoom()); var f = this.getResolutionForZoom(b), f = this.calculateBounds(a, f); if (!this.restrictedExtent.containsBounds(f)) {
      var g = this.restrictedExtent.getCenterLonLat(); f.getWidth() > this.restrictedExtent.getWidth() ? a = new OpenLayers.LonLat(g.lon, a.lat) : f.left < this.restrictedExtent.left ? a = a.add(this.restrictedExtent.left - f.left, 0) : f.right > this.restrictedExtent.right &&
        (a = a.add(this.restrictedExtent.right - f.right, 0)); f.getHeight() > this.restrictedExtent.getHeight() ? a = new OpenLayers.LonLat(a.lon, g.lat) : f.bottom < this.restrictedExtent.bottom ? a = a.add(0, this.restrictedExtent.bottom - f.bottom) : f.top > this.restrictedExtent.top && (a = a.add(0, this.restrictedExtent.top - f.top))
    }
    } e = e || this.isValidZoomLevel(b) && b != this.getZoom(); f = this.isValidLonLat(a) && !a.equals(this.center); if (e || f || d) {
      d || this.events.triggerEvent("movestart", { zoomChanged: e }); f && (!e && this.center && this.centerLayerContainer(a),
        this.center = a.clone()); a = e ? this.getResolutionForZoom(b) : this.getResolution(); if (e || null == this.layerContainerOrigin) {
        this.layerContainerOrigin = this.getCachedCenter(); this.layerContainerOriginPx.x = 0; this.layerContainerOriginPx.y = 0; this.applyTransform(); var f = this.getMaxExtent({ restricted: !0 }), h = f.getCenterLonLat(), g = this.center.lon - h.lon, h = h.lat - this.center.lat, k = Math.round(f.getWidth() / a), l = Math.round(f.getHeight() / a); this.minPx = { x: (this.size.w - k) / 2 - g / a, y: (this.size.h - l) / 2 - h / a }; this.maxPx = {
          x: this.minPx.x +
            Math.round(f.getWidth() / a), y: this.minPx.y + Math.round(f.getHeight() / a)
        }
        } e && (this.zoom = b, this.resolution = a); a = this.getExtent(); this.baseLayer.visibility && (this.baseLayer.moveTo(a, e, c.dragging), c.dragging || this.baseLayer.events.triggerEvent("moveend", { zoomChanged: e })); a = this.baseLayer.getExtent(); for (b = this.layers.length - 1; 0 <= b; --b)f = this.layers[b], f === this.baseLayer || f.isBaseLayer || (g = f.calculateInRange(), f.inRange != g && ((f.inRange = g) || f.display(!1), this.events.triggerEvent("changelayer", { layer: f, property: "visibility" })),
          g && f.visibility && (f.moveTo(a, e, c.dragging), c.dragging || f.events.triggerEvent("moveend", { zoomChanged: e }))); this.events.triggerEvent("move"); d || this.events.triggerEvent("moveend"); if (e) { b = 0; for (c = this.popups.length; b < c; b++)this.popups[b].updatePosition(); this.events.triggerEvent("zoomend") }
    }
  }, centerLayerContainer: function (a) {
    var b = this.getViewPortPxFromLonLat(this.layerContainerOrigin), c = this.getViewPortPxFromLonLat(a); if (null != b && null != c) {
      var d = this.layerContainerOriginPx.x; a = this.layerContainerOriginPx.y;
      var e = Math.round(b.x - c.x), b = Math.round(b.y - c.y); this.applyTransform(this.layerContainerOriginPx.x = e, this.layerContainerOriginPx.y = b); d -= e; a -= b; this.minPx.x -= d; this.maxPx.x -= d; this.minPx.y -= a; this.maxPx.y -= a
    }
  }, isValidZoomLevel: function (a) { return null != a && 0 <= a && a < this.getNumZoomLevels() }, isValidLonLat: function (a) { var b = !1; null != a && (b = this.getMaxExtent(), b = b.containsLonLat(a, { worldBounds: this.baseLayer.wrapDateLine && b })); return b }, getProjection: function () {
    var a = this.getProjectionObject(); return a ? a.getCode() :
      null
  }, getProjectionObject: function () { var a = null; null != this.baseLayer && (a = this.baseLayer.projection); return a }, getMaxResolution: function () { var a = null; null != this.baseLayer && (a = this.baseLayer.maxResolution); return a }, getMaxExtent: function (a) { var b = null; a && a.restricted && this.restrictedExtent ? b = this.restrictedExtent : null != this.baseLayer && (b = this.baseLayer.maxExtent); return b }, getNumZoomLevels: function () { var a = null; null != this.baseLayer && (a = this.baseLayer.numZoomLevels); return a }, getExtent: function () {
    var a =
      null; null != this.baseLayer && (a = this.baseLayer.getExtent()); return a
  }, getResolution: function () { var a = null; null != this.baseLayer ? a = this.baseLayer.getResolution() : !0 === this.allOverlays && 0 < this.layers.length && (a = this.layers[0].getResolution()); return a }, getUnits: function () { var a = null; null != this.baseLayer && (a = this.baseLayer.units); return a }, getScale: function () { var a = null; null != this.baseLayer && (a = this.getResolution(), a = OpenLayers.Util.getScaleFromResolution(a, this.baseLayer.units)); return a }, getZoomForExtent: function (a,
    b) { var c = null; null != this.baseLayer && (c = this.baseLayer.getZoomForExtent(a, b)); return c }, getResolutionForZoom: function (a) { var b = null; this.baseLayer && (b = this.baseLayer.getResolutionForZoom(a)); return b }, getZoomForResolution: function (a, b) { var c = null; null != this.baseLayer && (c = this.baseLayer.getZoomForResolution(a, b)); return c }, zoomTo: function (a, b) {
      var c = this; if (c.isValidZoomLevel(a)) if (c.baseLayer.wrapDateLine && (a = c.adjustZoom(a)), c.zoomTween) {
        var d = c.getResolution(), e = c.getResolutionForZoom(a), f = { scale: 1 },
        d = { scale: d / e }; c.zoomTween.playing && c.zoomTween.duration < 3 * c.zoomDuration ? c.zoomTween.finish = { scale: c.zoomTween.finish.scale * d.scale } : (b || (e = c.getSize(), b = { x: e.w / 2, y: e.h / 2 }), c.zoomTween.start(f, d, c.zoomDuration, {
          minFrameRate: 50, callbacks: {
            eachStep: function (a) { var d = c.layerContainerOriginPx; a = a.scale; c.applyTransform(d.x + ((a - 1) * (d.x - b.x) | 0), d.y + ((a - 1) * (d.y - b.y) | 0), a) }, done: function (a) {
              c.applyTransform(); a = c.getResolution() / a.scale; var d = c.getZoomForResolution(a, !0); c.moveTo(c.getZoomTargetCenter(b,
                a), d, !0)
            }
          }
        }))
      } else f = b ? c.getZoomTargetCenter(b, c.getResolutionForZoom(a)) : null, c.setCenter(f, a)
    }, zoomIn: function () { this.zoomTo(this.getZoom() + 1) }, zoomOut: function () { this.zoomTo(this.getZoom() - 1) }, zoomToExtent: function (a, b) { a instanceof OpenLayers.Bounds || (a = new OpenLayers.Bounds(a)); var c = a.getCenterLonLat(); if (this.baseLayer.wrapDateLine) { c = this.getMaxExtent(); for (a = a.clone(); a.right < a.left;)a.right += c.getWidth(); c = a.getCenterLonLat().wrapDateLine(c) } this.setCenter(c, this.getZoomForExtent(a, b)) },
  zoomToMaxExtent: function (a) { a = this.getMaxExtent({ restricted: a ? a.restricted : !0 }); this.zoomToExtent(a) }, zoomToScale: function (a, b) { var c = OpenLayers.Util.getResolutionFromScale(a, this.baseLayer.units), d = this.size.w * c / 2, c = this.size.h * c / 2, e = this.getCachedCenter(), d = new OpenLayers.Bounds(e.lon - d, e.lat - c, e.lon + d, e.lat + c); this.zoomToExtent(d, b) }, getLonLatFromViewPortPx: function (a) { var b = null; null != this.baseLayer && (b = this.baseLayer.getLonLatFromViewPortPx(a)); return b }, getViewPortPxFromLonLat: function (a) {
    var b =
      null; null != this.baseLayer && (b = this.baseLayer.getViewPortPxFromLonLat(a)); return b
  }, getZoomTargetCenter: function (a, b) { var c = null, d = this.getSize(), e = d.w / 2 - a.x, d = a.y - d.h / 2, f = this.getLonLatFromPixel(a); f && (c = new OpenLayers.LonLat(f.lon + e * b, f.lat + d * b)); return c }, getLonLatFromPixel: function (a) { return this.getLonLatFromViewPortPx(a) }, getPixelFromLonLat: function (a) { a = this.getViewPortPxFromLonLat(a); a.x = Math.round(a.x); a.y = Math.round(a.y); return a }, getGeodesicPixelSize: function (a) {
    var b = a ? this.getLonLatFromPixel(a) :
      this.getCachedCenter() || new OpenLayers.LonLat(0, 0), c = this.getResolution(); a = b.add(-c / 2, 0); var d = b.add(c / 2, 0), e = b.add(0, -c / 2), b = b.add(0, c / 2), c = new OpenLayers.Projection("EPSG:4326"), f = this.getProjectionObject() || c; f.equals(c) || (a.transform(f, c), d.transform(f, c), e.transform(f, c), b.transform(f, c)); return new OpenLayers.Size(OpenLayers.Util.distVincenty(a, d), OpenLayers.Util.distVincenty(e, b))
  }, getViewPortPxFromLayerPx: function (a) {
    var b = null; null != a && (b = a.add(this.layerContainerOriginPx.x, this.layerContainerOriginPx.y));
    return b
  }, getLayerPxFromViewPortPx: function (a) { var b = null; null != a && (b = a.add(-this.layerContainerOriginPx.x, -this.layerContainerOriginPx.y), isNaN(b.x) || isNaN(b.y)) && (b = null); return b }, getLonLatFromLayerPx: function (a) { a = this.getViewPortPxFromLayerPx(a); return this.getLonLatFromViewPortPx(a) }, getLayerPxFromLonLat: function (a) { a = this.getPixelFromLonLat(a); return this.getLayerPxFromViewPortPx(a) }, applyTransform: function (a, b, c) {
    c = c || 1; var d = this.layerContainerOriginPx, e = 1 !== c; a = a || d.x; b = b || d.y; var f = this.layerContainerDiv.style,
      g = this.applyTransform.transform, h = this.applyTransform.template; if (void 0 === g && (g = OpenLayers.Util.vendorPrefix.style("transform"), this.applyTransform.transform = g)) { var k = OpenLayers.Element.getStyle(this.viewPortDiv, OpenLayers.Util.vendorPrefix.css("transform")); k && "none" === k || (h = ["translate3d(", ",0) ", "scale3d(", ",1)"], f[g] = [h[0], "0,0", h[1]].join("")); h && ~f[g].indexOf(h[0]) || (h = ["translate(", ") ", "scale(", ")"]); this.applyTransform.template = h } null === g || "translate3d(" !== h[0] && !0 !== e ? (f.left = a + "px", f.top =
        b + "px", null !== g && (f[g] = "")) : (!0 === e && "translate(" === h[0] && (a -= d.x, b -= d.y, f.left = d.x + "px", f.top = d.y + "px"), f[g] = [h[0], a, "px,", b, "px", h[1], h[2], c, ",", c, h[3]].join(""))
  }, CLASS_NAME: "OpenLayers.Map"
}); OpenLayers.Map.TILE_WIDTH = 256; OpenLayers.Map.TILE_HEIGHT = 256; OpenLayers.Handler = OpenLayers.Class({
  id: null, control: null, map: null, keyMask: null, active: !1, evt: null, touch: !1, initialize: function (a, b, c) { OpenLayers.Util.extend(this, c); this.control = a; this.callbacks = b; (a = this.map || a.map) && this.setMap(a); this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_") }, setMap: function (a) { this.map = a }, checkModifiers: function (a) {
    return null == this.keyMask ? !0 : ((a.shiftKey ? OpenLayers.Handler.MOD_SHIFT : 0) | (a.ctrlKey ? OpenLayers.Handler.MOD_CTRL : 0) | (a.altKey ? OpenLayers.Handler.MOD_ALT :
      0) | (a.metaKey ? OpenLayers.Handler.MOD_META : 0)) == this.keyMask
  }, activate: function () { if (this.active) return !1; for (var a = OpenLayers.Events.prototype.BROWSER_EVENTS, b = 0, c = a.length; b < c; b++)this[a[b]] && this.register(a[b], this[a[b]]); return this.active = !0 }, deactivate: function () { if (!this.active) return !1; for (var a = OpenLayers.Events.prototype.BROWSER_EVENTS, b = 0, c = a.length; b < c; b++)this[a[b]] && this.unregister(a[b], this[a[b]]); this.active = this.touch = !1; return !0 }, startTouch: function () {
    if (!this.touch) {
    this.touch = !0;
      for (var a = "mousedown mouseup mousemove click dblclick mouseout".split(" "), b = 0, c = a.length; b < c; b++)this[a[b]] && this.unregister(a[b], this[a[b]])
    }
  }, callback: function (a, b) { a && this.callbacks[a] && this.callbacks[a].apply(this.control, b) }, register: function (a, b) { this.map.events.registerPriority(a, this, b); this.map.events.registerPriority(a, this, this.setEvent) }, unregister: function (a, b) { this.map.events.unregister(a, this, b); this.map.events.unregister(a, this, this.setEvent) }, setEvent: function (a) { this.evt = a; return !0 },
  destroy: function () { this.deactivate(); this.control = this.map = null }, CLASS_NAME: "OpenLayers.Handler"
}); OpenLayers.Handler.MOD_NONE = 0; OpenLayers.Handler.MOD_SHIFT = 1; OpenLayers.Handler.MOD_CTRL = 2; OpenLayers.Handler.MOD_ALT = 4; OpenLayers.Handler.MOD_META = 8; OpenLayers.Handler.Click = OpenLayers.Class(OpenLayers.Handler, {
  delay: 300, single: !0, "double": !1, pixelTolerance: 0, dblclickTolerance: 13, stopSingle: !1, stopDouble: !1, timerId: null, down: null, last: null, first: null, rightclickTimerId: null, touchstart: function (a) { this.startTouch(); this.down = this.getEventInfo(a); this.last = this.getEventInfo(a); return !0 }, touchmove: function (a) { this.last = this.getEventInfo(a); return !0 }, touchend: function (a) {
  this.down && (a.xy = this.last.xy, a.lastTouches = this.last.touches, this.handleSingle(a),
    this.down = null); return !0
  }, mousedown: function (a) { this.down = this.getEventInfo(a); this.last = this.getEventInfo(a); return !0 }, mouseup: function (a) { var b = !0; this.checkModifiers(a) && (this.control.handleRightClicks && OpenLayers.Event.isRightClick(a)) && (b = this.rightclick(a)); return b }, rightclick: function (a) {
    if (this.passesTolerance(a)) {
      if (null != this.rightclickTimerId) return this.clearTimer(), this.callback("dblrightclick", [a]), !this.stopDouble; a = this["double"] ? OpenLayers.Util.extend({}, a) : this.callback("rightclick",
        [a]); a = OpenLayers.Function.bind(this.delayedRightCall, this, a); this.rightclickTimerId = window.setTimeout(a, this.delay)
    } return !this.stopSingle
  }, delayedRightCall: function (a) { this.rightclickTimerId = null; a && this.callback("rightclick", [a]) }, click: function (a) { this.last || (this.last = this.getEventInfo(a)); this.handleSingle(a); return !this.stopSingle }, dblclick: function (a) { this.handleDouble(a); return !this.stopDouble }, handleDouble: function (a) {
    this.passesDblclickTolerance(a) && (this["double"] && this.callback("dblclick",
      [a]), this.clearTimer())
  }, handleSingle: function (a) { this.passesTolerance(a) && (null != this.timerId ? (this.last.touches && 1 === this.last.touches.length && (this["double"] && OpenLayers.Event.preventDefault(a), this.handleDouble(a)), this.last.touches && 2 === this.last.touches.length || this.clearTimer()) : (this.first = this.getEventInfo(a), a = this.single ? OpenLayers.Util.extend({}, a) : null, this.queuePotentialClick(a))) }, queuePotentialClick: function (a) {
  this.timerId = window.setTimeout(OpenLayers.Function.bind(this.delayedCall,
    this, a), this.delay)
  }, passesTolerance: function (a) { var b = !0; if (null != this.pixelTolerance && this.down && this.down.xy && (b = this.pixelTolerance >= this.down.xy.distanceTo(a.xy)) && this.touch && this.down.touches.length === this.last.touches.length) { a = 0; for (var c = this.down.touches.length; a < c; ++a)if (this.getTouchDistance(this.down.touches[a], this.last.touches[a]) > this.pixelTolerance) { b = !1; break } } return b }, getTouchDistance: function (a, b) {
    return Math.sqrt(Math.pow(a.clientX - b.clientX, 2) + Math.pow(a.clientY - b.clientY,
      2))
  }, passesDblclickTolerance: function (a) { a = !0; this.down && this.first && (a = this.down.xy.distanceTo(this.first.xy) <= this.dblclickTolerance); return a }, clearTimer: function () { null != this.timerId && (window.clearTimeout(this.timerId), this.timerId = null); null != this.rightclickTimerId && (window.clearTimeout(this.rightclickTimerId), this.rightclickTimerId = null) }, delayedCall: function (a) { this.timerId = null; a && this.callback("click", [a]) }, getEventInfo: function (a) {
    var b; if (a.touches) {
      var c = a.touches.length; b = Array(c); for (var d,
        e = 0; e < c; e++)d = a.touches[e], b[e] = { clientX: d.olClientX, clientY: d.olClientY }
    } return { xy: a.xy, touches: b }
  }, deactivate: function () { var a = !1; OpenLayers.Handler.prototype.deactivate.apply(this, arguments) && (this.clearTimer(), this.last = this.first = this.down = null, a = !0); return a }, CLASS_NAME: "OpenLayers.Handler.Click"
}); OpenLayers.Handler.Drag = OpenLayers.Class(OpenLayers.Handler, {
  started: !1, stopDown: !0, dragging: !1, last: null, start: null, lastMoveEvt: null, oldOnselectstart: null, interval: 0, timeoutId: null, documentDrag: !1, documentEvents: null, initialize: function (a, b, c) { OpenLayers.Handler.prototype.initialize.apply(this, arguments); if (!0 === this.documentDrag) { var d = this; this._docMove = function (a) { d.mousemove({ xy: { x: a.clientX, y: a.clientY }, element: document }) }; this._docUp = function (a) { d.mouseup({ xy: { x: a.clientX, y: a.clientY } }) } } },
  dragstart: function (a) {
    var b = !0; this.dragging = !1; this.checkModifiers(a) && (OpenLayers.Event.isLeftClick(a) || OpenLayers.Event.isSingleTouch(a)) ? (this.started = !0, this.last = this.start = a.xy, OpenLayers.Element.addClass(this.map.viewPortDiv, "olDragDown"), this.down(a), this.callback("down", [a.xy]), OpenLayers.Event.preventDefault(a), this.oldOnselectstart || (this.oldOnselectstart = document.onselectstart ? document.onselectstart : OpenLayers.Function.True), document.onselectstart = OpenLayers.Function.False, b = !this.stopDown) :
      (this.started = !1, this.last = this.start = null); return b
  }, dragmove: function (a) {
  this.lastMoveEvt = a; !this.started || (this.timeoutId || a.xy.x == this.last.x && a.xy.y == this.last.y) || (!0 === this.documentDrag && this.documentEvents && (a.element === document ? (this.adjustXY(a), this.setEvent(a)) : this.removeDocumentEvents()), 0 < this.interval && (this.timeoutId = setTimeout(OpenLayers.Function.bind(this.removeTimeout, this), this.interval)), this.dragging = !0, this.move(a), this.callback("move", [a.xy]), this.oldOnselectstart || (this.oldOnselectstart =
    document.onselectstart, document.onselectstart = OpenLayers.Function.False), this.last = a.xy); return !0
  }, dragend: function (a) { if (this.started) { !0 === this.documentDrag && this.documentEvents && (this.adjustXY(a), this.removeDocumentEvents()); var b = this.start != this.last; this.dragging = this.started = !1; OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDragDown"); this.up(a); this.callback("up", [a.xy]); b && this.callback("done", [a.xy]); document.onselectstart = this.oldOnselectstart } return !0 }, down: function (a) { }, move: function (a) { },
  up: function (a) { }, out: function (a) { }, mousedown: function (a) { return this.dragstart(a) }, touchstart: function (a) { this.startTouch(); return this.dragstart(a) }, mousemove: function (a) { return this.dragmove(a) }, touchmove: function (a) { return this.dragmove(a) }, removeTimeout: function () { this.timeoutId = null; this.dragging && this.mousemove(this.lastMoveEvt) }, mouseup: function (a) { return this.dragend(a) }, touchend: function (a) { a.xy = this.last; return this.dragend(a) }, mouseout: function (a) {
    if (this.started && OpenLayers.Util.mouseLeft(a,
      this.map.viewPortDiv)) if (!0 === this.documentDrag) this.addDocumentEvents(); else { var b = this.start != this.last; this.dragging = this.started = !1; OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDragDown"); this.out(a); this.callback("out", []); b && this.callback("done", [a.xy]); document.onselectstart && (document.onselectstart = this.oldOnselectstart) } return !0
  }, click: function (a) { return this.start == this.last }, activate: function () {
    var a = !1; OpenLayers.Handler.prototype.activate.apply(this, arguments) && (this.dragging =
      !1, a = !0); return a
  }, deactivate: function () { var a = !1; OpenLayers.Handler.prototype.deactivate.apply(this, arguments) && (this.dragging = this.started = !1, this.last = this.start = null, a = !0, OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDragDown")); return a }, adjustXY: function (a) { var b = OpenLayers.Util.pagePosition(this.map.viewPortDiv); a.xy.x -= b[0]; a.xy.y -= b[1] }, addDocumentEvents: function () {
    OpenLayers.Element.addClass(document.body, "olDragDown"); this.documentEvents = !0; OpenLayers.Event.observe(document, "mousemove",
      this._docMove); OpenLayers.Event.observe(document, "mouseup", this._docUp)
  }, removeDocumentEvents: function () { OpenLayers.Element.removeClass(document.body, "olDragDown"); this.documentEvents = !1; OpenLayers.Event.stopObserving(document, "mousemove", this._docMove); OpenLayers.Event.stopObserving(document, "mouseup", this._docUp) }, CLASS_NAME: "OpenLayers.Handler.Drag"
}); OpenLayers.Control.OverviewMap = OpenLayers.Class(OpenLayers.Control, {
  element: null, ovmap: null, size: { w: 180, h: 90 }, layers: null, minRectSize: 15, minRectDisplayClass: "RectReplacement", minRatio: 8, maxRatio: 32, mapOptions: null, autoPan: !1, handlers: null, resolutionFactor: 1, maximized: !1, maximizeTitle: "", minimizeTitle: "", initialize: function (a) { this.layers = []; this.handlers = {}; OpenLayers.Control.prototype.initialize.apply(this, [a]) }, destroy: function () {
  this.mapDiv && (this.handlers.click && this.handlers.click.destroy(),
    this.handlers.drag && this.handlers.drag.destroy(), this.ovmap && this.ovmap.viewPortDiv.removeChild(this.extentRectangle), this.extentRectangle = null, this.rectEvents && (this.rectEvents.destroy(), this.rectEvents = null), this.ovmap && (this.ovmap.destroy(), this.ovmap = null), this.element.removeChild(this.mapDiv), this.mapDiv = null, this.div.removeChild(this.element), this.element = null, this.maximizeDiv && (this.div.removeChild(this.maximizeDiv), this.maximizeDiv = null), this.minimizeDiv && (this.div.removeChild(this.minimizeDiv),
      this.minimizeDiv = null), this.map.events.un({ buttonclick: this.onButtonClick, moveend: this.update, changebaselayer: this.baseLayerDraw, scope: this }), OpenLayers.Control.prototype.destroy.apply(this, arguments))
  }, draw: function () {
    OpenLayers.Control.prototype.draw.apply(this, arguments); if (0 === this.layers.length) if (this.map.baseLayer) this.layers = [this.map.baseLayer.clone()]; else return this.map.events.register("changebaselayer", this, this.baseLayerDraw), this.div; this.element = document.createElement("div"); this.element.className =
      this.displayClass + "Element"; this.element.style.display = "none"; this.mapDiv = document.createElement("div"); this.mapDiv.style.width = this.size.w + "px"; this.mapDiv.style.height = this.size.h + "px"; this.mapDiv.style.position = "relative"; this.mapDiv.style.overflow = "hidden"; this.mapDiv.id = OpenLayers.Util.createUniqueID("overviewMap"); this.extentRectangle = document.createElement("div"); this.extentRectangle.style.position = "absolute"; this.extentRectangle.style.zIndex = 1E3; this.extentRectangle.className = this.displayClass +
        "ExtentRectangle"; this.element.appendChild(this.mapDiv); this.div.appendChild(this.element); if (this.outsideViewport) this.element.style.display = ""; else {
          this.div.className += " " + this.displayClass + "Container"; var a = OpenLayers.Util.getImageLocation("layer-switcher-maximize.png"); this.maximizeDiv = OpenLayers.Util.createAlphaImageDiv(this.displayClass + "MaximizeButton", null, null, a, "absolute"); this.maximizeDiv.style.display = "none"; this.maximizeDiv.className = this.displayClass + "MaximizeButton olButton"; this.maximizeTitle &&
            (this.maximizeDiv.title = this.maximizeTitle); this.div.appendChild(this.maximizeDiv); a = OpenLayers.Util.getImageLocation("layer-switcher-minimize.png"); this.minimizeDiv = OpenLayers.Util.createAlphaImageDiv("OpenLayers_Control_minimizeDiv", null, null, a, "absolute"); this.minimizeDiv.style.display = "none"; this.minimizeDiv.className = this.displayClass + "MinimizeButton olButton"; this.minimizeTitle && (this.minimizeDiv.title = this.minimizeTitle); this.div.appendChild(this.minimizeDiv); this.minimizeControl()
        } this.map.getExtent() &&
          this.update(); this.map.events.on({ buttonclick: this.onButtonClick, moveend: this.update, scope: this }); this.maximized && this.maximizeControl(); return this.div
  }, baseLayerDraw: function () { this.draw(); this.map.events.unregister("changebaselayer", this, this.baseLayerDraw) }, rectDrag: function (a) {
    var b = this.handlers.drag.last.x - a.x, c = this.handlers.drag.last.y - a.y; if (0 != b || 0 != c) {
      var d = this.rectPxBounds.top, e = this.rectPxBounds.left; a = Math.abs(this.rectPxBounds.getHeight()); var f = this.rectPxBounds.getWidth(), c = Math.max(0,
        d - c), c = Math.min(c, this.ovmap.size.h - this.hComp - a), b = Math.max(0, e - b), b = Math.min(b, this.ovmap.size.w - this.wComp - f); this.setRectPxBounds(new OpenLayers.Bounds(b, c + a, b + f, c))
    }
  }, mapDivClick: function (a) {
    var b = this.rectPxBounds.getCenterPixel(), c = a.xy.x - b.x, d = a.xy.y - b.y, e = this.rectPxBounds.top, f = this.rectPxBounds.left; a = Math.abs(this.rectPxBounds.getHeight()); b = this.rectPxBounds.getWidth(); d = Math.max(0, e + d); d = Math.min(d, this.ovmap.size.h - a); c = Math.max(0, f + c); c = Math.min(c, this.ovmap.size.w - b); this.setRectPxBounds(new OpenLayers.Bounds(c,
      d + a, c + b, d)); this.updateMapToRect()
  }, onButtonClick: function (a) { a.buttonElement === this.minimizeDiv ? this.minimizeControl() : a.buttonElement === this.maximizeDiv && this.maximizeControl() }, maximizeControl: function (a) { this.element.style.display = ""; this.showToggle(!1); null != a && OpenLayers.Event.stop(a) }, minimizeControl: function (a) { this.element.style.display = "none"; this.showToggle(!0); null != a && OpenLayers.Event.stop(a) }, showToggle: function (a) {
  this.maximizeDiv && (this.maximizeDiv.style.display = a ? "" : "none"); this.minimizeDiv &&
    (this.minimizeDiv.style.display = a ? "none" : "")
  }, update: function () { null == this.ovmap && this.createMap(); !this.autoPan && this.isSuitableOverview() || this.updateOverview(); this.updateRectToMap() }, isSuitableOverview: function () {
    var a = this.map.getExtent(), b = this.map.getMaxExtent(), a = new OpenLayers.Bounds(Math.max(a.left, b.left), Math.max(a.bottom, b.bottom), Math.min(a.right, b.right), Math.min(a.top, b.top)); this.ovmap.getProjection() != this.map.getProjection() && (a = a.transform(this.map.getProjectionObject(), this.ovmap.getProjectionObject()));
    b = this.ovmap.getResolution() / this.map.getResolution(); return b > this.minRatio && b <= this.maxRatio && this.ovmap.getExtent().containsBounds(a)
  }, updateOverview: function () {
    var a = this.map.getResolution(), b = this.ovmap.getResolution(), c = b / a; c > this.maxRatio ? b = this.minRatio * a : c <= this.minRatio && (b = this.maxRatio * a); this.ovmap.getProjection() != this.map.getProjection() ? (a = this.map.center.clone(), a.transform(this.map.getProjectionObject(), this.ovmap.getProjectionObject())) : a = this.map.center; this.ovmap.setCenter(a,
      this.ovmap.getZoomForResolution(b * this.resolutionFactor)); this.updateRectToMap()
  }, createMap: function () {
    var a = OpenLayers.Util.extend({ controls: [], maxResolution: "auto", fallThrough: !1 }, this.mapOptions); this.ovmap = new OpenLayers.Map(this.mapDiv, a); this.ovmap.viewPortDiv.appendChild(this.extentRectangle); OpenLayers.Event.stopObserving(window, "unload", this.ovmap.unloadDestroy); this.ovmap.addLayers(this.layers); this.ovmap.zoomToMaxExtent(); this.wComp = (this.wComp = parseInt(OpenLayers.Element.getStyle(this.extentRectangle,
      "border-left-width")) + parseInt(OpenLayers.Element.getStyle(this.extentRectangle, "border-right-width"))) ? this.wComp : 2; this.hComp = (this.hComp = parseInt(OpenLayers.Element.getStyle(this.extentRectangle, "border-top-width")) + parseInt(OpenLayers.Element.getStyle(this.extentRectangle, "border-bottom-width"))) ? this.hComp : 2; this.handlers.drag = new OpenLayers.Handler.Drag(this, { move: this.rectDrag, done: this.updateMapToRect }, { map: this.ovmap }); this.handlers.click = new OpenLayers.Handler.Click(this, { click: this.mapDivClick },
        { single: !0, "double": !1, stopSingle: !0, stopDouble: !0, pixelTolerance: 1, map: this.ovmap }); this.handlers.click.activate(); this.rectEvents = new OpenLayers.Events(this, this.extentRectangle, null, !0); this.rectEvents.register("mouseover", this, function (a) { this.handlers.drag.active || this.map.dragging || this.handlers.drag.activate() }); this.rectEvents.register("mouseout", this, function (a) { this.handlers.drag.dragging || this.handlers.drag.deactivate() }); if (this.ovmap.getProjection() != this.map.getProjection()) {
          var a = this.map.getProjectionObject().getUnits() ||
            this.map.units || this.map.baseLayer.units, b = this.ovmap.getProjectionObject().getUnits() || this.ovmap.units || this.ovmap.baseLayer.units; this.resolutionFactor = a && b ? OpenLayers.INCHES_PER_UNIT[a] / OpenLayers.INCHES_PER_UNIT[b] : 1
        }
  }, updateRectToMap: function () { var a; a = this.ovmap.getProjection() != this.map.getProjection() ? this.map.getExtent().transform(this.map.getProjectionObject(), this.ovmap.getProjectionObject()) : this.map.getExtent(); (a = this.getRectBoundsFromMapBounds(a)) && this.setRectPxBounds(a) }, updateMapToRect: function () {
    var a =
      this.getMapBoundsFromRectBounds(this.rectPxBounds); this.ovmap.getProjection() != this.map.getProjection() && (a = a.transform(this.ovmap.getProjectionObject(), this.map.getProjectionObject())); this.map.panTo(a.getCenterLonLat())
  }, setRectPxBounds: function (a) {
    var b = Math.max(a.top, 0), c = Math.max(a.left, 0), d = Math.min(a.top + Math.abs(a.getHeight()), this.ovmap.size.h - this.hComp); a = Math.min(a.left + a.getWidth(), this.ovmap.size.w - this.wComp); var e = Math.max(a - c, 0), f = Math.max(d - b, 0); e < this.minRectSize || f < this.minRectSize ?
      (this.extentRectangle.className = this.displayClass + this.minRectDisplayClass, e = c + e / 2 - this.minRectSize / 2, this.extentRectangle.style.top = Math.round(b + f / 2 - this.minRectSize / 2) + "px", this.extentRectangle.style.left = Math.round(e) + "px", this.extentRectangle.style.height = this.minRectSize + "px", this.extentRectangle.style.width = this.minRectSize + "px") : (this.extentRectangle.className = this.displayClass + "ExtentRectangle", this.extentRectangle.style.top = Math.round(b) + "px", this.extentRectangle.style.left = Math.round(c) +
        "px", this.extentRectangle.style.height = Math.round(f) + "px", this.extentRectangle.style.width = Math.round(e) + "px"); this.rectPxBounds = new OpenLayers.Bounds(Math.round(c), Math.round(d), Math.round(a), Math.round(b))
  }, getRectBoundsFromMapBounds: function (a) { var b = this.getOverviewPxFromLonLat({ lon: a.left, lat: a.bottom }); a = this.getOverviewPxFromLonLat({ lon: a.right, lat: a.top }); var c = null; b && a && (c = new OpenLayers.Bounds(b.x, b.y, a.x, a.y)); return c }, getMapBoundsFromRectBounds: function (a) {
    var b = this.getLonLatFromOverviewPx({
      x: a.left,
      y: a.bottom
    }); a = this.getLonLatFromOverviewPx({ x: a.right, y: a.top }); return new OpenLayers.Bounds(b.lon, b.lat, a.lon, a.lat)
  }, getLonLatFromOverviewPx: function (a) { var b = this.ovmap.size, c = this.ovmap.getResolution(), d = this.ovmap.getExtent().getCenterLonLat(); return { lon: d.lon + (a.x - b.w / 2) * c, lat: d.lat - (a.y - b.h / 2) * c } }, getOverviewPxFromLonLat: function (a) { var b = this.ovmap.getResolution(), c = this.ovmap.getExtent(); if (c) return { x: Math.round(1 / b * (a.lon - c.left)), y: Math.round(1 / b * (c.top - a.lat)) } }, CLASS_NAME: "OpenLayers.Control.OverviewMap"
}); OpenLayers.Layer = OpenLayers.Class({
  id: null, name: null, div: null, opacity: 1, alwaysInRange: null, RESOLUTION_PROPERTIES: "scales resolutions maxScale minScale maxResolution minResolution numZoomLevels maxZoomLevel".split(" "), events: null, map: null, isBaseLayer: !1, alpha: !1, displayInLayerSwitcher: !0, visibility: !0, attribution: null, inRange: !1, imageSize: null, options: null, eventListeners: null, gutter: 0, projection: null, units: null, scales: null, resolutions: null, maxExtent: null, minExtent: null, maxResolution: null, minResolution: null,
  numZoomLevels: null, minScale: null, maxScale: null, displayOutsideMaxExtent: !1, wrapDateLine: !1, metadata: null, initialize: function (a, b) {
  this.metadata = {}; b = OpenLayers.Util.extend({}, b); null != this.alwaysInRange && (b.alwaysInRange = this.alwaysInRange); this.addOptions(b); this.name = a; if (null == this.id && (this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_"), this.div = OpenLayers.Util.createDiv(this.id), this.div.style.width = "100%", this.div.style.height = "100%", this.div.dir = "ltr", this.events = new OpenLayers.Events(this,
    this.div), this.eventListeners instanceof Object)) this.events.on(this.eventListeners)
  }, destroy: function (a) { null == a && (a = !0); null != this.map && this.map.removeLayer(this, a); this.options = this.div = this.name = this.map = this.projection = null; this.events && (this.eventListeners && this.events.un(this.eventListeners), this.events.destroy()); this.events = this.eventListeners = null }, clone: function (a) { null == a && (a = new OpenLayers.Layer(this.name, this.getOptions())); OpenLayers.Util.applyDefaults(a, this); a.map = null; return a },
  getOptions: function () { var a = {}, b; for (b in this.options) a[b] = this[b]; return a }, setName: function (a) { a != this.name && (this.name = a, null != this.map && this.map.events.triggerEvent("changelayer", { layer: this, property: "name" })) }, addOptions: function (a, b) {
  null == this.options && (this.options = {}); a && ("string" == typeof a.projection && (a.projection = new OpenLayers.Projection(a.projection)), a.projection && OpenLayers.Util.applyDefaults(a, OpenLayers.Projection.defaults[a.projection.getCode()]), !a.maxExtent || a.maxExtent instanceof
    OpenLayers.Bounds || (a.maxExtent = new OpenLayers.Bounds(a.maxExtent)), !a.minExtent || a.minExtent instanceof OpenLayers.Bounds || (a.minExtent = new OpenLayers.Bounds(a.minExtent))); OpenLayers.Util.extend(this.options, a); OpenLayers.Util.extend(this, a); this.projection && this.projection.getUnits() && (this.units = this.projection.getUnits()); if (this.map) {
      var c = this.map.getResolution(), d = this.RESOLUTION_PROPERTIES.concat(["projection", "units", "minExtent", "maxExtent"]), e; for (e in a) if (a.hasOwnProperty(e) && 0 <= OpenLayers.Util.indexOf(d,
        e)) { this.initResolutions(); b && this.map.baseLayer === this && (this.map.setCenter(this.map.getCenter(), this.map.getZoomForResolution(c), !1, !0), this.map.events.triggerEvent("changebaselayer", { layer: this })); break }
    }
  }, onMapResize: function () { }, redraw: function () { var a = !1; if (this.map) { this.inRange = this.calculateInRange(); var b = this.getExtent(); b && (this.inRange && this.visibility) && (this.moveTo(b, !0, !1), this.events.triggerEvent("moveend", { zoomChanged: !0 }), a = !0) } return a }, moveTo: function (a, b, c) {
    a = this.visibility;
    this.isBaseLayer || (a = a && this.inRange); this.display(a)
  }, moveByPx: function (a, b) { }, setMap: function (a) {
  null == this.map && (this.map = a, this.maxExtent = this.maxExtent || this.map.maxExtent, this.minExtent = this.minExtent || this.map.minExtent, this.projection = this.projection || this.map.projection, "string" == typeof this.projection && (this.projection = new OpenLayers.Projection(this.projection)), this.units = this.projection.getUnits() || this.units || this.map.units, this.initResolutions(), this.isBaseLayer || (this.inRange = this.calculateInRange(),
    this.div.style.display = this.visibility && this.inRange ? "" : "none"), this.setTileSize())
  }, afterAdd: function () { }, removeMap: function (a) { }, getImageSize: function (a) { return this.imageSize || this.tileSize }, setTileSize: function (a) { this.tileSize = a = a ? a : this.tileSize ? this.tileSize : this.map.getTileSize(); this.gutter && (this.imageSize = new OpenLayers.Size(a.w + 2 * this.gutter, a.h + 2 * this.gutter)) }, getVisibility: function () { return this.visibility }, setVisibility: function (a) {
  a != this.visibility && (this.visibility = a, this.display(a),
    this.redraw(), null != this.map && this.map.events.triggerEvent("changelayer", { layer: this, property: "visibility" }), this.events.triggerEvent("visibilitychanged"))
  }, display: function (a) { a != ("none" != this.div.style.display) && (this.div.style.display = a && this.calculateInRange() ? "block" : "none") }, calculateInRange: function () { var a = !1; this.alwaysInRange ? a = !0 : this.map && (a = this.map.getResolution(), a = a >= this.minResolution && a <= this.maxResolution); return a }, setIsBaseLayer: function (a) {
  a != this.isBaseLayer && (this.isBaseLayer =
    a, null != this.map && this.map.events.triggerEvent("changebaselayer", { layer: this }))
  }, initResolutions: function () {
    var a, b, c, d = {}, e = !0; a = 0; for (b = this.RESOLUTION_PROPERTIES.length; a < b; a++)c = this.RESOLUTION_PROPERTIES[a], d[c] = this.options[c], e && this.options[c] && (e = !1); null == this.options.alwaysInRange && (this.alwaysInRange = e); null == d.resolutions && (d.resolutions = this.resolutionsFromScales(d.scales)); null == d.resolutions && (d.resolutions = this.calculateResolutions(d)); if (null == d.resolutions) {
      a = 0; for (b = this.RESOLUTION_PROPERTIES.length; a <
        b; a++)c = this.RESOLUTION_PROPERTIES[a], d[c] = null != this.options[c] ? this.options[c] : this.map[c]; null == d.resolutions && (d.resolutions = this.resolutionsFromScales(d.scales)); null == d.resolutions && (d.resolutions = this.calculateResolutions(d))
    } var f; this.options.maxResolution && "auto" !== this.options.maxResolution && (f = this.options.maxResolution); this.options.minScale && (f = OpenLayers.Util.getResolutionFromScale(this.options.minScale, this.units)); var g; this.options.minResolution && "auto" !== this.options.minResolution &&
      (g = this.options.minResolution); this.options.maxScale && (g = OpenLayers.Util.getResolutionFromScale(this.options.maxScale, this.units)); d.resolutions && (d.resolutions.sort(function (a, b) { return b - a }), f || (f = d.resolutions[0]), g || (g = d.resolutions[d.resolutions.length - 1])); if (this.resolutions = d.resolutions) { b = this.resolutions.length; this.scales = Array(b); for (a = 0; a < b; a++)this.scales[a] = OpenLayers.Util.getScaleFromResolution(this.resolutions[a], this.units); this.numZoomLevels = b } if (this.minResolution = g) this.maxScale =
        OpenLayers.Util.getScaleFromResolution(g, this.units); if (this.maxResolution = f) this.minScale = OpenLayers.Util.getScaleFromResolution(f, this.units)
  }, resolutionsFromScales: function (a) { if (null != a) { var b, c, d; d = a.length; b = Array(d); for (c = 0; c < d; c++)b[c] = OpenLayers.Util.getResolutionFromScale(a[c], this.units); return b } }, calculateResolutions: function (a) {
    var b, c, d = a.maxResolution; null != a.minScale ? d = OpenLayers.Util.getResolutionFromScale(a.minScale, this.units) : "auto" == d && null != this.maxExtent && (b = this.map.getSize(),
      c = this.maxExtent.getWidth() / b.w, b = this.maxExtent.getHeight() / b.h, d = Math.max(c, b)); c = a.minResolution; null != a.maxScale ? c = OpenLayers.Util.getResolutionFromScale(a.maxScale, this.units) : "auto" == a.minResolution && null != this.minExtent && (b = this.map.getSize(), c = this.minExtent.getWidth() / b.w, b = this.minExtent.getHeight() / b.h, c = Math.max(c, b)); "number" !== typeof d && ("number" !== typeof c && null != this.maxExtent) && (d = this.map.getTileSize(), d = Math.max(this.maxExtent.getWidth() / d.w, this.maxExtent.getHeight() / d.h)); b = a.maxZoomLevel;
    a = a.numZoomLevels; "number" === typeof c && "number" === typeof d && void 0 === a ? a = Math.floor(Math.log(d / c) / Math.log(2)) + 1 : void 0 === a && null != b && (a = b + 1); if (!("number" !== typeof a || 0 >= a || "number" !== typeof d && "number" !== typeof c)) { b = Array(a); var e = 2; "number" == typeof c && "number" == typeof d && (e = Math.pow(d / c, 1 / (a - 1))); var f; if ("number" === typeof d) for (f = 0; f < a; f++)b[f] = d / Math.pow(e, f); else for (f = 0; f < a; f++)b[a - 1 - f] = c * Math.pow(e, f); return b }
  }, getResolution: function () { var a = this.map.getZoom(); return this.getResolutionForZoom(a) },
  getExtent: function () { return this.map.calculateBounds() }, getZoomForExtent: function (a, b) { var c = this.map.getSize(), c = Math.max(a.getWidth() / c.w, a.getHeight() / c.h); return this.getZoomForResolution(c, b) }, getDataExtent: function () { }, getResolutionForZoom: function (a) { a = Math.max(0, Math.min(a, this.resolutions.length - 1)); if (this.map.fractionalZoom) { var b = Math.floor(a), c = Math.ceil(a); a = this.resolutions[b] - (a - b) * (this.resolutions[b] - this.resolutions[c]) } else a = this.resolutions[Math.round(a)]; return a }, getZoomForResolution: function (a,
    b) { var c, d; if (this.map.fractionalZoom) { var e = 0, f = this.resolutions[e], g = this.resolutions[this.resolutions.length - 1], h; c = 0; for (d = this.resolutions.length; c < d; ++c)if (h = this.resolutions[c], h >= a && (f = h, e = c), h <= a) { g = h; break } c = f - g; c = 0 < c ? e + (f - a) / c : e } else { f = Number.POSITIVE_INFINITY; c = 0; for (d = this.resolutions.length; c < d; c++)if (b) { e = Math.abs(this.resolutions[c] - a); if (e > f) break; f = e } else if (this.resolutions[c] < a) break; c = Math.max(0, c - 1) } return c }, getLonLatFromViewPortPx: function (a) {
      var b = null, c = this.map; if (null !=
        a && c.minPx) { var b = c.getResolution(), d = c.getMaxExtent({ restricted: !0 }), b = new OpenLayers.LonLat((a.x - c.minPx.x) * b + d.left, (c.minPx.y - a.y) * b + d.top); this.wrapDateLine && (b = b.wrapDateLine(this.maxExtent)) } return b
    }, getViewPortPxFromLonLat: function (a, b) { var c = null; null != a && (b = b || this.map.getResolution(), c = this.map.calculateBounds(null, b), c = new OpenLayers.Pixel(1 / b * (a.lon - c.left), 1 / b * (c.top - a.lat))); return c }, setOpacity: function (a) {
      if (a != this.opacity) {
      this.opacity = a; for (var b = this.div.childNodes, c = 0, d = b.length; c <
        d; ++c) { var e = b[c].firstChild || b[c], f = b[c].lastChild; f && "iframe" === f.nodeName.toLowerCase() && (e = f.parentNode); OpenLayers.Util.modifyDOMElement(e, null, null, null, null, null, null, a) } null != this.map && this.map.events.triggerEvent("changelayer", { layer: this, property: "opacity" })
      }
    }, getZIndex: function () { return this.div.style.zIndex }, setZIndex: function (a) { this.div.style.zIndex = a }, adjustBounds: function (a) {
      if (this.gutter) {
        var b = this.gutter * this.map.getResolution(); a = new OpenLayers.Bounds(a.left - b, a.bottom - b, a.right +
          b, a.top + b)
      } this.wrapDateLine && (b = { rightTolerance: this.getResolution(), leftTolerance: this.getResolution() }, a = a.wrapDateLine(this.maxExtent, b)); return a
    }, CLASS_NAME: "OpenLayers.Layer"
}); OpenLayers.Layer.SphericalMercator = {
  getExtent: function () { var a = null; return a = this.sphericalMercator ? this.map.calculateBounds() : OpenLayers.Layer.FixedZoomLevels.prototype.getExtent.apply(this) }, getLonLatFromViewPortPx: function (a) { return OpenLayers.Layer.prototype.getLonLatFromViewPortPx.apply(this, arguments) }, getViewPortPxFromLonLat: function (a) { return OpenLayers.Layer.prototype.getViewPortPxFromLonLat.apply(this, arguments) }, initMercatorParameters: function () {
  this.RESOLUTIONS = []; for (var a = 0; a <= this.MAX_ZOOM_LEVEL; ++a)this.RESOLUTIONS[a] =
    156543.03390625 / Math.pow(2, a); this.units = "m"; this.projection = this.projection || "EPSG:900913"
  }, forwardMercator: function () { var a = new OpenLayers.Projection("EPSG:4326"), b = new OpenLayers.Projection("EPSG:900913"); return function (c, d) { var e = OpenLayers.Projection.transform({ x: c, y: d }, a, b); return new OpenLayers.LonLat(e.x, e.y) } }(), inverseMercator: function () {
    var a = new OpenLayers.Projection("EPSG:4326"), b = new OpenLayers.Projection("EPSG:900913"); return function (c, d) {
      var e = OpenLayers.Projection.transform({
        x: c,
        y: d
      }, b, a); return new OpenLayers.LonLat(e.x, e.y)
    }
  }()
}; OpenLayers.Layer.EventPane = OpenLayers.Class(OpenLayers.Layer, {
  smoothDragPan: !0, isBaseLayer: !0, isFixed: !0, pane: null, mapObject: null, initialize: function (a, b) { OpenLayers.Layer.prototype.initialize.apply(this, arguments); null == this.pane && (this.pane = OpenLayers.Util.createDiv(this.div.id + "_EventPane")) }, destroy: function () { this.pane = this.mapObject = null; OpenLayers.Layer.prototype.destroy.apply(this, arguments) }, setMap: function (a) {
    OpenLayers.Layer.prototype.setMap.apply(this, arguments); this.pane.style.zIndex =
      parseInt(this.div.style.zIndex) + 1; this.pane.style.display = this.div.style.display; this.pane.style.width = "100%"; this.pane.style.height = "100%"; "msie" == OpenLayers.BROWSER_NAME && (this.pane.style.background = "url(" + OpenLayers.Util.getImageLocation("blank.gif") + ")"); this.isFixed ? this.map.viewPortDiv.appendChild(this.pane) : this.map.layerContainerDiv.appendChild(this.pane); this.loadMapObject(); null == this.mapObject && this.loadWarningMessage()
  }, removeMap: function (a) {
  this.pane && this.pane.parentNode && this.pane.parentNode.removeChild(this.pane);
    OpenLayers.Layer.prototype.removeMap.apply(this, arguments)
  }, loadWarningMessage: function () { this.div.style.backgroundColor = "darkblue"; var a = this.map.getSize(), b = Math.min(a.w, 300), c = Math.min(a.h, 200), b = new OpenLayers.Size(b, c), a = (new OpenLayers.Pixel(a.w / 2, a.h / 2)).add(-b.w / 2, -b.h / 2), a = OpenLayers.Util.createDiv(this.name + "_warning", a, b, null, null, null, "auto"); a.style.padding = "7px"; a.style.backgroundColor = "yellow"; a.innerHTML = this.getWarningHTML(); this.div.appendChild(a) }, getWarningHTML: function () { return "" },
  display: function (a) { OpenLayers.Layer.prototype.display.apply(this, arguments); this.pane.style.display = this.div.style.display }, setZIndex: function (a) { OpenLayers.Layer.prototype.setZIndex.apply(this, arguments); this.pane.style.zIndex = parseInt(this.div.style.zIndex) + 1 }, moveByPx: function (a, b) { OpenLayers.Layer.prototype.moveByPx.apply(this, arguments); this.dragPanMapObject ? this.dragPanMapObject(a, -b) : this.moveTo(this.map.getCachedCenter()) }, moveTo: function (a, b, c) {
    OpenLayers.Layer.prototype.moveTo.apply(this,
      arguments); if (null != this.mapObject) {
        var d = this.map.getCenter(), e = this.map.getZoom(); if (null != d) {
          var f = this.getMapObjectCenter(), f = this.getOLLonLatFromMapObjectLonLat(f), g = this.getMapObjectZoom(), g = this.getOLZoomFromMapObjectZoom(g); d.equals(f) && e == g || (!b && f && this.dragPanMapObject && this.smoothDragPan ? (e = this.map.getViewPortPxFromLonLat(f), d = this.map.getViewPortPxFromLonLat(d), this.dragPanMapObject(d.x - e.x, e.y - d.y)) : (d = this.getMapObjectLonLatFromOLLonLat(d), e = this.getMapObjectZoomFromOLZoom(e), this.setMapObjectCenter(d,
            e, c)))
        }
      }
  }, getLonLatFromViewPortPx: function (a) { var b = null; null != this.mapObject && null != this.getMapObjectCenter() && (a = this.getMapObjectPixelFromOLPixel(a), a = this.getMapObjectLonLatFromMapObjectPixel(a), b = this.getOLLonLatFromMapObjectLonLat(a)); return b }, getViewPortPxFromLonLat: function (a) { var b = null; null != this.mapObject && null != this.getMapObjectCenter() && (a = this.getMapObjectLonLatFromOLLonLat(a), a = this.getMapObjectPixelFromMapObjectLonLat(a), b = this.getOLPixelFromMapObjectPixel(a)); return b }, getOLLonLatFromMapObjectLonLat: function (a) {
    var b =
      null; null != a && (b = this.getLongitudeFromMapObjectLonLat(a), a = this.getLatitudeFromMapObjectLonLat(a), b = new OpenLayers.LonLat(b, a)); return b
  }, getMapObjectLonLatFromOLLonLat: function (a) { var b = null; null != a && (b = this.getMapObjectLonLatFromLonLat(a.lon, a.lat)); return b }, getOLPixelFromMapObjectPixel: function (a) { var b = null; null != a && (b = this.getXFromMapObjectPixel(a), a = this.getYFromMapObjectPixel(a), b = new OpenLayers.Pixel(b, a)); return b }, getMapObjectPixelFromOLPixel: function (a) {
    var b = null; null != a && (b = this.getMapObjectPixelFromXY(a.x,
      a.y)); return b
  }, CLASS_NAME: "OpenLayers.Layer.EventPane"
}); OpenLayers.Layer.FixedZoomLevels = OpenLayers.Class({
  initialize: function () { }, initResolutions: function () {
    for (var a = ["minZoomLevel", "maxZoomLevel", "numZoomLevels"], b = 0, c = a.length; b < c; b++) { var d = a[b]; this[d] = null != this.options[d] ? this.options[d] : this.map[d] } if (null == this.minZoomLevel || this.minZoomLevel < this.MIN_ZOOM_LEVEL) this.minZoomLevel = this.MIN_ZOOM_LEVEL; a = this.MAX_ZOOM_LEVEL - this.minZoomLevel + 1; b = null == this.options.numZoomLevels && null != this.options.maxZoomLevel || null == this.numZoomLevels && null != this.maxZoomLevel ?
      this.maxZoomLevel - this.minZoomLevel + 1 : this.numZoomLevels; this.numZoomLevels = null != b ? Math.min(b, a) : a; this.maxZoomLevel = this.minZoomLevel + this.numZoomLevels - 1; if (null != this.RESOLUTIONS) { a = 0; this.resolutions = []; for (b = this.minZoomLevel; b <= this.maxZoomLevel; b++)this.resolutions[a++] = this.RESOLUTIONS[b]; this.maxResolution = this.resolutions[0]; this.minResolution = this.resolutions[this.resolutions.length - 1] }
  }, getResolution: function () {
    if (null != this.resolutions) return OpenLayers.Layer.prototype.getResolution.apply(this,
      arguments); var a = null, b = this.map.getSize(), c = this.getExtent(); null != b && null != c && (a = Math.max(c.getWidth() / b.w, c.getHeight() / b.h)); return a
  }, getExtent: function () { var a = this.map.getSize(), b = this.getLonLatFromViewPortPx({ x: 0, y: 0 }), a = this.getLonLatFromViewPortPx({ x: a.w, y: a.h }); return null != b && null != a ? new OpenLayers.Bounds(b.lon, a.lat, a.lon, b.lat) : null }, getZoomForResolution: function (a) {
    if (null != this.resolutions) return OpenLayers.Layer.prototype.getZoomForResolution.apply(this, arguments); var b = OpenLayers.Layer.prototype.getExtent.apply(this,
      []); return this.getZoomForExtent(b)
  }, getOLZoomFromMapObjectZoom: function (a) { var b = null; null != a && (b = a - this.minZoomLevel, this.map.baseLayer !== this && (b = this.map.baseLayer.getZoomForResolution(this.getResolutionForZoom(b)))); return b }, getMapObjectZoomFromOLZoom: function (a) { var b = null; null != a && (b = a + this.minZoomLevel, this.map.baseLayer !== this && (b = this.getZoomForResolution(this.map.baseLayer.getResolutionForZoom(b)))); return b }, CLASS_NAME: "OpenLayers.Layer.FixedZoomLevels"
}); OpenLayers.Layer.Google = OpenLayers.Class(OpenLayers.Layer.EventPane, OpenLayers.Layer.FixedZoomLevels, {
  MIN_ZOOM_LEVEL: 0, MAX_ZOOM_LEVEL: 21, RESOLUTIONS: [1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.145767211914062E-5, 1.072883605957031E-5, 5.36441802978515E-6, 2.68220901489257E-6, 1.341104507446289E-6, 6.705522537231445E-7],
  type: null, wrapDateLine: !0, sphericalMercator: !1, version: null, initialize: function (a, b) {
    b = b || {}; b.version || (b.version = "function" === typeof GMap2 ? "2" : "3"); var c = OpenLayers.Layer.Google["v" + b.version.replace(/\./g, "_")]; if (c) OpenLayers.Util.applyDefaults(b, c); else throw "Unsupported Google Maps API version: " + b.version; OpenLayers.Util.applyDefaults(b, c.DEFAULTS); b.maxExtent && (b.maxExtent = b.maxExtent.clone()); OpenLayers.Layer.EventPane.prototype.initialize.apply(this, [a, b]); OpenLayers.Layer.FixedZoomLevels.prototype.initialize.apply(this,
      [a, b]); this.sphericalMercator && (OpenLayers.Util.extend(this, OpenLayers.Layer.SphericalMercator), this.initMercatorParameters())
  }, clone: function () { return new OpenLayers.Layer.Google(this.name, this.getOptions()) }, setVisibility: function (a) { var b = null == this.opacity ? 1 : this.opacity; OpenLayers.Layer.EventPane.prototype.setVisibility.apply(this, arguments); this.setOpacity(b) }, display: function (a) { this._dragging || this.setGMapVisibility(a); OpenLayers.Layer.EventPane.prototype.display.apply(this, arguments) }, moveTo: function (a,
    b, c) { this._dragging = c; OpenLayers.Layer.EventPane.prototype.moveTo.apply(this, arguments); delete this._dragging }, setOpacity: function (a) { a !== this.opacity && (null != this.map && this.map.events.triggerEvent("changelayer", { layer: this, property: "opacity" }), this.opacity = a); if (this.getVisibility()) { var b = this.getMapContainer(); OpenLayers.Util.modifyDOMElement(b, null, null, null, null, null, null, a) } }, destroy: function () {
      if (this.map) {
        this.setGMapVisibility(!1); var a = OpenLayers.Layer.Google.cache[this.map.id]; a && 1 >= a.count &&
          this.removeGMapElements()
      } OpenLayers.Layer.EventPane.prototype.destroy.apply(this, arguments)
    }, removeGMapElements: function () {
      var a = OpenLayers.Layer.Google.cache[this.map.id]; if (a) {
        var b = this.mapObject && this.getMapContainer(); b && b.parentNode && b.parentNode.removeChild(b); (b = a.termsOfUse) && b.parentNode && b.parentNode.removeChild(b); (a = a.poweredBy) && a.parentNode && a.parentNode.removeChild(a); this.mapObject && (window.google && google.maps && google.maps.event && google.maps.event.clearListeners) && google.maps.event.clearListeners(this.mapObject,
          "tilesloaded")
      }
    }, removeMap: function (a) { this.visibility && this.mapObject && this.setGMapVisibility(!1); var b = OpenLayers.Layer.Google.cache[a.id]; b && (1 >= b.count ? (this.removeGMapElements(), delete OpenLayers.Layer.Google.cache[a.id]) : --b.count); delete this.termsOfUse; delete this.poweredBy; delete this.mapObject; delete this.dragObject; OpenLayers.Layer.EventPane.prototype.removeMap.apply(this, arguments) }, getOLBoundsFromMapObjectBounds: function (a) {
      var b = null; null != a && (b = a.getSouthWest(), a = a.getNorthEast(), this.sphericalMercator ?
        (b = this.forwardMercator(b.lng(), b.lat()), a = this.forwardMercator(a.lng(), a.lat())) : (b = new OpenLayers.LonLat(b.lng(), b.lat()), a = new OpenLayers.LonLat(a.lng(), a.lat())), b = new OpenLayers.Bounds(b.lon, b.lat, a.lon, a.lat)); return b
    }, getWarningHTML: function () { return OpenLayers.i18n("googleWarning") }, getMapObjectCenter: function () { return this.mapObject.getCenter() }, getMapObjectZoom: function () { return this.mapObject.getZoom() }, getLongitudeFromMapObjectLonLat: function (a) {
      return this.sphericalMercator ? this.forwardMercator(a.lng(),
        a.lat()).lon : a.lng()
    }, getLatitudeFromMapObjectLonLat: function (a) { return this.sphericalMercator ? this.forwardMercator(a.lng(), a.lat()).lat : a.lat() }, getXFromMapObjectPixel: function (a) { return a.x }, getYFromMapObjectPixel: function (a) { return a.y }, CLASS_NAME: "OpenLayers.Layer.Google"
}); OpenLayers.Layer.Google.cache = {};
OpenLayers.Layer.Google.v2 = {
  termsOfUse: null, poweredBy: null, dragObject: null, loadMapObject: function () {
  this.type || (this.type = G_NORMAL_MAP); var a, b, c, d = OpenLayers.Layer.Google.cache[this.map.id]; if (d) a = d.mapObject, b = d.termsOfUse, c = d.poweredBy, ++d.count; else {
    var d = this.map.viewPortDiv, e = document.createElement("div"); e.id = this.map.id + "_GMap2Container"; e.style.position = "absolute"; e.style.width = "100%"; e.style.height = "100%"; d.appendChild(e); try {
    a = new GMap2(e), b = e.lastChild, d.appendChild(b), b.style.zIndex =
      "1100", b.style.right = "", b.style.bottom = "", b.className = "olLayerGoogleCopyright", c = e.lastChild, d.appendChild(c), c.style.zIndex = "1100", c.style.right = "", c.style.bottom = "", c.className = "olLayerGooglePoweredBy gmnoprint"
    } catch (f) { throw f; } OpenLayers.Layer.Google.cache[this.map.id] = { mapObject: a, termsOfUse: b, poweredBy: c, count: 1 }
  } this.mapObject = a; this.termsOfUse = b; this.poweredBy = c; -1 === OpenLayers.Util.indexOf(this.mapObject.getMapTypes(), this.type) && this.mapObject.addMapType(this.type); "function" == typeof a.getDragObject ?
    this.dragObject = a.getDragObject() : this.dragPanMapObject = null; !1 === this.isBaseLayer && this.setGMapVisibility("none" !== this.div.style.display)
  }, onMapResize: function () { if (this.visibility && this.mapObject.isLoaded()) this.mapObject.checkResize(); else { if (!this._resized) var a = this, b = GEvent.addListener(this.mapObject, "load", function () { GEvent.removeListener(b); delete a._resized; a.mapObject.checkResize(); a.moveTo(a.map.getCenter(), a.map.getZoom()) }); this._resized = !0 } }, setGMapVisibility: function (a) {
    var b = OpenLayers.Layer.Google.cache[this.map.id];
    if (b) { var c = this.mapObject.getContainer(); !0 === a ? (this.mapObject.setMapType(this.type), c.style.display = "", this.termsOfUse.style.left = "", this.termsOfUse.style.display = "", this.poweredBy.style.display = "", b.displayed = this.id) : (b.displayed === this.id && delete b.displayed, b.displayed || (c.style.display = "none", this.termsOfUse.style.display = "none", this.termsOfUse.style.left = "-9999px", this.poweredBy.style.display = "none")) }
  }, getMapContainer: function () { return this.mapObject.getContainer() }, getMapObjectBoundsFromOLBounds: function (a) {
    var b =
      null; null != a && (b = this.sphericalMercator ? this.inverseMercator(a.bottom, a.left) : new OpenLayers.LonLat(a.bottom, a.left), a = this.sphericalMercator ? this.inverseMercator(a.top, a.right) : new OpenLayers.LonLat(a.top, a.right), b = new GLatLngBounds(new GLatLng(b.lat, b.lon), new GLatLng(a.lat, a.lon))); return b
  }, setMapObjectCenter: function (a, b) { this.mapObject.setCenter(a, b) }, dragPanMapObject: function (a, b) { this.dragObject.moveBy(new GSize(-a, b)) }, getMapObjectLonLatFromMapObjectPixel: function (a) { return this.mapObject.fromContainerPixelToLatLng(a) },
  getMapObjectPixelFromMapObjectLonLat: function (a) { return this.mapObject.fromLatLngToContainerPixel(a) }, getMapObjectZoomFromMapObjectBounds: function (a) { return this.mapObject.getBoundsZoomLevel(a) }, getMapObjectLonLatFromLonLat: function (a, b) { var c; this.sphericalMercator ? (c = this.inverseMercator(a, b), c = new GLatLng(c.lat, c.lon)) : c = new GLatLng(b, a); return c }, getMapObjectPixelFromXY: function (a, b) { return new GPoint(a, b) }
}; OpenLayers.Format.XML = OpenLayers.Class(OpenLayers.Format, {
  namespaces: null, namespaceAlias: null, defaultPrefix: null, readers: {}, writers: {}, xmldom: null, initialize: function (a) { window.ActiveXObject && (this.xmldom = new ActiveXObject("Microsoft.XMLDOM")); OpenLayers.Format.prototype.initialize.apply(this, [a]); this.namespaces = OpenLayers.Util.extend({}, this.namespaces); this.namespaceAlias = {}; for (var b in this.namespaces) this.namespaceAlias[this.namespaces[b]] = b }, destroy: function () {
  this.xmldom = null; OpenLayers.Format.prototype.destroy.apply(this,
    arguments)
  }, setNamespace: function (a, b) { this.namespaces[a] = b; this.namespaceAlias[b] = a }, read: function (a) {
    var b = a.indexOf("<"); 0 < b && (a = a.substring(b)); b = OpenLayers.Util.Try(OpenLayers.Function.bind(function () { var b; b = window.ActiveXObject && !this.xmldom ? new ActiveXObject("Microsoft.XMLDOM") : this.xmldom; b.loadXML(a); return b }, this), function () { return (new DOMParser).parseFromString(a, "text/xml") }, function () {
      var b = new XMLHttpRequest; b.open("GET", "data:text/xml;charset=utf-8," + encodeURIComponent(a), !1); b.overrideMimeType &&
        b.overrideMimeType("text/xml"); b.send(null); return b.responseXML
    }); this.keepData && (this.data = b); return b
  }, write: function (a) { if (this.xmldom) a = a.xml; else { var b = new XMLSerializer; if (1 == a.nodeType) { var c = document.implementation.createDocument("", "", null); c.importNode && (a = c.importNode(a, !0)); c.appendChild(a); a = b.serializeToString(c) } else a = b.serializeToString(a) } return a }, createElementNS: function (a, b) {
    return this.xmldom ? "string" == typeof a ? this.xmldom.createNode(1, b, a) : this.xmldom.createNode(1, b, "") : document.createElementNS(a,
      b)
  }, createDocumentFragment: function () { return this.xmldom ? this.xmldom.createDocumentFragment() : document.createDocumentFragment() }, createTextNode: function (a) { "string" !== typeof a && (a = String(a)); return this.xmldom ? this.xmldom.createTextNode(a) : document.createTextNode(a) }, getElementsByTagNameNS: function (a, b, c) {
    var d = []; if (a.getElementsByTagNameNS) d = a.getElementsByTagNameNS(b, c); else {
      a = a.getElementsByTagName("*"); for (var e, f, g = 0, h = a.length; g < h; ++g)if (e = a[g], f = e.prefix ? e.prefix + ":" + c : c, "*" == c || f == e.nodeName) "*" !=
        b && b != e.namespaceURI || d.push(e)
    } return d
  }, getAttributeNodeNS: function (a, b, c) { var d = null; if (a.getAttributeNodeNS) d = a.getAttributeNodeNS(b, c); else { a = a.attributes; for (var e, f, g = 0, h = a.length; g < h; ++g)if (e = a[g], e.namespaceURI == b && (f = e.prefix ? e.prefix + ":" + c : c, f == e.nodeName)) { d = e; break } } return d }, getAttributeNS: function (a, b, c) { var d = ""; if (a.getAttributeNS) d = a.getAttributeNS(b, c) || ""; else if (a = this.getAttributeNodeNS(a, b, c)) d = a.nodeValue; return d }, getChildValue: function (a, b) {
    var c = b || ""; if (a) for (var d = a.firstChild; d; d =
      d.nextSibling)switch (d.nodeType) { case 3: case 4: c += d.nodeValue }return c
  }, isSimpleContent: function (a) { var b = !0; for (a = a.firstChild; a; a = a.nextSibling)if (1 === a.nodeType) { b = !1; break } return b }, contentType: function (a) { var b = !1, c = !1, d = OpenLayers.Format.XML.CONTENT_TYPE.EMPTY; for (a = a.firstChild; a; a = a.nextSibling) { switch (a.nodeType) { case 1: c = !0; break; case 8: break; default: b = !0 }if (c && b) break } if (c && b) d = OpenLayers.Format.XML.CONTENT_TYPE.MIXED; else { if (c) return OpenLayers.Format.XML.CONTENT_TYPE.COMPLEX; if (b) return OpenLayers.Format.XML.CONTENT_TYPE.SIMPLE } return d },
  hasAttributeNS: function (a, b, c) { var d = !1; return d = a.hasAttributeNS ? a.hasAttributeNS(b, c) : !!this.getAttributeNodeNS(a, b, c) }, setAttributeNS: function (a, b, c, d) { if (a.setAttributeNS) a.setAttributeNS(b, c, d); else if (this.xmldom) b ? (b = a.ownerDocument.createNode(2, c, b), b.nodeValue = d, a.setAttributeNode(b)) : a.setAttribute(c, d); else throw "setAttributeNS not implemented"; }, createElementNSPlus: function (a, b) {
    b = b || {}; var c = b.uri || this.namespaces[b.prefix]; c || (c = a.indexOf(":"), c = this.namespaces[a.substring(0, c)]); c ||
      (c = this.namespaces[this.defaultPrefix]); c = this.createElementNS(c, a); b.attributes && this.setAttributes(c, b.attributes); var d = b.value; null != d && c.appendChild(this.createTextNode(d)); return c
  }, setAttributes: function (a, b) { var c, d, e; for (e in b) null != b[e] && b[e].toString && (c = b[e].toString(), d = this.namespaces[e.substring(0, e.indexOf(":"))] || null, this.setAttributeNS(a, d, e, c)) }, readNode: function (a, b) {
    b || (b = {}); var c = this.readers[a.namespaceURI ? this.namespaceAlias[a.namespaceURI] : this.defaultPrefix]; if (c) {
      var d =
        a.localName || a.nodeName.split(":").pop(); (c = c[d] || c["*"]) && c.apply(this, [a, b])
    } return b
  }, readChildNodes: function (a, b) { b || (b = {}); for (var c = a.childNodes, d, e = 0, f = c.length; e < f; ++e)d = c[e], 1 == d.nodeType && this.readNode(d, b); return b }, writeNode: function (a, b, c) { var d, e = a.indexOf(":"); 0 < e ? (d = a.substring(0, e), a = a.substring(e + 1)) : d = c ? this.namespaceAlias[c.namespaceURI] : this.defaultPrefix; b = this.writers[d][a].apply(this, [b]); c && c.appendChild(b); return b }, getChildEl: function (a, b, c) {
    return a && this.getThisOrNextEl(a.firstChild,
      b, c)
  }, getNextEl: function (a, b, c) { return a && this.getThisOrNextEl(a.nextSibling, b, c) }, getThisOrNextEl: function (a, b, c) { a: for (; a; a = a.nextSibling)switch (a.nodeType) { case 1: if (!(b && b !== (a.localName || a.nodeName.split(":").pop()) || c && c !== a.namespaceURI)) break a; a = null; break a; case 3: if (/^\s*$/.test(a.nodeValue)) break; case 4: case 6: case 12: case 10: case 11: a = null; break a }return a || null }, lookupNamespaceURI: function (a, b) {
    var c = null; if (a) if (a.lookupNamespaceURI) c = a.lookupNamespaceURI(b); else a: switch (a.nodeType) {
      case 1: if (null !==
        a.namespaceURI && a.prefix === b) { c = a.namespaceURI; break a } if (c = a.attributes.length) for (var d, e = 0; e < c; ++e)if (d = a.attributes[e], "xmlns" === d.prefix && d.name === "xmlns:" + b) { c = d.value || null; break a } else if ("xmlns" === d.name && null === b) { c = d.value || null; break a } c = this.lookupNamespaceURI(a.parentNode, b); break a; case 2: c = this.lookupNamespaceURI(a.ownerElement, b); break a; case 9: c = this.lookupNamespaceURI(a.documentElement, b); break a; case 6: case 12: case 10: case 11: break a; default: c = this.lookupNamespaceURI(a.parentNode,
          b)
    }return c
  }, getXMLDoc: function () { OpenLayers.Format.XML.document || this.xmldom || (document.implementation && document.implementation.createDocument ? OpenLayers.Format.XML.document = document.implementation.createDocument("", "", null) : !this.xmldom && window.ActiveXObject && (this.xmldom = new ActiveXObject("Microsoft.XMLDOM"))); return OpenLayers.Format.XML.document || this.xmldom }, CLASS_NAME: "OpenLayers.Format.XML"
}); OpenLayers.Format.XML.CONTENT_TYPE = { EMPTY: 0, SIMPLE: 1, COMPLEX: 2, MIXED: 3 };
OpenLayers.Format.XML.lookupNamespaceURI = OpenLayers.Function.bind(OpenLayers.Format.XML.prototype.lookupNamespaceURI, OpenLayers.Format.XML.prototype); OpenLayers.Format.XML.document = null; OpenLayers.Format.WFST = function (a) { a = OpenLayers.Util.applyDefaults(a, OpenLayers.Format.WFST.DEFAULTS); var b = OpenLayers.Format.WFST["v" + a.version.replace(/\./g, "_")]; if (!b) throw "Unsupported WFST version: " + a.version; return new b(a) }; OpenLayers.Format.WFST.DEFAULTS = { version: "1.0.0" }; OpenLayers.Feature = OpenLayers.Class({
  layer: null, id: null, lonlat: null, data: null, marker: null, popupClass: null, popup: null, initialize: function (a, b, c) { this.layer = a; this.lonlat = b; this.data = null != c ? c : {}; this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_") }, destroy: function () {
  null != this.layer && null != this.layer.map && null != this.popup && this.layer.map.removePopup(this.popup); null != this.layer && null != this.marker && this.layer.removeMarker(this.marker); this.data = this.lonlat = this.id = this.layer = null; null != this.marker &&
    (this.destroyMarker(this.marker), this.marker = null); null != this.popup && (this.destroyPopup(this.popup), this.popup = null)
  }, onScreen: function () { var a = !1; null != this.layer && null != this.layer.map && (a = this.layer.map.getExtent().containsLonLat(this.lonlat)); return a }, createMarker: function () { null != this.lonlat && (this.marker = new OpenLayers.Marker(this.lonlat, this.data.icon)); return this.marker }, destroyMarker: function () { this.marker.destroy() }, createPopup: function (a) {
  null != this.lonlat && (this.popup || (this.popup = new (this.popupClass ?
    this.popupClass : OpenLayers.Popup.Anchored)(this.id + "_popup", this.lonlat, this.data.popupSize, this.data.popupContentHTML, this.marker ? this.marker.icon : null, a)), null != this.data.overflow && (this.popup.contentDiv.style.overflow = this.data.overflow), this.popup.feature = this); return this.popup
  }, destroyPopup: function () { this.popup && (this.popup.feature = null, this.popup.destroy(), this.popup = null) }, CLASS_NAME: "OpenLayers.Feature"
}); OpenLayers.State = { UNKNOWN: "Unknown", INSERT: "Insert", UPDATE: "Update", DELETE: "Delete" };
OpenLayers.Feature.Vector = OpenLayers.Class(OpenLayers.Feature, {
  fid: null, geometry: null, attributes: null, bounds: null, state: null, style: null, url: null, renderIntent: "default", modified: null, initialize: function (a, b, c) { OpenLayers.Feature.prototype.initialize.apply(this, [null, null, b]); this.lonlat = null; this.geometry = a ? a : null; this.state = null; this.attributes = {}; b && (this.attributes = OpenLayers.Util.extend(this.attributes, b)); this.style = c ? c : null }, destroy: function () {
  this.layer && (this.layer.removeFeatures(this), this.layer =
    null); this.modified = this.geometry = null; OpenLayers.Feature.prototype.destroy.apply(this, arguments)
  }, clone: function () { return new OpenLayers.Feature.Vector(this.geometry ? this.geometry.clone() : null, this.attributes, this.style) }, onScreen: function (a) { var b = !1; this.layer && this.layer.map && (b = this.layer.map.getExtent(), a ? (a = this.geometry.getBounds(), b = b.intersectsBounds(a)) : b = b.toGeometry().intersects(this.geometry)); return b }, getVisibility: function () {
    return !(this.style && "none" == this.style.display || !this.layer ||
      this.layer && this.layer.styleMap && "none" == this.layer.styleMap.createSymbolizer(this, this.renderIntent).display || this.layer && !this.layer.getVisibility())
  }, createMarker: function () { return null }, destroyMarker: function () { }, createPopup: function () { return null }, atPoint: function (a, b, c) { var d = !1; this.geometry && (d = this.geometry.atPoint(a, b, c)); return d }, destroyPopup: function () { }, move: function (a) {
    if (this.layer && this.geometry.move) {
      a = "OpenLayers.LonLat" == a.CLASS_NAME ? this.layer.getViewPortPxFromLonLat(a) : a; var b =
        this.layer.getViewPortPxFromLonLat(this.geometry.getBounds().getCenterLonLat()), c = this.layer.map.getResolution(); this.geometry.move(c * (a.x - b.x), c * (b.y - a.y)); this.layer.drawFeature(this); return b
    }
  }, toState: function (a) {
    if (a == OpenLayers.State.UPDATE) switch (this.state) { case OpenLayers.State.UNKNOWN: case OpenLayers.State.DELETE: this.state = a } else if (a == OpenLayers.State.INSERT) switch (this.state) { case OpenLayers.State.UNKNOWN: break; default: this.state = a } else if (a == OpenLayers.State.DELETE) switch (this.state) {
      case OpenLayers.State.UNKNOWN: case OpenLayers.State.UPDATE: this.state =
        a
    } else a == OpenLayers.State.UNKNOWN && (this.state = a)
  }, CLASS_NAME: "OpenLayers.Feature.Vector"
});
OpenLayers.Feature.Vector.style = {
  "default": { fillColor: "#ee9900", fillOpacity: 0.4, hoverFillColor: "white", hoverFillOpacity: 0.8, strokeColor: "#ee9900", strokeOpacity: 1, strokeWidth: 1, strokeLinecap: "round", strokeDashstyle: "solid", hoverStrokeColor: "red", hoverStrokeOpacity: 1, hoverStrokeWidth: 0.2, pointRadius: 6, hoverPointRadius: 1, hoverPointUnit: "%", pointerEvents: "visiblePainted", cursor: "inherit", fontColor: "#000000", labelAlign: "cm", labelOutlineColor: "white", labelOutlineWidth: 3 }, select: {
    fillColor: "blue", fillOpacity: 0.4,
    hoverFillColor: "white", hoverFillOpacity: 0.8, strokeColor: "blue", strokeOpacity: 1, strokeWidth: 2, strokeLinecap: "round", strokeDashstyle: "solid", hoverStrokeColor: "red", hoverStrokeOpacity: 1, hoverStrokeWidth: 0.2, pointRadius: 6, hoverPointRadius: 1, hoverPointUnit: "%", pointerEvents: "visiblePainted", cursor: "pointer", fontColor: "#000000", labelAlign: "cm", labelOutlineColor: "white", labelOutlineWidth: 3
  }, temporary: {
    fillColor: "#66cccc", fillOpacity: 0.2, hoverFillColor: "white", hoverFillOpacity: 0.8, strokeColor: "#66cccc", strokeOpacity: 1,
    strokeLinecap: "round", strokeWidth: 2, strokeDashstyle: "solid", hoverStrokeColor: "red", hoverStrokeOpacity: 1, hoverStrokeWidth: 0.2, pointRadius: 6, hoverPointRadius: 1, hoverPointUnit: "%", pointerEvents: "visiblePainted", cursor: "inherit", fontColor: "#000000", labelAlign: "cm", labelOutlineColor: "white", labelOutlineWidth: 3
  }, "delete": { display: "none" }
}; OpenLayers.Style = OpenLayers.Class({
  id: null, name: null, title: null, description: null, layerName: null, isDefault: !1, rules: null, context: null, defaultStyle: null, defaultsPerSymbolizer: !1, propertyStyles: null, initialize: function (a, b) { OpenLayers.Util.extend(this, b); this.rules = []; b && b.rules && this.addRules(b.rules); this.setDefaultStyle(a || OpenLayers.Feature.Vector.style["default"]); this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_") }, destroy: function () {
    for (var a = 0, b = this.rules.length; a < b; a++)this.rules[a].destroy(),
      this.rules[a] = null; this.defaultStyle = this.rules = null
  }, createSymbolizer: function (a) {
    for (var b = this.defaultsPerSymbolizer ? {} : this.createLiterals(OpenLayers.Util.extend({}, this.defaultStyle), a), c = this.rules, d, e = [], f = !1, g = 0, h = c.length; g < h; g++)d = c[g], d.evaluate(a) && (d instanceof OpenLayers.Rule && d.elseFilter ? e.push(d) : (f = !0, this.applySymbolizer(d, b, a))); if (!1 == f && 0 < e.length) for (f = !0, g = 0, h = e.length; g < h; g++)this.applySymbolizer(e[g], b, a); 0 < c.length && !1 == f && (b.display = "none"); null != b.label && "string" !== typeof b.label &&
      (b.label = String(b.label)); return b
  }, applySymbolizer: function (a, b, c) {
    var d = c.geometry ? this.getSymbolizerPrefix(c.geometry) : OpenLayers.Style.SYMBOLIZER_PREFIXES[0]; a = a.symbolizer[d] || a.symbolizer; !0 === this.defaultsPerSymbolizer && (d = this.defaultStyle, OpenLayers.Util.applyDefaults(a, { pointRadius: d.pointRadius }), !0 !== a.stroke && !0 !== a.graphic || OpenLayers.Util.applyDefaults(a, { strokeWidth: d.strokeWidth, strokeColor: d.strokeColor, strokeOpacity: d.strokeOpacity, strokeDashstyle: d.strokeDashstyle, strokeLinecap: d.strokeLinecap }),
      !0 !== a.fill && !0 !== a.graphic || OpenLayers.Util.applyDefaults(a, { fillColor: d.fillColor, fillOpacity: d.fillOpacity }), !0 === a.graphic && OpenLayers.Util.applyDefaults(a, { pointRadius: this.defaultStyle.pointRadius, externalGraphic: this.defaultStyle.externalGraphic, graphicName: this.defaultStyle.graphicName, graphicOpacity: this.defaultStyle.graphicOpacity, graphicWidth: this.defaultStyle.graphicWidth, graphicHeight: this.defaultStyle.graphicHeight, graphicXOffset: this.defaultStyle.graphicXOffset, graphicYOffset: this.defaultStyle.graphicYOffset }));
    return this.createLiterals(OpenLayers.Util.extend(b, a), c)
  }, createLiterals: function (a, b) { var c = OpenLayers.Util.extend({}, b.attributes || b.data); OpenLayers.Util.extend(c, this.context); for (var d in this.propertyStyles) a[d] = OpenLayers.Style.createLiteral(a[d], c, b, d); return a }, findPropertyStyles: function () {
    var a = {}; this.addPropertyStyles(a, this.defaultStyle); for (var b = this.rules, c, d, e = 0, f = b.length; e < f; e++) {
      c = b[e].symbolizer; for (var g in c) if (d = c[g], "object" == typeof d) this.addPropertyStyles(a, d); else {
        this.addPropertyStyles(a,
          c); break
      }
    } return a
  }, addPropertyStyles: function (a, b) { var c, d; for (d in b) c = b[d], "string" == typeof c && c.match(/\$\{\w+\}/) && (a[d] = !0); return a }, addRules: function (a) { Array.prototype.push.apply(this.rules, a); this.propertyStyles = this.findPropertyStyles() }, setDefaultStyle: function (a) { this.defaultStyle = a; this.propertyStyles = this.findPropertyStyles() }, getSymbolizerPrefix: function (a) { for (var b = OpenLayers.Style.SYMBOLIZER_PREFIXES, c = 0, d = b.length; c < d; c++)if (-1 != a.CLASS_NAME.indexOf(b[c])) return b[c] }, clone: function () {
    var a =
      OpenLayers.Util.extend({}, this); if (this.rules) { a.rules = []; for (var b = 0, c = this.rules.length; b < c; ++b)a.rules.push(this.rules[b].clone()) } a.context = this.context && OpenLayers.Util.extend({}, this.context); b = OpenLayers.Util.extend({}, this.defaultStyle); return new OpenLayers.Style(b, a)
  }, CLASS_NAME: "OpenLayers.Style"
}); OpenLayers.Style.createLiteral = function (a, b, c, d) { "string" == typeof a && -1 != a.indexOf("${") && (a = OpenLayers.String.format(a, b, [c, d]), a = isNaN(a) || !a ? a : parseFloat(a)); return a };
OpenLayers.Style.SYMBOLIZER_PREFIXES = ["Point", "Line", "Polygon", "Text", "Raster"]; OpenLayers.Filter = OpenLayers.Class({ initialize: function (a) { OpenLayers.Util.extend(this, a) }, destroy: function () { }, evaluate: function (a) { return !0 }, clone: function () { return null }, toString: function () { return OpenLayers.Format && OpenLayers.Format.CQL ? OpenLayers.Format.CQL.prototype.write(this) : Object.prototype.toString.call(this) }, CLASS_NAME: "OpenLayers.Filter" }); OpenLayers.Filter.Spatial = OpenLayers.Class(OpenLayers.Filter, {
  type: null, property: null, value: null, distance: null, distanceUnits: null, evaluate: function (a) { var b = !1; switch (this.type) { case OpenLayers.Filter.Spatial.BBOX: case OpenLayers.Filter.Spatial.INTERSECTS: if (a.geometry) { var c = this.value; "OpenLayers.Bounds" == this.value.CLASS_NAME && (c = this.value.toGeometry()); a.geometry.intersects(c) && (b = !0) } break; default: throw Error("evaluate is not implemented for this filter type."); }return b }, clone: function () {
    var a =
      OpenLayers.Util.applyDefaults({ value: this.value && this.value.clone && this.value.clone() }, this); return new OpenLayers.Filter.Spatial(a)
  }, CLASS_NAME: "OpenLayers.Filter.Spatial"
}); OpenLayers.Filter.Spatial.BBOX = "BBOX"; OpenLayers.Filter.Spatial.INTERSECTS = "INTERSECTS"; OpenLayers.Filter.Spatial.DWITHIN = "DWITHIN"; OpenLayers.Filter.Spatial.WITHIN = "WITHIN"; OpenLayers.Filter.Spatial.CONTAINS = "CONTAINS"; OpenLayers.Filter.FeatureId = OpenLayers.Class(OpenLayers.Filter, { fids: null, type: "FID", initialize: function (a) { this.fids = []; OpenLayers.Filter.prototype.initialize.apply(this, [a]) }, evaluate: function (a) { for (var b = 0, c = this.fids.length; b < c; b++)if ((a.fid || a.id) == this.fids[b]) return !0; return !1 }, clone: function () { var a = new OpenLayers.Filter.FeatureId; OpenLayers.Util.extend(a, this); a.fids = this.fids.slice(); return a }, CLASS_NAME: "OpenLayers.Filter.FeatureId" }); OpenLayers.Format.WFST.v1 = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { xlink: "http://www.w3.org/1999/xlink", xsi: "http://www.w3.org/2001/XMLSchema-instance", wfs: "http://www.opengis.net/wfs", gml: "http://www.opengis.net/gml", ogc: "http://www.opengis.net/ogc", ows: "http://www.opengis.net/ows" }, defaultPrefix: "wfs", version: null, schemaLocations: null, srsName: null, extractAttributes: !0, xy: !0, stateName: null, initialize: function (a) {
  this.stateName = {}; this.stateName[OpenLayers.State.INSERT] = "wfs:Insert"; this.stateName[OpenLayers.State.UPDATE] =
    "wfs:Update"; this.stateName[OpenLayers.State.DELETE] = "wfs:Delete"; OpenLayers.Format.XML.prototype.initialize.apply(this, [a])
  }, getSrsName: function (a, b) { var c = b && b.srsName; c || (c = a && a.layer ? a.layer.projection.getCode() : this.srsName); return c }, read: function (a, b) {
    b = b || {}; OpenLayers.Util.applyDefaults(b, { output: "features" }); "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); a && 9 == a.nodeType && (a = a.documentElement); var c = {}; a && this.readNode(a, c, !0); c.features && "features" === b.output &&
      (c = c.features); return c
  }, readers: { wfs: { FeatureCollection: function (a, b) { b.features = []; this.readChildNodes(a, b) } } }, write: function (a, b) { var c = this.writeNode("wfs:Transaction", { features: a, options: b }), d = this.schemaLocationAttr(); d && this.setAttributeNS(c, this.namespaces.xsi, "xsi:schemaLocation", d); return OpenLayers.Format.XML.prototype.write.apply(this, [c]) }, writers: {
    wfs: {
      GetFeature: function (a) {
        var b = this.createElementNSPlus("wfs:GetFeature", {
          attributes: {
            service: "WFS", version: this.version, handle: a && a.handle,
            outputFormat: a && a.outputFormat, maxFeatures: a && a.maxFeatures, "xsi:schemaLocation": this.schemaLocationAttr(a)
          }
        }); if ("string" == typeof this.featureType) this.writeNode("Query", a, b); else for (var c = 0, d = this.featureType.length; c < d; c++)a.featureType = this.featureType[c], this.writeNode("Query", a, b); return b
      }, Transaction: function (a) {
        a = a || {}; var b = a.options || {}, c = this.createElementNSPlus("wfs:Transaction", { attributes: { service: "WFS", version: this.version, handle: b.handle } }), d, e = a.features; if (e) {
        !0 === b.multi && OpenLayers.Util.extend(this.geometryTypes,
          { "OpenLayers.Geometry.Point": "MultiPoint", "OpenLayers.Geometry.LineString": !0 === this.multiCurve ? "MultiCurve" : "MultiLineString", "OpenLayers.Geometry.Polygon": !0 === this.multiSurface ? "MultiSurface" : "MultiPolygon" }); var f, g; a = 0; for (d = e.length; a < d; ++a)g = e[a], (f = this.stateName[g.state]) && this.writeNode(f, { feature: g, options: b }, c); !0 === b.multi && this.setGeometryTypes()
        } if (b.nativeElements) for (a = 0, d = b.nativeElements.length; a < d; ++a)this.writeNode("wfs:Native", b.nativeElements[a], c); return c
      }, Native: function (a) {
        return this.createElementNSPlus("wfs:Native",
          { attributes: { vendorId: a.vendorId, safeToIgnore: a.safeToIgnore }, value: a.value })
      }, Insert: function (a) { var b = a.feature; a = a.options; a = this.createElementNSPlus("wfs:Insert", { attributes: { handle: a && a.handle } }); this.srsName = this.getSrsName(b); this.writeNode("feature:_typeName", b, a); return a }, Update: function (a) {
        var b = a.feature; a = a.options; a = this.createElementNSPlus("wfs:Update", { attributes: { handle: a && a.handle, typeName: (this.featureNS ? this.featurePrefix + ":" : "") + this.featureType } }); this.featureNS && a.setAttribute("xmlns:" +
          this.featurePrefix, this.featureNS); var c = b.modified; null === this.geometryName || c && void 0 === c.geometry || (this.srsName = this.getSrsName(b), this.writeNode("Property", { name: this.geometryName, value: b.geometry }, a)); for (var d in b.attributes) void 0 === b.attributes[d] || c && c.attributes && (!c.attributes || void 0 === c.attributes[d]) || this.writeNode("Property", { name: d, value: b.attributes[d] }, a); this.writeNode("ogc:Filter", new OpenLayers.Filter.FeatureId({ fids: [b.fid] }), a); return a
      }, Property: function (a) {
        var b = this.createElementNSPlus("wfs:Property");
        this.writeNode("Name", a.name, b); null !== a.value && this.writeNode("Value", a.value, b); return b
      }, Name: function (a) { return this.createElementNSPlus("wfs:Name", { value: a }) }, Value: function (a) { var b; a instanceof OpenLayers.Geometry ? (b = this.createElementNSPlus("wfs:Value"), a = this.writeNode("feature:_geometry", a).firstChild, b.appendChild(a)) : b = this.createElementNSPlus("wfs:Value", { value: a }); return b }, Delete: function (a) {
        var b = a.feature; a = a.options; a = this.createElementNSPlus("wfs:Delete", {
          attributes: {
            handle: a &&
              a.handle, typeName: (this.featureNS ? this.featurePrefix + ":" : "") + this.featureType
          }
        }); this.featureNS && a.setAttribute("xmlns:" + this.featurePrefix, this.featureNS); this.writeNode("ogc:Filter", new OpenLayers.Filter.FeatureId({ fids: [b.fid] }), a); return a
      }
    }
  }, schemaLocationAttr: function (a) {
    a = OpenLayers.Util.extend({ featurePrefix: this.featurePrefix, schema: this.schema }, a); var b = OpenLayers.Util.extend({}, this.schemaLocations); a.schema && (b[a.featurePrefix] = a.schema); a = []; var c, d; for (d in b) (c = this.namespaces[d]) &&
      a.push(c + " " + b[d]); return a.join(" ") || void 0
  }, setFilterProperty: function (a) { if (a.filters) for (var b = 0, c = a.filters.length; b < c; ++b)OpenLayers.Format.WFST.v1.prototype.setFilterProperty.call(this, a.filters[b]); else a instanceof OpenLayers.Filter.Spatial && !a.property && (a.property = this.geometryName) }, CLASS_NAME: "OpenLayers.Format.WFST.v1"
}); OpenLayers.Format.OGCExceptionReport = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { ogc: "http://www.opengis.net/ogc" }, regExes: { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g }, defaultPrefix: "ogc", read: function (a) { "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); var b = { exceptionReport: null }; a.documentElement && (this.readChildNodes(a, b), null === b.exceptionReport && (b = (new OpenLayers.Format.OWSCommon).read(a))); return b }, readers: {
    ogc: {
      ServiceExceptionReport: function (a,
        b) { b.exceptionReport = { exceptions: [] }; this.readChildNodes(a, b.exceptionReport) }, ServiceException: function (a, b) { var c = { code: a.getAttribute("code"), locator: a.getAttribute("locator"), text: this.getChildValue(a) }; b.exceptions.push(c) }
    }
  }, CLASS_NAME: "OpenLayers.Format.OGCExceptionReport"
}); OpenLayers.Format.XML.VersionedOGC = OpenLayers.Class(OpenLayers.Format.XML, {
  defaultVersion: null, version: null, profile: null, allowFallback: !1, name: null, stringifyOutput: !1, parser: null, initialize: function (a) { OpenLayers.Format.XML.prototype.initialize.apply(this, [a]); a = this.CLASS_NAME; this.name = a.substring(a.lastIndexOf(".") + 1) }, getVersion: function (a, b) { var c; a ? (c = this.version, c || (c = a.getAttribute("version"), c || (c = this.defaultVersion))) : c = b && b.version || this.version || this.defaultVersion; return c }, getParser: function (a) {
    a =
    a || this.defaultVersion; var b = this.profile ? "_" + this.profile : ""; if (!this.parser || this.parser.VERSION != a) { var c = OpenLayers.Format[this.name]["v" + a.replace(/\./g, "_") + b]; if (!c && ("" !== b && this.allowFallback && (b = "", c = OpenLayers.Format[this.name]["v" + a.replace(/\./g, "_")]), !c)) throw "Can't find a " + this.name + " parser for version " + a + b; this.parser = new c(this.options) } return this.parser
  }, write: function (a, b) {
    var c = this.getVersion(null, b); this.parser = this.getParser(c); c = this.parser.write(a, b); return !1 === this.stringifyOutput ?
      c : OpenLayers.Format.XML.prototype.write.apply(this, [c])
  }, read: function (a, b) { "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); var c = this.getVersion(a.documentElement); this.parser = this.getParser(c); var d = this.parser.read(a, b), e = this.parser.errorProperty || null; null !== e && void 0 === d[e] && (e = new OpenLayers.Format.OGCExceptionReport, d.error = e.read(a)); d.version = c; return d }, CLASS_NAME: "OpenLayers.Format.XML.VersionedOGC"
}); OpenLayers.Filter.Logical = OpenLayers.Class(OpenLayers.Filter, {
  filters: null, type: null, initialize: function (a) { this.filters = []; OpenLayers.Filter.prototype.initialize.apply(this, [a]) }, destroy: function () { this.filters = null; OpenLayers.Filter.prototype.destroy.apply(this) }, evaluate: function (a) {
    var b, c; switch (this.type) {
      case OpenLayers.Filter.Logical.AND: b = 0; for (c = this.filters.length; b < c; b++)if (!1 == this.filters[b].evaluate(a)) return !1; return !0; case OpenLayers.Filter.Logical.OR: b = 0; for (c = this.filters.length; b <
        c; b++)if (!0 == this.filters[b].evaluate(a)) return !0; return !1; case OpenLayers.Filter.Logical.NOT: return !this.filters[0].evaluate(a)
    }
  }, clone: function () { for (var a = [], b = 0, c = this.filters.length; b < c; ++b)a.push(this.filters[b].clone()); return new OpenLayers.Filter.Logical({ type: this.type, filters: a }) }, CLASS_NAME: "OpenLayers.Filter.Logical"
}); OpenLayers.Filter.Logical.AND = "&&"; OpenLayers.Filter.Logical.OR = "||"; OpenLayers.Filter.Logical.NOT = "!"; OpenLayers.Filter.Comparison = OpenLayers.Class(OpenLayers.Filter, {
  type: null, property: null, value: null, matchCase: !0, lowerBoundary: null, upperBoundary: null, initialize: function (a) { OpenLayers.Filter.prototype.initialize.apply(this, [a]); this.type === OpenLayers.Filter.Comparison.LIKE && void 0 === a.matchCase && (this.matchCase = null) }, evaluate: function (a) {
  a instanceof OpenLayers.Feature.Vector && (a = a.attributes); var b = !1; a = a[this.property]; switch (this.type) {
    case OpenLayers.Filter.Comparison.EQUAL_TO: b = this.value;
      b = this.matchCase || "string" != typeof a || "string" != typeof b ? a == b : a.toUpperCase() == b.toUpperCase(); break; case OpenLayers.Filter.Comparison.NOT_EQUAL_TO: b = this.value; b = this.matchCase || "string" != typeof a || "string" != typeof b ? a != b : a.toUpperCase() != b.toUpperCase(); break; case OpenLayers.Filter.Comparison.LESS_THAN: b = a < this.value; break; case OpenLayers.Filter.Comparison.GREATER_THAN: b = a > this.value; break; case OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO: b = a <= this.value; break; case OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO: b =
        a >= this.value; break; case OpenLayers.Filter.Comparison.BETWEEN: b = a >= this.lowerBoundary && a <= this.upperBoundary; break; case OpenLayers.Filter.Comparison.LIKE: b = RegExp(this.value, "gi").test(a); break; case OpenLayers.Filter.Comparison.IS_NULL: b = null === a
  }return b
  }, value2regex: function (a, b, c) {
    if ("." == a) throw Error("'.' is an unsupported wildCard character for OpenLayers.Filter.Comparison"); a = a ? a : "*"; b = b ? b : "."; this.value = this.value.replace(RegExp("\\" + (c ? c : "!") + "(.|$)", "g"), "\\$1"); this.value = this.value.replace(RegExp("\\" +
      b, "g"), "."); this.value = this.value.replace(RegExp("\\" + a, "g"), ".*"); this.value = this.value.replace(RegExp("\\\\.\\*", "g"), "\\" + a); return this.value = this.value.replace(RegExp("\\\\\\.", "g"), "\\" + b)
  }, regex2value: function () { var a = this.value, a = a.replace(/!/g, "!!"), a = a.replace(/(\\)?\\\./g, function (a, c) { return c ? a : "!." }), a = a.replace(/(\\)?\\\*/g, function (a, c) { return c ? a : "!*" }), a = a.replace(/\\\\/g, "\\"); return a = a.replace(/\.\*/g, "*") }, clone: function () {
    return OpenLayers.Util.extend(new OpenLayers.Filter.Comparison,
      this)
  }, CLASS_NAME: "OpenLayers.Filter.Comparison"
}); OpenLayers.Filter.Comparison.EQUAL_TO = "=="; OpenLayers.Filter.Comparison.NOT_EQUAL_TO = "!="; OpenLayers.Filter.Comparison.LESS_THAN = "<"; OpenLayers.Filter.Comparison.GREATER_THAN = ">"; OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO = "<="; OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO = ">="; OpenLayers.Filter.Comparison.BETWEEN = ".."; OpenLayers.Filter.Comparison.LIKE = "~"; OpenLayers.Filter.Comparison.IS_NULL = "NULL"; OpenLayers.Format.Filter = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, { defaultVersion: "1.0.0", CLASS_NAME: "OpenLayers.Format.Filter" }); OpenLayers.Filter.Function = OpenLayers.Class(OpenLayers.Filter, { name: null, params: null, CLASS_NAME: "OpenLayers.Filter.Function" }); OpenLayers.Date = {
  dateRegEx: /^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:(?:T(\d{1,2}):(\d{2}):(\d{2}(?:\.\d+)?)(Z|(?:[+-]\d{1,2}(?::(\d{2}))?)))|Z)?$/, toISOString: function () {
    return "toISOString" in Date.prototype ? function (a) { return a.toISOString() } : function (a) {
      return isNaN(a.getTime()) ? "Invalid Date" : a.getUTCFullYear() + "-" + OpenLayers.Number.zeroPad(a.getUTCMonth() + 1, 2) + "-" + OpenLayers.Number.zeroPad(a.getUTCDate(), 2) + "T" + OpenLayers.Number.zeroPad(a.getUTCHours(), 2) + ":" + OpenLayers.Number.zeroPad(a.getUTCMinutes(),
        2) + ":" + OpenLayers.Number.zeroPad(a.getUTCSeconds(), 2) + "." + OpenLayers.Number.zeroPad(a.getUTCMilliseconds(), 3) + "Z"
    }
  }(), parse: function (a) {
    var b; if ((a = a.match(this.dateRegEx)) && (a[1] || a[7])) {
      b = parseInt(a[1], 10) || 0; var c = parseInt(a[2], 10) - 1 || 0, d = parseInt(a[3], 10) || 1; b = new Date(Date.UTC(b, c, d)); if (c = a[7]) {
        var d = parseInt(a[4], 10), e = parseInt(a[5], 10), f = parseFloat(a[6]), g = f | 0, f = Math.round(1E3 * (f - g)); b.setUTCHours(d, e, g, f); "Z" !== c && (c = parseInt(c, 10), a = parseInt(a[8], 10) || 0, a = -1E3 * (60 * 60 * c + 60 * a), b = new Date(b.getTime() +
          a))
      }
    } else b = new Date("invalid"); return b
  }
}; OpenLayers.Format.Filter.v1 = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { ogc: "http://www.opengis.net/ogc", gml: "http://www.opengis.net/gml", xlink: "http://www.w3.org/1999/xlink", xsi: "http://www.w3.org/2001/XMLSchema-instance" }, defaultPrefix: "ogc", schemaLocation: null, initialize: function (a) { OpenLayers.Format.XML.prototype.initialize.apply(this, [a]) }, read: function (a) { var b = {}; this.readers.ogc.Filter.apply(this, [a, b]); return b.filter }, readers: {
    ogc: {
      _expression: function (a) {
        for (var b = "", c = a.firstChild; c; c =
          c.nextSibling)switch (c.nodeType) { case 1: a = this.readNode(c); a.property ? b += "${" + a.property + "}" : void 0 !== a.value && (b += a.value); break; case 3: case 4: b += c.nodeValue }return b
      }, Filter: function (a, b) { var c = { fids: [], filters: [] }; this.readChildNodes(a, c); 0 < c.fids.length ? b.filter = new OpenLayers.Filter.FeatureId({ fids: c.fids }) : 0 < c.filters.length && (b.filter = c.filters[0]) }, FeatureId: function (a, b) { var c = a.getAttribute("fid"); c && b.fids.push(c) }, And: function (a, b) {
        var c = new OpenLayers.Filter.Logical({ type: OpenLayers.Filter.Logical.AND });
        this.readChildNodes(a, c); b.filters.push(c)
      }, Or: function (a, b) { var c = new OpenLayers.Filter.Logical({ type: OpenLayers.Filter.Logical.OR }); this.readChildNodes(a, c); b.filters.push(c) }, Not: function (a, b) { var c = new OpenLayers.Filter.Logical({ type: OpenLayers.Filter.Logical.NOT }); this.readChildNodes(a, c); b.filters.push(c) }, PropertyIsLessThan: function (a, b) { var c = new OpenLayers.Filter.Comparison({ type: OpenLayers.Filter.Comparison.LESS_THAN }); this.readChildNodes(a, c); b.filters.push(c) }, PropertyIsGreaterThan: function (a,
        b) { var c = new OpenLayers.Filter.Comparison({ type: OpenLayers.Filter.Comparison.GREATER_THAN }); this.readChildNodes(a, c); b.filters.push(c) }, PropertyIsLessThanOrEqualTo: function (a, b) { var c = new OpenLayers.Filter.Comparison({ type: OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO }); this.readChildNodes(a, c); b.filters.push(c) }, PropertyIsGreaterThanOrEqualTo: function (a, b) { var c = new OpenLayers.Filter.Comparison({ type: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO }); this.readChildNodes(a, c); b.filters.push(c) },
      PropertyIsBetween: function (a, b) { var c = new OpenLayers.Filter.Comparison({ type: OpenLayers.Filter.Comparison.BETWEEN }); this.readChildNodes(a, c); b.filters.push(c) }, Literal: function (a, b) { b.value = OpenLayers.String.numericIf(this.getChildValue(a), !0) }, PropertyName: function (a, b) { b.property = this.getChildValue(a) }, LowerBoundary: function (a, b) { b.lowerBoundary = OpenLayers.String.numericIf(this.readers.ogc._expression.call(this, a), !0) }, UpperBoundary: function (a, b) {
      b.upperBoundary = OpenLayers.String.numericIf(this.readers.ogc._expression.call(this,
        a), !0)
      }, Intersects: function (a, b) { this.readSpatial(a, b, OpenLayers.Filter.Spatial.INTERSECTS) }, Within: function (a, b) { this.readSpatial(a, b, OpenLayers.Filter.Spatial.WITHIN) }, Contains: function (a, b) { this.readSpatial(a, b, OpenLayers.Filter.Spatial.CONTAINS) }, DWithin: function (a, b) { this.readSpatial(a, b, OpenLayers.Filter.Spatial.DWITHIN) }, Distance: function (a, b) { b.distance = parseInt(this.getChildValue(a)); b.distanceUnits = a.getAttribute("units") }, Function: function (a, b) { }, PropertyIsNull: function (a, b) {
        var c = new OpenLayers.Filter.Comparison({ type: OpenLayers.Filter.Comparison.IS_NULL });
        this.readChildNodes(a, c); b.filters.push(c)
      }
    }
  }, readSpatial: function (a, b, c) { c = new OpenLayers.Filter.Spatial({ type: c }); this.readChildNodes(a, c); c.value = c.components[0]; delete c.components; b.filters.push(c) }, encodeLiteral: function (a) { a instanceof Date && (a = OpenLayers.Date.toISOString(a)); return a }, writeOgcExpression: function (a, b) { a instanceof OpenLayers.Filter.Function ? this.writeNode("Function", a, b) : this.writeNode("Literal", a, b); return b }, write: function (a) { return this.writers.ogc.Filter.apply(this, [a]) },
  writers: {
    ogc: {
      Filter: function (a) { var b = this.createElementNSPlus("ogc:Filter"); this.writeNode(this.getFilterType(a), a, b); return b }, _featureIds: function (a) { for (var b = this.createDocumentFragment(), c = 0, d = a.fids.length; c < d; ++c)this.writeNode("ogc:FeatureId", a.fids[c], b); return b }, FeatureId: function (a) { return this.createElementNSPlus("ogc:FeatureId", { attributes: { fid: a } }) }, And: function (a) {
        for (var b = this.createElementNSPlus("ogc:And"), c, d = 0, e = a.filters.length; d < e; ++d)c = a.filters[d], this.writeNode(this.getFilterType(c),
          c, b); return b
      }, Or: function (a) { for (var b = this.createElementNSPlus("ogc:Or"), c, d = 0, e = a.filters.length; d < e; ++d)c = a.filters[d], this.writeNode(this.getFilterType(c), c, b); return b }, Not: function (a) { var b = this.createElementNSPlus("ogc:Not"); a = a.filters[0]; this.writeNode(this.getFilterType(a), a, b); return b }, PropertyIsLessThan: function (a) { var b = this.createElementNSPlus("ogc:PropertyIsLessThan"); this.writeNode("PropertyName", a, b); this.writeOgcExpression(a.value, b); return b }, PropertyIsGreaterThan: function (a) {
        var b =
          this.createElementNSPlus("ogc:PropertyIsGreaterThan"); this.writeNode("PropertyName", a, b); this.writeOgcExpression(a.value, b); return b
      }, PropertyIsLessThanOrEqualTo: function (a) { var b = this.createElementNSPlus("ogc:PropertyIsLessThanOrEqualTo"); this.writeNode("PropertyName", a, b); this.writeOgcExpression(a.value, b); return b }, PropertyIsGreaterThanOrEqualTo: function (a) {
        var b = this.createElementNSPlus("ogc:PropertyIsGreaterThanOrEqualTo"); this.writeNode("PropertyName", a, b); this.writeOgcExpression(a.value, b);
        return b
      }, PropertyIsBetween: function (a) { var b = this.createElementNSPlus("ogc:PropertyIsBetween"); this.writeNode("PropertyName", a, b); this.writeNode("LowerBoundary", a, b); this.writeNode("UpperBoundary", a, b); return b }, PropertyName: function (a) { return this.createElementNSPlus("ogc:PropertyName", { value: a.property }) }, Literal: function (a) { return this.createElementNSPlus("ogc:Literal", { value: (this.encodeLiteral || OpenLayers.Format.Filter.v1.prototype.encodeLiteral)(a) }) }, LowerBoundary: function (a) {
        var b = this.createElementNSPlus("ogc:LowerBoundary");
        this.writeOgcExpression(a.lowerBoundary, b); return b
      }, UpperBoundary: function (a) { var b = this.createElementNSPlus("ogc:UpperBoundary"); this.writeNode("Literal", a.upperBoundary, b); return b }, INTERSECTS: function (a) { return this.writeSpatial(a, "Intersects") }, WITHIN: function (a) { return this.writeSpatial(a, "Within") }, CONTAINS: function (a) { return this.writeSpatial(a, "Contains") }, DWITHIN: function (a) { var b = this.writeSpatial(a, "DWithin"); this.writeNode("Distance", a, b); return b }, Distance: function (a) {
        return this.createElementNSPlus("ogc:Distance",
          { attributes: { units: a.distanceUnits }, value: a.distance })
      }, Function: function (a) { var b = this.createElementNSPlus("ogc:Function", { attributes: { name: a.name } }); a = a.params; for (var c = 0, d = a.length; c < d; c++)this.writeOgcExpression(a[c], b); return b }, PropertyIsNull: function (a) { var b = this.createElementNSPlus("ogc:PropertyIsNull"); this.writeNode("PropertyName", a, b); return b }
    }
  }, getFilterType: function (a) { var b = this.filterMap[a.type]; if (!b) throw "Filter writing not supported for rule type: " + a.type; return b }, filterMap: {
    "&&": "And",
    "||": "Or", "!": "Not", "==": "PropertyIsEqualTo", "!=": "PropertyIsNotEqualTo", "<": "PropertyIsLessThan", ">": "PropertyIsGreaterThan", "<=": "PropertyIsLessThanOrEqualTo", ">=": "PropertyIsGreaterThanOrEqualTo", "..": "PropertyIsBetween", "~": "PropertyIsLike", NULL: "PropertyIsNull", BBOX: "BBOX", DWITHIN: "DWITHIN", WITHIN: "WITHIN", CONTAINS: "CONTAINS", INTERSECTS: "INTERSECTS", FID: "_featureIds"
  }, CLASS_NAME: "OpenLayers.Format.Filter.v1"
}); OpenLayers.Geometry = OpenLayers.Class({
  id: null, parent: null, bounds: null, initialize: function () { this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_") }, destroy: function () { this.bounds = this.id = null }, clone: function () { return new OpenLayers.Geometry }, setBounds: function (a) { a && (this.bounds = a.clone()) }, clearBounds: function () { this.bounds = null; this.parent && this.parent.clearBounds() }, extendBounds: function (a) { this.getBounds() ? this.bounds.extend(a) : this.setBounds(a) }, getBounds: function () {
  null == this.bounds && this.calculateBounds();
    return this.bounds
  }, calculateBounds: function () { }, distanceTo: function (a, b) { }, getVertices: function (a) { }, atPoint: function (a, b, c) { var d = !1; null != this.getBounds() && null != a && (b = null != b ? b : 0, c = null != c ? c : 0, d = (new OpenLayers.Bounds(this.bounds.left - b, this.bounds.bottom - c, this.bounds.right + b, this.bounds.top + c)).containsLonLat(a)); return d }, getLength: function () { return 0 }, getArea: function () { return 0 }, getCentroid: function () { return null }, toString: function () {
    return OpenLayers.Format && OpenLayers.Format.WKT ? OpenLayers.Format.WKT.prototype.write(new OpenLayers.Feature.Vector(this)) :
      Object.prototype.toString.call(this)
  }, CLASS_NAME: "OpenLayers.Geometry"
}); OpenLayers.Geometry.fromWKT = function (a) { var b; if (OpenLayers.Format && OpenLayers.Format.WKT) { var c = OpenLayers.Geometry.fromWKT.format; c || (c = new OpenLayers.Format.WKT, OpenLayers.Geometry.fromWKT.format = c); a = c.read(a); if (a instanceof OpenLayers.Feature.Vector) b = a.geometry; else if (OpenLayers.Util.isArray(a)) { b = a.length; for (var c = Array(b), d = 0; d < b; ++d)c[d] = a[d].geometry; b = new OpenLayers.Geometry.Collection(c) } } return b };
OpenLayers.Geometry.segmentsIntersect = function (a, b, c) {
  var d = c && c.point; c = c && c.tolerance; var e = !1, f = a.x1 - b.x1, g = a.y1 - b.y1, h = a.x2 - a.x1, k = a.y2 - a.y1, l = b.y2 - b.y1, m = b.x2 - b.x1, n = l * h - m * k, l = m * g - l * f, g = h * g - k * f; 0 == n ? 0 == l && 0 == g && (e = !0) : (f = l / n, n = g / n, 0 <= f && (1 >= f && 0 <= n && 1 >= n) && (d ? (h = a.x1 + f * h, n = a.y1 + f * k, e = new OpenLayers.Geometry.Point(h, n)) : e = !0)); if (c) if (e) { if (d) a: for (a = [a, b], b = 0; 2 > b; ++b)for (f = a[b], k = 1; 3 > k; ++k)if (h = f["x" + k], n = f["y" + k], d = Math.sqrt(Math.pow(h - e.x, 2) + Math.pow(n - e.y, 2)), d < c) { e.x = h; e.y = n; break a } } else a: for (a =
    [a, b], b = 0; 2 > b; ++b)for (h = a[b], n = a[(b + 1) % 2], k = 1; 3 > k; ++k)if (f = { x: h["x" + k], y: h["y" + k] }, g = OpenLayers.Geometry.distanceToSegment(f, n), g.distance < c) { e = d ? new OpenLayers.Geometry.Point(f.x, f.y) : !0; break a } return e
}; OpenLayers.Geometry.distanceToSegment = function (a, b) { var c = OpenLayers.Geometry.distanceSquaredToSegment(a, b); c.distance = Math.sqrt(c.distance); return c };
OpenLayers.Geometry.distanceSquaredToSegment = function (a, b) { var c = a.x, d = a.y, e = b.x1, f = b.y1, g = b.x2, h = b.y2, k = g - e, l = h - f, m = (k * (c - e) + l * (d - f)) / (Math.pow(k, 2) + Math.pow(l, 2)); 0 >= m || (1 <= m ? (e = g, f = h) : (e += m * k, f += m * l)); return { distance: Math.pow(e - c, 2) + Math.pow(f - d, 2), x: e, y: f, along: m } }; OpenLayers.Geometry.Point = OpenLayers.Class(OpenLayers.Geometry, {
  x: null, y: null, initialize: function (a, b) { OpenLayers.Geometry.prototype.initialize.apply(this, arguments); this.x = parseFloat(a); this.y = parseFloat(b) }, clone: function (a) { null == a && (a = new OpenLayers.Geometry.Point(this.x, this.y)); OpenLayers.Util.applyDefaults(a, this); return a }, calculateBounds: function () { this.bounds = new OpenLayers.Bounds(this.x, this.y, this.x, this.y) }, distanceTo: function (a, b) {
    var c = !(b && !1 === b.edge) && b && b.details, d, e, f, g, h; a instanceof
      OpenLayers.Geometry.Point ? (e = this.x, f = this.y, g = a.x, h = a.y, d = Math.sqrt(Math.pow(e - g, 2) + Math.pow(f - h, 2)), d = c ? { x0: e, y0: f, x1: g, y1: h, distance: d } : d) : (d = a.distanceTo(this, b), c && (d = { x0: d.x1, y0: d.y1, x1: d.x0, y1: d.y0, distance: d.distance })); return d
  }, equals: function (a) { var b = !1; null != a && (b = this.x == a.x && this.y == a.y || isNaN(this.x) && isNaN(this.y) && isNaN(a.x) && isNaN(a.y)); return b }, toShortString: function () { return this.x + ", " + this.y }, move: function (a, b) { this.x += a; this.y += b; this.clearBounds() }, rotate: function (a, b) {
    a *=
    Math.PI / 180; var c = this.distanceTo(b), d = a + Math.atan2(this.y - b.y, this.x - b.x); this.x = b.x + c * Math.cos(d); this.y = b.y + c * Math.sin(d); this.clearBounds()
  }, getCentroid: function () { return new OpenLayers.Geometry.Point(this.x, this.y) }, resize: function (a, b, c) { this.x = b.x + a * (void 0 == c ? 1 : c) * (this.x - b.x); this.y = b.y + a * (this.y - b.y); this.clearBounds(); return this }, intersects: function (a) { var b = !1; return b = "OpenLayers.Geometry.Point" == a.CLASS_NAME ? this.equals(a) : a.intersects(this) }, transform: function (a, b) {
  a && b && (OpenLayers.Projection.transform(this,
    a, b), this.bounds = null); return this
  }, getVertices: function (a) { return [this] }, CLASS_NAME: "OpenLayers.Geometry.Point"
}); OpenLayers.Geometry.Collection = OpenLayers.Class(OpenLayers.Geometry, {
  components: null, componentTypes: null, initialize: function (a) { OpenLayers.Geometry.prototype.initialize.apply(this, arguments); this.components = []; null != a && this.addComponents(a) }, destroy: function () { this.components.length = 0; this.components = null; OpenLayers.Geometry.prototype.destroy.apply(this, arguments) }, clone: function () {
    for (var a = eval("new " + this.CLASS_NAME + "()"), b = 0, c = this.components.length; b < c; b++)a.addComponent(this.components[b].clone());
    OpenLayers.Util.applyDefaults(a, this); return a
  }, getComponentsString: function () { for (var a = [], b = 0, c = this.components.length; b < c; b++)a.push(this.components[b].toShortString()); return a.join(",") }, calculateBounds: function () { this.bounds = null; var a = new OpenLayers.Bounds, b = this.components; if (b) for (var c = 0, d = b.length; c < d; c++)a.extend(b[c].getBounds()); null != a.left && (null != a.bottom && null != a.right && null != a.top) && this.setBounds(a) }, addComponents: function (a) {
    OpenLayers.Util.isArray(a) || (a = [a]); for (var b = 0, c = a.length; b <
      c; b++)this.addComponent(a[b])
  }, addComponent: function (a, b) { var c = !1; if (a && (null == this.componentTypes || -1 < OpenLayers.Util.indexOf(this.componentTypes, a.CLASS_NAME))) { if (null != b && b < this.components.length) { var c = this.components.slice(0, b), d = this.components.slice(b, this.components.length); c.push(a); this.components = c.concat(d) } else this.components.push(a); a.parent = this; this.clearBounds(); c = !0 } return c }, removeComponents: function (a) {
    var b = !1; OpenLayers.Util.isArray(a) || (a = [a]); for (var c = a.length - 1; 0 <= c; --c)b =
      this.removeComponent(a[c]) || b; return b
  }, removeComponent: function (a) { OpenLayers.Util.removeItem(this.components, a); this.clearBounds(); return !0 }, getLength: function () { for (var a = 0, b = 0, c = this.components.length; b < c; b++)a += this.components[b].getLength(); return a }, getArea: function () { for (var a = 0, b = 0, c = this.components.length; b < c; b++)a += this.components[b].getArea(); return a }, getGeodesicArea: function (a) { for (var b = 0, c = 0, d = this.components.length; c < d; c++)b += this.components[c].getGeodesicArea(a); return b }, getCentroid: function (a) {
    if (!a) return this.components.length &&
      this.components[0].getCentroid(); a = this.components.length; if (!a) return !1; for (var b = [], c = [], d = 0, e = Number.MAX_VALUE, f, g = 0; g < a; ++g) { f = this.components[g]; var h = f.getArea(); f = f.getCentroid(!0); isNaN(h) || (isNaN(f.x) || isNaN(f.y)) || (b.push(h), d += h, e = h < e && 0 < h ? h : e, c.push(f)) } a = b.length; if (0 === d) { for (g = 0; g < a; ++g)b[g] = 1; d = b.length } else { for (g = 0; g < a; ++g)b[g] /= e; d /= e } for (var k = e = 0, g = 0; g < a; ++g)f = c[g], h = b[g], e += f.x * h, k += f.y * h; return new OpenLayers.Geometry.Point(e / d, k / d)
  }, getGeodesicLength: function (a) {
    for (var b = 0,
      c = 0, d = this.components.length; c < d; c++)b += this.components[c].getGeodesicLength(a); return b
  }, move: function (a, b) { for (var c = 0, d = this.components.length; c < d; c++)this.components[c].move(a, b) }, rotate: function (a, b) { for (var c = 0, d = this.components.length; c < d; ++c)this.components[c].rotate(a, b) }, resize: function (a, b, c) { for (var d = 0; d < this.components.length; ++d)this.components[d].resize(a, b, c); return this }, distanceTo: function (a, b) {
    for (var c = !(b && !1 === b.edge) && b && b.details, d, e, f, g = Number.POSITIVE_INFINITY, h = 0, k = this.components.length; h <
      k && !(d = this.components[h].distanceTo(a, b), f = c ? d.distance : d, f < g && (g = f, e = d, 0 == g)); ++h); return e
  }, equals: function (a) { var b = !0; if (a && a.CLASS_NAME && this.CLASS_NAME == a.CLASS_NAME) if (OpenLayers.Util.isArray(a.components) && a.components.length == this.components.length) for (var c = 0, d = this.components.length; c < d; ++c) { if (!this.components[c].equals(a.components[c])) { b = !1; break } } else b = !1; else b = !1; return b }, transform: function (a, b) {
    if (a && b) {
      for (var c = 0, d = this.components.length; c < d; c++)this.components[c].transform(a,
        b); this.bounds = null
    } return this
  }, intersects: function (a) { for (var b = !1, c = 0, d = this.components.length; c < d && !(b = a.intersects(this.components[c])); ++c); return b }, getVertices: function (a) { for (var b = [], c = 0, d = this.components.length; c < d; ++c)Array.prototype.push.apply(b, this.components[c].getVertices(a)); return b }, CLASS_NAME: "OpenLayers.Geometry.Collection"
}); OpenLayers.Geometry.MultiPoint = OpenLayers.Class(OpenLayers.Geometry.Collection, { componentTypes: ["OpenLayers.Geometry.Point"], addPoint: function (a, b) { this.addComponent(a, b) }, removePoint: function (a) { this.removeComponent(a) }, CLASS_NAME: "OpenLayers.Geometry.MultiPoint" }); OpenLayers.Geometry.Curve = OpenLayers.Class(OpenLayers.Geometry.MultiPoint, {
  componentTypes: ["OpenLayers.Geometry.Point"], getLength: function () { var a = 0; if (this.components && 1 < this.components.length) for (var b = 1, c = this.components.length; b < c; b++)a += this.components[b - 1].distanceTo(this.components[b]); return a }, getGeodesicLength: function (a) {
    var b = this; if (a) { var c = new OpenLayers.Projection("EPSG:4326"); c.equals(a) || (b = this.clone().transform(a, c)) } a = 0; if (b.components && 1 < b.components.length) for (var d, e = 1, f = b.components.length; e <
      f; e++)c = b.components[e - 1], d = b.components[e], a += OpenLayers.Util.distVincenty({ lon: c.x, lat: c.y }, { lon: d.x, lat: d.y }); return 1E3 * a
  }, CLASS_NAME: "OpenLayers.Geometry.Curve"
}); OpenLayers.Geometry.LineString = OpenLayers.Class(OpenLayers.Geometry.Curve, {
  removeComponent: function (a) { var b = this.components && 2 < this.components.length; b && OpenLayers.Geometry.Collection.prototype.removeComponent.apply(this, arguments); return b }, intersects: function (a) {
    var b = !1, c = a.CLASS_NAME; if ("OpenLayers.Geometry.LineString" == c || "OpenLayers.Geometry.LinearRing" == c || "OpenLayers.Geometry.Point" == c) {
      var d = this.getSortedSegments(); a = "OpenLayers.Geometry.Point" == c ? [{ x1: a.x, y1: a.y, x2: a.x, y2: a.y }] : a.getSortedSegments();
      var e, f, g, h, k, l, m, n = 0, p = d.length; a: for (; n < p; ++n) { c = d[n]; e = c.x1; f = c.x2; g = c.y1; h = c.y2; var q = 0, r = a.length; for (; q < r; ++q) { k = a[q]; if (k.x1 > f) break; if (!(k.x2 < e || (l = k.y1, m = k.y2, Math.min(l, m) > Math.max(g, h) || Math.max(l, m) < Math.min(g, h) || !OpenLayers.Geometry.segmentsIntersect(c, k)))) { b = !0; break a } } }
    } else b = a.intersects(this); return b
  }, getSortedSegments: function () {
    for (var a = this.components.length - 1, b = Array(a), c, d, e = 0; e < a; ++e)c = this.components[e], d = this.components[e + 1], b[e] = c.x < d.x ? { x1: c.x, y1: c.y, x2: d.x, y2: d.y } :
      { x1: d.x, y1: d.y, x2: c.x, y2: c.y }; return b.sort(function (a, b) { return a.x1 - b.x1 })
  }, splitWithSegment: function (a, b) {
    for (var c = !(b && !1 === b.edge), d = b && b.tolerance, e = [], f = this.getVertices(), g = [], h = [], k = !1, l, m, n, p = { point: !0, tolerance: d }, q = null, r = 0, s = f.length - 2; r <= s; ++r)if (d = f[r], g.push(d.clone()), l = f[r + 1], m = { x1: d.x, y1: d.y, x2: l.x, y2: l.y }, m = OpenLayers.Geometry.segmentsIntersect(a, m, p), m instanceof OpenLayers.Geometry.Point && ((n = m.x === a.x1 && m.y === a.y1 || m.x === a.x2 && m.y === a.y2 || m.equals(d) || m.equals(l) ? !0 : !1) || c)) m.equals(h[h.length -
      1]) || h.push(m.clone()), 0 === r && m.equals(d) || m.equals(l) || (k = !0, m.equals(d) || g.push(m), e.push(new OpenLayers.Geometry.LineString(g)), g = [m.clone()]); k && (g.push(l.clone()), e.push(new OpenLayers.Geometry.LineString(g))); if (0 < h.length) var t = a.x1 < a.x2 ? 1 : -1, u = a.y1 < a.y2 ? 1 : -1, q = { lines: e, points: h.sort(function (a, b) { return t * a.x - t * b.x || u * a.y - u * b.y }) }; return q
  }, split: function (a, b) {
    var c = null, d = b && b.mutual, e, f, g, h; if (a instanceof OpenLayers.Geometry.LineString) {
      var k = this.getVertices(), l, m, n, p, q, r = []; g = []; for (var s =
        0, t = k.length - 2; s <= t; ++s) { l = k[s]; m = k[s + 1]; n = { x1: l.x, y1: l.y, x2: m.x, y2: m.y }; h = h || [a]; d && r.push(l.clone()); for (var u = 0; u < h.length; ++u)if (p = h[u].splitWithSegment(n, b)) if (q = p.lines, 0 < q.length && (q.unshift(u, 1), Array.prototype.splice.apply(h, q), u += q.length - 2), d) for (var v = 0, w = p.points.length; v < w; ++v)q = p.points[v], q.equals(l) || (r.push(q), g.push(new OpenLayers.Geometry.LineString(r)), r = q.equals(m) ? [] : [q.clone()]) } d && (0 < g.length && 0 < r.length) && (r.push(m.clone()), g.push(new OpenLayers.Geometry.LineString(r)))
    } else c =
      a.splitWith(this, b); h && 1 < h.length ? f = !0 : h = []; g && 1 < g.length ? e = !0 : g = []; if (f || e) c = d ? [g, h] : h; return c
  }, splitWith: function (a, b) { return a.split(this, b) }, getVertices: function (a) { return !0 === a ? [this.components[0], this.components[this.components.length - 1]] : !1 === a ? this.components.slice(1, this.components.length - 1) : this.components.slice() }, distanceTo: function (a, b) {
    var c = !(b && !1 === b.edge) && b && b.details, d, e = {}, f = Number.POSITIVE_INFINITY; if (a instanceof OpenLayers.Geometry.Point) {
      for (var g = this.getSortedSegments(),
        h = a.x, k = a.y, l, m = 0, n = g.length; m < n; ++m)if (l = g[m], d = OpenLayers.Geometry.distanceToSegment(a, l), d.distance < f) { if (f = d.distance, e = d, 0 === f) break } else if (l.x2 > h && (k > l.y1 && k < l.y2 || k < l.y1 && k > l.y2)) break; e = c ? { distance: e.distance, x0: e.x, y0: e.y, x1: h, y1: k } : e.distance
    } else if (a instanceof OpenLayers.Geometry.LineString) {
      var g = this.getSortedSegments(), h = a.getSortedSegments(), p, q, r = h.length, s = { point: !0 }, m = 0, n = g.length; a: for (; m < n; ++m) {
        k = g[m]; l = k.x1; q = k.y1; for (var t = 0; t < r; ++t)if (d = h[t], p = OpenLayers.Geometry.segmentsIntersect(k,
          d, s)) { f = 0; e = { distance: 0, x0: p.x, y0: p.y, x1: p.x, y1: p.y }; break a } else d = OpenLayers.Geometry.distanceToSegment({ x: l, y: q }, d), d.distance < f && (f = d.distance, e = { distance: f, x0: l, y0: q, x1: d.x, y1: d.y })
      } c || (e = e.distance); 0 !== f && k && (d = a.distanceTo(new OpenLayers.Geometry.Point(k.x2, k.y2), b), m = c ? d.distance : d, m < f && (e = c ? { distance: f, x0: d.x1, y0: d.y1, x1: d.x0, y1: d.y0 } : m))
    } else e = a.distanceTo(this, b), c && (e = { distance: e.distance, x0: e.x1, y0: e.y1, x1: e.x0, y1: e.y0 }); return e
  }, simplify: function (a) {
    if (this && null !== this) {
      var b = this.getVertices();
      if (3 > b.length) return this; var c = function (a, b, d, k) { for (var l = 0, m = 0, n = b, p; n < d; n++) { p = a[b]; var q = a[d], r = a[n], r = Math.abs(0.5 * (p.x * q.y + q.x * r.y + r.x * p.y - q.x * p.y - r.x * q.y - p.x * r.y)); p = Math.sqrt(Math.pow(p.x - q.x, 2) + Math.pow(p.y - q.y, 2)); p = 2 * (r / p); p > l && (l = p, m = n) } l > k && m != b && (e.push(m), c(a, b, m, k), c(a, m, d, k)) }, d = b.length - 1, e = []; e.push(0); for (e.push(d); b[0].equals(b[d]);)d-- , e.push(d); c(b, 0, d, a); a = []; e.sort(function (a, b) { return a - b }); for (d = 0; d < e.length; d++)a.push(b[e[d]]); return new OpenLayers.Geometry.LineString(a)
    } return this
  },
  CLASS_NAME: "OpenLayers.Geometry.LineString"
}); OpenLayers.Geometry.MultiLineString = OpenLayers.Class(OpenLayers.Geometry.Collection, {
  componentTypes: ["OpenLayers.Geometry.LineString"], split: function (a, b) {
    for (var c = null, d = b && b.mutual, e, f, g, h, k = [], l = [a], m = 0, n = this.components.length; m < n; ++m) {
      f = this.components[m]; g = !1; for (var p = 0; p < l.length; ++p)if (e = f.split(l[p], b)) {
        if (d) { g = e[0]; for (var q = 0, r = g.length; q < r; ++q)0 === q && k.length ? k[k.length - 1].addComponent(g[q]) : k.push(new OpenLayers.Geometry.MultiLineString([g[q]])); g = !0; e = e[1] } if (e.length) {
          e.unshift(p,
            1); Array.prototype.splice.apply(l, e); break
        }
      } g || (k.length ? k[k.length - 1].addComponent(f.clone()) : k = [new OpenLayers.Geometry.MultiLineString(f.clone())])
    } k && 1 < k.length ? g = !0 : k = []; l && 1 < l.length ? h = !0 : l = []; if (g || h) c = d ? [k, l] : l; return c
  }, splitWith: function (a, b) {
    var c = null, d = b && b.mutual, e, f, g, h, k, l; if (a instanceof OpenLayers.Geometry.LineString) {
      l = []; k = [a]; for (var m = 0, n = this.components.length; m < n; ++m) {
        g = !1; f = this.components[m]; for (var p = 0; p < k.length; ++p)if (e = k[p].split(f, b)) {
          d && (g = e[0], g.length && (g.unshift(p,
            1), Array.prototype.splice.apply(k, g), p += g.length - 2), e = e[1], 0 === e.length && (e = [f.clone()])); g = 0; for (var q = e.length; g < q; ++g)0 === g && l.length ? l[l.length - 1].addComponent(e[g]) : l.push(new OpenLayers.Geometry.MultiLineString([e[g]])); g = !0
        } g || (l.length ? l[l.length - 1].addComponent(f.clone()) : l = [new OpenLayers.Geometry.MultiLineString([f.clone()])])
      }
    } else c = a.split(this); k && 1 < k.length ? h = !0 : k = []; l && 1 < l.length ? g = !0 : l = []; if (h || g) c = d ? [k, l] : l; return c
  }, CLASS_NAME: "OpenLayers.Geometry.MultiLineString"
}); OpenLayers.Geometry.LinearRing = OpenLayers.Class(OpenLayers.Geometry.LineString, {
  componentTypes: ["OpenLayers.Geometry.Point"], addComponent: function (a, b) { var c = !1, d = this.components.pop(); null == b && a.equals(d) || (c = OpenLayers.Geometry.Collection.prototype.addComponent.apply(this, arguments)); OpenLayers.Geometry.Collection.prototype.addComponent.apply(this, [this.components[0]]); return c }, removeComponent: function (a) {
    var b = this.components && 3 < this.components.length; b && (this.components.pop(), OpenLayers.Geometry.Collection.prototype.removeComponent.apply(this,
      arguments), OpenLayers.Geometry.Collection.prototype.addComponent.apply(this, [this.components[0]])); return b
  }, move: function (a, b) { for (var c = 0, d = this.components.length; c < d - 1; c++)this.components[c].move(a, b) }, rotate: function (a, b) { for (var c = 0, d = this.components.length; c < d - 1; ++c)this.components[c].rotate(a, b) }, resize: function (a, b, c) { for (var d = 0, e = this.components.length; d < e - 1; ++d)this.components[d].resize(a, b, c); return this }, transform: function (a, b) {
    if (a && b) {
      for (var c = 0, d = this.components.length; c < d - 1; c++)this.components[c].transform(a,
        b); this.bounds = null
    } return this
  }, getCentroid: function () {
    if (this.components) {
      var a = this.components.length; if (0 < a && 2 >= a) return this.components[0].clone(); if (2 < a) {
        var b = 0, c = 0, d = this.components[0].x, e = this.components[0].y, f = -1 * this.getArea(); if (0 != f) { for (var g = 0; g < a - 1; g++)var h = this.components[g], k = this.components[g + 1], b = b + (h.x + k.x - 2 * d) * ((h.x - d) * (k.y - e) - (k.x - d) * (h.y - e)), c = c + (h.y + k.y - 2 * e) * ((h.x - d) * (k.y - e) - (k.x - d) * (h.y - e)); b = d + b / (6 * f); a = e + c / (6 * f) } else {
          for (g = 0; g < a - 1; g++)b += this.components[g].x, c += this.components[g].y;
          b /= a - 1; a = c / (a - 1)
        } return new OpenLayers.Geometry.Point(b, a)
      } return null
    }
  }, getArea: function () { var a = 0; if (this.components && 2 < this.components.length) { for (var b = a = 0, c = this.components.length; b < c - 1; b++)var d = this.components[b], e = this.components[b + 1], a = a + (d.x + e.x) * (e.y - d.y); a = -a / 2 } return a }, getGeodesicArea: function (a) {
    var b = this; if (a) { var c = new OpenLayers.Projection("EPSG:4326"); c.equals(a) || (b = this.clone().transform(a, c)) } a = 0; c = b.components && b.components.length; if (2 < c) {
      for (var d, e, f = 0; f < c - 1; f++)d = b.components[f],
        e = b.components[f + 1], a += OpenLayers.Util.rad(e.x - d.x) * (2 + Math.sin(OpenLayers.Util.rad(d.y)) + Math.sin(OpenLayers.Util.rad(e.y))); a = 40680631590769 * a / 2
    } return a
  }, containsPoint: function (a) {
    var b = OpenLayers.Number.limitSigDigs, c = b(a.x, 14); a = b(a.y, 14); for (var d = this.components.length - 1, e, f, g, h, k, l = 0, m = 0; m < d; ++m)if (e = this.components[m], g = b(e.x, 14), e = b(e.y, 14), f = this.components[m + 1], h = b(f.x, 14), f = b(f.y, 14), e == f) { if (a == e && (g <= h && c >= g && c <= h || g >= h && c <= g && c >= h)) { l = -1; break } } else {
      k = b((a - f) * ((h - g) / (f - e)) + h, 14); if (k ==
        c && (e < f && a >= e && a <= f || e > f && a <= e && a >= f)) { l = -1; break } k <= c || g != h && (k < Math.min(g, h) || k > Math.max(g, h)) || (e < f && a >= e && a < f || e > f && a < e && a >= f) && ++l
    } return -1 == l ? 1 : !!(l & 1)
  }, intersects: function (a) {
    var b = !1; if ("OpenLayers.Geometry.Point" == a.CLASS_NAME) b = this.containsPoint(a); else if ("OpenLayers.Geometry.LineString" == a.CLASS_NAME) b = a.intersects(this); else if ("OpenLayers.Geometry.LinearRing" == a.CLASS_NAME) b = OpenLayers.Geometry.LineString.prototype.intersects.apply(this, [a]); else for (var c = 0, d = a.components.length; c <
      d && !(b = a.components[c].intersects(this)); ++c); return b
  }, getVertices: function (a) { return !0 === a ? [] : this.components.slice(0, this.components.length - 1) }, CLASS_NAME: "OpenLayers.Geometry.LinearRing"
}); OpenLayers.Geometry.Polygon = OpenLayers.Class(OpenLayers.Geometry.Collection, {
  componentTypes: ["OpenLayers.Geometry.LinearRing"], getArea: function () { var a = 0; if (this.components && 0 < this.components.length) for (var a = a + Math.abs(this.components[0].getArea()), b = 1, c = this.components.length; b < c; b++)a -= Math.abs(this.components[b].getArea()); return a }, getGeodesicArea: function (a) {
    var b = 0; if (this.components && 0 < this.components.length) for (var b = b + Math.abs(this.components[0].getGeodesicArea(a)), c = 1, d = this.components.length; c <
      d; c++)b -= Math.abs(this.components[c].getGeodesicArea(a)); return b
  }, containsPoint: function (a) { var b = this.components.length, c = !1; if (0 < b && (c = this.components[0].containsPoint(a), 1 !== c && c && 1 < b)) for (var d, e = 1; e < b; ++e)if (d = this.components[e].containsPoint(a)) { c = 1 === d ? 1 : !1; break } return c }, intersects: function (a) {
    var b = !1, c, d; if ("OpenLayers.Geometry.Point" == a.CLASS_NAME) b = this.containsPoint(a); else if ("OpenLayers.Geometry.LineString" == a.CLASS_NAME || "OpenLayers.Geometry.LinearRing" == a.CLASS_NAME) {
      c = 0; for (d =
        this.components.length; c < d && !(b = a.intersects(this.components[c])); ++c); if (!b) for (c = 0, d = a.components.length; c < d && !(b = this.containsPoint(a.components[c])); ++c);
    } else for (c = 0, d = a.components.length; c < d && !(b = this.intersects(a.components[c])); ++c); if (!b && "OpenLayers.Geometry.Polygon" == a.CLASS_NAME) { var e = this.components[0]; c = 0; for (d = e.components.length; c < d && !(b = a.containsPoint(e.components[c])); ++c); } return b
  }, distanceTo: function (a, b) {
    return b && !1 === b.edge && this.intersects(a) ? 0 : OpenLayers.Geometry.Collection.prototype.distanceTo.apply(this,
      [a, b])
  }, CLASS_NAME: "OpenLayers.Geometry.Polygon"
}); OpenLayers.Geometry.Polygon.createRegularPolygon = function (a, b, c, d) { var e = Math.PI * (1 / c - 0.5); d && (e += d / 180 * Math.PI); for (var f, g = [], h = 0; h < c; ++h)f = e + 2 * h * Math.PI / c, d = a.x + b * Math.cos(f), f = a.y + b * Math.sin(f), g.push(new OpenLayers.Geometry.Point(d, f)); a = new OpenLayers.Geometry.LinearRing(g); return new OpenLayers.Geometry.Polygon([a]) }; OpenLayers.Geometry.MultiPolygon = OpenLayers.Class(OpenLayers.Geometry.Collection, { componentTypes: ["OpenLayers.Geometry.Polygon"], CLASS_NAME: "OpenLayers.Geometry.MultiPolygon" }); OpenLayers.Format.GML = OpenLayers.Class(OpenLayers.Format.XML, {
  featureNS: "http://mapserver.gis.umn.edu/mapserver", featurePrefix: "feature", featureName: "featureMember", layerName: "features", geometryName: "geometry", collectionName: "FeatureCollection", gmlns: "http://www.opengis.net/gml", extractAttributes: !0, xy: !0, initialize: function (a) { this.regExes = { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g }; OpenLayers.Format.XML.prototype.initialize.apply(this, [a]) }, read: function (a) {
  "string" ==
    typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); a = this.getElementsByTagNameNS(a.documentElement, this.gmlns, this.featureName); for (var b = [], c = 0; c < a.length; c++) { var d = this.parseFeature(a[c]); d && b.push(d) } return b
  }, parseFeature: function (a) {
    for (var b = "MultiPolygon Polygon MultiLineString LineString MultiPoint Point Envelope".split(" "), c, d, e, f = 0; f < b.length; ++f)if (c = b[f], d = this.getElementsByTagNameNS(a, this.gmlns, c), 0 < d.length) {
      if (e = this.parseGeometry[c.toLowerCase()]) e = e.apply(this,
        [d[0]]), this.internalProjection && this.externalProjection && e.transform(this.externalProjection, this.internalProjection); else throw new TypeError("Unsupported geometry type: " + c); break
    } var g; c = this.getElementsByTagNameNS(a, this.gmlns, "Box"); for (f = 0; f < c.length; ++f)b = c[f], d = this.parseGeometry.box.apply(this, [b]), b = b.parentNode, "boundedBy" === (b.localName || b.nodeName.split(":").pop()) ? g = d : e = d.toGeometry(); var h; this.extractAttributes && (h = this.parseAttributes(a)); h = new OpenLayers.Feature.Vector(e, h); h.bounds =
      g; h.gml = { featureType: a.firstChild.nodeName.split(":")[1], featureNS: a.firstChild.namespaceURI, featureNSPrefix: a.firstChild.prefix }; a = a.firstChild; for (var k; a && (1 != a.nodeType || !(k = a.getAttribute("fid") || a.getAttribute("id")));)a = a.nextSibling; h.fid = k; return h
  }, parseGeometry: {
    point: function (a) {
      var b, c; c = []; b = this.getElementsByTagNameNS(a, this.gmlns, "pos"); 0 < b.length && (c = b[0].firstChild.nodeValue, c = c.replace(this.regExes.trimSpace, ""), c = c.split(this.regExes.splitSpace)); 0 == c.length && (b = this.getElementsByTagNameNS(a,
        this.gmlns, "coordinates"), 0 < b.length && (c = b[0].firstChild.nodeValue, c = c.replace(this.regExes.removeSpace, ""), c = c.split(","))); 0 == c.length && (b = this.getElementsByTagNameNS(a, this.gmlns, "coord"), 0 < b.length && (a = this.getElementsByTagNameNS(b[0], this.gmlns, "X"), b = this.getElementsByTagNameNS(b[0], this.gmlns, "Y"), 0 < a.length && 0 < b.length && (c = [a[0].firstChild.nodeValue, b[0].firstChild.nodeValue]))); 2 == c.length && (c[2] = null); return this.xy ? new OpenLayers.Geometry.Point(c[0], c[1], c[2]) : new OpenLayers.Geometry.Point(c[1],
          c[0], c[2])
    }, multipoint: function (a) { a = this.getElementsByTagNameNS(a, this.gmlns, "Point"); var b = []; if (0 < a.length) for (var c, d = 0; d < a.length; ++d)(c = this.parseGeometry.point.apply(this, [a[d]])) && b.push(c); return new OpenLayers.Geometry.MultiPoint(b) }, linestring: function (a, b) {
      var c, d; d = []; var e = []; c = this.getElementsByTagNameNS(a, this.gmlns, "posList"); if (0 < c.length) {
        d = this.getChildValue(c[0]); d = d.replace(this.regExes.trimSpace, ""); d = d.split(this.regExes.splitSpace); var f = parseInt(c[0].getAttribute("dimension")),
          g, h, k; for (c = 0; c < d.length / f; ++c)g = c * f, h = d[g], k = d[g + 1], g = 2 == f ? null : d[g + 2], this.xy ? e.push(new OpenLayers.Geometry.Point(h, k, g)) : e.push(new OpenLayers.Geometry.Point(k, h, g))
      } if (0 == d.length && (c = this.getElementsByTagNameNS(a, this.gmlns, "coordinates"), 0 < c.length)) for (d = this.getChildValue(c[0]), d = d.replace(this.regExes.trimSpace, ""), d = d.replace(this.regExes.trimComma, ","), f = d.split(this.regExes.splitSpace), c = 0; c < f.length; ++c)d = f[c].split(","), 2 == d.length && (d[2] = null), this.xy ? e.push(new OpenLayers.Geometry.Point(d[0],
        d[1], d[2])) : e.push(new OpenLayers.Geometry.Point(d[1], d[0], d[2])); d = null; 0 != e.length && (d = b ? new OpenLayers.Geometry.LinearRing(e) : new OpenLayers.Geometry.LineString(e)); return d
    }, multilinestring: function (a) { a = this.getElementsByTagNameNS(a, this.gmlns, "LineString"); var b = []; if (0 < a.length) for (var c, d = 0; d < a.length; ++d)(c = this.parseGeometry.linestring.apply(this, [a[d]])) && b.push(c); return new OpenLayers.Geometry.MultiLineString(b) }, polygon: function (a) {
      a = this.getElementsByTagNameNS(a, this.gmlns, "LinearRing");
      var b = []; if (0 < a.length) for (var c, d = 0; d < a.length; ++d)(c = this.parseGeometry.linestring.apply(this, [a[d], !0])) && b.push(c); return new OpenLayers.Geometry.Polygon(b)
    }, multipolygon: function (a) { a = this.getElementsByTagNameNS(a, this.gmlns, "Polygon"); var b = []; if (0 < a.length) for (var c, d = 0; d < a.length; ++d)(c = this.parseGeometry.polygon.apply(this, [a[d]])) && b.push(c); return new OpenLayers.Geometry.MultiPolygon(b) }, envelope: function (a) {
      var b = [], c, d, e = this.getElementsByTagNameNS(a, this.gmlns, "lowerCorner"); if (0 < e.length) {
        c =
        []; 0 < e.length && (c = e[0].firstChild.nodeValue, c = c.replace(this.regExes.trimSpace, ""), c = c.split(this.regExes.splitSpace)); 2 == c.length && (c[2] = null); var f = this.xy ? new OpenLayers.Geometry.Point(c[0], c[1], c[2]) : new OpenLayers.Geometry.Point(c[1], c[0], c[2])
      } a = this.getElementsByTagNameNS(a, this.gmlns, "upperCorner"); if (0 < a.length) {
        c = []; 0 < a.length && (c = a[0].firstChild.nodeValue, c = c.replace(this.regExes.trimSpace, ""), c = c.split(this.regExes.splitSpace)); 2 == c.length && (c[2] = null); var g = this.xy ? new OpenLayers.Geometry.Point(c[0],
          c[1], c[2]) : new OpenLayers.Geometry.Point(c[1], c[0], c[2])
      } f && g && (b.push(new OpenLayers.Geometry.Point(f.x, f.y)), b.push(new OpenLayers.Geometry.Point(g.x, f.y)), b.push(new OpenLayers.Geometry.Point(g.x, g.y)), b.push(new OpenLayers.Geometry.Point(f.x, g.y)), b.push(new OpenLayers.Geometry.Point(f.x, f.y)), b = new OpenLayers.Geometry.LinearRing(b), d = new OpenLayers.Geometry.Polygon([b])); return d
    }, box: function (a) {
      var b = this.getElementsByTagNameNS(a, this.gmlns, "coordinates"), c = a = null; 0 < b.length && (b = b[0].firstChild.nodeValue,
        b = b.split(" "), 2 == b.length && (a = b[0].split(","), c = b[1].split(","))); if (null !== a && null !== c) return new OpenLayers.Bounds(parseFloat(a[0]), parseFloat(a[1]), parseFloat(c[0]), parseFloat(c[1]))
    }
  }, parseAttributes: function (a) {
    var b = {}; a = a.firstChild; for (var c, d, e; a;) {
      if (1 == a.nodeType) {
        a = a.childNodes; for (c = 0; c < a.length; ++c)if (d = a[c], 1 == d.nodeType) if (e = d.childNodes, 1 == e.length) {
          if (e = e[0], 3 == e.nodeType || 4 == e.nodeType) d = d.prefix ? d.nodeName.split(":")[1] : d.nodeName, e = e.nodeValue.replace(this.regExes.trimSpace,
            ""), b[d] = e
        } else b[d.nodeName.split(":").pop()] = null; break
      } a = a.nextSibling
    } return b
  }, write: function (a) { OpenLayers.Util.isArray(a) || (a = [a]); for (var b = this.createElementNS("http://www.opengis.net/wfs", "wfs:" + this.collectionName), c = 0; c < a.length; c++)b.appendChild(this.createFeatureXML(a[c])); return OpenLayers.Format.XML.prototype.write.apply(this, [b]) }, createFeatureXML: function (a) {
    var b = this.buildGeometryNode(a.geometry), c = this.createElementNS(this.featureNS, this.featurePrefix + ":" + this.geometryName); c.appendChild(b);
    var b = this.createElementNS(this.gmlns, "gml:" + this.featureName), d = this.createElementNS(this.featureNS, this.featurePrefix + ":" + this.layerName); d.setAttribute("fid", a.fid || a.id); d.appendChild(c); for (var e in a.attributes) { var c = this.createTextNode(a.attributes[e]), f = e.substring(e.lastIndexOf(":") + 1), f = this.createElementNS(this.featureNS, this.featurePrefix + ":" + f); f.appendChild(c); d.appendChild(f) } b.appendChild(d); return b
  }, buildGeometryNode: function (a) {
  this.externalProjection && this.internalProjection &&
    (a = a.clone(), a.transform(this.internalProjection, this.externalProjection)); var b = a.CLASS_NAME, b = b.substring(b.lastIndexOf(".") + 1); return this.buildGeometry[b.toLowerCase()].apply(this, [a])
  }, buildGeometry: {
    point: function (a) { var b = this.createElementNS(this.gmlns, "gml:Point"); b.appendChild(this.buildCoordinatesNode(a)); return b }, multipoint: function (a) {
      var b = this.createElementNS(this.gmlns, "gml:MultiPoint"); a = a.components; for (var c, d, e = 0; e < a.length; e++)c = this.createElementNS(this.gmlns, "gml:pointMember"),
        d = this.buildGeometry.point.apply(this, [a[e]]), c.appendChild(d), b.appendChild(c); return b
    }, linestring: function (a) { var b = this.createElementNS(this.gmlns, "gml:LineString"); b.appendChild(this.buildCoordinatesNode(a)); return b }, multilinestring: function (a) {
      var b = this.createElementNS(this.gmlns, "gml:MultiLineString"); a = a.components; for (var c, d, e = 0; e < a.length; ++e)c = this.createElementNS(this.gmlns, "gml:lineStringMember"), d = this.buildGeometry.linestring.apply(this, [a[e]]), c.appendChild(d), b.appendChild(c);
      return b
    }, linearring: function (a) { var b = this.createElementNS(this.gmlns, "gml:LinearRing"); b.appendChild(this.buildCoordinatesNode(a)); return b }, polygon: function (a) { var b = this.createElementNS(this.gmlns, "gml:Polygon"); a = a.components; for (var c, d, e = 0; e < a.length; ++e)c = 0 == e ? "outerBoundaryIs" : "innerBoundaryIs", c = this.createElementNS(this.gmlns, "gml:" + c), d = this.buildGeometry.linearring.apply(this, [a[e]]), c.appendChild(d), b.appendChild(c); return b }, multipolygon: function (a) {
      var b = this.createElementNS(this.gmlns,
        "gml:MultiPolygon"); a = a.components; for (var c, d, e = 0; e < a.length; ++e)c = this.createElementNS(this.gmlns, "gml:polygonMember"), d = this.buildGeometry.polygon.apply(this, [a[e]]), c.appendChild(d), b.appendChild(c); return b
    }, bounds: function (a) { var b = this.createElementNS(this.gmlns, "gml:Box"); b.appendChild(this.buildCoordinatesNode(a)); return b }
  }, buildCoordinatesNode: function (a) {
    var b = this.createElementNS(this.gmlns, "gml:coordinates"); b.setAttribute("decimal", "."); b.setAttribute("cs", ","); b.setAttribute("ts",
      " "); var c = []; if (a instanceof OpenLayers.Bounds) c.push(a.left + "," + a.bottom), c.push(a.right + "," + a.top); else { a = a.components ? a.components : [a]; for (var d = 0; d < a.length; d++)c.push(a[d].x + "," + a[d].y) } c = this.createTextNode(c.join(" ")); b.appendChild(c); return b
  }, CLASS_NAME: "OpenLayers.Format.GML"
}); OpenLayers.Format.GML || (OpenLayers.Format.GML = {});
OpenLayers.Format.GML.Base = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { gml: "http://www.opengis.net/gml", xlink: "http://www.w3.org/1999/xlink", xsi: "http://www.w3.org/2001/XMLSchema-instance", wfs: "http://www.opengis.net/wfs" }, defaultPrefix: "gml", schemaLocation: null, featureType: null, featureNS: null, geometryName: "geometry", extractAttributes: !0, srsName: null, xy: !0, geometryTypes: null, singleFeatureType: null, regExes: { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g, featureMember: /^(.*:)?featureMembers?$/ },
  initialize: function (a) { OpenLayers.Format.XML.prototype.initialize.apply(this, [a]); this.setGeometryTypes(); a && a.featureNS && this.setNamespace("feature", a.featureNS); this.singleFeatureType = !a || "string" === typeof a.featureType }, read: function (a) {
  "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); a && 9 == a.nodeType && (a = a.documentElement); var b = []; this.readNode(a, { features: b }, !0); if (0 == b.length) {
    var c = this.getElementsByTagNameNS(a, this.namespaces.gml, "featureMember"); if (c.length) {
      a =
      0; for (var d = c.length; a < d; ++a)this.readNode(c[a], { features: b }, !0)
    } else c = this.getElementsByTagNameNS(a, this.namespaces.gml, "featureMembers"), c.length && this.readNode(c[0], { features: b }, !0)
  } return b
  }, readNode: function (a, b, c) {
  !0 === c && !0 === this.autoConfig && (this.featureType = null, delete this.namespaceAlias[this.featureNS], delete this.namespaces.feature, this.featureNS = null); this.featureNS || (a.prefix in this.namespaces || a.parentNode.namespaceURI != this.namespaces.gml || !this.regExes.featureMember.test(a.parentNode.nodeName)) ||
    (this.featureType = a.nodeName.split(":").pop(), this.setNamespace("feature", a.namespaceURI), this.featureNS = a.namespaceURI, this.autoConfig = !0); return OpenLayers.Format.XML.prototype.readNode.apply(this, [a, b])
  }, readers: {
    gml: {
      _inherit: function (a, b, c) { }, featureMember: function (a, b) { this.readChildNodes(a, b) }, featureMembers: function (a, b) { this.readChildNodes(a, b) }, name: function (a, b) { b.name = this.getChildValue(a) }, boundedBy: function (a, b) {
        var c = {}; this.readChildNodes(a, c); c.components && 0 < c.components.length &&
          (b.bounds = c.components[0])
      }, Point: function (a, b) { var c = { points: [] }; this.readChildNodes(a, c); b.components || (b.components = []); b.components.push(c.points[0]) }, coordinates: function (a, b) { for (var c = this.getChildValue(a).replace(this.regExes.trimSpace, ""), c = c.replace(this.regExes.trimComma, ","), c = c.split(this.regExes.splitSpace), d, e = c.length, f = Array(e), g = 0; g < e; ++g)d = c[g].split(","), f[g] = this.xy ? new OpenLayers.Geometry.Point(d[0], d[1], d[2]) : new OpenLayers.Geometry.Point(d[1], d[0], d[2]); b.points = f }, coord: function (a,
        b) { var c = {}; this.readChildNodes(a, c); b.points || (b.points = []); b.points.push(new OpenLayers.Geometry.Point(c.x, c.y, c.z)) }, X: function (a, b) { b.x = this.getChildValue(a) }, Y: function (a, b) { b.y = this.getChildValue(a) }, Z: function (a, b) { b.z = this.getChildValue(a) }, MultiPoint: function (a, b) { var c = { components: [] }; this.readers.gml._inherit.apply(this, [a, c, b]); this.readChildNodes(a, c); b.components = [new OpenLayers.Geometry.MultiPoint(c.components)] }, pointMember: function (a, b) { this.readChildNodes(a, b) }, LineString: function (a,
          b) { var c = {}; this.readers.gml._inherit.apply(this, [a, c, b]); this.readChildNodes(a, c); b.components || (b.components = []); b.components.push(new OpenLayers.Geometry.LineString(c.points)) }, MultiLineString: function (a, b) { var c = { components: [] }; this.readers.gml._inherit.apply(this, [a, c, b]); this.readChildNodes(a, c); b.components = [new OpenLayers.Geometry.MultiLineString(c.components)] }, lineStringMember: function (a, b) { this.readChildNodes(a, b) }, Polygon: function (a, b) {
            var c = { outer: null, inner: [] }; this.readers.gml._inherit.apply(this,
              [a, c, b]); this.readChildNodes(a, c); c.inner.unshift(c.outer); b.components || (b.components = []); b.components.push(new OpenLayers.Geometry.Polygon(c.inner))
          }, LinearRing: function (a, b) { var c = {}; this.readers.gml._inherit.apply(this, [a, c]); this.readChildNodes(a, c); b.components = [new OpenLayers.Geometry.LinearRing(c.points)] }, MultiPolygon: function (a, b) { var c = { components: [] }; this.readers.gml._inherit.apply(this, [a, c, b]); this.readChildNodes(a, c); b.components = [new OpenLayers.Geometry.MultiPolygon(c.components)] },
      polygonMember: function (a, b) { this.readChildNodes(a, b) }, GeometryCollection: function (a, b) { var c = { components: [] }; this.readers.gml._inherit.apply(this, [a, c, b]); this.readChildNodes(a, c); b.components = [new OpenLayers.Geometry.Collection(c.components)] }, geometryMember: function (a, b) { this.readChildNodes(a, b) }
    }, feature: {
      "*": function (a, b) {
        var c, d = a.localName || a.nodeName.split(":").pop(); b.features ? this.singleFeatureType || -1 === OpenLayers.Util.indexOf(this.featureType, d) ? d === this.featureType && (c = "_typeName") : c =
          "_typeName" : 0 == a.childNodes.length || 1 == a.childNodes.length && 3 == a.firstChild.nodeType ? this.extractAttributes && (c = "_attribute") : c = "_geometry"; c && this.readers.feature[c].apply(this, [a, b])
      }, _typeName: function (a, b) {
        var c = { components: [], attributes: {} }; this.readChildNodes(a, c); c.name && (c.attributes.name = c.name); var d = new OpenLayers.Feature.Vector(c.components[0], c.attributes); this.singleFeatureType || (d.type = a.nodeName.split(":").pop(), d.namespace = a.namespaceURI); var e = a.getAttribute("fid") || this.getAttributeNS(a,
          this.namespaces.gml, "id"); e && (d.fid = e); this.internalProjection && (this.externalProjection && d.geometry) && d.geometry.transform(this.externalProjection, this.internalProjection); c.bounds && (d.bounds = c.bounds); b.features.push(d)
      }, _geometry: function (a, b) { this.geometryName || (this.geometryName = a.nodeName.split(":").pop()); this.readChildNodes(a, b) }, _attribute: function (a, b) { var c = a.localName || a.nodeName.split(":").pop(), d = this.getChildValue(a); b.attributes[c] = d }
    }, wfs: {
      FeatureCollection: function (a, b) {
        this.readChildNodes(a,
          b)
      }
    }
  }, write: function (a) { var b; b = OpenLayers.Util.isArray(a) ? "featureMembers" : "featureMember"; a = this.writeNode("gml:" + b, a); this.setAttributeNS(a, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation); return OpenLayers.Format.XML.prototype.write.apply(this, [a]) }, writers: {
    gml: {
      featureMember: function (a) { var b = this.createElementNSPlus("gml:featureMember"); this.writeNode("feature:_typeName", a, b); return b }, MultiPoint: function (a) {
        var b = this.createElementNSPlus("gml:MultiPoint"); a = a.components || [a];
        for (var c = 0, d = a.length; c < d; ++c)this.writeNode("pointMember", a[c], b); return b
      }, pointMember: function (a) { var b = this.createElementNSPlus("gml:pointMember"); this.writeNode("Point", a, b); return b }, MultiLineString: function (a) { var b = this.createElementNSPlus("gml:MultiLineString"); a = a.components || [a]; for (var c = 0, d = a.length; c < d; ++c)this.writeNode("lineStringMember", a[c], b); return b }, lineStringMember: function (a) { var b = this.createElementNSPlus("gml:lineStringMember"); this.writeNode("LineString", a, b); return b },
      MultiPolygon: function (a) { var b = this.createElementNSPlus("gml:MultiPolygon"); a = a.components || [a]; for (var c = 0, d = a.length; c < d; ++c)this.writeNode("polygonMember", a[c], b); return b }, polygonMember: function (a) { var b = this.createElementNSPlus("gml:polygonMember"); this.writeNode("Polygon", a, b); return b }, GeometryCollection: function (a) { for (var b = this.createElementNSPlus("gml:GeometryCollection"), c = 0, d = a.components.length; c < d; ++c)this.writeNode("geometryMember", a.components[c], b); return b }, geometryMember: function (a) {
        var b =
          this.createElementNSPlus("gml:geometryMember"); a = this.writeNode("feature:_geometry", a); b.appendChild(a.firstChild); return b
      }
    }, feature: {
      _typeName: function (a) { var b = this.createElementNSPlus("feature:" + this.featureType, { attributes: { fid: a.fid } }); a.geometry && this.writeNode("feature:_geometry", a.geometry, b); for (var c in a.attributes) { var d = a.attributes[c]; null != d && this.writeNode("feature:_attribute", { name: c, value: d }, b) } return b }, _geometry: function (a) {
      this.externalProjection && this.internalProjection && (a =
        a.clone().transform(this.internalProjection, this.externalProjection)); var b = this.createElementNSPlus("feature:" + this.geometryName); a = this.writeNode("gml:" + this.geometryTypes[a.CLASS_NAME], a, b); this.srsName && a.setAttribute("srsName", this.srsName); return b
      }, _attribute: function (a) { return this.createElementNSPlus("feature:" + a.name, { value: a.value }) }
    }, wfs: {
      FeatureCollection: function (a) {
        for (var b = this.createElementNSPlus("wfs:FeatureCollection"), c = 0, d = a.length; c < d; ++c)this.writeNode("gml:featureMember",
          a[c], b); return b
      }
    }
  }, setGeometryTypes: function () { this.geometryTypes = { "OpenLayers.Geometry.Point": "Point", "OpenLayers.Geometry.MultiPoint": "MultiPoint", "OpenLayers.Geometry.LineString": "LineString", "OpenLayers.Geometry.MultiLineString": "MultiLineString", "OpenLayers.Geometry.Polygon": "Polygon", "OpenLayers.Geometry.MultiPolygon": "MultiPolygon", "OpenLayers.Geometry.Collection": "GeometryCollection" } }, CLASS_NAME: "OpenLayers.Format.GML.Base"
}); OpenLayers.Format.GML.v3 = OpenLayers.Class(OpenLayers.Format.GML.Base, {
  schemaLocation: "http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd", curve: !1, multiCurve: !0, surface: !1, multiSurface: !0, initialize: function (a) { OpenLayers.Format.GML.Base.prototype.initialize.apply(this, [a]) }, readers: {
    gml: OpenLayers.Util.applyDefaults({
      _inherit: function (a, b, c) { if (a = parseInt(a.getAttribute("srsDimension"), 10) || c && c.srsDimension) b.srsDimension = a }, featureMembers: function (a,
        b) { this.readChildNodes(a, b) }, Curve: function (a, b) { var c = { points: [] }; this.readers.gml._inherit.apply(this, [a, c, b]); this.readChildNodes(a, c); b.components || (b.components = []); b.components.push(new OpenLayers.Geometry.LineString(c.points)) }, segments: function (a, b) { this.readChildNodes(a, b) }, LineStringSegment: function (a, b) { var c = {}; this.readChildNodes(a, c); c.points && Array.prototype.push.apply(b.points, c.points) }, pos: function (a, b) {
          var c = this.getChildValue(a).replace(this.regExes.trimSpace, "").split(this.regExes.splitSpace),
          c = this.xy ? new OpenLayers.Geometry.Point(c[0], c[1], c[2]) : new OpenLayers.Geometry.Point(c[1], c[0], c[2]); b.points = [c]
        }, posList: function (a, b) {
          for (var c = this.getChildValue(a).replace(this.regExes.trimSpace, "").split(this.regExes.splitSpace), d = b.srsDimension || parseInt(a.getAttribute("srsDimension") || a.getAttribute("dimension"), 10) || 2, e, f, g, h = Array(c.length / d), k = 0, l = c.length; k < l; k += d)e = c[k], f = c[k + 1], g = 2 == d ? void 0 : c[k + 2], h[k / d] = this.xy ? new OpenLayers.Geometry.Point(e, f, g) : new OpenLayers.Geometry.Point(f,
            e, g); b.points = h
        }, Surface: function (a, b) { this.readChildNodes(a, b) }, patches: function (a, b) { this.readChildNodes(a, b) }, PolygonPatch: function (a, b) { this.readers.gml.Polygon.apply(this, [a, b]) }, exterior: function (a, b) { var c = {}; this.readChildNodes(a, c); b.outer = c.components[0] }, interior: function (a, b) { var c = {}; this.readChildNodes(a, c); b.inner.push(c.components[0]) }, MultiCurve: function (a, b) {
          var c = { components: [] }; this.readers.gml._inherit.apply(this, [a, c, b]); this.readChildNodes(a, c); 0 < c.components.length && (b.components =
            [new OpenLayers.Geometry.MultiLineString(c.components)])
        }, curveMember: function (a, b) { this.readChildNodes(a, b) }, MultiSurface: function (a, b) { var c = { components: [] }; this.readers.gml._inherit.apply(this, [a, c, b]); this.readChildNodes(a, c); 0 < c.components.length && (b.components = [new OpenLayers.Geometry.MultiPolygon(c.components)]) }, surfaceMember: function (a, b) { this.readChildNodes(a, b) }, surfaceMembers: function (a, b) { this.readChildNodes(a, b) }, pointMembers: function (a, b) { this.readChildNodes(a, b) }, lineStringMembers: function (a,
          b) { this.readChildNodes(a, b) }, polygonMembers: function (a, b) { this.readChildNodes(a, b) }, geometryMembers: function (a, b) { this.readChildNodes(a, b) }, Envelope: function (a, b) { var c = { points: Array(2) }; this.readChildNodes(a, c); b.components || (b.components = []); var d = c.points[0], c = c.points[1]; b.components.push(new OpenLayers.Bounds(d.x, d.y, c.x, c.y)) }, lowerCorner: function (a, b) { var c = {}; this.readers.gml.pos.apply(this, [a, c]); b.points[0] = c.points[0] }, upperCorner: function (a, b) {
            var c = {}; this.readers.gml.pos.apply(this,
              [a, c]); b.points[1] = c.points[0]
          }
    }, OpenLayers.Format.GML.Base.prototype.readers.gml), feature: OpenLayers.Format.GML.Base.prototype.readers.feature, wfs: OpenLayers.Format.GML.Base.prototype.readers.wfs
  }, write: function (a) { var b; b = OpenLayers.Util.isArray(a) ? "featureMembers" : "featureMember"; a = this.writeNode("gml:" + b, a); this.setAttributeNS(a, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation); return OpenLayers.Format.XML.prototype.write.apply(this, [a]) }, writers: {
    gml: OpenLayers.Util.applyDefaults({
      featureMembers: function (a) {
        for (var b =
          this.createElementNSPlus("gml:featureMembers"), c = 0, d = a.length; c < d; ++c)this.writeNode("feature:_typeName", a[c], b); return b
      }, Point: function (a) { var b = this.createElementNSPlus("gml:Point"); this.writeNode("pos", a, b); return b }, pos: function (a) { return this.createElementNSPlus("gml:pos", { value: this.xy ? a.x + " " + a.y : a.y + " " + a.x }) }, LineString: function (a) { var b = this.createElementNSPlus("gml:LineString"); this.writeNode("posList", a.components, b); return b }, Curve: function (a) {
        var b = this.createElementNSPlus("gml:Curve");
        this.writeNode("segments", a, b); return b
      }, segments: function (a) { var b = this.createElementNSPlus("gml:segments"); this.writeNode("LineStringSegment", a, b); return b }, LineStringSegment: function (a) { var b = this.createElementNSPlus("gml:LineStringSegment"); this.writeNode("posList", a.components, b); return b }, posList: function (a) { for (var b = a.length, c = Array(b), d, e = 0; e < b; ++e)d = a[e], c[e] = this.xy ? d.x + " " + d.y : d.y + " " + d.x; return this.createElementNSPlus("gml:posList", { value: c.join(" ") }) }, Surface: function (a) {
        var b = this.createElementNSPlus("gml:Surface");
        this.writeNode("patches", a, b); return b
      }, patches: function (a) { var b = this.createElementNSPlus("gml:patches"); this.writeNode("PolygonPatch", a, b); return b }, PolygonPatch: function (a) { var b = this.createElementNSPlus("gml:PolygonPatch", { attributes: { interpolation: "planar" } }); this.writeNode("exterior", a.components[0], b); for (var c = 1, d = a.components.length; c < d; ++c)this.writeNode("interior", a.components[c], b); return b }, Polygon: function (a) {
        var b = this.createElementNSPlus("gml:Polygon"); this.writeNode("exterior", a.components[0],
          b); for (var c = 1, d = a.components.length; c < d; ++c)this.writeNode("interior", a.components[c], b); return b
      }, exterior: function (a) { var b = this.createElementNSPlus("gml:exterior"); this.writeNode("LinearRing", a, b); return b }, interior: function (a) { var b = this.createElementNSPlus("gml:interior"); this.writeNode("LinearRing", a, b); return b }, LinearRing: function (a) { var b = this.createElementNSPlus("gml:LinearRing"); this.writeNode("posList", a.components, b); return b }, MultiCurve: function (a) {
        var b = this.createElementNSPlus("gml:MultiCurve");
        a = a.components || [a]; for (var c = 0, d = a.length; c < d; ++c)this.writeNode("curveMember", a[c], b); return b
      }, curveMember: function (a) { var b = this.createElementNSPlus("gml:curveMember"); this.curve ? this.writeNode("Curve", a, b) : this.writeNode("LineString", a, b); return b }, MultiSurface: function (a) { var b = this.createElementNSPlus("gml:MultiSurface"); a = a.components || [a]; for (var c = 0, d = a.length; c < d; ++c)this.writeNode("surfaceMember", a[c], b); return b }, surfaceMember: function (a) {
        var b = this.createElementNSPlus("gml:surfaceMember");
        this.surface ? this.writeNode("Surface", a, b) : this.writeNode("Polygon", a, b); return b
      }, Envelope: function (a) { var b = this.createElementNSPlus("gml:Envelope"); this.writeNode("lowerCorner", a, b); this.writeNode("upperCorner", a, b); this.srsName && b.setAttribute("srsName", this.srsName); return b }, lowerCorner: function (a) { return this.createElementNSPlus("gml:lowerCorner", { value: this.xy ? a.left + " " + a.bottom : a.bottom + " " + a.left }) }, upperCorner: function (a) {
        return this.createElementNSPlus("gml:upperCorner", {
          value: this.xy ?
            a.right + " " + a.top : a.top + " " + a.right
        })
      }
    }, OpenLayers.Format.GML.Base.prototype.writers.gml), feature: OpenLayers.Format.GML.Base.prototype.writers.feature, wfs: OpenLayers.Format.GML.Base.prototype.writers.wfs
  }, setGeometryTypes: function () {
  this.geometryTypes = {
    "OpenLayers.Geometry.Point": "Point", "OpenLayers.Geometry.MultiPoint": "MultiPoint", "OpenLayers.Geometry.LineString": !0 === this.curve ? "Curve" : "LineString", "OpenLayers.Geometry.MultiLineString": !1 === this.multiCurve ? "MultiLineString" : "MultiCurve", "OpenLayers.Geometry.Polygon": !0 ===
      this.surface ? "Surface" : "Polygon", "OpenLayers.Geometry.MultiPolygon": !1 === this.multiSurface ? "MultiPolygon" : "MultiSurface", "OpenLayers.Geometry.Collection": "GeometryCollection"
  }
  }, CLASS_NAME: "OpenLayers.Format.GML.v3"
}); OpenLayers.Format.Filter.v1_1_0 = OpenLayers.Class(OpenLayers.Format.GML.v3, OpenLayers.Format.Filter.v1, {
  VERSION: "1.1.0", schemaLocation: "http://www.opengis.net/ogc/filter/1.1.0/filter.xsd", initialize: function (a) { OpenLayers.Format.GML.v3.prototype.initialize.apply(this, [a]) }, readers: {
    ogc: OpenLayers.Util.applyDefaults({
      PropertyIsEqualTo: function (a, b) {
        var c = a.getAttribute("matchCase"), c = new OpenLayers.Filter.Comparison({ type: OpenLayers.Filter.Comparison.EQUAL_TO, matchCase: !("false" === c || "0" === c) }); this.readChildNodes(a,
          c); b.filters.push(c)
      }, PropertyIsNotEqualTo: function (a, b) { var c = a.getAttribute("matchCase"), c = new OpenLayers.Filter.Comparison({ type: OpenLayers.Filter.Comparison.NOT_EQUAL_TO, matchCase: !("false" === c || "0" === c) }); this.readChildNodes(a, c); b.filters.push(c) }, PropertyIsLike: function (a, b) {
        var c = new OpenLayers.Filter.Comparison({ type: OpenLayers.Filter.Comparison.LIKE }); this.readChildNodes(a, c); var d = a.getAttribute("wildCard"), e = a.getAttribute("singleChar"), f = a.getAttribute("escapeChar"); c.value2regex(d, e,
          f); b.filters.push(c)
      }
    }, OpenLayers.Format.Filter.v1.prototype.readers.ogc), gml: OpenLayers.Format.GML.v3.prototype.readers.gml, feature: OpenLayers.Format.GML.v3.prototype.readers.feature
  }, writers: {
    ogc: OpenLayers.Util.applyDefaults({
      PropertyIsEqualTo: function (a) { var b = this.createElementNSPlus("ogc:PropertyIsEqualTo", { attributes: { matchCase: a.matchCase } }); this.writeNode("PropertyName", a, b); this.writeOgcExpression(a.value, b); return b }, PropertyIsNotEqualTo: function (a) {
        var b = this.createElementNSPlus("ogc:PropertyIsNotEqualTo",
          { attributes: { matchCase: a.matchCase } }); this.writeNode("PropertyName", a, b); this.writeOgcExpression(a.value, b); return b
      }, PropertyIsLike: function (a) { var b = this.createElementNSPlus("ogc:PropertyIsLike", { attributes: { matchCase: a.matchCase, wildCard: "*", singleChar: ".", escapeChar: "!" } }); this.writeNode("PropertyName", a, b); this.writeNode("Literal", a.regex2value(), b); return b }, BBOX: function (a) {
        var b = this.createElementNSPlus("ogc:BBOX"); a.property && this.writeNode("PropertyName", a, b); var c = this.writeNode("gml:Envelope",
          a.value); a.projection && c.setAttribute("srsName", a.projection); b.appendChild(c); return b
      }, SortBy: function (a) { for (var b = this.createElementNSPlus("ogc:SortBy"), c = 0, d = a.length; c < d; c++)this.writeNode("ogc:SortProperty", a[c], b); return b }, SortProperty: function (a) { var b = this.createElementNSPlus("ogc:SortProperty"); this.writeNode("ogc:PropertyName", a, b); this.writeNode("ogc:SortOrder", "DESC" == a.order ? "DESC" : "ASC", b); return b }, SortOrder: function (a) { return this.createElementNSPlus("ogc:SortOrder", { value: a }) }
    },
      OpenLayers.Format.Filter.v1.prototype.writers.ogc), gml: OpenLayers.Format.GML.v3.prototype.writers.gml, feature: OpenLayers.Format.GML.v3.prototype.writers.feature
  }, writeSpatial: function (a, b) {
    var c = this.createElementNSPlus("ogc:" + b); this.writeNode("PropertyName", a, c); if (a.value instanceof OpenLayers.Filter.Function) this.writeNode("Function", a.value, c); else {
      var d; d = a.value instanceof OpenLayers.Geometry ? this.writeNode("feature:_geometry", a.value).firstChild : this.writeNode("gml:Envelope", a.value); a.projection &&
        d.setAttribute("srsName", a.projection); c.appendChild(d)
    } return c
  }, CLASS_NAME: "OpenLayers.Format.Filter.v1_1_0"
}); OpenLayers.Format.OWSCommon = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, { defaultVersion: "1.0.0", getVersion: function (a, b) { var c = this.version; if (!c) { var d = a.getAttribute("xmlns:ows"); d && "1.1" === d.substring(d.lastIndexOf("/") + 1) && (c = "1.1.0"); c || (c = this.defaultVersion) } return c }, CLASS_NAME: "OpenLayers.Format.OWSCommon" }); OpenLayers.Format.OWSCommon.v1 = OpenLayers.Class(OpenLayers.Format.XML, {
  regExes: { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g }, read: function (a, b) { OpenLayers.Util.applyDefaults(b, this.options); var c = {}; this.readChildNodes(a, c); return c }, readers: {
    ows: {
      Exception: function (a, b) { var c = { code: a.getAttribute("exceptionCode"), locator: a.getAttribute("locator"), texts: [] }; b.exceptions.push(c); this.readChildNodes(a, c) }, ExceptionText: function (a, b) { var c = this.getChildValue(a); b.texts.push(c) },
      ServiceIdentification: function (a, b) { b.serviceIdentification = {}; this.readChildNodes(a, b.serviceIdentification) }, Title: function (a, b) { b.title = this.getChildValue(a) }, Abstract: function (a, b) { b["abstract"] = this.getChildValue(a) }, Keywords: function (a, b) { b.keywords = {}; this.readChildNodes(a, b.keywords) }, Keyword: function (a, b) { b[this.getChildValue(a)] = !0 }, ServiceType: function (a, b) { b.serviceType = { codeSpace: a.getAttribute("codeSpace"), value: this.getChildValue(a) } }, ServiceTypeVersion: function (a, b) {
      b.serviceTypeVersion =
        this.getChildValue(a)
      }, Fees: function (a, b) { b.fees = this.getChildValue(a) }, AccessConstraints: function (a, b) { b.accessConstraints = this.getChildValue(a) }, ServiceProvider: function (a, b) { b.serviceProvider = {}; this.readChildNodes(a, b.serviceProvider) }, ProviderName: function (a, b) { b.providerName = this.getChildValue(a) }, ProviderSite: function (a, b) { b.providerSite = this.getAttributeNS(a, this.namespaces.xlink, "href") }, ServiceContact: function (a, b) { b.serviceContact = {}; this.readChildNodes(a, b.serviceContact) }, IndividualName: function (a,
        b) { b.individualName = this.getChildValue(a) }, PositionName: function (a, b) { b.positionName = this.getChildValue(a) }, ContactInfo: function (a, b) { b.contactInfo = {}; this.readChildNodes(a, b.contactInfo) }, Phone: function (a, b) { b.phone = {}; this.readChildNodes(a, b.phone) }, Voice: function (a, b) { b.voice = this.getChildValue(a) }, Address: function (a, b) { b.address = {}; this.readChildNodes(a, b.address) }, DeliveryPoint: function (a, b) { b.deliveryPoint = this.getChildValue(a) }, City: function (a, b) { b.city = this.getChildValue(a) }, AdministrativeArea: function (a,
          b) { b.administrativeArea = this.getChildValue(a) }, PostalCode: function (a, b) { b.postalCode = this.getChildValue(a) }, Country: function (a, b) { b.country = this.getChildValue(a) }, ElectronicMailAddress: function (a, b) { b.electronicMailAddress = this.getChildValue(a) }, Role: function (a, b) { b.role = this.getChildValue(a) }, OperationsMetadata: function (a, b) { b.operationsMetadata = {}; this.readChildNodes(a, b.operationsMetadata) }, Operation: function (a, b) { var c = a.getAttribute("name"); b[c] = {}; this.readChildNodes(a, b[c]) }, DCP: function (a,
            b) { b.dcp = {}; this.readChildNodes(a, b.dcp) }, HTTP: function (a, b) { b.http = {}; this.readChildNodes(a, b.http) }, Get: function (a, b) { b.get || (b.get = []); var c = { url: this.getAttributeNS(a, this.namespaces.xlink, "href") }; this.readChildNodes(a, c); b.get.push(c) }, Post: function (a, b) { b.post || (b.post = []); var c = { url: this.getAttributeNS(a, this.namespaces.xlink, "href") }; this.readChildNodes(a, c); b.post.push(c) }, Parameter: function (a, b) {
            b.parameters || (b.parameters = {}); var c = a.getAttribute("name"); b.parameters[c] = {}; this.readChildNodes(a,
              b.parameters[c])
            }, Constraint: function (a, b) { b.constraints || (b.constraints = {}); var c = a.getAttribute("name"); b.constraints[c] = {}; this.readChildNodes(a, b.constraints[c]) }, Value: function (a, b) { b[this.getChildValue(a)] = !0 }, OutputFormat: function (a, b) { b.formats.push({ value: this.getChildValue(a) }); this.readChildNodes(a, b) }, WGS84BoundingBox: function (a, b) { var c = {}; c.crs = a.getAttribute("crs"); b.BoundingBox ? b.BoundingBox.push(c) : (b.projection = c.crs, c = b); this.readChildNodes(a, c) }, BoundingBox: function (a, b) {
              this.readers.ows.WGS84BoundingBox.apply(this,
                [a, b])
            }, LowerCorner: function (a, b) { var c = this.getChildValue(a).replace(this.regExes.trimSpace, ""), c = c.replace(this.regExes.trimComma, ","), c = c.split(this.regExes.splitSpace); b.left = c[0]; b.bottom = c[1] }, UpperCorner: function (a, b) { var c = this.getChildValue(a).replace(this.regExes.trimSpace, ""), c = c.replace(this.regExes.trimComma, ","), c = c.split(this.regExes.splitSpace); b.right = c[0]; b.top = c[1]; b.bounds = new OpenLayers.Bounds(b.left, b.bottom, b.right, b.top); delete b.left; delete b.bottom; delete b.right; delete b.top },
      Language: function (a, b) { b.language = this.getChildValue(a) }
    }
  }, writers: {
    ows: {
      BoundingBox: function (a, b) { var c = this.createElementNSPlus(b || "ows:BoundingBox", { attributes: { crs: a.projection } }); this.writeNode("ows:LowerCorner", a, c); this.writeNode("ows:UpperCorner", a, c); return c }, LowerCorner: function (a) { return this.createElementNSPlus("ows:LowerCorner", { value: a.bounds.left + " " + a.bounds.bottom }) }, UpperCorner: function (a) { return this.createElementNSPlus("ows:UpperCorner", { value: a.bounds.right + " " + a.bounds.top }) },
      Identifier: function (a) { return this.createElementNSPlus("ows:Identifier", { value: a }) }, Title: function (a) { return this.createElementNSPlus("ows:Title", { value: a }) }, Abstract: function (a) { return this.createElementNSPlus("ows:Abstract", { value: a }) }, OutputFormat: function (a) { return this.createElementNSPlus("ows:OutputFormat", { value: a }) }
    }
  }, CLASS_NAME: "OpenLayers.Format.OWSCommon.v1"
}); OpenLayers.Format.OWSCommon.v1_0_0 = OpenLayers.Class(OpenLayers.Format.OWSCommon.v1, {
  namespaces: { ows: "http://www.opengis.net/ows", xlink: "http://www.w3.org/1999/xlink" }, readers: { ows: OpenLayers.Util.applyDefaults({ ExceptionReport: function (a, b) { b.success = !1; b.exceptionReport = { version: a.getAttribute("version"), language: a.getAttribute("language"), exceptions: [] }; this.readChildNodes(a, b.exceptionReport) } }, OpenLayers.Format.OWSCommon.v1.prototype.readers.ows) }, writers: { ows: OpenLayers.Format.OWSCommon.v1.prototype.writers.ows },
  CLASS_NAME: "OpenLayers.Format.OWSCommon.v1_0_0"
}); OpenLayers.Format.WFST.v1_1_0 = OpenLayers.Class(OpenLayers.Format.Filter.v1_1_0, OpenLayers.Format.WFST.v1, {
  version: "1.1.0", schemaLocations: { wfs: "http://schemas.opengis.net/wfs/1.1.0/wfs.xsd" }, initialize: function (a) { OpenLayers.Format.Filter.v1_1_0.prototype.initialize.apply(this, [a]); OpenLayers.Format.WFST.v1.prototype.initialize.apply(this, [a]) }, readNode: function (a, b, c) { return OpenLayers.Format.GML.v3.prototype.readNode.apply(this, arguments) }, readers: {
    wfs: OpenLayers.Util.applyDefaults({
      FeatureCollection: function (a,
        b) { b.numberOfFeatures = parseInt(a.getAttribute("numberOfFeatures")); OpenLayers.Format.WFST.v1.prototype.readers.wfs.FeatureCollection.apply(this, arguments) }, TransactionResponse: function (a, b) { b.insertIds = []; b.success = !1; this.readChildNodes(a, b) }, TransactionSummary: function (a, b) { b.success = !0 }, InsertResults: function (a, b) { this.readChildNodes(a, b) }, Feature: function (a, b) { var c = { fids: [] }; this.readChildNodes(a, c); b.insertIds.push(c.fids[0]) }
    }, OpenLayers.Format.WFST.v1.prototype.readers.wfs), gml: OpenLayers.Format.GML.v3.prototype.readers.gml,
    feature: OpenLayers.Format.GML.v3.prototype.readers.feature, ogc: OpenLayers.Format.Filter.v1_1_0.prototype.readers.ogc, ows: OpenLayers.Format.OWSCommon.v1_0_0.prototype.readers.ows
  }, writers: {
    wfs: OpenLayers.Util.applyDefaults({
      GetFeature: function (a) { var b = OpenLayers.Format.WFST.v1.prototype.writers.wfs.GetFeature.apply(this, arguments); a && this.setAttributes(b, { resultType: a.resultType, startIndex: a.startIndex, count: a.count }); return b }, Query: function (a) {
        a = OpenLayers.Util.extend({
          featureNS: this.featureNS,
          featurePrefix: this.featurePrefix, featureType: this.featureType, srsName: this.srsName
        }, a); var b = a.featurePrefix, c = this.createElementNSPlus("wfs:Query", { attributes: { typeName: (b ? b + ":" : "") + a.featureType, srsName: a.srsName } }); a.featureNS && c.setAttribute("xmlns:" + b, a.featureNS); if (a.propertyNames) for (var b = 0, d = a.propertyNames.length; b < d; b++)this.writeNode("wfs:PropertyName", { property: a.propertyNames[b] }, c); a.filter && (OpenLayers.Format.WFST.v1_1_0.prototype.setFilterProperty.call(this, a.filter), this.writeNode("ogc:Filter",
          a.filter, c)); return c
      }, PropertyName: function (a) { return this.createElementNSPlus("wfs:PropertyName", { value: a.property }) }
    }, OpenLayers.Format.WFST.v1.prototype.writers.wfs), gml: OpenLayers.Format.GML.v3.prototype.writers.gml, feature: OpenLayers.Format.GML.v3.prototype.writers.feature, ogc: OpenLayers.Format.Filter.v1_1_0.prototype.writers.ogc
  }, CLASS_NAME: "OpenLayers.Format.WFST.v1_1_0"
}); OpenLayers.Protocol = OpenLayers.Class({
  format: null, options: null, autoDestroy: !0, defaultFilter: null, initialize: function (a) { a = a || {}; OpenLayers.Util.extend(this, a); this.options = a }, mergeWithDefaultFilter: function (a) { return a && this.defaultFilter ? new OpenLayers.Filter.Logical({ type: OpenLayers.Filter.Logical.AND, filters: [this.defaultFilter, a] }) : a || this.defaultFilter || void 0 }, destroy: function () { this.format = this.options = null }, read: function (a) { a = a || {}; a.filter = this.mergeWithDefaultFilter(a.filter) }, create: function () { },
  update: function () { }, "delete": function () { }, commit: function () { }, abort: function (a) { }, createCallback: function (a, b, c) { return OpenLayers.Function.bind(function () { a.apply(this, [b, c]) }, this) }, CLASS_NAME: "OpenLayers.Protocol"
}); OpenLayers.Protocol.Response = OpenLayers.Class({ code: null, requestType: null, last: !0, features: null, data: null, reqFeatures: null, priv: null, error: null, initialize: function (a) { OpenLayers.Util.extend(this, a) }, success: function () { return 0 < this.code }, CLASS_NAME: "OpenLayers.Protocol.Response" });
OpenLayers.Protocol.Response.SUCCESS = 1; OpenLayers.Protocol.Response.FAILURE = 0; OpenLayers.Format.JSON = OpenLayers.Class(OpenLayers.Format, {
  indent: "    ", space: " ", newline: "\n", level: 0, pretty: !1, nativeJSON: function () { return !(!window.JSON || "function" != typeof JSON.parse || "function" != typeof JSON.stringify) }(), read: function (a, b) {
    var c; if (this.nativeJSON) c = JSON.parse(a, b); else try {
      if (/^[\],:{}\s]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")) && (c = eval("(" + a + ")"), "function" ===
        typeof b)) { var d = function (a, c) { if (c && "object" === typeof c) for (var e in c) c.hasOwnProperty(e) && (c[e] = d(e, c[e])); return b(a, c) }; c = d("", c) }
    } catch (e) { } this.keepData && (this.data = c); return c
  }, write: function (a, b) { this.pretty = !!b; var c = null, d = typeof a; if (this.serialize[d]) try { c = !this.pretty && this.nativeJSON ? JSON.stringify(a) : this.serialize[d].apply(this, [a]) } catch (e) { OpenLayers.Console.error("Trouble serializing: " + e) } return c }, writeIndent: function () {
    var a = []; if (this.pretty) for (var b = 0; b < this.level; ++b)a.push(this.indent);
    return a.join("")
  }, writeNewline: function () { return this.pretty ? this.newline : "" }, writeSpace: function () { return this.pretty ? this.space : "" }, serialize: {
    object: function (a) {
      if (null == a) return "null"; if (a.constructor == Date) return this.serialize.date.apply(this, [a]); if (a.constructor == Array) return this.serialize.array.apply(this, [a]); var b = ["{"]; this.level += 1; var c, d, e, f = !1; for (c in a) a.hasOwnProperty(c) && (d = OpenLayers.Format.JSON.prototype.write.apply(this, [c, this.pretty]), e = OpenLayers.Format.JSON.prototype.write.apply(this,
        [a[c], this.pretty]), null != d && null != e && (f && b.push(","), b.push(this.writeNewline(), this.writeIndent(), d, ":", this.writeSpace(), e), f = !0)); this.level -= 1; b.push(this.writeNewline(), this.writeIndent(), "}"); return b.join("")
    }, array: function (a) {
      var b, c = ["["]; this.level += 1; for (var d = 0, e = a.length; d < e; ++d)b = OpenLayers.Format.JSON.prototype.write.apply(this, [a[d], this.pretty]), null != b && (0 < d && c.push(","), c.push(this.writeNewline(), this.writeIndent(), b)); this.level -= 1; c.push(this.writeNewline(), this.writeIndent(),
        "]"); return c.join("")
    }, string: function (a) { var b = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }; return /["\\\x00-\x1f]/.test(a) ? '"' + a.replace(/([\x00-\x1f\\"])/g, function (a, d) { var e = b[d]; if (e) return e; e = d.charCodeAt(); return "\\u00" + Math.floor(e / 16).toString(16) + (e % 16).toString(16) }) + '"' : '"' + a + '"' }, number: function (a) { return isFinite(a) ? String(a) : "null" }, "boolean": function (a) { return String(a) }, date: function (a) {
      function b(a) { return 10 > a ? "0" + a : a } return '"' + a.getFullYear() +
        "-" + b(a.getMonth() + 1) + "-" + b(a.getDate()) + "T" + b(a.getHours()) + ":" + b(a.getMinutes()) + ":" + b(a.getSeconds()) + '"'
    }
  }, CLASS_NAME: "OpenLayers.Format.JSON"
}); OpenLayers.Format.GeoJSON = OpenLayers.Class(OpenLayers.Format.JSON, {
  ignoreExtraDims: !1, read: function (a, b, c) {
    b = b ? b : "FeatureCollection"; var d = null, e = null, e = "string" == typeof a ? OpenLayers.Format.JSON.prototype.read.apply(this, [a, c]) : a; if (!e) OpenLayers.Console.error("Bad JSON: " + a); else if ("string" != typeof e.type) OpenLayers.Console.error("Bad GeoJSON - no type: " + a); else if (this.isValidType(e, b)) switch (b) {
      case "Geometry": try { d = this.parseGeometry(e) } catch (f) { OpenLayers.Console.error(f) } break; case "Feature": try {
      d =
        this.parseFeature(e), d.type = "Feature"
      } catch (g) { OpenLayers.Console.error(g) } break; case "FeatureCollection": switch (d = [], e.type) { case "Feature": try { d.push(this.parseFeature(e)) } catch (h) { d = null, OpenLayers.Console.error(h) } break; case "FeatureCollection": a = 0; for (b = e.features.length; a < b; ++a)try { d.push(this.parseFeature(e.features[a])) } catch (k) { d = null, OpenLayers.Console.error(k) } break; default: try { var l = this.parseGeometry(e); d.push(new OpenLayers.Feature.Vector(l)) } catch (m) { d = null, OpenLayers.Console.error(m) } }
    }return d
  },
  isValidType: function (a, b) { var c = !1; switch (b) { case "Geometry": -1 == OpenLayers.Util.indexOf("Point MultiPoint LineString MultiLineString Polygon MultiPolygon Box GeometryCollection".split(" "), a.type) ? OpenLayers.Console.error("Unsupported geometry type: " + a.type) : c = !0; break; case "FeatureCollection": c = !0; break; default: a.type == b ? c = !0 : OpenLayers.Console.error("Cannot convert types from " + a.type + " to " + b) }return c }, parseFeature: function (a) {
    var b, c, d; c = a.properties ? a.properties : {}; d = a.geometry && a.geometry.bbox ||
      a.bbox; try { b = this.parseGeometry(a.geometry) } catch (e) { throw e; } b = new OpenLayers.Feature.Vector(b, c); d && (b.bounds = OpenLayers.Bounds.fromArray(d)); a.id && (b.fid = a.id); return b
  }, parseGeometry: function (a) {
    if (null == a) return null; var b, c = !1; if ("GeometryCollection" == a.type) {
      if (!OpenLayers.Util.isArray(a.geometries)) throw "GeometryCollection must have geometries array: " + a; b = a.geometries.length; for (var c = Array(b), d = 0; d < b; ++d)c[d] = this.parseGeometry.apply(this, [a.geometries[d]]); b = new OpenLayers.Geometry.Collection(c);
      c = !0
    } else { if (!OpenLayers.Util.isArray(a.coordinates)) throw "Geometry must have coordinates array: " + a; if (!this.parseCoords[a.type.toLowerCase()]) throw "Unsupported geometry type: " + a.type; try { b = this.parseCoords[a.type.toLowerCase()].apply(this, [a.coordinates]) } catch (e) { throw e; } } this.internalProjection && (this.externalProjection && !c) && b.transform(this.externalProjection, this.internalProjection); return b
  }, parseCoords: {
    point: function (a) {
      if (!1 == this.ignoreExtraDims && 2 != a.length) throw "Only 2D points are supported: " +
        a; return new OpenLayers.Geometry.Point(a[0], a[1])
    }, multipoint: function (a) { for (var b = [], c = null, d = 0, e = a.length; d < e; ++d) { try { c = this.parseCoords.point.apply(this, [a[d]]) } catch (f) { throw f; } b.push(c) } return new OpenLayers.Geometry.MultiPoint(b) }, linestring: function (a) { for (var b = [], c = null, d = 0, e = a.length; d < e; ++d) { try { c = this.parseCoords.point.apply(this, [a[d]]) } catch (f) { throw f; } b.push(c) } return new OpenLayers.Geometry.LineString(b) }, multilinestring: function (a) {
      for (var b = [], c = null, d = 0, e = a.length; d < e; ++d) {
        try {
          c =
          this.parseCoords.linestring.apply(this, [a[d]])
        } catch (f) { throw f; } b.push(c)
      } return new OpenLayers.Geometry.MultiLineString(b)
    }, polygon: function (a) { for (var b = [], c, d, e = 0, f = a.length; e < f; ++e) { try { d = this.parseCoords.linestring.apply(this, [a[e]]) } catch (g) { throw g; } c = new OpenLayers.Geometry.LinearRing(d.components); b.push(c) } return new OpenLayers.Geometry.Polygon(b) }, multipolygon: function (a) { for (var b = [], c = null, d = 0, e = a.length; d < e; ++d) { try { c = this.parseCoords.polygon.apply(this, [a[d]]) } catch (f) { throw f; } b.push(c) } return new OpenLayers.Geometry.MultiPolygon(b) },
    box: function (a) { if (2 != a.length) throw "GeoJSON box coordinates must have 2 elements"; return new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing([new OpenLayers.Geometry.Point(a[0][0], a[0][1]), new OpenLayers.Geometry.Point(a[1][0], a[0][1]), new OpenLayers.Geometry.Point(a[1][0], a[1][1]), new OpenLayers.Geometry.Point(a[0][0], a[1][1]), new OpenLayers.Geometry.Point(a[0][0], a[0][1])])]) }
  }, write: function (a, b) {
    var c = { type: null }; if (OpenLayers.Util.isArray(a)) {
    c.type = "FeatureCollection"; var d =
      a.length; c.features = Array(d); for (var e = 0; e < d; ++e) { var f = a[e]; if (!f instanceof OpenLayers.Feature.Vector) throw "FeatureCollection only supports collections of features: " + f; c.features[e] = this.extract.feature.apply(this, [f]) }
    } else 0 == a.CLASS_NAME.indexOf("OpenLayers.Geometry") ? c = this.extract.geometry.apply(this, [a]) : a instanceof OpenLayers.Feature.Vector && (c = this.extract.feature.apply(this, [a]), a.layer && a.layer.projection && (c.crs = this.createCRSObject(a))); return OpenLayers.Format.JSON.prototype.write.apply(this,
      [c, b])
  }, createCRSObject: function (a) { a = a.layer.projection.toString(); var b = {}; a.match(/epsg:/i) && (a = parseInt(a.substring(a.indexOf(":") + 1)), b = 4326 == a ? { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } } : { type: "name", properties: { name: "EPSG:" + a } }); return b }, extract: {
    feature: function (a) { var b = this.extract.geometry.apply(this, [a.geometry]), b = { type: "Feature", properties: a.attributes, geometry: b }; null != a.fid && (b.id = a.fid); return b }, geometry: function (a) {
      if (null == a) return null; this.internalProjection &&
        this.externalProjection && (a = a.clone(), a.transform(this.internalProjection, this.externalProjection)); var b = a.CLASS_NAME.split(".")[2]; a = this.extract[b.toLowerCase()].apply(this, [a]); return "Collection" == b ? { type: "GeometryCollection", geometries: a } : { type: b, coordinates: a }
    }, point: function (a) { return [a.x, a.y] }, multipoint: function (a) { for (var b = [], c = 0, d = a.components.length; c < d; ++c)b.push(this.extract.point.apply(this, [a.components[c]])); return b }, linestring: function (a) {
      for (var b = [], c = 0, d = a.components.length; c <
        d; ++c)b.push(this.extract.point.apply(this, [a.components[c]])); return b
    }, multilinestring: function (a) { for (var b = [], c = 0, d = a.components.length; c < d; ++c)b.push(this.extract.linestring.apply(this, [a.components[c]])); return b }, polygon: function (a) { for (var b = [], c = 0, d = a.components.length; c < d; ++c)b.push(this.extract.linestring.apply(this, [a.components[c]])); return b }, multipolygon: function (a) { for (var b = [], c = 0, d = a.components.length; c < d; ++c)b.push(this.extract.polygon.apply(this, [a.components[c]])); return b }, collection: function (a) {
      for (var b =
        a.components.length, c = Array(b), d = 0; d < b; ++d)c[d] = this.extract.geometry.apply(this, [a.components[d]]); return c
    }
  }, CLASS_NAME: "OpenLayers.Format.GeoJSON"
}); OpenLayers.Protocol.Script = OpenLayers.Class(OpenLayers.Protocol, {
  url: null, params: null, callback: null, callbackTemplate: "OpenLayers.Protocol.Script.registry.${id}", callbackKey: "callback", callbackPrefix: "", scope: null, format: null, pendingRequests: null, srsInBBOX: !1, initialize: function (a) {
    a = a || {}; this.params = {}; this.pendingRequests = {}; OpenLayers.Protocol.prototype.initialize.apply(this, arguments); this.format || (this.format = new OpenLayers.Format.GeoJSON); if (!this.filterToParams && OpenLayers.Format.QueryStringFilter) {
      var b =
        new OpenLayers.Format.QueryStringFilter({ srsInBBOX: this.srsInBBOX }); this.filterToParams = function (a, d) { return b.write(a, d) }
    }
  }, read: function (a) {
    OpenLayers.Protocol.prototype.read.apply(this, arguments); a = OpenLayers.Util.applyDefaults(a, this.options); a.params = OpenLayers.Util.applyDefaults(a.params, this.options.params); a.filter && this.filterToParams && (a.params = this.filterToParams(a.filter, a.params)); var b = new OpenLayers.Protocol.Response({ requestType: "read" }), c = this.createRequest(a.url, a.params, OpenLayers.Function.bind(function (c) {
    b.data =
      c; this.handleRead(b, a)
    }, this)); b.priv = c; return b
  }, createRequest: function (a, b, c) {
    c = OpenLayers.Protocol.Script.register(c); var d = OpenLayers.String.format(this.callbackTemplate, { id: c }); b = OpenLayers.Util.extend({}, b); b[this.callbackKey] = this.callbackPrefix + d; a = OpenLayers.Util.urlAppend(a, OpenLayers.Util.getParameterString(b)); b = document.createElement("script"); b.type = "text/javascript"; b.src = a; b.id = "OpenLayers_Protocol_Script_" + c; this.pendingRequests[b.id] = b; document.getElementsByTagName("head")[0].appendChild(b);
    return b
  }, destroyRequest: function (a) { OpenLayers.Protocol.Script.unregister(a.id.split("_").pop()); delete this.pendingRequests[a.id]; a.parentNode && a.parentNode.removeChild(a) }, handleRead: function (a, b) { this.handleResponse(a, b) }, handleResponse: function (a, b) { b.callback && (a.data ? (a.features = this.parseFeatures(a.data), a.code = OpenLayers.Protocol.Response.SUCCESS) : a.code = OpenLayers.Protocol.Response.FAILURE, this.destroyRequest(a.priv), b.callback.call(b.scope, a)) }, parseFeatures: function (a) { return this.format.read(a) },
  abort: function (a) { if (a) this.destroyRequest(a.priv); else for (var b in this.pendingRequests) this.destroyRequest(this.pendingRequests[b]) }, destroy: function () { this.abort(); delete this.params; delete this.format; OpenLayers.Protocol.prototype.destroy.apply(this) }, CLASS_NAME: "OpenLayers.Protocol.Script"
}); (function () { var a = OpenLayers.Protocol.Script, b = 0; a.registry = {}; a.register = function (c) { var d = "c" + ++b; a.registry[d] = function () { c.apply(this, arguments) }; return d }; a.unregister = function (b) { delete a.registry[b] } })(); OpenLayers.Format.EncodedPolyline = OpenLayers.Class(OpenLayers.Format, {
  geometryType: "linestring", initialize: function (a) { OpenLayers.Format.prototype.initialize.apply(this, [a]) }, read: function (a) {
    var b; if ("linestring" == this.geometryType) b = OpenLayers.Geometry.LineString; else if ("linearring" == this.geometryType) b = OpenLayers.Geometry.LinearRing; else if ("multipoint" == this.geometryType) b = OpenLayers.Geometry.MultiPoint; else if ("point" != this.geometryType && "polygon" != this.geometryType) return null; a = this.decodeDeltas(a,
      2); for (var c = a.length, d = [], e = 0; e + 1 < c;) { var f = a[e++], g = a[e++]; d.push(new OpenLayers.Geometry.Point(g, f)) } return "point" == this.geometryType ? new OpenLayers.Feature.Vector(d[0]) : "polygon" == this.geometryType ? new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing(d)])) : new OpenLayers.Feature.Vector(new b(d))
  }, decode: function (a, b, c) { a = this.decodeDeltas(a, b, c || 1E5); c = a.length; for (var d = [], e = 0; e + (b - 1) < c;) { for (var f = [], g = 0; g < b; ++g)f.push(a[e++]); d.push(f) } return d },
  write: function (a) { a = (a.constructor == Array ? a[0] : a).geometry; var b = a.CLASS_NAME.split(".")[2].toLowerCase(); if ("point" == b) a = Array(a); else if ("linestring" == b || "linearring" == b || "multipoint" == b) a = a.components; else if ("polygon" == b) a = a.components[0].components; else return null; for (var b = [], c = a.length, d = 0; d < c; ++d) { var e = a[d]; b.push(e.y); b.push(e.x) } return this.encodeDeltas(b, 2) }, encode: function (a, b, c) {
    c = c || 1E5; for (var d = [], e = a.length, f = 0; f < e; ++f)for (var g = a[f], h = 0; h < b; ++h)d.push(g[h]); return this.encodeDeltas(d,
      b, c)
  }, encodeDeltas: function (a, b, c) { var d, e = Array(b); for (d = 0; d < b; ++d)e[d] = 0; for (var f = a.length, g = 0; g < f;)for (d = 0; d < b; ++d, ++g) { var h = a[g], k = h - e[d]; e[d] = h; a[g] = k } return this.encodeFloats(a, c || 1E5) }, decodeDeltas: function (a, b, c) { var d, e = Array(b); for (d = 0; d < b; ++d)e[d] = 0; a = this.decodeFloats(a, c || 1E5); c = a.length; for (var f = 0; f < c;)for (d = 0; d < b; ++d, ++f)e[d] += a[f], a[f] = e[d]; return a }, encodeFloats: function (a, b) { for (var c = b || 1E5, d = a.length, e = 0; e < d; ++e)a[e] = Math.round(a[e] * c); return this.encodeSignedIntegers(a) }, decodeFloats: function (a,
    b) { for (var c = b || 1E5, d = this.decodeSignedIntegers(a), e = d.length, f = 0; f < e; ++f)d[f] /= c; return d }, encodeSignedIntegers: function (a) { for (var b = a.length, c = 0; c < b; ++c) { var d = a[c], e = d << 1; 0 > d && (e = ~e); a[c] = e } return this.encodeUnsignedIntegers(a) }, decodeSignedIntegers: function (a) { a = this.decodeUnsignedIntegers(a); for (var b = a.length, c = 0; c < b; ++c) { var d = a[c]; a[c] = d & 1 ? ~(d >> 1) : d >> 1 } return a }, encodeUnsignedIntegers: function (a) { for (var b = "", c = a.length, d = 0; d < c; ++d)b += this.encodeUnsignedInteger(a[d]); return b }, decodeUnsignedIntegers: function (a) {
      for (var b =
        [], c = 0, d = 0, e = a.length, f = 0; f < e; ++f) { var g = a.charCodeAt(f) - 63, c = c | (g & 31) << d; 32 > g ? (b.push(c), d = c = 0) : d += 5 } return b
    }, encodeFloat: function (a, b) { a = Math.round(a * (b || 1E5)); return this.encodeSignedInteger(a) }, decodeFloat: function (a, b) { return this.decodeSignedInteger(a) / (b || 1E5) }, encodeSignedInteger: function (a) { var b = a << 1; 0 > a && (b = ~b); return this.encodeUnsignedInteger(b) }, decodeSignedInteger: function (a) { a = this.decodeUnsignedInteger(a); return a & 1 ? ~(a >> 1) : a >> 1 }, encodeUnsignedInteger: function (a) {
      for (var b, c = ""; 32 <=
        a;)b = (32 | a & 31) + 63, c += String.fromCharCode(b), a >>= 5; return c += String.fromCharCode(a + 63)
    }, decodeUnsignedInteger: function (a) { for (var b = 0, c = 0, d = a.length, e = 0; e < d; ++e) { var f = a.charCodeAt(e) - 63, b = b | (f & 31) << c; if (32 > f) break; c += 5 } return b }, CLASS_NAME: "OpenLayers.Format.EncodedPolyline"
}); OpenLayers.Control.Panel = OpenLayers.Class(OpenLayers.Control, {
  controls: null, autoActivate: !0, defaultControl: null, saveState: !1, allowDepress: !1, activeState: null, initialize: function (a) { OpenLayers.Control.prototype.initialize.apply(this, [a]); this.controls = []; this.activeState = {} }, destroy: function () {
  this.map && this.map.events.unregister("buttonclick", this, this.onButtonClick); OpenLayers.Control.prototype.destroy.apply(this, arguments); for (var a, b = this.controls.length - 1; 0 <= b; b--)a = this.controls[b], a.events &&
    a.events.un({ activate: this.iconOn, deactivate: this.iconOff }), a.panel_div = null; this.activeState = null
  }, activate: function () { if (OpenLayers.Control.prototype.activate.apply(this, arguments)) { for (var a, b = 0, c = this.controls.length; b < c; b++)a = this.controls[b], (a === this.defaultControl || this.saveState && this.activeState[a.id]) && a.activate(); !0 === this.saveState && (this.defaultControl = null); this.redraw(); return !0 } return !1 }, deactivate: function () {
    if (OpenLayers.Control.prototype.deactivate.apply(this, arguments)) {
      for (var a,
        b = 0, c = this.controls.length; b < c; b++)a = this.controls[b], this.activeState[a.id] = a.deactivate(); this.redraw(); return !0
    } return !1
  }, draw: function () { OpenLayers.Control.prototype.draw.apply(this, arguments); this.outsideViewport ? (this.events.attachToElement(this.div), this.events.register("buttonclick", this, this.onButtonClick)) : this.map.events.register("buttonclick", this, this.onButtonClick); this.addControlsToMap(this.controls); return this.div }, redraw: function () {
    for (var a = this.div.childNodes.length - 1; 0 <= a; a--)this.div.removeChild(this.div.childNodes[a]);
    this.div.innerHTML = ""; if (this.active) for (var a = 0, b = this.controls.length; a < b; a++)this.div.appendChild(this.controls[a].panel_div)
  }, activateControl: function (a) {
    if (!this.active) return !1; if (a.type == OpenLayers.Control.TYPE_BUTTON) a.trigger(); else if (a.type == OpenLayers.Control.TYPE_TOGGLE) a.active ? a.deactivate() : a.activate(); else if (this.allowDepress && a.active) a.deactivate(); else {
      for (var b, c = 0, d = this.controls.length; c < d; c++)b = this.controls[c], b == a || b.type !== OpenLayers.Control.TYPE_TOOL && null != b.type || b.deactivate();
      a.activate()
    }
  }, addControls: function (a) { OpenLayers.Util.isArray(a) || (a = [a]); this.controls = this.controls.concat(a); for (var b = 0, c = a.length; b < c; b++) { var d = a[b], e = this.createControlMarkup(d); OpenLayers.Element.addClass(e, d.displayClass + "ItemInactive"); OpenLayers.Element.addClass(e, "olButton"); "" == d.title || e.title || (e.title = d.title); d.panel_div = e } this.map && (this.addControlsToMap(a), this.redraw()) }, createControlMarkup: function (a) { return document.createElement("div") }, addControlsToMap: function (a) {
    for (var b,
      c = 0, d = a.length; c < d; c++)b = a[c], !0 === b.autoActivate ? (b.autoActivate = !1, this.map.addControl(b), b.autoActivate = !0) : (this.map.addControl(b), b.deactivate()), b.events.on({ activate: this.iconOn, deactivate: this.iconOff })
  }, iconOn: function () { var a = this.panel_div; a.className = a.className.replace(RegExp("\\b(" + this.displayClass + "Item)Inactive\\b"), "$1Active") }, iconOff: function () { var a = this.panel_div; a.className = a.className.replace(RegExp("\\b(" + this.displayClass + "Item)Active\\b"), "$1Inactive") }, onButtonClick: function (a) {
    var b =
      this.controls; a = a.buttonElement; for (var c = b.length - 1; 0 <= c; --c)if (b[c].panel_div === a) { this.activateControl(b[c]); break }
  }, getControlsBy: function (a, b) { var c = "function" == typeof b.test; return OpenLayers.Array.filter(this.controls, function (d) { return d[a] == b || c && b.test(d[a]) }) }, getControlsByName: function (a) { return this.getControlsBy("name", a) }, getControlsByClass: function (a) { return this.getControlsBy("CLASS_NAME", a) }, CLASS_NAME: "OpenLayers.Control.Panel"
}); OpenLayers.Control.Button = OpenLayers.Class(OpenLayers.Control, { type: OpenLayers.Control.TYPE_BUTTON, trigger: function () { }, CLASS_NAME: "OpenLayers.Control.Button" }); OpenLayers.Control.ZoomIn = OpenLayers.Class(OpenLayers.Control.Button, { trigger: function () { this.map && this.map.zoomIn() }, CLASS_NAME: "OpenLayers.Control.ZoomIn" }); OpenLayers.Control.ZoomOut = OpenLayers.Class(OpenLayers.Control.Button, { trigger: function () { this.map && this.map.zoomOut() }, CLASS_NAME: "OpenLayers.Control.ZoomOut" }); OpenLayers.Control.ZoomToMaxExtent = OpenLayers.Class(OpenLayers.Control.Button, { trigger: function () { this.map && this.map.zoomToMaxExtent() }, CLASS_NAME: "OpenLayers.Control.ZoomToMaxExtent" }); OpenLayers.Control.ZoomPanel = OpenLayers.Class(OpenLayers.Control.Panel, { initialize: function (a) { OpenLayers.Control.Panel.prototype.initialize.apply(this, [a]); this.addControls([new OpenLayers.Control.ZoomIn, new OpenLayers.Control.ZoomToMaxExtent, new OpenLayers.Control.ZoomOut]) }, CLASS_NAME: "OpenLayers.Control.ZoomPanel" }); OpenLayers.Layer.HTTPRequest = OpenLayers.Class(OpenLayers.Layer, {
  URL_HASH_FACTOR: (Math.sqrt(5) - 1) / 2, url: null, params: null, reproject: !1, initialize: function (a, b, c, d) { OpenLayers.Layer.prototype.initialize.apply(this, [a, d]); this.url = b; this.params || (this.params = OpenLayers.Util.extend({}, c)) }, destroy: function () { this.params = this.url = null; OpenLayers.Layer.prototype.destroy.apply(this, arguments) }, clone: function (a) {
  null == a && (a = new OpenLayers.Layer.HTTPRequest(this.name, this.url, this.params, this.getOptions()));
    return a = OpenLayers.Layer.prototype.clone.apply(this, [a])
  }, setUrl: function (a) { this.url = a }, mergeNewParams: function (a) { this.params = OpenLayers.Util.extend(this.params, a); a = this.redraw(); null != this.map && this.map.events.triggerEvent("changelayer", { layer: this, property: "params" }); return a }, redraw: function (a) { return a ? this.mergeNewParams({ _olSalt: Math.random() }) : OpenLayers.Layer.prototype.redraw.apply(this, []) }, selectUrl: function (a, b) {
    for (var c = 1, d = 0, e = a.length; d < e; d++)c *= a.charCodeAt(d) * this.URL_HASH_FACTOR,
      c -= Math.floor(c); return b[Math.floor(c * b.length)]
  }, getFullRequestString: function (a, b) { var c = b || this.url, d = OpenLayers.Util.extend({}, this.params), d = OpenLayers.Util.extend(d, a), e = OpenLayers.Util.getParameterString(d); OpenLayers.Util.isArray(c) && (c = this.selectUrl(e, c)); var e = OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(c)), f; for (f in d) f.toUpperCase() in e && delete d[f]; e = OpenLayers.Util.getParameterString(d); return OpenLayers.Util.urlAppend(c, e) }, CLASS_NAME: "OpenLayers.Layer.HTTPRequest"
}); OpenLayers.Tile = OpenLayers.Class({
  events: null, eventListeners: null, id: null, layer: null, url: null, bounds: null, size: null, position: null, isLoading: !1, initialize: function (a, b, c, d, e, f) { this.layer = a; this.position = b.clone(); this.setBounds(c); this.url = d; e && (this.size = e.clone()); this.id = OpenLayers.Util.createUniqueID("Tile_"); OpenLayers.Util.extend(this, f); this.events = new OpenLayers.Events(this); if (this.eventListeners instanceof Object) this.events.on(this.eventListeners) }, unload: function () {
  this.isLoading && (this.isLoading =
    !1, this.events.triggerEvent("unload"))
  }, destroy: function () { this.position = this.size = this.bounds = this.layer = null; this.eventListeners && this.events.un(this.eventListeners); this.events.destroy(); this.events = this.eventListeners = null }, draw: function (a) { a || this.clear(); var b = this.shouldDraw(); b && (!a && !1 === this.events.triggerEvent("beforedraw")) && (b = null); return b }, shouldDraw: function () {
    var a = !1, b = this.layer.maxExtent; if (b) {
      var c = this.layer.map, c = c.baseLayer.wrapDateLine && c.getMaxExtent(); this.bounds.intersectsBounds(b,
        { inclusive: !1, worldBounds: c }) && (a = !0)
    } return a || this.layer.displayOutsideMaxExtent
  }, setBounds: function (a) { a = a.clone(); if (this.layer.map.baseLayer.wrapDateLine) { var b = this.layer.map.getMaxExtent(), c = this.layer.map.getResolution(); a = a.wrapDateLine(b, { leftTolerance: c, rightTolerance: c }) } this.bounds = a }, moveTo: function (a, b, c) { null == c && (c = !0); this.setBounds(a); this.position = b.clone(); c && this.draw() }, clear: function (a) { }, CLASS_NAME: "OpenLayers.Tile"
}); OpenLayers.Tile.Image = OpenLayers.Class(OpenLayers.Tile, {
  url: null, imgDiv: null, frame: null, imageReloadAttempts: null, layerAlphaHack: null, asyncRequestId: null, maxGetUrlLength: null, canvasContext: null, crossOriginKeyword: null, initialize: function (a, b, c, d, e, f) {
    OpenLayers.Tile.prototype.initialize.apply(this, arguments); this.url = d; this.layerAlphaHack = this.layer.alpha && OpenLayers.Util.alphaHack(); if (null != this.maxGetUrlLength || this.layer.gutter || this.layerAlphaHack) this.frame = document.createElement("div"), this.frame.style.position =
      "absolute", this.frame.style.overflow = "hidden"; null != this.maxGetUrlLength && OpenLayers.Util.extend(this, OpenLayers.Tile.Image.IFrame)
  }, destroy: function () { this.imgDiv && (this.clear(), this.frame = this.imgDiv = null); this.asyncRequestId = null; OpenLayers.Tile.prototype.destroy.apply(this, arguments) }, draw: function () {
    var a = OpenLayers.Tile.prototype.draw.apply(this, arguments); a ? (this.layer != this.layer.map.baseLayer && this.layer.reproject && (this.bounds = this.getBoundsFromBaseLayer(this.position)), this.isLoading ? this._loadEvent =
      "reload" : (this.isLoading = !0, this._loadEvent = "loadstart"), this.renderTile(), this.positionTile()) : !1 === a && this.unload(); return a
  }, renderTile: function () { if (this.layer.async) { var a = this.asyncRequestId = (this.asyncRequestId || 0) + 1; this.layer.getURLasync(this.bounds, function (b) { a == this.asyncRequestId && (this.url = b, this.initImage()) }, this) } else this.url = this.layer.getURL(this.bounds), this.initImage() }, positionTile: function () {
    var a = this.getTile().style, b = this.frame ? this.size : this.layer.getImageSize(this.bounds),
    c = 1; this.layer instanceof OpenLayers.Layer.Grid && (c = this.layer.getServerResolution() / this.layer.map.getResolution()); a.left = this.position.x + "px"; a.top = this.position.y + "px"; a.width = Math.round(c * b.w) + "px"; a.height = Math.round(c * b.h) + "px"
  }, clear: function () {
    OpenLayers.Tile.prototype.clear.apply(this, arguments); var a = this.imgDiv; if (a) {
      var b = this.getTile(); b.parentNode === this.layer.div && this.layer.div.removeChild(b); this.setImgSrc(); !0 === this.layerAlphaHack && (a.style.filter = ""); OpenLayers.Element.removeClass(a,
        "olImageLoadError")
    } this.canvasContext = null
  }, getImage: function () {
    if (!this.imgDiv) {
    this.imgDiv = OpenLayers.Tile.Image.IMAGE.cloneNode(!1); var a = this.imgDiv.style; if (this.frame) { var b = 0, c = 0; this.layer.gutter && (b = 100 * (this.layer.gutter / this.layer.tileSize.w), c = 100 * (this.layer.gutter / this.layer.tileSize.h)); a.left = -b + "%"; a.top = -c + "%"; a.width = 2 * b + 100 + "%"; a.height = 2 * c + 100 + "%" } a.visibility = "hidden"; a.opacity = 0; 1 > this.layer.opacity && (a.filter = "alpha(opacity=" + 100 * this.layer.opacity + ")"); a.position = "absolute";
      this.layerAlphaHack && (a.paddingTop = a.height, a.height = "0", a.width = "100%"); this.frame && this.frame.appendChild(this.imgDiv)
    } return this.imgDiv
  }, setImage: function (a) { this.imgDiv = a }, initImage: function () {
    if (this.url || this.imgDiv) {
      this.events.triggerEvent("beforeload"); this.layer.div.appendChild(this.getTile()); this.events.triggerEvent(this._loadEvent); var a = this.getImage(), b = a.getAttribute("src") || ""; this.url && OpenLayers.Util.isEquivalentUrl(b, this.url) ? this._loadTimeout = window.setTimeout(OpenLayers.Function.bind(this.onImageLoad,
        this), 0) : (this.stopLoading(), this.crossOriginKeyword && a.removeAttribute("crossorigin"), OpenLayers.Event.observe(a, "load", OpenLayers.Function.bind(this.onImageLoad, this)), OpenLayers.Event.observe(a, "error", OpenLayers.Function.bind(this.onImageError, this)), this.imageReloadAttempts = 0, this.setImgSrc(this.url))
    } else this.isLoading = !1
  }, setImgSrc: function (a) {
    var b = this.imgDiv; a ? (b.style.visibility = "hidden", b.style.opacity = 0, this.crossOriginKeyword && ("data:" !== a.substr(0, 5) ? b.setAttribute("crossorigin", this.crossOriginKeyword) :
      b.removeAttribute("crossorigin")), b.src = a) : (this.stopLoading(), this.imgDiv = null, b.parentNode && b.parentNode.removeChild(b))
  }, getTile: function () { return this.frame ? this.frame : this.getImage() }, createBackBuffer: function () { if (this.imgDiv && !this.isLoading) { var a; this.frame ? (a = this.frame.cloneNode(!1), a.appendChild(this.imgDiv)) : a = this.imgDiv; this.imgDiv = null; return a } }, onImageLoad: function () {
    var a = this.imgDiv; this.stopLoading(); a.style.visibility = "inherit"; a.style.opacity = this.layer.opacity; this.isLoading =
      !1; this.canvasContext = null; this.events.triggerEvent("loadend"); !0 === this.layerAlphaHack && (a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + a.src + "', sizingMethod='scale')")
  }, onImageError: function () { var a = this.imgDiv; null != a.src && (this.imageReloadAttempts++ , this.imageReloadAttempts <= OpenLayers.IMAGE_RELOAD_ATTEMPTS ? this.setImgSrc(this.layer.getURL(this.bounds)) : (OpenLayers.Element.addClass(a, "olImageLoadError"), this.events.triggerEvent("loaderror"), this.onImageLoad())) }, stopLoading: function () {
    OpenLayers.Event.stopObservingElement(this.imgDiv);
    window.clearTimeout(this._loadTimeout); delete this._loadTimeout
  }, getCanvasContext: function () { if (OpenLayers.CANVAS_SUPPORTED && this.imgDiv && !this.isLoading) { if (!this.canvasContext) { var a = document.createElement("canvas"); a.width = this.size.w; a.height = this.size.h; this.canvasContext = a.getContext("2d"); this.canvasContext.drawImage(this.imgDiv, 0, 0) } return this.canvasContext } }, CLASS_NAME: "OpenLayers.Tile.Image"
});
OpenLayers.Tile.Image.IMAGE = function () { var a = new Image; a.className = "olTileImage"; a.galleryImg = "no"; return a }(); OpenLayers.Layer.Grid = OpenLayers.Class(OpenLayers.Layer.HTTPRequest, {
  tileSize: null, tileOriginCorner: "bl", tileOrigin: null, tileOptions: null, tileClass: OpenLayers.Tile.Image, grid: null, singleTile: !1, ratio: 1.5, buffer: 0, transitionEffect: "resize", numLoadingTiles: 0, serverResolutions: null, loading: !1, backBuffer: null, gridResolution: null, backBufferResolution: null, backBufferLonLat: null, backBufferTimerId: null, removeBackBufferDelay: null, className: null, gridLayout: null, rowSign: null, transitionendEvents: ["transitionend",
    "webkitTransitionEnd", "otransitionend", "oTransitionEnd"], initialize: function (a, b, c, d) { OpenLayers.Layer.HTTPRequest.prototype.initialize.apply(this, arguments); this.grid = []; this._removeBackBuffer = OpenLayers.Function.bind(this.removeBackBuffer, this); this.initProperties(); this.rowSign = "t" === this.tileOriginCorner.substr(0, 1) ? 1 : -1 }, initProperties: function () {
    void 0 === this.options.removeBackBufferDelay && (this.removeBackBufferDelay = this.singleTile ? 0 : 2500); void 0 === this.options.className && (this.className = this.singleTile ?
      "olLayerGridSingleTile" : "olLayerGrid")
    }, setMap: function (a) { OpenLayers.Layer.HTTPRequest.prototype.setMap.call(this, a); OpenLayers.Element.addClass(this.div, this.className) }, removeMap: function (a) { this.removeBackBuffer() }, destroy: function () { this.removeBackBuffer(); this.clearGrid(); this.tileSize = this.grid = null; OpenLayers.Layer.HTTPRequest.prototype.destroy.apply(this, arguments) }, clearGrid: function () {
      if (this.grid) {
        for (var a = 0, b = this.grid.length; a < b; a++)for (var c = this.grid[a], d = 0, e = c.length; d < e; d++)this.destroyTile(c[d]);
        this.grid = []; this.gridLayout = this.gridResolution = null
      }
    }, addOptions: function (a, b) { var c = void 0 !== a.singleTile && a.singleTile !== this.singleTile; OpenLayers.Layer.HTTPRequest.prototype.addOptions.apply(this, arguments); this.map && c && (this.initProperties(), this.clearGrid(), this.tileSize = this.options.tileSize, this.setTileSize(), this.moveTo(null, !0)) }, clone: function (a) {
    null == a && (a = new OpenLayers.Layer.Grid(this.name, this.url, this.params, this.getOptions())); a = OpenLayers.Layer.HTTPRequest.prototype.clone.apply(this,
      [a]); null != this.tileSize && (a.tileSize = this.tileSize.clone()); a.grid = []; a.gridResolution = null; a.backBuffer = null; a.backBufferTimerId = null; a.loading = !1; a.numLoadingTiles = 0; return a
    }, moveTo: function (a, b, c) {
      OpenLayers.Layer.HTTPRequest.prototype.moveTo.apply(this, arguments); a = a || this.map.getExtent(); if (null != a) {
        var d = !this.grid.length || b, e = this.getTilesBounds(), f = this.map.getResolution(); this.getServerResolution(f); if (this.singleTile) {
          if (d || !c && !e.containsBounds(a)) b && "resize" !== this.transitionEffect &&
            this.removeBackBuffer(), b && "resize" !== this.transitionEffect || this.applyBackBuffer(f), this.initSingleTile(a)
        } else (d = d || !e.intersectsBounds(a, { worldBounds: this.map.baseLayer.wrapDateLine && this.map.getMaxExtent() })) ? (!b || "resize" !== this.transitionEffect && this.gridResolution !== f || this.applyBackBuffer(f), this.initGriddedTiles(a)) : this.moveGriddedTiles()
      }
    }, getTileData: function (a) {
      var b = null, c = a.lon, d = a.lat, e = this.grid.length; if (this.map && e) {
        var f = this.map.getResolution(); a = this.tileSize.w; var g = this.tileSize.h,
          h = this.grid[0][0].bounds, k = h.left, h = h.top; if (c < k && this.map.baseLayer.wrapDateLine) var l = this.map.getMaxExtent().getWidth(), m = Math.ceil((k - c) / l), c = c + l * m; c = (c - k) / (f * a); d = (h - d) / (f * g); f = Math.floor(c); k = Math.floor(d); 0 <= k && k < e && (e = this.grid[k][f]) && (b = { tile: e, i: Math.floor((c - f) * a), j: Math.floor((d - k) * g) })
      } return b
    }, destroyTile: function (a) { this.removeTileMonitoringHooks(a); a.destroy() }, getServerResolution: function (a) {
      var b = Number.POSITIVE_INFINITY; a = a || this.map.getResolution(); if (this.serverResolutions &&
        -1 === OpenLayers.Util.indexOf(this.serverResolutions, a)) { var c, d, e, f; for (c = this.serverResolutions.length - 1; 0 <= c; c--) { e = this.serverResolutions[c]; d = Math.abs(e - a); if (d > b) break; b = d; f = e } a = f } return a
    }, getServerZoom: function () { var a = this.getServerResolution(); return this.serverResolutions ? OpenLayers.Util.indexOf(this.serverResolutions, a) : this.map.getZoomForResolution(a) + (this.zoomOffset || 0) }, applyBackBuffer: function (a) {
    null !== this.backBufferTimerId && this.removeBackBuffer(); var b = this.backBuffer; if (!b) {
      b =
      this.createBackBuffer(); if (!b) return; a === this.gridResolution ? this.div.insertBefore(b, this.div.firstChild) : this.map.baseLayer.div.parentNode.insertBefore(b, this.map.baseLayer.div); this.backBuffer = b; var c = this.grid[0][0].bounds; this.backBufferLonLat = { lon: c.left, lat: c.top }; this.backBufferResolution = this.gridResolution
    } for (var c = this.backBufferResolution / a, d = b.childNodes, e, f = d.length - 1; 0 <= f; --f)e = d[f], e.style.top = (c * e._i * e._h | 0) + "px", e.style.left = (c * e._j * e._w | 0) + "px", e.style.width = Math.round(c * e._w) +
      "px", e.style.height = Math.round(c * e._h) + "px"; a = this.getViewPortPxFromLonLat(this.backBufferLonLat, a); c = this.map.layerContainerOriginPx.y; b.style.left = Math.round(a.x - this.map.layerContainerOriginPx.x) + "px"; b.style.top = Math.round(a.y - c) + "px"
    }, createBackBuffer: function () {
      var a; if (0 < this.grid.length) {
        a = document.createElement("div"); a.id = this.div.id + "_bb"; a.className = "olBackBuffer"; a.style.position = "absolute"; var b = this.map; a.style.zIndex = "resize" === this.transitionEffect ? this.getZIndex() - 1 : b.Z_INDEX_BASE.BaseLayer -
          (b.getNumLayers() - b.getLayerIndex(this)); for (var b = 0, c = this.grid.length; b < c; b++)for (var d = 0, e = this.grid[b].length; d < e; d++) { var f = this.grid[b][d], g = this.grid[b][d].createBackBuffer(); g && (g._i = b, g._j = d, g._w = f.size.w, g._h = f.size.h, g.id = f.id + "_bb", a.appendChild(g)) }
      } return a
    }, removeBackBuffer: function () {
      if (this._transitionElement) { for (var a = this.transitionendEvents.length - 1; 0 <= a; --a)OpenLayers.Event.stopObserving(this._transitionElement, this.transitionendEvents[a], this._removeBackBuffer); delete this._transitionElement } this.backBuffer &&
        (this.backBuffer.parentNode && this.backBuffer.parentNode.removeChild(this.backBuffer), this.backBufferResolution = this.backBuffer = null, null !== this.backBufferTimerId && (window.clearTimeout(this.backBufferTimerId), this.backBufferTimerId = null))
    }, moveByPx: function (a, b) { this.singleTile || this.moveGriddedTiles() }, setTileSize: function (a) { this.singleTile && (a = this.map.getSize(), a.h = parseInt(a.h * this.ratio, 10), a.w = parseInt(a.w * this.ratio, 10)); OpenLayers.Layer.HTTPRequest.prototype.setTileSize.apply(this, [a]) }, getTilesBounds: function () {
      var a =
        null, b = this.grid.length; if (b) var a = this.grid[b - 1][0].bounds, b = this.grid[0].length * a.getWidth(), c = this.grid.length * a.getHeight(), a = new OpenLayers.Bounds(a.left, a.bottom, a.left + b, a.bottom + c); return a
    }, initSingleTile: function (a) {
      this.events.triggerEvent("retile"); var b = a.getCenterLonLat(), c = a.getWidth() * this.ratio; a = a.getHeight() * this.ratio; b = new OpenLayers.Bounds(b.lon - c / 2, b.lat - a / 2, b.lon + c / 2, b.lat + a / 2); c = this.map.getLayerPxFromLonLat({ lon: b.left, lat: b.top }); this.grid.length || (this.grid[0] = []); (a = this.grid[0][0]) ?
        a.moveTo(b, c) : (a = this.addTile(b, c), this.addTileMonitoringHooks(a), a.draw(), this.grid[0][0] = a); this.removeExcessTiles(1, 1); this.gridResolution = this.getServerResolution()
    }, calculateGridLayout: function (a, b, c) { var d = c * this.tileSize.w; c *= this.tileSize.h; var e = Math.floor((a.left - b.lon) / d) - this.buffer, f = this.rowSign; a = Math[~f ? "floor" : "ceil"](f * (b.lat - a.top + c) / c) - this.buffer * f; return { tilelon: d, tilelat: c, startcol: e, startrow: a } }, getTileOrigin: function () {
      var a = this.tileOrigin; if (!a) var a = this.getMaxExtent(),
        b = { tl: ["left", "top"], tr: ["right", "top"], bl: ["left", "bottom"], br: ["right", "bottom"] }[this.tileOriginCorner], a = new OpenLayers.LonLat(a[b[0]], a[b[1]]); return a
    }, getTileBoundsForGridIndex: function (a, b) { var c = this.getTileOrigin(), d = this.gridLayout, e = d.tilelon, f = d.tilelat, g = d.startcol, d = d.startrow, h = this.rowSign; return new OpenLayers.Bounds(c.lon + (g + b) * e, c.lat - (d + a * h) * f * h, c.lon + (g + b + 1) * e, c.lat - (d + (a - 1) * h) * f * h) }, initGriddedTiles: function (a) {
      this.events.triggerEvent("retile"); var b = this.map.getSize(), c = this.getTileOrigin(),
        d = this.map.getResolution(), e = this.getServerResolution(), f = d / e, d = this.tileSize.w / f, f = this.tileSize.h / f, g = Math.ceil(b.h / f) + 2 * this.buffer + 1, b = Math.ceil(b.w / d) + 2 * this.buffer + 1; this.gridLayout = e = this.calculateGridLayout(a, c, e); var c = e.tilelon, h = e.tilelat, e = this.map.layerContainerOriginPx.x, k = this.map.layerContainerOriginPx.y, l = this.getTileBoundsForGridIndex(0, 0), m = this.map.getViewPortPxFromLonLat(new OpenLayers.LonLat(l.left, l.top)); m.x = Math.round(m.x) - e; m.y = Math.round(m.y) - k; var e = [], k = this.map.getCenter(),
          n = 0; do { var p = this.grid[n]; p || (p = [], this.grid.push(p)); var q = 0; do { var l = this.getTileBoundsForGridIndex(n, q), r = m.clone(); r.x += q * Math.round(d); r.y += n * Math.round(f); var s = p[q]; s ? s.moveTo(l, r, !1) : (s = this.addTile(l, r), this.addTileMonitoringHooks(s), p.push(s)); r = l.getCenterLonLat(); e.push({ tile: s, distance: Math.pow(r.lon - k.lon, 2) + Math.pow(r.lat - k.lat, 2) }); q += 1 } while (l.right <= a.right + c * this.buffer || q < b); n += 1 } while (l.bottom >= a.bottom - h * this.buffer || n < g); this.removeExcessTiles(n, q); this.gridResolution = d = this.getServerResolution();
      e.sort(function (a, b) { return a.distance - b.distance }); a = 0; for (d = e.length; a < d; ++a)e[a].tile.draw()
    }, getMaxExtent: function () { return this.maxExtent }, addTile: function (a, b) { var c = new this.tileClass(this, b, a, null, this.tileSize, this.tileOptions); this.events.triggerEvent("addtile", { tile: c }); return c }, addTileMonitoringHooks: function (a) {
    a.onLoadStart = function () {
    !1 === this.loading && (this.loading = !0, this.events.triggerEvent("loadstart")); this.events.triggerEvent("tileloadstart", { tile: a }); this.numLoadingTiles++;
      !this.singleTile && (this.backBuffer && this.gridResolution === this.backBufferResolution) && OpenLayers.Element.addClass(a.getTile(), "olTileReplacing")
    }; a.onLoadEnd = function (b) {
    this.numLoadingTiles--; b = "unload" === b.type; this.events.triggerEvent("tileloaded", { tile: a, aborted: b }); if (!this.singleTile && !b && this.backBuffer && this.gridResolution === this.backBufferResolution) {
      var c = a.getTile(); if ("none" === OpenLayers.Element.getStyle(c, "display")) { var d = document.getElementById(a.id + "_bb"); d && d.parentNode.removeChild(d) } OpenLayers.Element.removeClass(c,
        "olTileReplacing")
    } if (0 === this.numLoadingTiles) { if (this.backBuffer) if (0 === this.backBuffer.childNodes.length) this.removeBackBuffer(); else { this._transitionElement = b ? this.div.lastChild : a.imgDiv; b = this.transitionendEvents; for (c = b.length - 1; 0 <= c; --c)OpenLayers.Event.observe(this._transitionElement, b[c], this._removeBackBuffer); this.backBufferTimerId = window.setTimeout(this._removeBackBuffer, this.removeBackBufferDelay) } this.loading = !1; this.events.triggerEvent("loadend") }
    }; a.onLoadError = function () {
      this.events.triggerEvent("tileerror",
        { tile: a })
    }; a.events.on({ loadstart: a.onLoadStart, loadend: a.onLoadEnd, unload: a.onLoadEnd, loaderror: a.onLoadError, scope: this })
    }, removeTileMonitoringHooks: function (a) { a.unload(); a.events.un({ loadstart: a.onLoadStart, loadend: a.onLoadEnd, unload: a.onLoadEnd, loaderror: a.onLoadError, scope: this }) }, moveGriddedTiles: function () {
      for (var a = this.buffer + 1; ;) {
        var b = this.grid[0][0], c = b.position.x + this.map.layerContainerOriginPx.x, b = b.position.y + this.map.layerContainerOriginPx.y, d = this.getServerResolution() / this.map.getResolution(),
        d = { w: Math.round(this.tileSize.w * d), h: Math.round(this.tileSize.h * d) }; if (c > -d.w * (a - 1)) this.shiftColumn(!0, d); else if (c < -d.w * a) this.shiftColumn(!1, d); else if (b > -d.h * (a - 1)) this.shiftRow(!0, d); else if (b < -d.h * a) this.shiftRow(!1, d); else break
      }
    }, shiftRow: function (a, b) {
      var c = this.grid, d = a ? 0 : c.length - 1, e = a ? -1 : 1; this.gridLayout.startrow += e * this.rowSign; for (var f = c[d], g = c[a ? "pop" : "shift"](), h = 0, k = g.length; h < k; h++) { var l = g[h], m = f[h].position.clone(); m.y += b.h * e; l.moveTo(this.getTileBoundsForGridIndex(d, h), m) } c[a ?
        "unshift" : "push"](g)
    }, shiftColumn: function (a, b) { var c = this.grid, d = a ? 0 : c[0].length - 1, e = a ? -1 : 1; this.gridLayout.startcol += e; for (var f = 0, g = c.length; f < g; f++) { var h = c[f], k = h[d].position.clone(), l = h[a ? "pop" : "shift"](); k.x += b.w * e; l.moveTo(this.getTileBoundsForGridIndex(f, d), k); h[a ? "unshift" : "push"](l) } }, removeExcessTiles: function (a, b) {
      for (var c, d; this.grid.length > a;) { var e = this.grid.pop(); c = 0; for (d = e.length; c < d; c++) { var f = e[c]; this.destroyTile(f) } } c = 0; for (d = this.grid.length; c < d; c++)for (; this.grid[c].length >
        b;)e = this.grid[c], f = e.pop(), this.destroyTile(f)
    }, onMapResize: function () { this.singleTile && (this.clearGrid(), this.setTileSize()) }, getTileBounds: function (a) { var b = this.maxExtent, c = this.getResolution(), d = c * this.tileSize.w, c = c * this.tileSize.h, e = this.getLonLatFromViewPortPx(a); a = b.left + d * Math.floor((e.lon - b.left) / d); b = b.bottom + c * Math.floor((e.lat - b.bottom) / c); return new OpenLayers.Bounds(a, b, a + d, b + c) }, CLASS_NAME: "OpenLayers.Layer.Grid"
}); OpenLayers.Format.ArcXML = OpenLayers.Class(OpenLayers.Format.XML, {
  fontStyleKeys: "antialiasing blockout font fontcolor fontsize fontstyle glowing interval outline printmode shadow transparency".split(" "), request: null, response: null, initialize: function (a) {
  this.request = new OpenLayers.Format.ArcXML.Request; this.response = new OpenLayers.Format.ArcXML.Response; if (a) if ("feature" == a.requesttype) {
    this.request.get_image = null; var b = this.request.get_feature.query; this.addCoordSys(b.featurecoordsys, a.featureCoordSys);
    this.addCoordSys(b.filtercoordsys, a.filterCoordSys); a.polygon ? (b.isspatial = !0, b.spatialfilter.polygon = a.polygon) : a.envelope && (b.isspatial = !0, b.spatialfilter.envelope = { minx: 0, miny: 0, maxx: 0, maxy: 0 }, this.parseEnvelope(b.spatialfilter.envelope, a.envelope))
  } else "image" == a.requesttype ? (this.request.get_feature = null, b = this.request.get_image.properties, this.parseEnvelope(b.envelope, a.envelope), this.addLayers(b.layerlist, a.layers), this.addImageSize(b.imagesize, a.tileSize), this.addCoordSys(b.featurecoordsys,
    a.featureCoordSys), this.addCoordSys(b.filtercoordsys, a.filterCoordSys)) : this.request = null; OpenLayers.Format.XML.prototype.initialize.apply(this, [a])
  }, parseEnvelope: function (a, b) { b && 4 == b.length && (a.minx = b[0], a.miny = b[1], a.maxx = b[2], a.maxy = b[3]) }, addLayers: function (a, b) { for (var c = 0, d = b.length; c < d; c++)a.push(b[c]) }, addImageSize: function (a, b) { null !== b && (a.width = b.w, a.height = b.h, a.printwidth = b.w, a.printheight = b.h) }, addCoordSys: function (a, b) {
    "string" == typeof b ? (a.id = parseInt(b), a.string = b) : "object" == typeof b &&
      null !== b.proj && (a.id = b.proj.srsProjNumber, a.string = b.proj.srsCode)
  }, iserror: function (a) { var b = null; a ? (a = OpenLayers.Format.XML.prototype.read.apply(this, [a]), a = a.documentElement.getElementsByTagName("ERROR"), b = null !== a && 0 < a.length) : b = "" !== this.response.error; return b }, read: function (a) {
  "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); var b = null; a && a.documentElement && (b = "ARCXML" == a.documentElement.nodeName ? a.documentElement : a.documentElement.getElementsByTagName("ARCXML")[0]);
    if (!b || "parsererror" === b.firstChild.nodeName) { var c, d; try { c = a.firstChild.nodeValue, d = a.firstChild.childNodes[1].firstChild.nodeValue } catch (e) { } throw { message: "Error parsing the ArcXML request", error: c, source: d }; } return this.parseResponse(b)
  }, write: function (a) {
    a || (a = this.request); var b = this.createElementNS("", "ARCXML"); b.setAttribute("version", "1.1"); var c = this.createElementNS("", "REQUEST"); if (null != a.get_image) {
      var d = this.createElementNS("", "GET_IMAGE"); c.appendChild(d); var e = this.createElementNS("",
        "PROPERTIES"); d.appendChild(e); a = a.get_image.properties; null != a.featurecoordsys && (d = this.createElementNS("", "FEATURECOORDSYS"), e.appendChild(d), 0 === a.featurecoordsys.id ? d.setAttribute("string", a.featurecoordsys.string) : d.setAttribute("id", a.featurecoordsys.id)); null != a.filtercoordsys && (d = this.createElementNS("", "FILTERCOORDSYS"), e.appendChild(d), 0 === a.filtercoordsys.id ? d.setAttribute("string", a.filtercoordsys.string) : d.setAttribute("id", a.filtercoordsys.id)); null != a.envelope && (d = this.createElementNS("",
          "ENVELOPE"), e.appendChild(d), d.setAttribute("minx", a.envelope.minx), d.setAttribute("miny", a.envelope.miny), d.setAttribute("maxx", a.envelope.maxx), d.setAttribute("maxy", a.envelope.maxy)); d = this.createElementNS("", "IMAGESIZE"); e.appendChild(d); d.setAttribute("height", a.imagesize.height); d.setAttribute("width", a.imagesize.width); if (a.imagesize.height != a.imagesize.printheight || a.imagesize.width != a.imagesize.printwidth) d.setAttribute("printheight", a.imagesize.printheight), d.setArrtibute("printwidth", a.imagesize.printwidth);
      null != a.background && (d = this.createElementNS("", "BACKGROUND"), e.appendChild(d), d.setAttribute("color", a.background.color.r + "," + a.background.color.g + "," + a.background.color.b), null !== a.background.transcolor && d.setAttribute("transcolor", a.background.transcolor.r + "," + a.background.transcolor.g + "," + a.background.transcolor.b)); if (null != a.layerlist && 0 < a.layerlist.length) for (d = this.createElementNS("", "LAYERLIST"), e.appendChild(d), e = 0; e < a.layerlist.length; e++) {
        var f = this.createElementNS("", "LAYERDEF"); d.appendChild(f);
        f.setAttribute("id", a.layerlist[e].id); f.setAttribute("visible", a.layerlist[e].visible); if ("object" == typeof a.layerlist[e].query) {
          var g = a.layerlist[e].query; if (0 > g.where.length) continue; var h = null, h = "boolean" == typeof g.spatialfilter && g.spatialfilter ? this.createElementNS("", "SPATIALQUERY") : this.createElementNS("", "QUERY"); h.setAttribute("where", g.where); "number" == typeof g.accuracy && 0 < g.accuracy && h.setAttribute("accuracy", g.accuracy); "number" == typeof g.featurelimit && 2E3 > g.featurelimit && h.setAttribute("featurelimit",
            g.featurelimit); "string" == typeof g.subfields && "#ALL#" != g.subfields && h.setAttribute("subfields", g.subfields); "string" == typeof g.joinexpression && 0 < g.joinexpression.length && h.setAttribute("joinexpression", g.joinexpression); "string" == typeof g.jointables && 0 < g.jointables.length && h.setAttribute("jointables", g.jointables); f.appendChild(h)
        } "object" == typeof a.layerlist[e].renderer && this.addRenderer(f, a.layerlist[e].renderer)
      }
    } else null != a.get_feature && (d = this.createElementNS("", "GET_FEATURES"), d.setAttribute("outputmode",
      "newxml"), d.setAttribute("checkesc", "true"), a.get_feature.geometry ? d.setAttribute("geometry", a.get_feature.geometry) : d.setAttribute("geometry", "false"), a.get_feature.compact && d.setAttribute("compact", a.get_feature.compact), "number" == a.get_feature.featurelimit && d.setAttribute("featurelimit", a.get_feature.featurelimit), d.setAttribute("globalenvelope", "true"), c.appendChild(d), null != a.get_feature.layer && 0 < a.get_feature.layer.length && (e = this.createElementNS("", "LAYER"), e.setAttribute("id", a.get_feature.layer),
        d.appendChild(e)), a = a.get_feature.query, null != a && (e = null, e = a.isspatial ? this.createElementNS("", "SPATIALQUERY") : this.createElementNS("", "QUERY"), d.appendChild(e), "number" == typeof a.accuracy && e.setAttribute("accuracy", a.accuracy), null != a.featurecoordsys && (d = this.createElementNS("", "FEATURECOORDSYS"), 0 == a.featurecoordsys.id ? d.setAttribute("string", a.featurecoordsys.string) : d.setAttribute("id", a.featurecoordsys.id), e.appendChild(d)), null != a.filtercoordsys && (d = this.createElementNS("", "FILTERCOORDSYS"),
          0 === a.filtercoordsys.id ? d.setAttribute("string", a.filtercoordsys.string) : d.setAttribute("id", a.filtercoordsys.id), e.appendChild(d)), 0 < a.buffer && (d = this.createElementNS("", "BUFFER"), d.setAttribute("distance", a.buffer), e.appendChild(d)), a.isspatial && (d = this.createElementNS("", "SPATIALFILTER"), d.setAttribute("relation", a.spatialfilter.relation), e.appendChild(d), a.spatialfilter.envelope ? (f = this.createElementNS("", "ENVELOPE"), f.setAttribute("minx", a.spatialfilter.envelope.minx), f.setAttribute("miny", a.spatialfilter.envelope.miny),
            f.setAttribute("maxx", a.spatialfilter.envelope.maxx), f.setAttribute("maxy", a.spatialfilter.envelope.maxy), d.appendChild(f)) : "object" == typeof a.spatialfilter.polygon && d.appendChild(this.writePolygonGeometry(a.spatialfilter.polygon))), null != a.where && 0 < a.where.length && e.setAttribute("where", a.where))); b.appendChild(c); return OpenLayers.Format.XML.prototype.write.apply(this, [b])
  }, addGroupRenderer: function (a, b) {
    var c = this.createElementNS("", "GROUPRENDERER"); a.appendChild(c); for (var d = 0; d < b.length; d++)this.addRenderer(c,
      b[d])
  }, addRenderer: function (a, b) { if (OpenLayers.Util.isArray(b)) this.addGroupRenderer(a, b); else { var c = this.createElementNS("", b.type.toUpperCase() + "RENDERER"); a.appendChild(c); "VALUEMAPRENDERER" == c.tagName ? this.addValueMapRenderer(c, b) : "VALUEMAPLABELRENDERER" == c.tagName ? this.addValueMapLabelRenderer(c, b) : "SIMPLELABELRENDERER" == c.tagName ? this.addSimpleLabelRenderer(c, b) : "SCALEDEPENDENTRENDERER" == c.tagName && this.addScaleDependentRenderer(c, b) } }, addScaleDependentRenderer: function (a, b) {
  "string" != typeof b.lower &&
    "number" != typeof b.lower || a.setAttribute("lower", b.lower); "string" != typeof b.upper && "number" != typeof b.upper || a.setAttribute("upper", b.upper); this.addRenderer(a, b.renderer)
  }, addValueMapLabelRenderer: function (a, b) {
    a.setAttribute("lookupfield", b.lookupfield); a.setAttribute("labelfield", b.labelfield); if ("object" == typeof b.exacts) for (var c = 0, d = b.exacts.length; c < d; c++) {
      var e = b.exacts[c], f = this.createElementNS("", "EXACT"); "string" == typeof e.value && f.setAttribute("value", e.value); "string" == typeof e.label &&
        f.setAttribute("label", e.label); "string" == typeof e.method && f.setAttribute("method", e.method); a.appendChild(f); if ("object" == typeof e.symbol) { var g = null; "text" == e.symbol.type && (g = this.createElementNS("", "TEXTSYMBOL")); if (null != g) { for (var h = this.fontStyleKeys, k = 0, l = h.length; k < l; k++) { var m = h[k]; e.symbol[m] && g.setAttribute(m, e.symbol[m]) } f.appendChild(g) } }
    }
  }, addValueMapRenderer: function (a, b) {
    a.setAttribute("lookupfield", b.lookupfield); if ("object" == typeof b.ranges) for (var c = 0, d = b.ranges.length; c < d; c++) {
      var e =
        b.ranges[c], f = this.createElementNS("", "RANGE"); f.setAttribute("lower", e.lower); f.setAttribute("upper", e.upper); a.appendChild(f); if ("object" == typeof e.symbol) {
          var g = null; "simplepolygon" == e.symbol.type && (g = this.createElementNS("", "SIMPLEPOLYGONSYMBOL")); null != g && ("string" == typeof e.symbol.boundarycolor && g.setAttribute("boundarycolor", e.symbol.boundarycolor), "string" == typeof e.symbol.fillcolor && g.setAttribute("fillcolor", e.symbol.fillcolor), "number" == typeof e.symbol.filltransparency && g.setAttribute("filltransparency",
            e.symbol.filltransparency), f.appendChild(g))
        }
    } else if ("object" == typeof b.exacts) for (c = 0, d = b.exacts.length; c < d; c++)e = b.exacts[c], f = this.createElementNS("", "EXACT"), "string" == typeof e.value && f.setAttribute("value", e.value), "string" == typeof e.label && f.setAttribute("label", e.label), "string" == typeof e.method && f.setAttribute("method", e.method), a.appendChild(f), "object" == typeof e.symbol && (g = null, "simplemarker" == e.symbol.type && (g = this.createElementNS("", "SIMPLEMARKERSYMBOL")), null != g && ("string" == typeof e.symbol.antialiasing &&
      g.setAttribute("antialiasing", e.symbol.antialiasing), "string" == typeof e.symbol.color && g.setAttribute("color", e.symbol.color), "string" == typeof e.symbol.outline && g.setAttribute("outline", e.symbol.outline), "string" == typeof e.symbol.overlap && g.setAttribute("overlap", e.symbol.overlap), "string" == typeof e.symbol.shadow && g.setAttribute("shadow", e.symbol.shadow), "number" == typeof e.symbol.transparency && g.setAttribute("transparency", e.symbol.transparency), "string" == typeof e.symbol.usecentroid && g.setAttribute("usecentroid",
        e.symbol.usecentroid), "number" == typeof e.symbol.width && g.setAttribute("width", e.symbol.width), f.appendChild(g)))
  }, addSimpleLabelRenderer: function (a, b) {
    a.setAttribute("field", b.field); for (var c = "featureweight howmanylabels labelbufferratio labelpriorities labelweight linelabelposition rotationalangles".split(" "), d = 0, e = c.length; d < e; d++) { var f = c[d]; b[f] && a.setAttribute(f, b[f]) } if ("text" == b.symbol.type) {
      var g = b.symbol, h = this.createElementNS("", "TEXTSYMBOL"); a.appendChild(h); c = this.fontStyleKeys; d = 0;
      for (e = c.length; d < e; d++)f = c[d], g[f] && h.setAttribute(f, b[f])
    }
  }, writePolygonGeometry: function (a) {
    if (!(a instanceof OpenLayers.Geometry.Polygon)) throw { message: "Cannot write polygon geometry to ArcXML with an " + a.CLASS_NAME + " object.", geometry: a }; for (var b = this.createElementNS("", "POLYGON"), c = 0, d = a.components.length; c < d; c++) {
      for (var e = a.components[c], f = this.createElementNS("", "RING"), g = 0, h = e.components.length; g < h; g++) {
        var k = e.components[g], l = this.createElementNS("", "POINT"); l.setAttribute("x", k.x); l.setAttribute("y",
          k.y); f.appendChild(l)
      } b.appendChild(f)
    } return b
  }, parseResponse: function (a) {
  "string" == typeof a && (a = (new OpenLayers.Format.XML).read(a)); var b = new OpenLayers.Format.ArcXML.Response, c = a.getElementsByTagName("ERROR"); if (null != c && 0 < c.length) b.error = this.getChildValue(c, "Unknown error."); else {
    c = a.getElementsByTagName("RESPONSE"); if (null == c || 0 == c.length) return b.error = "No RESPONSE tag found in ArcXML response.", b; var d = c[0].firstChild.nodeName; "#text" == d && (d = c[0].firstChild.nextSibling.nodeName); if ("IMAGE" ==
      d) c = a.getElementsByTagName("ENVELOPE"), a = a.getElementsByTagName("OUTPUT"), null == c || 0 == c.length ? b.error = "No ENVELOPE tag found in ArcXML response." : null == a || 0 == a.length ? b.error = "No OUTPUT tag found in ArcXML response." : (c = this.parseAttributes(c[0]), d = this.parseAttributes(a[0]), b.image = "string" == typeof d.type ? { envelope: c, output: { type: d.type, data: this.getChildValue(a[0]) } } : { envelope: c, output: d }); else if ("FEATURES" == d) {
        if (a = c[0].getElementsByTagName("FEATURES"), c = a[0].getElementsByTagName("FEATURECOUNT"),
          b.features.featurecount = c[0].getAttribute("count"), 0 < b.features.featurecount) for (c = a[0].getElementsByTagName("ENVELOPE"), b.features.envelope = this.parseAttributes(c[0], "number"), a = a[0].getElementsByTagName("FEATURE"), c = 0; c < a.length; c++) {
            for (var d = new OpenLayers.Feature.Vector, e = a[c].getElementsByTagName("FIELD"), f = 0; f < e.length; f++) { var g = e[f].getAttribute("name"), h = e[f].getAttribute("value"); d.attributes[g] = h } e = a[c].getElementsByTagName("POLYGON"); if (0 < e.length) {
              e = e[0].getElementsByTagName("RING");
              f = []; for (g = 0; g < e.length; g++) { h = []; h.push(this.parsePointGeometry(e[g])); for (var k = e[g].getElementsByTagName("HOLE"), l = 0; l < k.length; l++)h.push(this.parsePointGeometry(k[l])); f.push(new OpenLayers.Geometry.Polygon(h)) } d.geometry = 1 == f.length ? f[0] : new OpenLayers.Geometry.MultiPolygon(f)
            } b.features.feature.push(d)
          }
      } else b.error = "Unidentified response type."
  } return b
  }, parseAttributes: function (a, b) {
    for (var c = {}, d = 0; d < a.attributes.length; d++)c[a.attributes[d].nodeName] = "number" == b ? parseFloat(a.attributes[d].nodeValue) :
      a.attributes[d].nodeValue; return c
  }, parsePointGeometry: function (a) { var b = [], c = a.getElementsByTagName("COORDS"); if (0 < c.length) for (a = this.getChildValue(c[0]), a = a.split(/;/), c = 0; c < a.length; c++) { var d = a[c].split(/ /); b.push(new OpenLayers.Geometry.Point(d[0], d[1])) } else if (a = a.getElementsByTagName("POINT"), 0 < a.length) for (c = 0; c < a.length; c++)b.push(new OpenLayers.Geometry.Point(parseFloat(a[c].getAttribute("x")), parseFloat(a[c].getAttribute("y")))); return new OpenLayers.Geometry.LinearRing(b) }, CLASS_NAME: "OpenLayers.Format.ArcXML"
});
OpenLayers.Format.ArcXML.Request = OpenLayers.Class({
  initialize: function (a) {
    return OpenLayers.Util.extend(this, {
      get_image: {
        properties: {
          background: null, draw: !0, envelope: { minx: 0, miny: 0, maxx: 0, maxy: 0 }, featurecoordsys: { id: 0, string: "", datumtransformid: 0, datumtransformstring: "" }, filtercoordsys: { id: 0, string: "", datumtransformid: 0, datumtransformstring: "" }, imagesize: { height: 0, width: 0, dpi: 96, printheight: 0, printwidth: 0, scalesymbols: !1 }, layerlist: [], output: {
            baseurl: "", legendbaseurl: "", legendname: "", legendpath: "",
            legendurl: "", name: "", path: "", type: "jpg", url: ""
          }
        }
      }, get_feature: { layer: "", query: { isspatial: !1, featurecoordsys: { id: 0, string: "", datumtransformid: 0, datumtransformstring: "" }, filtercoordsys: { id: 0, string: "", datumtransformid: 0, datumtransformstring: "" }, buffer: 0, where: "", spatialfilter: { relation: "envelope_intersection", envelope: null } } }, environment: { separators: { cs: " ", ts: ";" } }, layer: [], workspaces: []
    })
  }, CLASS_NAME: "OpenLayers.Format.ArcXML.Request"
});
OpenLayers.Format.ArcXML.Response = OpenLayers.Class({ initialize: function (a) { return OpenLayers.Util.extend(this, { image: { envelope: null, output: "" }, features: { featurecount: 0, envelope: null, feature: [] }, error: "" }) }, CLASS_NAME: "OpenLayers.Format.ArcXML.Response" }); (function () {
  function a() { this._object = f && !k ? new f : new window.ActiveXObject("Microsoft.XMLHTTP"); this._listeners = [] } function b() { return new a } function c(a) { b.onreadystatechange && b.onreadystatechange.apply(a); a.dispatchEvent({ type: "readystatechange", bubbles: !1, cancelable: !1, timeStamp: new Date + 0 }) } function d(a) {
    try { a.responseText = a._object.responseText } catch (b) { } try {
      var c; var d = a._object, e = d.responseXML, f = d.responseText; h && (f && e && !e.documentElement && d.getResponseHeader("Content-Type").match(/[^\/]+\/[^\+]+\+xml/)) &&
        (e = new window.ActiveXObject("Microsoft.XMLDOM"), e.async = !1, e.validateOnParse = !1, e.loadXML(f)); c = e && (h && 0 != e.parseError || !e.documentElement || e.documentElement && "parsererror" == e.documentElement.tagName) ? null : e; a.responseXML = c
    } catch (g) { } try { a.status = a._object.status } catch (k) { } try { a.statusText = a._object.statusText } catch (u) { }
  } function e(a) { a._object.onreadystatechange = new window.Function } var f = window.XMLHttpRequest, g = !!window.controllers, h = window.document.all && !window.opera, k = h && window.navigator.userAgent.match(/MSIE 7.0/);
  b.prototype = a.prototype; g && f.wrapped && (b.wrapped = f.wrapped); b.UNSENT = 0; b.OPENED = 1; b.HEADERS_RECEIVED = 2; b.LOADING = 3; b.DONE = 4; b.prototype.readyState = b.UNSENT; b.prototype.responseText = ""; b.prototype.responseXML = null; b.prototype.status = 0; b.prototype.statusText = ""; b.prototype.priority = "NORMAL"; b.prototype.onreadystatechange = null; b.onreadystatechange = null; b.onopen = null; b.onsend = null; b.onabort = null; b.prototype.open = function (a, f, k, p, q) {
    delete this._headers; 3 > arguments.length && (k = !0); this._async = k; var r = this,
      s = this.readyState, t; h && k && (t = function () { s != b.DONE && (e(r), r.abort()) }, window.attachEvent("onunload", t)); b.onopen && b.onopen.apply(this, arguments); 4 < arguments.length ? this._object.open(a, f, k, p, q) : 3 < arguments.length ? this._object.open(a, f, k, p) : this._object.open(a, f, k); this.readyState = b.OPENED; c(this); this._object.onreadystatechange = function () {
        if (!g || k) r.readyState = r._object.readyState, d(r), r._aborted ? r.readyState = b.UNSENT : (r.readyState == b.DONE && (delete r._data, e(r), h && k && window.detachEvent("onunload", t)),
          s != r.readyState && c(r), s = r.readyState)
      }
  }; b.prototype.send = function (a) { b.onsend && b.onsend.apply(this, arguments); arguments.length || (a = null); a && a.nodeType && (a = window.XMLSerializer ? (new window.XMLSerializer).serializeToString(a) : a.xml, this._headers["Content-Type"] || this._object.setRequestHeader("Content-Type", "application/xml")); this._data = a; a: if (this._object.send(this._data), g && !this._async) for (this.readyState = b.OPENED, d(this); this.readyState < b.DONE;)if (this.readyState++ , c(this), this._aborted) break a };
  b.prototype.abort = function () { b.onabort && b.onabort.apply(this, arguments); this.readyState > b.UNSENT && (this._aborted = !0); this._object.abort(); e(this); this.readyState = b.UNSENT; delete this._data }; b.prototype.getAllResponseHeaders = function () { return this._object.getAllResponseHeaders() }; b.prototype.getResponseHeader = function (a) { return this._object.getResponseHeader(a) }; b.prototype.setRequestHeader = function (a, b) { this._headers || (this._headers = {}); this._headers[a] = b; return this._object.setRequestHeader(a, b) };
  b.prototype.addEventListener = function (a, b, c) { for (var d = 0, e; e = this._listeners[d]; d++)if (e[0] == a && e[1] == b && e[2] == c) return; this._listeners.push([a, b, c]) }; b.prototype.removeEventListener = function (a, b, c) { for (var d = 0, e; (e = this._listeners[d]) && (e[0] != a || e[1] != b || e[2] != c); d++); e && this._listeners.splice(d, 1) }; b.prototype.dispatchEvent = function (a) {
    a = {
      type: a.type, target: this, currentTarget: this, eventPhase: 2, bubbles: a.bubbles, cancelable: a.cancelable, timeStamp: a.timeStamp, stopPropagation: function () { }, preventDefault: function () { },
      initEvent: function () { }
    }; "readystatechange" == a.type && this.onreadystatechange && (this.onreadystatechange.handleEvent || this.onreadystatechange).apply(this, [a]); for (var b = 0, c; c = this._listeners[b]; b++)c[0] != a.type || c[2] || (c[1].handleEvent || c[1]).apply(this, [a])
  }; b.prototype.toString = function () { return "[object XMLHttpRequest]" }; b.toString = function () { return "[XMLHttpRequest]" }; window.Function.prototype.apply || (window.Function.prototype.apply = function (a, b) {
    b || (b = []); a.__func = this; a.__func(b[0], b[1], b[2], b[3],
      b[4]); delete a.__func
  }); OpenLayers.Request || (OpenLayers.Request = {}); OpenLayers.Request.XMLHttpRequest = b
})(); OpenLayers.ProxyHost = ""; OpenLayers.Request || (OpenLayers.Request = {});
OpenLayers.Util.extend(OpenLayers.Request, {
  DEFAULT_CONFIG: { method: "GET", url: window.location.href, async: !0, user: void 0, password: void 0, params: null, proxy: OpenLayers.ProxyHost, headers: {}, data: null, callback: function () { }, success: null, failure: null, scope: null }, URL_SPLIT_REGEX: /([^:]*:)\/\/([^:]*:?[^@]*@)?([^:\/\?]*):?([^\/\?]*)/, events: new OpenLayers.Events(this), makeSameOrigin: function (a, b) {
    var c = 0 !== a.indexOf("http"), d = !c && a.match(this.URL_SPLIT_REGEX); if (d) {
      var e = window.location, c = d[1] == e.protocol && d[3] ==
        e.hostname, d = d[4], e = e.port; if (80 != d && "" != d || "80" != e && "" != e) c = c && d == e
    } c || b && (a = "function" == typeof b ? b(a) : b + encodeURIComponent(a)); return a
  }, issue: function (a) {
    var b = OpenLayers.Util.extend(this.DEFAULT_CONFIG, { proxy: OpenLayers.ProxyHost }); a = a || {}; a.headers = a.headers || {}; a = OpenLayers.Util.applyDefaults(a, b); a.headers = OpenLayers.Util.applyDefaults(a.headers, b.headers); var b = !1, c; for (c in a.headers) a.headers.hasOwnProperty(c) && "x-requested-with" === c.toLowerCase() && (b = !0); !1 === b && (a.headers["X-Requested-With"] =
      "XMLHttpRequest"); var d = new OpenLayers.Request.XMLHttpRequest, e = OpenLayers.Util.urlAppend(a.url, OpenLayers.Util.getParameterString(a.params || {})), e = OpenLayers.Request.makeSameOrigin(e, a.proxy); d.open(a.method, e, a.async, a.user, a.password); for (var f in a.headers) d.setRequestHeader(f, a.headers[f]); var g = this.events, h = this; d.onreadystatechange = function () {
      d.readyState == OpenLayers.Request.XMLHttpRequest.DONE && !1 !== g.triggerEvent("complete", { request: d, config: a, requestUrl: e }) && h.runCallbacks({
        request: d, config: a,
        requestUrl: e
      })
      }; !1 === a.async ? d.send(a.data) : window.setTimeout(function () { 0 !== d.readyState && d.send(a.data) }, 0); return d
  }, runCallbacks: function (a) {
    var b = a.request, c = a.config, d = c.scope ? OpenLayers.Function.bind(c.callback, c.scope) : c.callback, e; c.success && (e = c.scope ? OpenLayers.Function.bind(c.success, c.scope) : c.success); var f; c.failure && (f = c.scope ? OpenLayers.Function.bind(c.failure, c.scope) : c.failure); "file:" == OpenLayers.Util.createUrlObject(c.url).protocol && b.responseText && (b.status = 200); d(b); if (!b.status ||
      200 <= b.status && 300 > b.status) this.events.triggerEvent("success", a), e && e(b); b.status && (200 > b.status || 300 <= b.status) && (this.events.triggerEvent("failure", a), f && f(b))
  }, GET: function (a) { a = OpenLayers.Util.extend(a, { method: "GET" }); return OpenLayers.Request.issue(a) }, POST: function (a) { a = OpenLayers.Util.extend(a, { method: "POST" }); a.headers = a.headers ? a.headers : {}; "CONTENT-TYPE" in OpenLayers.Util.upperCaseObject(a.headers) || (a.headers["Content-Type"] = "application/xml"); return OpenLayers.Request.issue(a) }, PUT: function (a) {
    a =
    OpenLayers.Util.extend(a, { method: "PUT" }); a.headers = a.headers ? a.headers : {}; "CONTENT-TYPE" in OpenLayers.Util.upperCaseObject(a.headers) || (a.headers["Content-Type"] = "application/xml"); return OpenLayers.Request.issue(a)
  }, DELETE: function (a) { a = OpenLayers.Util.extend(a, { method: "DELETE" }); return OpenLayers.Request.issue(a) }, HEAD: function (a) { a = OpenLayers.Util.extend(a, { method: "HEAD" }); return OpenLayers.Request.issue(a) }, OPTIONS: function (a) { a = OpenLayers.Util.extend(a, { method: "OPTIONS" }); return OpenLayers.Request.issue(a) }
}); OpenLayers.Layer.ArcIMS = OpenLayers.Class(OpenLayers.Layer.Grid, {
  DEFAULT_PARAMS: { ClientVersion: "9.2", ServiceName: "" }, featureCoordSys: "4326", filterCoordSys: "4326", layers: null, async: !0, name: "ArcIMS", isBaseLayer: !0, DEFAULT_OPTIONS: { tileSize: new OpenLayers.Size(512, 512), featureCoordSys: "4326", filterCoordSys: "4326", layers: null, isBaseLayer: !0, async: !0, name: "ArcIMS" }, initialize: function (a, b, c) {
  this.tileSize = new OpenLayers.Size(512, 512); this.params = OpenLayers.Util.applyDefaults({ ServiceName: c.serviceName },
    this.DEFAULT_PARAMS); this.options = OpenLayers.Util.applyDefaults(c, this.DEFAULT_OPTIONS); OpenLayers.Layer.Grid.prototype.initialize.apply(this, [a, b, this.params, c]); this.transparent && (this.isBaseLayer || (this.isBaseLayer = !1), "image/jpeg" == this.format && (this.format = OpenLayers.Util.alphaHack() ? "image/gif" : "image/png")); null === this.options.layers && (this.options.layers = [])
  }, getURL: function (a) {
    var b = ""; a = this.adjustBounds(a); a = new OpenLayers.Format.ArcXML(OpenLayers.Util.extend(this.options, {
      requesttype: "image",
      envelope: a.toArray(), tileSize: this.tileSize
    })); a = new OpenLayers.Request.POST({ url: this.getFullRequestString(), data: a.write(), async: !1 }); null != a && (b = a.responseXML, b && b.documentElement || (b = a.responseText), b = (new OpenLayers.Format.ArcXML).read(b), b = this.getUrlOrImage(b.image.output)); return b
  }, getURLasync: function (a, b, c) {
    a = this.adjustBounds(a); a = new OpenLayers.Format.ArcXML(OpenLayers.Util.extend(this.options, { requesttype: "image", envelope: a.toArray(), tileSize: this.tileSize })); OpenLayers.Request.POST({
      url: this.getFullRequestString(),
      async: !0, data: a.write(), callback: function (a) { var e = a.responseXML; e && e.documentElement || (e = a.responseText); a = (new OpenLayers.Format.ArcXML).read(e); b.call(c, this.getUrlOrImage(a.image.output)) }, scope: this
    })
  }, getUrlOrImage: function (a) { var b = ""; a.url ? b = a.url : a.data && (b = "data:image/" + a.type + ";base64," + a.data); return b }, setLayerQuery: function (a, b) {
    for (var c = 0; c < this.options.layers.length; c++)if (a == this.options.layers[c].id) { this.options.layers[c].query = b; return } this.options.layers.push({
      id: a, visible: !0,
      query: b
    })
  }, getFeatureInfo: function (a, b, c) {
    var d = c.buffer || 1, e = c.callback || function () { }, f = c.scope || window, g = {}; OpenLayers.Util.extend(g, this.options); g.requesttype = "feature"; a instanceof OpenLayers.LonLat ? (g.polygon = null, g.envelope = [a.lon - d, a.lat - d, a.lon + d, a.lat + d]) : a instanceof OpenLayers.Geometry.Polygon && (g.envelope = null, g.polygon = a); var h = new OpenLayers.Format.ArcXML(g); OpenLayers.Util.extend(h.request.get_feature, c); h.request.get_feature.layer = b.id; "number" == typeof b.query.accuracy ? h.request.get_feature.query.accuracy =
      b.query.accuracy : (a = this.map.getCenter(), c = this.map.getViewPortPxFromLonLat(a), c.x++ , c = this.map.getLonLatFromPixel(c), h.request.get_feature.query.accuracy = c.lon - a.lon); h.request.get_feature.query.where = b.query.where; h.request.get_feature.query.spatialfilter.relation = "area_intersection"; OpenLayers.Request.POST({ url: this.getFullRequestString({ CustomService: "Query" }), data: h.write(), callback: function (a) { a = h.parseResponse(a.responseText); h.iserror() ? e.call(f, null) : e.call(f, a.features) } })
  }, clone: function (a) {
  null ==
    a && (a = new OpenLayers.Layer.ArcIMS(this.name, this.url, this.getOptions())); return a = OpenLayers.Layer.Grid.prototype.clone.apply(this, [a])
  }, CLASS_NAME: "OpenLayers.Layer.ArcIMS"
}); OpenLayers.Control.PanZoom = OpenLayers.Class(OpenLayers.Control, {
  slideFactor: 50, slideRatio: null, buttons: null, position: null, initialize: function (a) { this.position = new OpenLayers.Pixel(OpenLayers.Control.PanZoom.X, OpenLayers.Control.PanZoom.Y); OpenLayers.Control.prototype.initialize.apply(this, arguments) }, destroy: function () { this.map && this.map.events.unregister("buttonclick", this, this.onButtonClick); this.removeButtons(); this.position = this.buttons = null; OpenLayers.Control.prototype.destroy.apply(this, arguments) },
  setMap: function (a) { OpenLayers.Control.prototype.setMap.apply(this, arguments); this.map.events.register("buttonclick", this, this.onButtonClick) }, draw: function (a) {
    OpenLayers.Control.prototype.draw.apply(this, arguments); a = this.position; this.buttons = []; var b = { w: 18, h: 18 }, c = new OpenLayers.Pixel(a.x + b.w / 2, a.y); this._addButton("panup", "north-mini.png", c, b); a.y = c.y + b.h; this._addButton("panleft", "west-mini.png", a, b); this._addButton("panright", "east-mini.png", a.add(b.w, 0), b); this._addButton("pandown", "south-mini.png",
      c.add(0, 2 * b.h), b); this._addButton("zoomin", "zoom-plus-mini.png", c.add(0, 3 * b.h + 5), b); this._addButton("zoomworld", "zoom-world-mini.png", c.add(0, 4 * b.h + 5), b); this._addButton("zoomout", "zoom-minus-mini.png", c.add(0, 5 * b.h + 5), b); return this.div
  }, _addButton: function (a, b, c, d) { b = OpenLayers.Util.getImageLocation(b); c = OpenLayers.Util.createAlphaImageDiv(this.id + "_" + a, c, d, b, "absolute"); c.style.cursor = "pointer"; this.div.appendChild(c); c.action = a; c.className = "olButton"; this.buttons.push(c); return c }, _removeButton: function (a) {
    this.div.removeChild(a);
    OpenLayers.Util.removeItem(this.buttons, a)
  }, removeButtons: function () { for (var a = this.buttons.length - 1; 0 <= a; --a)this._removeButton(this.buttons[a]) }, onButtonClick: function (a) {
    switch (a.buttonElement.action) {
      case "panup": this.map.pan(0, -this.getSlideFactor("h")); break; case "pandown": this.map.pan(0, this.getSlideFactor("h")); break; case "panleft": this.map.pan(-this.getSlideFactor("w"), 0); break; case "panright": this.map.pan(this.getSlideFactor("w"), 0); break; case "zoomin": this.map.zoomIn(); break; case "zoomout": this.map.zoomOut();
        break; case "zoomworld": this.map.zoomToMaxExtent()
    }
  }, getSlideFactor: function (a) { return this.slideRatio ? this.map.getSize()[a] * this.slideRatio : this.slideFactor }, CLASS_NAME: "OpenLayers.Control.PanZoom"
}); OpenLayers.Control.PanZoom.X = 4; OpenLayers.Control.PanZoom.Y = 4; OpenLayers.Control.PanZoomBar = OpenLayers.Class(OpenLayers.Control.PanZoom, {
  zoomStopWidth: 18, zoomStopHeight: 11, slider: null, sliderEvents: null, zoombarDiv: null, zoomWorldIcon: !1, panIcons: !0, forceFixedZoomLevel: !1, mouseDragStart: null, deltaY: null, zoomStart: null, destroy: function () { this._removeZoomBar(); this.map.events.un({ changebaselayer: this.redraw, updatesize: this.redraw, scope: this }); OpenLayers.Control.PanZoom.prototype.destroy.apply(this, arguments); delete this.mouseDragStart; delete this.zoomStart }, setMap: function (a) {
    OpenLayers.Control.PanZoom.prototype.setMap.apply(this,
      arguments); this.map.events.on({ changebaselayer: this.redraw, updatesize: this.redraw, scope: this })
  }, redraw: function () { null != this.div && (this.removeButtons(), this._removeZoomBar()); this.draw() }, draw: function (a) {
    OpenLayers.Control.prototype.draw.apply(this, arguments); a = this.position.clone(); this.buttons = []; var b = { w: 18, h: 18 }; if (this.panIcons) {
      var c = new OpenLayers.Pixel(a.x + b.w / 2, a.y), d = b.w; this.zoomWorldIcon && (c = new OpenLayers.Pixel(a.x + b.w, a.y)); this._addButton("panup", "north-mini.png", c, b); a.y = c.y + b.h;
      this._addButton("panleft", "west-mini.png", a, b); this.zoomWorldIcon && (this._addButton("zoomworld", "zoom-world-mini.png", a.add(b.w, 0), b), d *= 2); this._addButton("panright", "east-mini.png", a.add(d, 0), b); this._addButton("pandown", "south-mini.png", c.add(0, 2 * b.h), b); this._addButton("zoomin", "zoom-plus-mini.png", c.add(0, 3 * b.h + 5), b); c = this._addZoomBar(c.add(0, 4 * b.h + 5)); this._addButton("zoomout", "zoom-minus-mini.png", c, b)
    } else this._addButton("zoomin", "zoom-plus-mini.png", a, b), c = this._addZoomBar(a.add(0, b.h)),
      this._addButton("zoomout", "zoom-minus-mini.png", c, b), this.zoomWorldIcon && (c = c.add(0, b.h + 3), this._addButton("zoomworld", "zoom-world-mini.png", c, b)); return this.div
  }, _addZoomBar: function (a) {
    var b = OpenLayers.Util.getImageLocation("slider.png"), c = this.id + "_" + this.map.id, d = this.map.getMinZoom(), e = this.map.getNumZoomLevels() - 1 - this.map.getZoom(), e = OpenLayers.Util.createAlphaImageDiv(c, a.add(-1, e * this.zoomStopHeight), { w: 20, h: 9 }, b, "absolute"); e.style.cursor = "move"; this.slider = e; this.sliderEvents = new OpenLayers.Events(this,
      e, null, !0, { includeXY: !0 }); this.sliderEvents.on({ touchstart: this.zoomBarDown, touchmove: this.zoomBarDrag, touchend: this.zoomBarUp, mousedown: this.zoomBarDown, mousemove: this.zoomBarDrag, mouseup: this.zoomBarUp }); var f = { w: this.zoomStopWidth, h: this.zoomStopHeight * (this.map.getNumZoomLevels() - d) }, b = OpenLayers.Util.getImageLocation("zoombar.png"), c = null; OpenLayers.Util.alphaHack() ? (c = this.id + "_" + this.map.id, c = OpenLayers.Util.createAlphaImageDiv(c, a, { w: f.w, h: this.zoomStopHeight }, b, "absolute", null, "crop"), c.style.height =
        f.h + "px") : c = OpenLayers.Util.createDiv("OpenLayers_Control_PanZoomBar_Zoombar" + this.map.id, a, f, b); c.style.cursor = "pointer"; c.className = "olButton"; this.zoombarDiv = c; this.div.appendChild(c); this.startTop = parseInt(c.style.top); this.div.appendChild(e); this.map.events.register("zoomend", this, this.moveZoomBar); return a = a.add(0, this.zoomStopHeight * (this.map.getNumZoomLevels() - d))
  }, _removeZoomBar: function () {
    this.sliderEvents.un({
      touchstart: this.zoomBarDown, touchmove: this.zoomBarDrag, touchend: this.zoomBarUp,
      mousedown: this.zoomBarDown, mousemove: this.zoomBarDrag, mouseup: this.zoomBarUp
    }); this.sliderEvents.destroy(); this.div.removeChild(this.zoombarDiv); this.zoombarDiv = null; this.div.removeChild(this.slider); this.slider = null; this.map.events.unregister("zoomend", this, this.moveZoomBar)
  }, onButtonClick: function (a) {
    OpenLayers.Control.PanZoom.prototype.onButtonClick.apply(this, arguments); if (a.buttonElement === this.zoombarDiv) {
      var b = a.buttonXY.y / this.zoomStopHeight; if (this.forceFixedZoomLevel || !this.map.fractionalZoom) b =
        Math.floor(b); b = this.map.getNumZoomLevels() - 1 - b; b = Math.min(Math.max(b, 0), this.map.getNumZoomLevels() - 1); this.map.zoomTo(b)
    }
  }, passEventToSlider: function (a) { this.sliderEvents.handleBrowserEvent(a) }, zoomBarDown: function (a) {
    if (OpenLayers.Event.isLeftClick(a) || OpenLayers.Event.isSingleTouch(a)) this.map.events.on({ touchmove: this.passEventToSlider, mousemove: this.passEventToSlider, mouseup: this.passEventToSlider, scope: this }), this.mouseDragStart = a.xy.clone(), this.zoomStart = a.xy.clone(), this.div.style.cursor =
      "move", this.zoombarDiv.offsets = null, OpenLayers.Event.stop(a)
  }, zoomBarDrag: function (a) { if (null != this.mouseDragStart) { var b = this.mouseDragStart.y - a.xy.y, c = OpenLayers.Util.pagePosition(this.zoombarDiv); 0 < a.clientY - c[1] && a.clientY - c[1] < parseInt(this.zoombarDiv.style.height) - 2 && (b = parseInt(this.slider.style.top) - b, this.slider.style.top = b + "px", this.mouseDragStart = a.xy.clone()); this.deltaY = this.zoomStart.y - a.xy.y; OpenLayers.Event.stop(a) } }, zoomBarUp: function (a) {
    if ((OpenLayers.Event.isLeftClick(a) || "touchend" ===
      a.type) && this.mouseDragStart) { this.div.style.cursor = ""; this.map.events.un({ touchmove: this.passEventToSlider, mouseup: this.passEventToSlider, mousemove: this.passEventToSlider, scope: this }); var b = this.map.zoom; !this.forceFixedZoomLevel && this.map.fractionalZoom ? (b += this.deltaY / this.zoomStopHeight, b = Math.min(Math.max(b, 0), this.map.getNumZoomLevels() - 1)) : (b += this.deltaY / this.zoomStopHeight, b = Math.max(Math.round(b), 0)); this.map.zoomTo(b); this.zoomStart = this.mouseDragStart = null; this.deltaY = 0; OpenLayers.Event.stop(a) }
  },
  moveZoomBar: function () { var a = (this.map.getNumZoomLevels() - 1 - this.map.getZoom()) * this.zoomStopHeight + this.startTop + 1; this.slider.style.top = a + "px" }, CLASS_NAME: "OpenLayers.Control.PanZoomBar"
}); OpenLayers.Format.WFSCapabilities = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, { defaultVersion: "1.1.0", CLASS_NAME: "OpenLayers.Format.WFSCapabilities" }); OpenLayers.Format.WFSCapabilities.v1 = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { wfs: "http://www.opengis.net/wfs", xlink: "http://www.w3.org/1999/xlink", xsi: "http://www.w3.org/2001/XMLSchema-instance", ows: "http://www.opengis.net/ows" }, errorProperty: "featureTypeList", defaultPrefix: "wfs", read: function (a) { "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); a && 9 == a.nodeType && (a = a.documentElement); var b = {}; this.readNode(a, b); return b }, readers: {
    wfs: {
      WFS_Capabilities: function (a,
        b) { this.readChildNodes(a, b) }, FeatureTypeList: function (a, b) { b.featureTypeList = { featureTypes: [] }; this.readChildNodes(a, b.featureTypeList) }, FeatureType: function (a, b) { var c = {}; this.readChildNodes(a, c); b.featureTypes.push(c) }, Name: function (a, b) { var c = this.getChildValue(a); c && (c = c.split(":"), b.name = c.pop(), 0 < c.length && (b.featureNS = this.lookupNamespaceURI(a, c[0]))) }, Title: function (a, b) { var c = this.getChildValue(a); c && (b.title = c) }, Abstract: function (a, b) { var c = this.getChildValue(a); c && (b["abstract"] = c) }
    }
  },
  CLASS_NAME: "OpenLayers.Format.WFSCapabilities.v1"
}); OpenLayers.Format.WFSCapabilities.v1_1_0 = OpenLayers.Class(OpenLayers.Format.WFSCapabilities.v1, { regExes: { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g }, readers: { wfs: OpenLayers.Util.applyDefaults({ DefaultSRS: function (a, b) { var c = this.getChildValue(a); c && (b.srs = c) } }, OpenLayers.Format.WFSCapabilities.v1.prototype.readers.wfs), ows: OpenLayers.Format.OWSCommon.v1.prototype.readers.ows }, CLASS_NAME: "OpenLayers.Format.WFSCapabilities.v1_1_0" }); OpenLayers.Layer.Image = OpenLayers.Class(OpenLayers.Layer, {
  isBaseLayer: !0, url: null, extent: null, size: null, tile: null, aspectRatio: null, initialize: function (a, b, c, d, e) { this.url = b; this.maxExtent = this.extent = c; this.size = d; OpenLayers.Layer.prototype.initialize.apply(this, [a, e]); this.aspectRatio = this.extent.getHeight() / this.size.h / (this.extent.getWidth() / this.size.w) }, destroy: function () {
  this.tile && (this.removeTileMonitoringHooks(this.tile), this.tile.destroy(), this.tile = null); OpenLayers.Layer.prototype.destroy.apply(this,
    arguments)
  }, clone: function (a) { null == a && (a = new OpenLayers.Layer.Image(this.name, this.url, this.extent, this.size, this.getOptions())); return a = OpenLayers.Layer.prototype.clone.apply(this, [a]) }, setMap: function (a) { null == this.options.maxResolution && (this.options.maxResolution = this.aspectRatio * this.extent.getWidth() / this.size.w); OpenLayers.Layer.prototype.setMap.apply(this, arguments) }, moveTo: function (a, b, c) {
    OpenLayers.Layer.prototype.moveTo.apply(this, arguments); var d = null == this.tile; if (b || d) {
      this.setTileSize();
      var e = this.map.getLayerPxFromLonLat({ lon: this.extent.left, lat: this.extent.top }); d ? (this.tile = new OpenLayers.Tile.Image(this, e, this.extent, null, this.tileSize), this.addTileMonitoringHooks(this.tile)) : (this.tile.size = this.tileSize.clone(), this.tile.position = e.clone()); this.tile.draw()
    }
  }, setTileSize: function () { var a = this.extent.getWidth() / this.map.getResolution(), b = this.extent.getHeight() / this.map.getResolution(); this.tileSize = new OpenLayers.Size(a, b) }, addTileMonitoringHooks: function (a) {
  a.onLoadStart =
    function () { this.events.triggerEvent("loadstart") }; a.events.register("loadstart", this, a.onLoadStart); a.onLoadEnd = function () { this.events.triggerEvent("loadend") }; a.events.register("loadend", this, a.onLoadEnd); a.events.register("unload", this, a.onLoadEnd)
  }, removeTileMonitoringHooks: function (a) { a.unload(); a.events.un({ loadstart: a.onLoadStart, loadend: a.onLoadEnd, unload: a.onLoadEnd, scope: this }) }, setUrl: function (a) { this.url = a; this.tile.draw() }, getURL: function (a) { return this.url }, CLASS_NAME: "OpenLayers.Layer.Image"
}); OpenLayers.Strategy = OpenLayers.Class({ layer: null, options: null, active: null, autoActivate: !0, autoDestroy: !0, initialize: function (a) { OpenLayers.Util.extend(this, a); this.options = a; this.active = !1 }, destroy: function () { this.deactivate(); this.options = this.layer = null }, setLayer: function (a) { this.layer = a }, activate: function () { return this.active ? !1 : this.active = !0 }, deactivate: function () { return this.active ? (this.active = !1, !0) : !1 }, CLASS_NAME: "OpenLayers.Strategy" }); OpenLayers.Strategy.Save = OpenLayers.Class(OpenLayers.Strategy, {
  events: null, auto: !1, timer: null, initialize: function (a) { OpenLayers.Strategy.prototype.initialize.apply(this, [a]); this.events = new OpenLayers.Events(this) }, activate: function () {
    var a = OpenLayers.Strategy.prototype.activate.call(this); if (a && this.auto) if ("number" === typeof this.auto) this.timer = window.setInterval(OpenLayers.Function.bind(this.save, this), 1E3 * this.auto); else this.layer.events.on({
      featureadded: this.triggerSave, afterfeaturemodified: this.triggerSave,
      scope: this
    }); return a
  }, deactivate: function () { var a = OpenLayers.Strategy.prototype.deactivate.call(this); a && this.auto && ("number" === typeof this.auto ? window.clearInterval(this.timer) : this.layer.events.un({ featureadded: this.triggerSave, afterfeaturemodified: this.triggerSave, scope: this })); return a }, triggerSave: function (a) { var b = a.feature; b.state !== OpenLayers.State.INSERT && b.state !== OpenLayers.State.UPDATE && b.state !== OpenLayers.State.DELETE || this.save([a.feature]) }, save: function (a) {
    a || (a = this.layer.features);
    this.events.triggerEvent("start", { features: a }); var b = this.layer.projection, c = this.layer.map.getProjectionObject(); if (!c.equals(b)) { for (var d = a.length, e = Array(d), f, g, h = 0; h < d; ++h)f = a[h], g = f.clone(), g.fid = f.fid, g.state = f.state, f.url && (g.url = f.url), g._original = f, g.geometry.transform(c, b), e[h] = g; a = e } this.layer.protocol.commit(a, { callback: this.onCommit, scope: this })
  }, onCommit: function (a) {
    var b = { response: a }; if (a.success()) {
      for (var c = a.reqFeatures, d, e = [], f = a.insertIds || [], g = 0, h = 0, k = c.length; h < k; ++h)if (d = c[h],
        d = d._original || d, a = d.state) a == OpenLayers.State.DELETE ? e.push(d) : a == OpenLayers.State.INSERT && (d.fid = f[g], ++g), d.state = null; 0 < e.length && this.layer.destroyFeatures(e); this.events.triggerEvent("success", b)
    } else this.events.triggerEvent("fail", b)
  }, CLASS_NAME: "OpenLayers.Strategy.Save"
}); OpenLayers.Events.featureclick = OpenLayers.Class({
  cache: null, map: null, provides: ["featureclick", "nofeatureclick", "featureover", "featureout"], initialize: function (a) {
  this.target = a; if (a.object instanceof OpenLayers.Map) this.setMap(a.object); else if (a.object instanceof OpenLayers.Layer.Vector) a.object.map ? this.setMap(a.object.map) : a.object.events.register("added", this, function (b) { this.setMap(a.object.map) }); else throw "Listeners for '" + this.provides.join("', '") + "' events can only be registered for OpenLayers.Layer.Vector or OpenLayers.Map instances";
    for (var b = this.provides.length - 1; 0 <= b; --b)a.extensions[this.provides[b]] = !0
  }, setMap: function (a) { this.map = a; this.cache = {}; a.events.register("mousedown", this, this.start, { extension: !0 }); a.events.register("mouseup", this, this.onClick, { extension: !0 }); a.events.register("touchstart", this, this.start, { extension: !0 }); a.events.register("touchmove", this, this.cancel, { extension: !0 }); a.events.register("touchend", this, this.onClick, { extension: !0 }); a.events.register("mousemove", this, this.onMousemove, { extension: !0 }) },
  start: function (a) { this.startEvt = a }, cancel: function (a) { delete this.startEvt }, onClick: function (a) { if (this.startEvt && ("touchend" === a.type || OpenLayers.Event.isLeftClick(a))) { a = this.getFeatures(this.startEvt); delete this.startEvt; for (var b, c, d = {}, e = 0, f = a.length; e < f && (b = a[e], c = b.layer, d[c.id] = !0, b = this.triggerEvent("featureclick", { feature: b }), !1 !== b); ++e); e = 0; for (f = this.map.layers.length; e < f; ++e)c = this.map.layers[e], c instanceof OpenLayers.Layer.Vector && !d[c.id] && this.triggerEvent("nofeatureclick", { layer: c }) } },
  onMousemove: function (a) { delete this.startEvt; var b = this.getFeatures(a), c = {}; a = []; for (var d, e = 0, f = b.length; e < f; ++e)d = b[e], c[d.id] = d, this.cache[d.id] || a.push(d); var b = [], g; for (g in this.cache) d = this.cache[g], d.layer && d.layer.map ? c[d.id] || b.push(d) : delete this.cache[g]; e = 0; for (f = a.length; e < f && (d = a[e], this.cache[d.id] = d, g = this.triggerEvent("featureover", { feature: d }), !1 !== g); ++e); e = 0; for (f = b.length; e < f && (d = b[e], delete this.cache[d.id], g = this.triggerEvent("featureout", { feature: d }), !1 !== g); ++e); }, triggerEvent: function (a,
    b) { var c = b.feature ? b.feature.layer : b.layer, d = this.target.object; if (d instanceof OpenLayers.Map || d === c) return this.target.triggerEvent(a, b) }, getFeatures: function (a) {
      var b = a.clientX, c = a.clientY, d = [], e = [], f = [], g, h, k, l; for (l = this.map.layers.length - 1; 0 <= l; --l)if (g = this.map.layers[l], "none" !== g.div.style.display) if (g.renderer instanceof OpenLayers.Renderer.Elements) {
        if (g instanceof OpenLayers.Layer.Vector) for (h = document.elementFromPoint(b, c); h && h._featureId;)(k = g.getFeatureById(h._featureId)) ? (d.push(k),
          h.style.display = "none", e.push(h), h = document.elementFromPoint(b, c)) : h = !1; f.push(g); g.div.style.display = "none"
      } else g.renderer instanceof OpenLayers.Renderer.Canvas && (k = g.renderer.getFeatureIdFromEvent(a)) && (d.push(k), f.push(g)); l = 0; for (a = e.length; l < a; ++l)e[l].style.display = ""; for (l = f.length - 1; 0 <= l; --l)f[l].div.style.display = "block"; return d
    }, destroy: function () {
      for (var a = this.provides.length - 1; 0 <= a; --a)delete this.target.extensions[this.provides[a]]; this.map.events.un({
        mousemove: this.onMousemove, mousedown: this.start,
        mouseup: this.onClick, touchstart: this.start, touchmove: this.cancel, touchend: this.onClick, scope: this
      }); delete this.cache; delete this.map; delete this.target
    }
}); OpenLayers.Events.nofeatureclick = OpenLayers.Events.featureclick; OpenLayers.Events.featureover = OpenLayers.Events.featureclick; OpenLayers.Events.featureout = OpenLayers.Events.featureclick; OpenLayers.Format.GPX = OpenLayers.Class(OpenLayers.Format.XML, {
  defaultDesc: "No description available", extractWaypoints: !0, extractTracks: !0, extractRoutes: !0, extractAttributes: !0, namespaces: { gpx: "http://www.topografix.com/GPX/1/1", xsi: "http://www.w3.org/2001/XMLSchema-instance" }, schemaLocation: "http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd", creator: "OpenLayers", initialize: function (a) {
  this.externalProjection = new OpenLayers.Projection("EPSG:4326"); OpenLayers.Format.XML.prototype.initialize.apply(this,
    [a])
  }, read: function (a) {
  "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); var b = []; if (this.extractTracks) for (var c = a.getElementsByTagName("trk"), d = 0, e = c.length; d < e; d++) { var f = {}; this.extractAttributes && (f = this.parseAttributes(c[d])); for (var g = this.getElementsByTagNameNS(c[d], c[d].namespaceURI, "trkseg"), h = 0, k = g.length; h < k; h++) { var l = this.extractSegment(g[h], "trkpt"); b.push(new OpenLayers.Feature.Vector(l, f)) } } if (this.extractRoutes) for (e = a.getElementsByTagName("rte"), c = 0, d =
    e.length; c < d; c++)f = {}, this.extractAttributes && (f = this.parseAttributes(e[c])), g = this.extractSegment(e[c], "rtept"), b.push(new OpenLayers.Feature.Vector(g, f)); if (this.extractWaypoints) for (a = a.getElementsByTagName("wpt"), c = 0, e = a.length; c < e; c++)f = {}, this.extractAttributes && (f = this.parseAttributes(a[c])), d = new OpenLayers.Geometry.Point(a[c].getAttribute("lon"), a[c].getAttribute("lat")), b.push(new OpenLayers.Feature.Vector(d, f)); if (this.internalProjection && this.externalProjection) for (f = 0, a = b.length; f < a; f++)b[f].geometry.transform(this.externalProjection,
      this.internalProjection); return b
  }, extractSegment: function (a, b) { for (var c = this.getElementsByTagNameNS(a, a.namespaceURI, b), d = [], e = 0, f = c.length; e < f; e++)d.push(new OpenLayers.Geometry.Point(c[e].getAttribute("lon"), c[e].getAttribute("lat"))); return new OpenLayers.Geometry.LineString(d) }, parseAttributes: function (a) {
    var b = {}; a = a.firstChild; for (var c, d; a;)1 == a.nodeType && a.firstChild && (c = a.firstChild, 3 == c.nodeType || 4 == c.nodeType) && (d = a.prefix ? a.nodeName.split(":")[1] : a.nodeName, "trkseg" != d && "rtept" != d &&
      (b[d] = c.nodeValue)), a = a.nextSibling; return b
  }, write: function (a, b) { a = OpenLayers.Util.isArray(a) ? a : [a]; var c = this.createElementNS(this.namespaces.gpx, "gpx"); c.setAttribute("version", "1.1"); c.setAttribute("creator", this.creator); this.setAttributes(c, { "xsi:schemaLocation": this.schemaLocation }); b && "object" == typeof b && c.appendChild(this.buildMetadataNode(b)); for (var d = 0, e = a.length; d < e; d++)c.appendChild(this.buildFeatureNode(a[d])); return OpenLayers.Format.XML.prototype.write.apply(this, [c]) }, buildMetadataNode: function (a) {
    for (var b =
      ["name", "desc", "author"], c = this.createElementNS(this.namespaces.gpx, "metadata"), d = 0; d < b.length; d++) { var e = b[d]; if (a[e]) { var f = this.createElementNS(this.namespaces.gpx, e); f.appendChild(this.createTextNode(a[e])); c.appendChild(f) } } return c
  }, buildFeatureNode: function (a) {
    var b = a.geometry, b = b.clone(); this.internalProjection && this.externalProjection && b.transform(this.internalProjection, this.externalProjection); if ("OpenLayers.Geometry.Point" == b.CLASS_NAME) {
      var c = this.buildWptNode(b); this.appendAttributesNode(c,
        a); return c
    } c = this.createElementNS(this.namespaces.gpx, "trk"); this.appendAttributesNode(c, a); a = this.buildTrkSegNode(b); a = OpenLayers.Util.isArray(a) ? a : [a]; for (var b = 0, d = a.length; b < d; b++)c.appendChild(a[b]); return c
  }, buildTrkSegNode: function (a) {
    var b, c, d, e; if ("OpenLayers.Geometry.LineString" == a.CLASS_NAME || "OpenLayers.Geometry.LinearRing" == a.CLASS_NAME) {
      b = this.createElementNS(this.namespaces.gpx, "trkseg"); c = 0; for (d = a.components.length; c < d; c++)e = a.components[c], b.appendChild(this.buildTrkPtNode(e));
      return b
    } b = []; c = 0; for (d = a.components.length; c < d; c++)b.push(this.buildTrkSegNode(a.components[c])); return b
  }, buildTrkPtNode: function (a) { var b = this.createElementNS(this.namespaces.gpx, "trkpt"); b.setAttribute("lon", a.x); b.setAttribute("lat", a.y); return b }, buildWptNode: function (a) { var b = this.createElementNS(this.namespaces.gpx, "wpt"); b.setAttribute("lon", a.x); b.setAttribute("lat", a.y); return b }, appendAttributesNode: function (a, b) {
    var c = this.createElementNS(this.namespaces.gpx, "name"); c.appendChild(this.createTextNode(b.attributes.name ||
      b.id)); a.appendChild(c); c = this.createElementNS(this.namespaces.gpx, "desc"); c.appendChild(this.createTextNode(b.attributes.description || this.defaultDesc)); a.appendChild(c)
  }, CLASS_NAME: "OpenLayers.Format.GPX"
}); OpenLayers.Format.WMSDescribeLayer = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, { defaultVersion: "1.1.1", CLASS_NAME: "OpenLayers.Format.WMSDescribeLayer" }); OpenLayers.Format.WMSDescribeLayer.v1_1_1 = OpenLayers.Class(OpenLayers.Format.WMSDescribeLayer, {
  initialize: function (a) { OpenLayers.Format.WMSDescribeLayer.prototype.initialize.apply(this, [a]) }, read: function (a) {
  "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); for (var b = a.documentElement.childNodes, c = { layerDescriptions: [] }, d, e, f = 0; f < b.length; ++f)if (d = b[f], e = d.nodeName, "LayerDescription" == e) {
    e = d.getAttribute("name"); var g = "", h = "", k = ""; d.getAttribute("owsType") ? (g = d.getAttribute("owsType"),
      h = d.getAttribute("owsURL")) : "" != d.getAttribute("wfs") ? (g = "WFS", h = d.getAttribute("wfs")) : "" != d.getAttribute("wcs") && (g = "WCS", h = d.getAttribute("wcs")); d = d.getElementsByTagName("Query"); 0 < d.length && ((k = d[0].getAttribute("typeName")) || (k = d[0].getAttribute("typename"))); d = { layerName: e, owsType: g, owsURL: h, typeName: k }; c.layerDescriptions.push(d); c.length = c.layerDescriptions.length; c[c.length - 1] = d
  } else if ("ServiceException" == e) return { error: (new OpenLayers.Format.OGCExceptionReport).read(a) }; return c
  }, CLASS_NAME: "OpenLayers.Format.WMSDescribeLayer.v1_1_1"
});
OpenLayers.Format.WMSDescribeLayer.v1_1_0 = OpenLayers.Format.WMSDescribeLayer.v1_1_1; OpenLayers.Layer.XYZ = OpenLayers.Class(OpenLayers.Layer.Grid, {
  isBaseLayer: !0, sphericalMercator: !1, zoomOffset: 0, serverResolutions: null, initialize: function (a, b, c) { if (c && c.sphericalMercator || this.sphericalMercator) c = OpenLayers.Util.extend({ projection: "EPSG:900913", numZoomLevels: 19 }, c); OpenLayers.Layer.Grid.prototype.initialize.apply(this, [a || this.name, b || this.url, {}, c]) }, clone: function (a) {
  null == a && (a = new OpenLayers.Layer.XYZ(this.name, this.url, this.getOptions())); return a = OpenLayers.Layer.Grid.prototype.clone.apply(this,
    [a])
  }, getURL: function (a) { a = this.getXYZ(a); var b = this.url; OpenLayers.Util.isArray(b) && (b = this.selectUrl("" + a.x + a.y + a.z, b)); return OpenLayers.String.format(b, a) }, getXYZ: function (a) { var b = this.getServerResolution(), c = Math.round((a.left - this.maxExtent.left) / (b * this.tileSize.w)); a = Math.round((this.maxExtent.top - a.top) / (b * this.tileSize.h)); b = this.getServerZoom(); if (this.wrapDateLine) var d = Math.pow(2, b), c = (c % d + d) % d; return { x: c, y: a, z: b } }, setMap: function (a) {
    OpenLayers.Layer.Grid.prototype.setMap.apply(this,
      arguments); this.tileOrigin || (this.tileOrigin = new OpenLayers.LonLat(this.maxExtent.left, this.maxExtent.bottom))
  }, CLASS_NAME: "OpenLayers.Layer.XYZ"
}); OpenLayers.Layer.OSM = OpenLayers.Class(OpenLayers.Layer.XYZ, {
  name: "OpenStreetMap", url: ["http://a.tile.openstreetmap.org/${z}/${x}/${y}.png", "http://b.tile.openstreetmap.org/${z}/${x}/${y}.png", "http://c.tile.openstreetmap.org/${z}/${x}/${y}.png"], attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors", sphericalMercator: !0, wrapDateLine: !0, tileOptions: null, initialize: function (a, b, c) {
    OpenLayers.Layer.XYZ.prototype.initialize.apply(this, arguments); this.tileOptions =
      OpenLayers.Util.extend({ crossOriginKeyword: "anonymous" }, this.options && this.options.tileOptions)
  }, clone: function (a) { null == a && (a = new OpenLayers.Layer.OSM(this.name, this.url, this.getOptions())); return a = OpenLayers.Layer.XYZ.prototype.clone.apply(this, [a]) }, CLASS_NAME: "OpenLayers.Layer.OSM"
}); OpenLayers.Renderer = OpenLayers.Class({
  container: null, root: null, extent: null, locked: !1, size: null, resolution: null, map: null, featureDx: 0, initialize: function (a, b) { this.container = OpenLayers.Util.getElement(a); OpenLayers.Util.extend(this, b) }, destroy: function () { this.map = this.resolution = this.size = this.extent = this.container = null }, supported: function () { return !1 }, setExtent: function (a, b) {
  this.extent = a.clone(); if (this.map.baseLayer && this.map.baseLayer.wrapDateLine) {
    var c = a.getWidth() / this.map.getExtent().getWidth();
    a = a.scale(1 / c); this.extent = a.wrapDateLine(this.map.getMaxExtent()).scale(c)
  } b && (this.resolution = null); return !0
  }, setSize: function (a) { this.size = a.clone(); this.resolution = null }, getResolution: function () { return this.resolution = this.resolution || this.map.getResolution() }, drawFeature: function (a, b) {
  null == b && (b = a.style); if (a.geometry) {
    var c = a.geometry.getBounds(); if (c) {
      var d; this.map.baseLayer && this.map.baseLayer.wrapDateLine && (d = this.map.getMaxExtent()); c.intersectsBounds(this.extent, { worldBounds: d }) ? this.calculateFeatureDx(c,
        d) : b = { display: "none" }; c = this.drawGeometry(a.geometry, b, a.id); if ("none" != b.display && b.label && !1 !== c) { d = a.geometry.getCentroid(); if (b.labelXOffset || b.labelYOffset) { var e = isNaN(b.labelXOffset) ? 0 : b.labelXOffset, f = isNaN(b.labelYOffset) ? 0 : b.labelYOffset, g = this.getResolution(); d.move(e * g, f * g) } this.drawText(a.id, b, d) } else this.removeText(a.id); return c
    }
  }
  }, calculateFeatureDx: function (a, b) {
  this.featureDx = 0; if (b) {
    var c = b.getWidth(); this.featureDx = Math.round(((a.left + a.right) / 2 - (this.extent.left + this.extent.right) /
      2) / c) * c
  }
  }, drawGeometry: function (a, b, c) { }, drawText: function (a, b, c) { }, removeText: function (a) { }, clear: function () { }, getFeatureIdFromEvent: function (a) { }, eraseFeatures: function (a) { OpenLayers.Util.isArray(a) || (a = [a]); for (var b = 0, c = a.length; b < c; ++b) { var d = a[b]; this.eraseGeometry(d.geometry, d.id); this.removeText(d.id) } }, eraseGeometry: function (a, b) { }, moveRoot: function (a) { }, getRenderLayerId: function () { return this.container.id }, applyDefaultSymbolizer: function (a) {
    var b = OpenLayers.Util.extend({}, OpenLayers.Renderer.defaultSymbolizer);
    !1 === a.stroke && (delete b.strokeWidth, delete b.strokeColor); !1 === a.fill && delete b.fillColor; OpenLayers.Util.extend(b, a); return b
  }, CLASS_NAME: "OpenLayers.Renderer"
}); OpenLayers.Renderer.defaultSymbolizer = { fillColor: "#000000", strokeColor: "#000000", strokeWidth: 2, fillOpacity: 1, strokeOpacity: 1, pointRadius: 0, labelAlign: "cm" };
OpenLayers.Renderer.symbol = { star: [350, 75, 379, 161, 469, 161, 397, 215, 423, 301, 350, 250, 277, 301, 303, 215, 231, 161, 321, 161, 350, 75], cross: [4, 0, 6, 0, 6, 4, 10, 4, 10, 6, 6, 6, 6, 10, 4, 10, 4, 6, 0, 6, 0, 4, 4, 4, 4, 0], x: [0, 0, 25, 0, 50, 35, 75, 0, 100, 0, 65, 50, 100, 100, 75, 100, 50, 65, 25, 100, 0, 100, 35, 50, 0, 0], square: [0, 0, 0, 1, 1, 1, 1, 0, 0, 0], triangle: [0, 10, 10, 10, 5, 0, 0, 10] }; OpenLayers.Renderer.Canvas = OpenLayers.Class(OpenLayers.Renderer, {
  hitDetection: !0, hitOverflow: 0, canvas: null, features: null, pendingRedraw: !1, cachedSymbolBounds: {}, initialize: function (a, b) { OpenLayers.Renderer.prototype.initialize.apply(this, arguments); this.root = document.createElement("canvas"); this.container.appendChild(this.root); this.canvas = this.root.getContext("2d"); this.features = {}; this.hitDetection && (this.hitCanvas = document.createElement("canvas"), this.hitContext = this.hitCanvas.getContext("2d")) },
  setExtent: function () { OpenLayers.Renderer.prototype.setExtent.apply(this, arguments); return !1 }, eraseGeometry: function (a, b) { this.eraseFeatures(this.features[b][0]) }, supported: function () { return OpenLayers.CANVAS_SUPPORTED }, setSize: function (a) { this.size = a.clone(); var b = this.root; b.style.width = a.w + "px"; b.style.height = a.h + "px"; b.width = a.w; b.height = a.h; this.resolution = null; this.hitDetection && (b = this.hitCanvas, b.style.width = a.w + "px", b.style.height = a.h + "px", b.width = a.w, b.height = a.h) }, drawFeature: function (a,
    b) { var c; if (a.geometry) { b = this.applyDefaultSymbolizer(b || a.style); c = a.geometry.getBounds(); var d; this.map.baseLayer && this.map.baseLayer.wrapDateLine && (d = this.map.getMaxExtent()); d = c && c.intersectsBounds(this.extent, { worldBounds: d }); (c = "none" !== b.display && !!c && d) ? this.features[a.id] = [a, b] : delete this.features[a.id]; this.pendingRedraw = !0 } this.pendingRedraw && !this.locked && (this.redraw(), this.pendingRedraw = !1); return c }, drawGeometry: function (a, b, c) {
      var d = a.CLASS_NAME; if ("OpenLayers.Geometry.Collection" ==
        d || "OpenLayers.Geometry.MultiPoint" == d || "OpenLayers.Geometry.MultiLineString" == d || "OpenLayers.Geometry.MultiPolygon" == d) for (d = 0; d < a.components.length; d++)this.drawGeometry(a.components[d], b, c); else switch (a.CLASS_NAME) { case "OpenLayers.Geometry.Point": this.drawPoint(a, b, c); break; case "OpenLayers.Geometry.LineString": this.drawLineString(a, b, c); break; case "OpenLayers.Geometry.LinearRing": this.drawLinearRing(a, b, c); break; case "OpenLayers.Geometry.Polygon": this.drawPolygon(a, b, c) }
    }, drawExternalGraphic: function (a,
      b, c) {
        var d = new Image, e = b.title || b.graphicTitle; e && (d.title = e); var f = b.graphicWidth || b.graphicHeight, g = b.graphicHeight || b.graphicWidth, f = f ? f : 2 * b.pointRadius, g = g ? g : 2 * b.pointRadius, h = void 0 != b.graphicXOffset ? b.graphicXOffset : -(0.5 * f), k = void 0 != b.graphicYOffset ? b.graphicYOffset : -(0.5 * g), l = b.graphicOpacity || b.fillOpacity; d.onload = OpenLayers.Function.bind(function () {
          if (this.features[c]) {
            var b = this.getLocalXY(a), e = b[0], b = b[1]; if (!isNaN(e) && !isNaN(b)) {
              var e = e + h | 0, b = b + k | 0, p = this.canvas; p.globalAlpha = l; var q =
                OpenLayers.Renderer.Canvas.drawImageScaleFactor || (OpenLayers.Renderer.Canvas.drawImageScaleFactor = /android 2.1/.test(navigator.userAgent.toLowerCase()) ? 320 / window.screen.width : 1); p.drawImage(d, e * q, b * q, f * q, g * q); this.hitDetection && (this.setHitContextStyle("fill", c), this.hitContext.fillRect(e, b, f, g))
            }
          }
        }, this); d.src = b.externalGraphic
    }, drawNamedSymbol: function (a, b, c) {
      var d, e, f, g; f = Math.PI / 180; var h = OpenLayers.Renderer.symbol[b.graphicName]; if (!h) throw Error(b.graphicName + " is not a valid symbol name");
      if (!(!h.length || 2 > h.length || (a = this.getLocalXY(a), e = a[0], g = a[1], isNaN(e) || isNaN(g)))) {
        this.canvas.lineCap = "round"; this.canvas.lineJoin = "round"; this.hitDetection && (this.hitContext.lineCap = "round", this.hitContext.lineJoin = "round"); if (b.graphicName in this.cachedSymbolBounds) d = this.cachedSymbolBounds[b.graphicName]; else { d = new OpenLayers.Bounds; for (a = 0; a < h.length; a += 2)d.extend(new OpenLayers.LonLat(h[a], h[a + 1])); this.cachedSymbolBounds[b.graphicName] = d } this.canvas.save(); this.hitDetection && this.hitContext.save();
        this.canvas.translate(e, g); this.hitDetection && this.hitContext.translate(e, g); a = f * b.rotation; isNaN(a) || (this.canvas.rotate(a), this.hitDetection && this.hitContext.rotate(a)); f = 2 * b.pointRadius / Math.max(d.getWidth(), d.getHeight()); this.canvas.scale(f, f); this.hitDetection && this.hitContext.scale(f, f); a = d.getCenterLonLat().lon; d = d.getCenterLonLat().lat; this.canvas.translate(-a, -d); this.hitDetection && this.hitContext.translate(-a, -d); g = b.strokeWidth; b.strokeWidth = g / f; if (!1 !== b.fill) {
          this.setCanvasStyle("fill",
            b); this.canvas.beginPath(); for (a = 0; a < h.length; a += 2)d = h[a], e = h[a + 1], 0 == a && this.canvas.moveTo(d, e), this.canvas.lineTo(d, e); this.canvas.closePath(); this.canvas.fill(); if (this.hitDetection) { this.setHitContextStyle("fill", c, b); this.hitContext.beginPath(); for (a = 0; a < h.length; a += 2)d = h[a], e = h[a + 1], 0 == a && this.canvas.moveTo(d, e), this.hitContext.lineTo(d, e); this.hitContext.closePath(); this.hitContext.fill() }
        } if (!1 !== b.stroke) {
          this.setCanvasStyle("stroke", b); this.canvas.beginPath(); for (a = 0; a < h.length; a += 2)d = h[a],
            e = h[a + 1], 0 == a && this.canvas.moveTo(d, e), this.canvas.lineTo(d, e); this.canvas.closePath(); this.canvas.stroke(); if (this.hitDetection) { this.setHitContextStyle("stroke", c, b, f); this.hitContext.beginPath(); for (a = 0; a < h.length; a += 2)d = h[a], e = h[a + 1], 0 == a && this.hitContext.moveTo(d, e), this.hitContext.lineTo(d, e); this.hitContext.closePath(); this.hitContext.stroke() }
        } b.strokeWidth = g; this.canvas.restore(); this.hitDetection && this.hitContext.restore(); this.setCanvasStyle("reset")
      }
    }, setCanvasStyle: function (a, b) {
      "fill" ===
      a ? (this.canvas.globalAlpha = b.fillOpacity, this.canvas.fillStyle = b.fillColor) : "stroke" === a ? (this.canvas.globalAlpha = b.strokeOpacity, this.canvas.strokeStyle = b.strokeColor, this.canvas.lineWidth = b.strokeWidth) : (this.canvas.globalAlpha = 0, this.canvas.lineWidth = 1)
    }, featureIdToHex: function (a) { a = Number(a.split("_").pop()) + 1; 16777216 <= a && (this.hitOverflow = a - 16777215, a = a % 16777216 + 1); a = "000000" + a.toString(16); var b = a.length; return a = "#" + a.substring(b - 6, b) }, setHitContextStyle: function (a, b, c, d) {
      b = this.featureIdToHex(b);
      "fill" == a ? (this.hitContext.globalAlpha = 1, this.hitContext.fillStyle = b) : "stroke" == a ? (this.hitContext.globalAlpha = 1, this.hitContext.strokeStyle = b, "undefined" === typeof d ? this.hitContext.lineWidth = c.strokeWidth + 2 : isNaN(d) || (this.hitContext.lineWidth = c.strokeWidth + 2 / d)) : (this.hitContext.globalAlpha = 0, this.hitContext.lineWidth = 1)
    }, drawPoint: function (a, b, c) {
      if (!1 !== b.graphic) if (b.externalGraphic) this.drawExternalGraphic(a, b, c); else if (b.graphicName && "circle" != b.graphicName) this.drawNamedSymbol(a, b, c); else {
        var d =
          this.getLocalXY(a); a = d[0]; d = d[1]; if (!isNaN(a) && !isNaN(d)) {
            var e = 2 * Math.PI, f = b.pointRadius; !1 !== b.fill && (this.setCanvasStyle("fill", b), this.canvas.beginPath(), this.canvas.arc(a, d, f, 0, e, !0), this.canvas.fill(), this.hitDetection && (this.setHitContextStyle("fill", c, b), this.hitContext.beginPath(), this.hitContext.arc(a, d, f, 0, e, !0), this.hitContext.fill())); !1 !== b.stroke && (this.setCanvasStyle("stroke", b), this.canvas.beginPath(), this.canvas.arc(a, d, f, 0, e, !0), this.canvas.stroke(), this.hitDetection && (this.setHitContextStyle("stroke",
              c, b), this.hitContext.beginPath(), this.hitContext.arc(a, d, f, 0, e, !0), this.hitContext.stroke()), this.setCanvasStyle("reset"))
          }
      }
    }, drawLineString: function (a, b, c) { b = OpenLayers.Util.applyDefaults({ fill: !1 }, b); this.drawLinearRing(a, b, c) }, drawLinearRing: function (a, b, c) {
    !1 !== b.fill && (this.setCanvasStyle("fill", b), this.renderPath(this.canvas, a, b, c, "fill"), this.hitDetection && (this.setHitContextStyle("fill", c, b), this.renderPath(this.hitContext, a, b, c, "fill"))); !1 !== b.stroke && (this.setCanvasStyle("stroke", b), this.renderPath(this.canvas,
      a, b, c, "stroke"), this.hitDetection && (this.setHitContextStyle("stroke", c, b), this.renderPath(this.hitContext, a, b, c, "stroke"))); this.setCanvasStyle("reset")
    }, renderPath: function (a, b, c, d, e) { b = b.components; c = b.length; a.beginPath(); d = this.getLocalXY(b[0]); var f = d[1]; if (!isNaN(d[0]) && !isNaN(f)) { a.moveTo(d[0], d[1]); for (d = 1; d < c; ++d)f = this.getLocalXY(b[d]), a.lineTo(f[0], f[1]); "fill" === e ? a.fill() : a.stroke() } }, drawPolygon: function (a, b, c) {
      a = a.components; var d = a.length; this.drawLinearRing(a[0], b, c); for (var e = 1; e <
        d; ++e)this.canvas.globalCompositeOperation = "destination-out", this.hitDetection && (this.hitContext.globalCompositeOperation = "destination-out"), this.drawLinearRing(a[e], OpenLayers.Util.applyDefaults({ stroke: !1, fillOpacity: 1 }, b), c), this.canvas.globalCompositeOperation = "source-over", this.hitDetection && (this.hitContext.globalCompositeOperation = "source-over"), this.drawLinearRing(a[e], OpenLayers.Util.applyDefaults({ fill: !1 }, b), c)
    }, drawText: function (a, b) {
      var c = this.getLocalXY(a); this.setCanvasStyle("reset");
      this.canvas.fillStyle = b.fontColor; this.canvas.globalAlpha = b.fontOpacity || 1; var d = [b.fontStyle ? b.fontStyle : "normal", "normal", b.fontWeight ? b.fontWeight : "normal", b.fontSize ? b.fontSize : "1em", b.fontFamily ? b.fontFamily : "sans-serif"].join(" "), e = b.label.split("\n"), f = e.length; if (this.canvas.fillText) {
        this.canvas.font = d; this.canvas.textAlign = OpenLayers.Renderer.Canvas.LABEL_ALIGN[b.labelAlign[0]] || "center"; this.canvas.textBaseline = OpenLayers.Renderer.Canvas.LABEL_ALIGN[b.labelAlign[1]] || "middle"; var g = OpenLayers.Renderer.Canvas.LABEL_FACTOR[b.labelAlign[1]];
        null == g && (g = -0.5); d = this.canvas.measureText("Mg").height || this.canvas.measureText("xx").width; c[1] += d * g * (f - 1); for (g = 0; g < f; g++)b.labelOutlineWidth && (this.canvas.save(), this.canvas.globalAlpha = b.labelOutlineOpacity || b.fontOpacity || 1, this.canvas.strokeStyle = b.labelOutlineColor, this.canvas.lineWidth = b.labelOutlineWidth, this.canvas.strokeText(e[g], c[0], c[1] + d * g + 1), this.canvas.restore()), this.canvas.fillText(e[g], c[0], c[1] + d * g)
      } else if (this.canvas.mozDrawText) {
        this.canvas.mozTextStyle = d; var h = OpenLayers.Renderer.Canvas.LABEL_FACTOR[b.labelAlign[0]];
        null == h && (h = -0.5); g = OpenLayers.Renderer.Canvas.LABEL_FACTOR[b.labelAlign[1]]; null == g && (g = -0.5); d = this.canvas.mozMeasureText("xx"); c[1] += d * (1 + g * f); for (g = 0; g < f; g++) { var k = c[0] + h * this.canvas.mozMeasureText(e[g]), l = c[1] + g * d; this.canvas.translate(k, l); this.canvas.mozDrawText(e[g]); this.canvas.translate(-k, -l) }
      } this.setCanvasStyle("reset")
    }, getLocalXY: function (a) { var b = this.getResolution(), c = this.extent; return [(a.x - this.featureDx) / b + -c.left / b, c.top / b - a.y / b] }, clear: function () {
      var a = this.root.height, b = this.root.width;
      this.canvas.clearRect(0, 0, b, a); this.features = {}; this.hitDetection && this.hitContext.clearRect(0, 0, b, a)
    }, getFeatureIdFromEvent: function (a) { var b; if (this.hitDetection && "none" !== this.root.style.display && !this.map.dragging && (a = a.xy, a = this.hitContext.getImageData(a.x | 0, a.y | 0, 1, 1).data, 255 === a[3] && (a = a[2] + 256 * (a[1] + 256 * a[0])))) { a = "OpenLayers_Feature_Vector_" + (a - 1 + this.hitOverflow); try { b = this.features[a][0] } catch (c) { } } return b }, eraseFeatures: function (a) {
      OpenLayers.Util.isArray(a) || (a = [a]); for (var b = 0; b < a.length; ++b)delete this.features[a[b].id];
      this.redraw()
    }, redraw: function () {
      if (!this.locked) {
        var a = this.root.height, b = this.root.width; this.canvas.clearRect(0, 0, b, a); this.hitDetection && this.hitContext.clearRect(0, 0, b, a); var a = [], c, d, e = this.map.baseLayer && this.map.baseLayer.wrapDateLine && this.map.getMaxExtent(), f; for (f in this.features) this.features.hasOwnProperty(f) && (b = this.features[f][0], c = b.geometry, this.calculateFeatureDx(c.getBounds(), e), d = this.features[f][1], this.drawGeometry(c, d, b.id), d.label && a.push([b, d])); b = 0; for (c = a.length; b < c; ++b)f =
          a[b], this.drawText(f[0].geometry.getCentroid(), f[1])
      }
    }, CLASS_NAME: "OpenLayers.Renderer.Canvas"
}); OpenLayers.Renderer.Canvas.LABEL_ALIGN = { l: "left", r: "right", t: "top", b: "bottom" }; OpenLayers.Renderer.Canvas.LABEL_FACTOR = { l: 0, r: -1, t: 0, b: -1 }; OpenLayers.Renderer.Canvas.drawImageScaleFactor = null; OpenLayers.Format.OSM = OpenLayers.Class(OpenLayers.Format.XML, {
  checkTags: !1, interestingTagsExclude: null, areaTags: null, initialize: function (a) {
    var b = { interestingTagsExclude: "source source_ref source:ref history attribution created_by".split(" "), areaTags: "area building leisure tourism ruins historic landuse military natural sport".split(" ") }, b = OpenLayers.Util.extend(b, a), c = {}; for (a = 0; a < b.interestingTagsExclude.length; a++)c[b.interestingTagsExclude[a]] = !0; b.interestingTagsExclude = c; c = {}; for (a = 0; a < b.areaTags.length; a++)c[b.areaTags[a]] =
      !0; b.areaTags = c; this.externalProjection = new OpenLayers.Projection("EPSG:4326"); OpenLayers.Format.XML.prototype.initialize.apply(this, [b])
  }, read: function (a) {
  "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); var b = this.getNodes(a), c = this.getWays(a); a = Array(c.length); for (var d = 0; d < c.length; d++) {
    for (var e = Array(c[d].nodes.length), f = this.isWayArea(c[d]) ? 1 : 0, g = 0; g < c[d].nodes.length; g++) {
      var h = b[c[d].nodes[g]], k = new OpenLayers.Geometry.Point(h.lon, h.lat); k.osm_id = parseInt(c[d].nodes[g]);
      e[g] = k; h.used = !0
    } h = null; h = f ? new OpenLayers.Geometry.Polygon(new OpenLayers.Geometry.LinearRing(e)) : new OpenLayers.Geometry.LineString(e); this.internalProjection && this.externalProjection && h.transform(this.externalProjection, this.internalProjection); e = new OpenLayers.Feature.Vector(h, c[d].tags); e.osm_id = parseInt(c[d].id); e.fid = "way." + e.osm_id; a[d] = e
  } for (var l in b) {
    h = b[l]; if (!h.used || this.checkTags) {
      c = null; if (this.checkTags) { c = this.getTags(h.node, !0); if (h.used && !c[1]) continue; c = c[0] } else c = this.getTags(h.node);
      e = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(h.lon, h.lat), c); this.internalProjection && this.externalProjection && e.geometry.transform(this.externalProjection, this.internalProjection); e.osm_id = parseInt(l); e.fid = "node." + e.osm_id; a.push(e)
    } h.node = null
  } return a
  }, getNodes: function (a) { a = a.getElementsByTagName("node"); for (var b = {}, c = 0; c < a.length; c++) { var d = a[c], e = d.getAttribute("id"); b[e] = { lat: d.getAttribute("lat"), lon: d.getAttribute("lon"), node: d } } return b }, getWays: function (a) {
    a = a.getElementsByTagName("way");
    for (var b = [], c = 0; c < a.length; c++) { var d = a[c], e = { id: d.getAttribute("id") }; e.tags = this.getTags(d); d = d.getElementsByTagName("nd"); e.nodes = Array(d.length); for (var f = 0; f < d.length; f++)e.nodes[f] = d[f].getAttribute("ref"); b.push(e) } return b
  }, getTags: function (a, b) { for (var c = a.getElementsByTagName("tag"), d = {}, e = !1, f = 0; f < c.length; f++) { var g = c[f].getAttribute("k"); d[g] = c[f].getAttribute("v"); b && (this.interestingTagsExclude[g] || (e = !0)) } return b ? [d, e] : d }, isWayArea: function (a) {
    var b = !1, c = !1; a.nodes[0] == a.nodes[a.nodes.length -
      1] && (b = !0); if (this.checkTags) for (var d in a.tags) if (this.areaTags[d]) { c = !0; break } return b && (this.checkTags ? c : !0)
  }, write: function (a) {
    OpenLayers.Util.isArray(a) || (a = [a]); this.osm_id = 1; this.created_nodes = {}; var b = this.createElementNS(null, "osm"); b.setAttribute("version", "0.5"); b.setAttribute("generator", "OpenLayers " + OpenLayers.VERSION_NUMBER); for (var c = a.length - 1; 0 <= c; c--)for (var d = this.createFeatureNodes(a[c]), e = 0; e < d.length; e++)b.appendChild(d[e]); return OpenLayers.Format.XML.prototype.write.apply(this,
      [b])
  }, createFeatureNodes: function (a) { var b = [], c = a.geometry.CLASS_NAME, c = c.substring(c.lastIndexOf(".") + 1), c = c.toLowerCase(); (c = this.createXML[c]) && (b = c.apply(this, [a])); return b }, createXML: {
    point: function (a) {
      var b = null, c = a.geometry ? a.geometry : a; this.internalProjection && this.externalProjection && (c = c.clone(), c.transform(this.internalProjection, this.externalProjection)); var d = !1; a.osm_id ? (b = a.osm_id, this.created_nodes[b] && (d = !0)) : (b = -this.osm_id, this.osm_id++); var e = d ? this.created_nodes[b] : this.createElementNS(null,
        "node"); this.created_nodes[b] = e; e.setAttribute("id", b); e.setAttribute("lon", c.x); e.setAttribute("lat", c.y); a.attributes && this.serializeTags(a, e); this.setState(a, e); return d ? [] : [e]
    }, linestring: function (a) {
      var b, c = [], d = a.geometry; a.osm_id ? b = a.osm_id : (b = -this.osm_id, this.osm_id++); var e = this.createElementNS(null, "way"); e.setAttribute("id", b); for (b = 0; b < d.components.length; b++) {
        var f = this.createXML.point.apply(this, [d.components[b]]); if (f.length) { var f = f[0], g = f.getAttribute("id"); c.push(f) } else g = d.components[b].osm_id,
          f = this.created_nodes[g]; this.setState(a, f); f = this.createElementNS(null, "nd"); f.setAttribute("ref", g); e.appendChild(f)
      } this.serializeTags(a, e); c.push(e); return c
    }, polygon: function (a) { var b = OpenLayers.Util.extend({ area: "yes" }, a.attributes), b = new OpenLayers.Feature.Vector(a.geometry.components[0], b); b.osm_id = a.osm_id; return this.createXML.linestring.apply(this, [b]) }
  }, serializeTags: function (a, b) {
    for (var c in a.attributes) {
      var d = this.createElementNS(null, "tag"); d.setAttribute("k", c); d.setAttribute("v",
        a.attributes[c]); b.appendChild(d)
    }
  }, setState: function (a, b) { if (a.state) { var c = null; switch (a.state) { case OpenLayers.State.UPDATE: case OpenLayers.State.DELETE: c = "delete" }c && b.setAttribute("action", c) } }, CLASS_NAME: "OpenLayers.Format.OSM"
}); OpenLayers.Handler.Keyboard = OpenLayers.Class(OpenLayers.Handler, {
  KEY_EVENTS: ["keydown", "keyup"], eventListener: null, observeElement: null, initialize: function (a, b, c) { OpenLayers.Handler.prototype.initialize.apply(this, arguments); this.eventListener = OpenLayers.Function.bindAsEventListener(this.handleKeyEvent, this) }, destroy: function () { this.deactivate(); this.eventListener = null; OpenLayers.Handler.prototype.destroy.apply(this, arguments) }, activate: function () {
    if (OpenLayers.Handler.prototype.activate.apply(this,
      arguments)) { this.observeElement = this.observeElement || document; for (var a = 0, b = this.KEY_EVENTS.length; a < b; a++)OpenLayers.Event.observe(this.observeElement, this.KEY_EVENTS[a], this.eventListener); return !0 } return !1
  }, deactivate: function () { var a = !1; if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) { for (var a = 0, b = this.KEY_EVENTS.length; a < b; a++)OpenLayers.Event.stopObserving(this.observeElement, this.KEY_EVENTS[a], this.eventListener); a = !0 } return a }, handleKeyEvent: function (a) {
    this.checkModifiers(a) &&
    this.callback(a.type, [a])
  }, CLASS_NAME: "OpenLayers.Handler.Keyboard"
}); OpenLayers.Control.ModifyFeature = OpenLayers.Class(OpenLayers.Control, {
  documentDrag: !1, geometryTypes: null, clickout: !0, toggle: !0, standalone: !1, layer: null, feature: null, vertex: null, vertices: null, virtualVertices: null, handlers: null, deleteCodes: null, virtualStyle: null, vertexRenderIntent: null, mode: null, createVertices: !0, modified: !1, radiusHandle: null, dragHandle: null, onModificationStart: function () { }, onModification: function () { }, onModificationEnd: function () { }, initialize: function (a, b) {
    b = b || {}; this.layer = a; this.vertices =
      []; this.virtualVertices = []; this.virtualStyle = OpenLayers.Util.extend({}, this.layer.style || this.layer.styleMap.createSymbolizer(null, b.vertexRenderIntent)); this.virtualStyle.fillOpacity = 0.3; this.virtualStyle.strokeOpacity = 0.3; this.deleteCodes = [46, 68]; this.mode = OpenLayers.Control.ModifyFeature.RESHAPE; OpenLayers.Control.prototype.initialize.apply(this, [b]); OpenLayers.Util.isArray(this.deleteCodes) || (this.deleteCodes = [this.deleteCodes]); var c = { documentDrag: this.documentDrag, stopDown: !1 }; this.handlers =
        {
          keyboard: new OpenLayers.Handler.Keyboard(this, { keydown: this.handleKeypress }), drag: new OpenLayers.Handler.Drag(this, {
            down: function (a) { this.vertex = null; (a = this.layer.getFeatureFromEvent(this.handlers.drag.evt)) ? this.dragStart(a) : this.clickout && (this._unselect = this.feature) }, move: function (a) { delete this._unselect; this.vertex && this.dragVertex(this.vertex, a) }, up: function () { this.handlers.drag.stopDown = !1; this._unselect && (this.unselectFeature(this._unselect), delete this._unselect) }, done: function (a) {
            this.vertex &&
              this.dragComplete(this.vertex)
            }
          }, c)
        }
  }, destroy: function () { this.map && this.map.events.un({ removelayer: this.handleMapEvents, changelayer: this.handleMapEvents, scope: this }); this.layer = null; OpenLayers.Control.prototype.destroy.apply(this, []) }, activate: function () { this.moveLayerToTop(); this.map.events.on({ removelayer: this.handleMapEvents, changelayer: this.handleMapEvents, scope: this }); return this.handlers.keyboard.activate() && this.handlers.drag.activate() && OpenLayers.Control.prototype.activate.apply(this, arguments) },
  deactivate: function () { var a = !1; OpenLayers.Control.prototype.deactivate.apply(this, arguments) && (this.moveLayerBack(), this.map.events.un({ removelayer: this.handleMapEvents, changelayer: this.handleMapEvents, scope: this }), this.layer.removeFeatures(this.vertices, { silent: !0 }), this.layer.removeFeatures(this.virtualVertices, { silent: !0 }), this.vertices = [], this.handlers.drag.deactivate(), this.handlers.keyboard.deactivate(), (a = this.feature) && (a.geometry && a.layer) && this.unselectFeature(a), a = !0); return a }, beforeSelectFeature: function (a) {
    return this.layer.events.triggerEvent("beforefeaturemodified",
      { feature: a })
  }, selectFeature: function (a) { if (!(this.feature === a || this.geometryTypes && -1 == OpenLayers.Util.indexOf(this.geometryTypes, a.geometry.CLASS_NAME))) { !1 !== this.beforeSelectFeature(a) && (this.feature && this.unselectFeature(this.feature), this.feature = a, this.layer.selectedFeatures.push(a), this.layer.drawFeature(a, "select"), this.modified = !1, this.resetVertices(), this.onModificationStart(this.feature)); var b = a.modified; !a.geometry || b && b.geometry || (this._originalGeometry = a.geometry.clone()) } }, unselectFeature: function (a) {
    this.layer.removeFeatures(this.vertices,
      { silent: !0 }); this.vertices = []; this.layer.destroyFeatures(this.virtualVertices, { silent: !0 }); this.virtualVertices = []; this.dragHandle && (this.layer.destroyFeatures([this.dragHandle], { silent: !0 }), delete this.dragHandle); this.radiusHandle && (this.layer.destroyFeatures([this.radiusHandle], { silent: !0 }), delete this.radiusHandle); this.layer.drawFeature(this.feature, "default"); this.feature = null; OpenLayers.Util.removeItem(this.layer.selectedFeatures, a); this.onModificationEnd(a); this.layer.events.triggerEvent("afterfeaturemodified",
        { feature: a, modified: this.modified }); this.modified = !1
  }, dragStart: function (a) { var b = "OpenLayers.Geometry.Point" == a.geometry.CLASS_NAME; this.standalone || (a._sketch || !b) && a._sketch || (this.toggle && this.feature === a && (this._unselect = a), this.selectFeature(a)); if (a._sketch || b) this.vertex = a, this.handlers.drag.stopDown = !0 }, dragVertex: function (a, b) {
    var c = this.map.getLonLatFromViewPortPx(b), d = a.geometry; d.move(c.lon - d.x, c.lat - d.y); this.modified = !0; "OpenLayers.Geometry.Point" == this.feature.geometry.CLASS_NAME ?
      this.layer.events.triggerEvent("vertexmodified", { vertex: a.geometry, feature: this.feature, pixel: b }) : (a._index ? (a.geometry.parent.addComponent(a.geometry, a._index), delete a._index, OpenLayers.Util.removeItem(this.virtualVertices, a), this.vertices.push(a)) : a == this.dragHandle ? (this.layer.removeFeatures(this.vertices, { silent: !0 }), this.vertices = [], this.radiusHandle && (this.layer.destroyFeatures([this.radiusHandle], { silent: !0 }), this.radiusHandle = null)) : a !== this.radiusHandle && this.layer.events.triggerEvent("vertexmodified",
        { vertex: a.geometry, feature: this.feature, pixel: b }), 0 < this.virtualVertices.length && (this.layer.destroyFeatures(this.virtualVertices, { silent: !0 }), this.virtualVertices = []), this.layer.drawFeature(this.feature, this.standalone ? void 0 : "select")); this.layer.drawFeature(a)
  }, dragComplete: function (a) { this.resetVertices(); this.setFeatureState(); this.onModification(this.feature); this.layer.events.triggerEvent("featuremodified", { feature: this.feature }) }, setFeatureState: function () {
    if (this.feature.state != OpenLayers.State.INSERT &&
      this.feature.state != OpenLayers.State.DELETE && (this.feature.state = OpenLayers.State.UPDATE, this.modified && this._originalGeometry)) { var a = this.feature; a.modified = OpenLayers.Util.extend(a.modified, { geometry: this._originalGeometry }); delete this._originalGeometry }
  }, resetVertices: function () {
  0 < this.vertices.length && (this.layer.removeFeatures(this.vertices, { silent: !0 }), this.vertices = []); 0 < this.virtualVertices.length && (this.layer.removeFeatures(this.virtualVertices, { silent: !0 }), this.virtualVertices = []); this.dragHandle &&
    (this.layer.destroyFeatures([this.dragHandle], { silent: !0 }), this.dragHandle = null); this.radiusHandle && (this.layer.destroyFeatures([this.radiusHandle], { silent: !0 }), this.radiusHandle = null); this.feature && "OpenLayers.Geometry.Point" != this.feature.geometry.CLASS_NAME && (this.mode & OpenLayers.Control.ModifyFeature.DRAG && this.collectDragHandle(), this.mode & (OpenLayers.Control.ModifyFeature.ROTATE | OpenLayers.Control.ModifyFeature.RESIZE) && this.collectRadiusHandle(), this.mode & OpenLayers.Control.ModifyFeature.RESHAPE &&
      (this.mode & OpenLayers.Control.ModifyFeature.RESIZE || this.collectVertices()))
  }, handleKeypress: function (a) {
    var b = a.keyCode; this.feature && -1 != OpenLayers.Util.indexOf(this.deleteCodes, b) && (b = this.layer.getFeatureFromEvent(this.handlers.drag.evt)) && (-1 != OpenLayers.Util.indexOf(this.vertices, b) && !this.handlers.drag.dragging && b.geometry.parent) && (b.geometry.parent.removeComponent(b.geometry), this.layer.events.triggerEvent("vertexremoved", { vertex: b.geometry, feature: this.feature, pixel: a.xy }), this.layer.drawFeature(this.feature,
      this.standalone ? void 0 : "select"), this.modified = !0, this.resetVertices(), this.setFeatureState(), this.onModification(this.feature), this.layer.events.triggerEvent("featuremodified", { feature: this.feature }))
  }, collectVertices: function () {
    function a(c) {
      var d, e, f; if ("OpenLayers.Geometry.Point" == c.CLASS_NAME) e = new OpenLayers.Feature.Vector(c), e._sketch = !0, e.renderIntent = b.vertexRenderIntent, b.vertices.push(e); else {
        f = c.components.length; "OpenLayers.Geometry.LinearRing" == c.CLASS_NAME && (f -= 1); for (d = 0; d < f; ++d)e =
          c.components[d], "OpenLayers.Geometry.Point" == e.CLASS_NAME ? (e = new OpenLayers.Feature.Vector(e), e._sketch = !0, e.renderIntent = b.vertexRenderIntent, b.vertices.push(e)) : a(e); if (b.createVertices && "OpenLayers.Geometry.MultiPoint" != c.CLASS_NAME) for (d = 0, f = c.components.length; d < f - 1; ++d) {
            e = c.components[d]; var g = c.components[d + 1]; "OpenLayers.Geometry.Point" == e.CLASS_NAME && "OpenLayers.Geometry.Point" == g.CLASS_NAME && (e = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point((e.x + g.x) / 2, (e.y + g.y) / 2), null, b.virtualStyle),
              e.geometry.parent = c, e._index = d + 1, e._sketch = !0, b.virtualVertices.push(e))
          }
      }
    } this.vertices = []; this.virtualVertices = []; var b = this; a.call(this, this.feature.geometry); this.layer.addFeatures(this.virtualVertices, { silent: !0 }); this.layer.addFeatures(this.vertices, { silent: !0 })
  }, collectDragHandle: function () {
    var a = this.feature.geometry, b = a.getBounds().getCenterLonLat(), b = new OpenLayers.Geometry.Point(b.lon, b.lat), c = new OpenLayers.Feature.Vector(b); b.move = function (b, c) {
      OpenLayers.Geometry.Point.prototype.move.call(this,
        b, c); a.move(b, c)
    }; c._sketch = !0; this.dragHandle = c; this.dragHandle.renderIntent = this.vertexRenderIntent; this.layer.addFeatures([this.dragHandle], { silent: !0 })
  }, collectRadiusHandle: function () {
    var a = this.feature.geometry, b = a.getBounds(), c = b.getCenterLonLat(), d = new OpenLayers.Geometry.Point(c.lon, c.lat), b = new OpenLayers.Geometry.Point(b.right, b.bottom), c = new OpenLayers.Feature.Vector(b), e = this.mode & OpenLayers.Control.ModifyFeature.RESIZE, f = this.mode & OpenLayers.Control.ModifyFeature.RESHAPE, g = this.mode &
      OpenLayers.Control.ModifyFeature.ROTATE; b.move = function (b, c) { OpenLayers.Geometry.Point.prototype.move.call(this, b, c); var l = this.x - d.x, m = this.y - d.y, n = l - b, p = m - c; if (g) { var q = Math.atan2(p, n), q = Math.atan2(m, l) - q, q = q * (180 / Math.PI); a.rotate(q, d) } if (e) { var r; f ? (m /= p, r = l / n / m) : (n = Math.sqrt(n * n + p * p), m = Math.sqrt(l * l + m * m) / n); a.resize(m, d, r) } }; c._sketch = !0; this.radiusHandle = c; this.radiusHandle.renderIntent = this.vertexRenderIntent; this.layer.addFeatures([this.radiusHandle], { silent: !0 })
  }, setMap: function (a) {
    this.handlers.drag.setMap(a);
    OpenLayers.Control.prototype.setMap.apply(this, arguments)
  }, handleMapEvents: function (a) { "removelayer" != a.type && "order" != a.property || this.moveLayerToTop() }, moveLayerToTop: function () { var a = Math.max(this.map.Z_INDEX_BASE.Feature - 1, this.layer.getZIndex()) + 1; this.layer.setZIndex(a) }, moveLayerBack: function () { var a = this.layer.getZIndex() - 1; a >= this.map.Z_INDEX_BASE.Feature ? this.layer.setZIndex(a) : this.map.setLayerZIndex(this.layer, this.map.getLayerIndex(this.layer)) }, CLASS_NAME: "OpenLayers.Control.ModifyFeature"
});
OpenLayers.Control.ModifyFeature.RESHAPE = 1; OpenLayers.Control.ModifyFeature.RESIZE = 2; OpenLayers.Control.ModifyFeature.ROTATE = 4; OpenLayers.Control.ModifyFeature.DRAG = 8; OpenLayers.Layer.Bing = OpenLayers.Class(OpenLayers.Layer.XYZ, {
  key: null, serverResolutions: [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135, 0.29858214169740677, 0.14929107084870338, 0.07464553542435169], attributionTemplate: '<span class="olBingAttribution ${type}"><div><a target="_blank" href="http://www.bing.com/maps/"><img src="${logo}" /></a></div>${copyrights}<a style="white-space: nowrap" target="_blank" href="http://www.microsoft.com/maps/product/terms.html">Terms of Use</a></span>',
  metadata: null, protocolRegex: /^http:/i, type: "Road", culture: "en-US", metadataParams: null, tileOptions: null, protocol: ~window.location.href.indexOf("http") ? "" : "http:", initialize: function (a) { a = OpenLayers.Util.applyDefaults({ sphericalMercator: !0 }, a); OpenLayers.Layer.XYZ.prototype.initialize.apply(this, [a.name || "Bing " + (a.type || this.type), null, a]); this.tileOptions = OpenLayers.Util.extend({ crossOriginKeyword: "anonymous" }, this.options.tileOptions); this.loadMetadata() }, loadMetadata: function () {
  this._callbackId =
    "_callback_" + this.id.replace(/\./g, "_"); window[this._callbackId] = OpenLayers.Function.bind(OpenLayers.Layer.Bing.processMetadata, this); var a = OpenLayers.Util.applyDefaults({ key: this.key, jsonp: this._callbackId, include: "ImageryProviders" }, this.metadataParams), a = this.protocol + "//dev.virtualearth.net/REST/v1/Imagery/Metadata/" + this.type + "?" + OpenLayers.Util.getParameterString(a), b = document.createElement("script"); b.type = "text/javascript"; b.src = a; b.id = this._callbackId; document.getElementsByTagName("head")[0].appendChild(b)
  },
  initLayer: function () {
    var a = this.metadata.resourceSets[0].resources[0], b = a.imageUrl.replace("{quadkey}", "${quadkey}"), b = b.replace("{culture}", this.culture), b = b.replace(this.protocolRegex, this.protocol); this.url = []; for (var c = 0; c < a.imageUrlSubdomains.length; ++c)this.url.push(b.replace("{subdomain}", a.imageUrlSubdomains[c])); this.addOptions({ maxResolution: Math.min(this.serverResolutions[a.zoomMin], this.maxResolution || Number.POSITIVE_INFINITY), numZoomLevels: Math.min(a.zoomMax + 1 - a.zoomMin, this.numZoomLevels) },
      !0); this.isBaseLayer || this.redraw(); this.updateAttribution()
  }, getURL: function (a) { if (this.url) { var b = this.getXYZ(a); a = b.x; for (var c = b.y, b = b.z, d = [], e = b; 0 < e; --e) { var f = "0", g = 1 << e - 1; 0 != (a & g) && f++; 0 != (c & g) && (f++ , f++); d.push(f) } d = d.join(""); a = this.selectUrl("" + a + c + b, this.url); return OpenLayers.String.format(a, { quadkey: d }) } }, updateAttribution: function () {
    var a = this.metadata; if (a.resourceSets && this.map && this.map.center) {
      var b = a.resourceSets[0].resources[0], c = this.map.getExtent().transform(this.map.getProjectionObject(),
        new OpenLayers.Projection("EPSG:4326")), d = b.imageryProviders || [], e = OpenLayers.Util.indexOf(this.serverResolutions, this.getServerResolution()), b = "", f, g, h, k, l, m, n; g = 0; for (h = d.length; g < h; ++g)for (f = d[g], k = 0, l = f.coverageAreas.length; k < l; ++k)n = f.coverageAreas[k], m = OpenLayers.Bounds.fromArray(n.bbox, !0), c.intersectsBounds(m) && (e <= n.zoomMax && e >= n.zoomMin) && (b += f.attribution + " "); a = a.brandLogoUri.replace(this.protocolRegex, this.protocol); this.attribution = OpenLayers.String.format(this.attributionTemplate, {
          type: this.type.toLowerCase(),
          logo: a, copyrights: b
        }); this.map && this.map.events.triggerEvent("changelayer", { layer: this, property: "attribution" })
    }
  }, setMap: function () { OpenLayers.Layer.XYZ.prototype.setMap.apply(this, arguments); this.map.events.register("moveend", this, this.updateAttribution) }, clone: function (a) { null == a && (a = new OpenLayers.Layer.Bing(this.options)); return a = OpenLayers.Layer.XYZ.prototype.clone.apply(this, [a]) }, destroy: function () {
  this.map && this.map.events.unregister("moveend", this, this.updateAttribution); OpenLayers.Layer.XYZ.prototype.destroy.apply(this,
    arguments)
  }, CLASS_NAME: "OpenLayers.Layer.Bing"
}); OpenLayers.Layer.Bing.processMetadata = function (a) { this.metadata = a; this.initLayer(); a = document.getElementById(this._callbackId); a.parentNode.removeChild(a); window[this._callbackId] = void 0; delete this._callbackId }; OpenLayers.StyleMap = OpenLayers.Class({
  styles: null, extendDefault: !0, initialize: function (a, b) {
  this.styles = { "default": new OpenLayers.Style(OpenLayers.Feature.Vector.style["default"]), select: new OpenLayers.Style(OpenLayers.Feature.Vector.style.select), temporary: new OpenLayers.Style(OpenLayers.Feature.Vector.style.temporary), "delete": new OpenLayers.Style(OpenLayers.Feature.Vector.style["delete"]) }; if (a instanceof OpenLayers.Style) this.styles["default"] = a, this.styles.select = a, this.styles.temporary = a, this.styles["delete"] =
    a; else if ("object" == typeof a) for (var c in a) if (a[c] instanceof OpenLayers.Style) this.styles[c] = a[c]; else if ("object" == typeof a[c]) this.styles[c] = new OpenLayers.Style(a[c]); else { this.styles["default"] = new OpenLayers.Style(a); this.styles.select = new OpenLayers.Style(a); this.styles.temporary = new OpenLayers.Style(a); this.styles["delete"] = new OpenLayers.Style(a); break } OpenLayers.Util.extend(this, b)
  }, destroy: function () { for (var a in this.styles) this.styles[a].destroy(); this.styles = null }, createSymbolizer: function (a,
    b) { a || (a = new OpenLayers.Feature.Vector); this.styles[b] || (b = "default"); a.renderIntent = b; var c = {}; this.extendDefault && "default" != b && (c = this.styles["default"].createSymbolizer(a)); return OpenLayers.Util.extend(c, this.styles[b].createSymbolizer(a)) }, addUniqueValueRules: function (a, b, c, d) { var e = [], f; for (f in c) e.push(new OpenLayers.Rule({ symbolizer: c[f], context: d, filter: new OpenLayers.Filter.Comparison({ type: OpenLayers.Filter.Comparison.EQUAL_TO, property: b, value: f }) })); this.styles[a].addRules(e) }, CLASS_NAME: "OpenLayers.StyleMap"
}); OpenLayers.Layer.Vector = OpenLayers.Class(OpenLayers.Layer, {
  isBaseLayer: !1, isFixed: !1, features: null, filter: null, selectedFeatures: null, unrenderedFeatures: null, reportError: !0, style: null, styleMap: null, strategies: null, protocol: null, renderers: ["SVG", "VML", "Canvas"], renderer: null, rendererOptions: null, geometryType: null, drawn: !1, ratio: 1, initialize: function (a, b) {
    OpenLayers.Layer.prototype.initialize.apply(this, arguments); this.renderer && this.renderer.supported() || this.assignRenderer(); this.renderer && this.renderer.supported() ||
      (this.renderer = null, this.displayError()); this.styleMap || (this.styleMap = new OpenLayers.StyleMap); this.features = []; this.selectedFeatures = []; this.unrenderedFeatures = {}; if (this.strategies) for (var c = 0, d = this.strategies.length; c < d; c++)this.strategies[c].setLayer(this)
  }, destroy: function () {
    if (this.strategies) { var a, b, c; b = 0; for (c = this.strategies.length; b < c; b++)a = this.strategies[b], a.autoDestroy && a.destroy(); this.strategies = null } this.protocol && (this.protocol.autoDestroy && this.protocol.destroy(), this.protocol =
      null); this.destroyFeatures(); this.unrenderedFeatures = this.selectedFeatures = this.features = null; this.renderer && this.renderer.destroy(); this.drawn = this.geometryType = this.renderer = null; OpenLayers.Layer.prototype.destroy.apply(this, arguments)
  }, clone: function (a) { null == a && (a = new OpenLayers.Layer.Vector(this.name, this.getOptions())); a = OpenLayers.Layer.prototype.clone.apply(this, [a]); for (var b = this.features, c = b.length, d = Array(c), e = 0; e < c; ++e)d[e] = b[e].clone(); a.features = d; return a }, refresh: function (a) {
    this.calculateInRange() &&
    this.visibility && this.events.triggerEvent("refresh", a)
  }, assignRenderer: function () { for (var a = 0, b = this.renderers.length; a < b; a++) { var c = this.renderers[a]; if ((c = "function" == typeof c ? c : OpenLayers.Renderer[c]) && c.prototype.supported()) { this.renderer = new c(this.div, this.rendererOptions); break } } }, displayError: function () { this.reportError && OpenLayers.Console.userError(OpenLayers.i18n("browserNotSupported", { renderers: this.renderers.join("\n") })) }, setMap: function (a) {
    OpenLayers.Layer.prototype.setMap.apply(this,
      arguments); if (this.renderer) { this.renderer.map = this.map; var b = this.map.getSize(); b.w *= this.ratio; b.h *= this.ratio; this.renderer.setSize(b) } else this.map.removeLayer(this)
  }, afterAdd: function () { if (this.strategies) { var a, b, c; b = 0; for (c = this.strategies.length; b < c; b++)a = this.strategies[b], a.autoActivate && a.activate() } }, removeMap: function (a) { this.drawn = !1; if (this.strategies) { var b, c; b = 0; for (c = this.strategies.length; b < c; b++)a = this.strategies[b], a.autoActivate && a.deactivate() } }, onMapResize: function () {
    OpenLayers.Layer.prototype.onMapResize.apply(this,
      arguments); var a = this.map.getSize(); a.w *= this.ratio; a.h *= this.ratio; this.renderer.setSize(a)
  }, moveTo: function (a, b, c) {
    OpenLayers.Layer.prototype.moveTo.apply(this, arguments); var d = !0; if (!c) {
      this.renderer.root.style.visibility = "hidden"; var d = this.map.getSize(), e = d.w, d = d.h, e = e / 2 * this.ratio - e / 2, d = d / 2 * this.ratio - d / 2, e = e + this.map.layerContainerOriginPx.x, e = -Math.round(e), d = d + this.map.layerContainerOriginPx.y, d = -Math.round(d); this.div.style.left = e + "px"; this.div.style.top = d + "px"; e = this.map.getExtent().scale(this.ratio);
      d = this.renderer.setExtent(e, b); this.renderer.root.style.visibility = "visible"; !0 === OpenLayers.IS_GECKO && (this.div.scrollLeft = this.div.scrollLeft); if (!b && d) for (var f in this.unrenderedFeatures) e = this.unrenderedFeatures[f], this.drawFeature(e)
    } if (!this.drawn || b || !d) for (this.drawn = !0, f = 0, d = this.features.length; f < d; f++)this.renderer.locked = f !== d - 1, e = this.features[f], this.drawFeature(e)
  }, display: function (a) {
    OpenLayers.Layer.prototype.display.apply(this, arguments); var b = this.div.style.display; b != this.renderer.root.style.display &&
      (this.renderer.root.style.display = b)
  }, addFeatures: function (a, b) {
    OpenLayers.Util.isArray(a) || (a = [a]); var c = !b || !b.silent; if (c) { var d = { features: a }; if (!1 === this.events.triggerEvent("beforefeaturesadded", d)) return; a = d.features } for (var d = [], e = 0, f = a.length; e < f; e++) {
      this.renderer.locked = e != a.length - 1 ? !0 : !1; var g = a[e]; if (this.geometryType && !(g.geometry instanceof this.geometryType)) throw new TypeError("addFeatures: component should be an " + this.geometryType.prototype.CLASS_NAME); g.layer = this; !g.style && this.style &&
        (g.style = OpenLayers.Util.extend({}, this.style)); if (c) { if (!1 === this.events.triggerEvent("beforefeatureadded", { feature: g })) continue; this.preFeatureInsert(g) } d.push(g); this.features.push(g); this.drawFeature(g); c && (this.events.triggerEvent("featureadded", { feature: g }), this.onFeatureInsert(g))
    } c && this.events.triggerEvent("featuresadded", { features: d })
  }, removeFeatures: function (a, b) {
    if (a && 0 !== a.length) {
      if (a === this.features) return this.removeAllFeatures(b); OpenLayers.Util.isArray(a) || (a = [a]); a === this.selectedFeatures &&
        (a = a.slice()); var c = !b || !b.silent; c && this.events.triggerEvent("beforefeaturesremoved", { features: a }); for (var d = a.length - 1; 0 <= d; d--) {
          this.renderer.locked = 0 != d && a[d - 1].geometry ? !0 : !1; var e = a[d]; delete this.unrenderedFeatures[e.id]; c && this.events.triggerEvent("beforefeatureremoved", { feature: e }); this.features = OpenLayers.Util.removeItem(this.features, e); e.layer = null; e.geometry && this.renderer.eraseFeatures(e); -1 != OpenLayers.Util.indexOf(this.selectedFeatures, e) && OpenLayers.Util.removeItem(this.selectedFeatures,
            e); c && this.events.triggerEvent("featureremoved", { feature: e })
        } c && this.events.triggerEvent("featuresremoved", { features: a })
    }
  }, removeAllFeatures: function (a) {
    a = !a || !a.silent; var b = this.features; a && this.events.triggerEvent("beforefeaturesremoved", { features: b }); for (var c, d = b.length - 1; 0 <= d; d--)c = b[d], a && this.events.triggerEvent("beforefeatureremoved", { feature: c }), c.layer = null, a && this.events.triggerEvent("featureremoved", { feature: c }); this.renderer.clear(); this.features = []; this.unrenderedFeatures = {}; this.selectedFeatures =
      []; a && this.events.triggerEvent("featuresremoved", { features: b })
  }, destroyFeatures: function (a, b) { void 0 == a && (a = this.features); if (a) { this.removeFeatures(a, b); for (var c = a.length - 1; 0 <= c; c--)a[c].destroy() } }, drawFeature: function (a, b) { if (this.drawn) { if ("object" != typeof b) { b || a.state !== OpenLayers.State.DELETE || (b = "delete"); var c = b || a.renderIntent; (b = a.style || this.style) || (b = this.styleMap.createSymbolizer(a, c)) } c = this.renderer.drawFeature(a, b); !1 === c || null === c ? this.unrenderedFeatures[a.id] = a : delete this.unrenderedFeatures[a.id] } },
  eraseFeatures: function (a) { this.renderer.eraseFeatures(a) }, getFeatureFromEvent: function (a) { if (!this.renderer) throw Error("getFeatureFromEvent called on layer with no renderer. This usually means you destroyed a layer, but not some handler which is associated with it."); var b = null; (a = this.renderer.getFeatureIdFromEvent(a)) && (b = "string" === typeof a ? this.getFeatureById(a) : a); return b }, getFeatureBy: function (a, b) {
    for (var c = null, d = 0, e = this.features.length; d < e; ++d)if (this.features[d][a] == b) {
      c = this.features[d];
      break
    } return c
  }, getFeatureById: function (a) { return this.getFeatureBy("id", a) }, getFeatureByFid: function (a) { return this.getFeatureBy("fid", a) }, getFeaturesByAttribute: function (a, b) { var c, d, e = this.features.length, f = []; for (c = 0; c < e; c++)(d = this.features[c]) && d.attributes && d.attributes[a] === b && f.push(d); return f }, onFeatureInsert: function (a) { }, preFeatureInsert: function (a) { }, getDataExtent: function () {
    var a = null, b = this.features; if (b && 0 < b.length) for (var c = null, d = 0, e = b.length; d < e; d++)if (c = b[d].geometry) null === a &&
      (a = new OpenLayers.Bounds), a.extend(c.getBounds()); return a
  }, CLASS_NAME: "OpenLayers.Layer.Vector"
}); OpenLayers.Layer.PointGrid = OpenLayers.Class(OpenLayers.Layer.Vector, {
  dx: null, dy: null, ratio: 1.5, maxFeatures: 250, rotation: 0, origin: null, gridBounds: null, initialize: function (a) { a = a || {}; OpenLayers.Layer.Vector.prototype.initialize.apply(this, [a.name, a]) }, setMap: function (a) { OpenLayers.Layer.Vector.prototype.setMap.apply(this, arguments); a.events.register("moveend", this, this.onMoveEnd) }, removeMap: function (a) {
    a.events.unregister("moveend", this, this.onMoveEnd); OpenLayers.Layer.Vector.prototype.removeMap.apply(this,
      arguments)
  }, setRatio: function (a) { this.ratio = a; this.updateGrid(!0) }, setMaxFeatures: function (a) { this.maxFeatures = a; this.updateGrid(!0) }, setSpacing: function (a, b) { this.dx = a; this.dy = b || a; this.updateGrid(!0) }, setOrigin: function (a) { this.origin = a; this.updateGrid(!0) }, getOrigin: function () { this.origin || (this.origin = this.map.getExtent().getCenterLonLat()); return this.origin }, setRotation: function (a) { this.rotation = a; this.updateGrid(!0) }, onMoveEnd: function () { this.updateGrid() }, getViewBounds: function () {
    var a = this.map.getExtent();
    if (this.rotation) { var b = this.getOrigin(), b = new OpenLayers.Geometry.Point(b.lon, b.lat), a = a.toGeometry(); a.rotate(-this.rotation, b); a = a.getBounds() } return a
  }, updateGrid: function (a) {
    if (a || this.invalidBounds()) {
      var b = this.getViewBounds(), c = this.getOrigin(); a = new OpenLayers.Geometry.Point(c.lon, c.lat); var d = b.getWidth(), e = b.getHeight(), f = d / e, g = Math.sqrt(this.dx * this.dy * this.maxFeatures / f), d = Math.min(d * this.ratio, g * f), e = Math.min(e * this.ratio, g), b = b.getCenterLonLat(); this.gridBounds = new OpenLayers.Bounds(b.lon -
        d / 2, b.lat - e / 2, b.lon + d / 2, b.lat + e / 2); for (var b = Math.floor(e / this.dy), d = Math.floor(d / this.dx), e = c.lon + this.dx * Math.ceil((this.gridBounds.left - c.lon) / this.dx), c = c.lat + this.dy * Math.ceil((this.gridBounds.bottom - c.lat) / this.dy), g = Array(b * d), h, k = 0; k < d; ++k)for (var f = e + k * this.dx, l = 0; l < b; ++l)h = c + l * this.dy, h = new OpenLayers.Geometry.Point(f, h), this.rotation && h.rotate(this.rotation, a), g[k * b + l] = new OpenLayers.Feature.Vector(h); this.destroyFeatures(this.features, { silent: !0 }); this.addFeatures(g, { silent: !0 })
    }
  }, invalidBounds: function () {
    return !this.gridBounds ||
      !this.gridBounds.containsBounds(this.getViewBounds())
  }, CLASS_NAME: "OpenLayers.Layer.PointGrid"
}); OpenLayers.Handler.MouseWheel = OpenLayers.Class(OpenLayers.Handler, {
  wheelListener: null, interval: 0, maxDelta: Number.POSITIVE_INFINITY, delta: 0, cumulative: !0, initialize: function (a, b, c) { OpenLayers.Handler.prototype.initialize.apply(this, arguments); this.wheelListener = OpenLayers.Function.bindAsEventListener(this.onWheelEvent, this) }, destroy: function () { OpenLayers.Handler.prototype.destroy.apply(this, arguments); this.wheelListener = null }, onWheelEvent: function (a) {
    if (this.map && this.checkModifiers(a)) {
      for (var b =
        !1, c = !1, d = !1, e = OpenLayers.Event.element(a); null != e && !d && !b;) { if (!b) try { var f, b = (f = e.currentStyle ? e.currentStyle.overflow : document.defaultView.getComputedStyle(e, null).getPropertyValue("overflow")) && "auto" == f || "scroll" == f } catch (g) { } if (!c && (c = OpenLayers.Element.hasClass(e, "olScrollable"), !c)) for (var d = 0, h = this.map.layers.length; d < h; d++) { var k = this.map.layers[d]; if (e == k.div || e == k.pane) { c = !0; break } } d = e == this.map.div; e = e.parentNode } if (!b && d) {
          if (c) if (b = 0, a.wheelDelta ? (b = a.wheelDelta, 0 === b % 160 && (b *= 0.75),
            b /= 120) : a.detail && (b = -(a.detail / Math.abs(a.detail))), this.delta += b, window.clearTimeout(this._timeoutId), this.interval && Math.abs(this.delta) < this.maxDelta) { var l = OpenLayers.Util.extend({}, a); this._timeoutId = window.setTimeout(OpenLayers.Function.bind(function () { this.wheelZoom(l) }, this), this.interval) } else this.wheelZoom(a); OpenLayers.Event.stop(a)
        }
    }
  }, wheelZoom: function (a) {
    var b = this.delta; this.delta = 0; b && (a.xy = this.map.events.getMousePosition(a), 0 > b ? this.callback("down", [a, this.cumulative ? Math.max(-this.maxDelta,
      b) : -1]) : this.callback("up", [a, this.cumulative ? Math.min(this.maxDelta, b) : 1]))
  }, activate: function (a) { if (OpenLayers.Handler.prototype.activate.apply(this, arguments)) { var b = this.wheelListener; OpenLayers.Event.observe(window, "DOMMouseScroll", b); OpenLayers.Event.observe(window, "mousewheel", b); OpenLayers.Event.observe(document, "mousewheel", b); return !0 } return !1 }, deactivate: function (a) {
    if (OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) {
      var b = this.wheelListener; OpenLayers.Event.stopObserving(window,
        "DOMMouseScroll", b); OpenLayers.Event.stopObserving(window, "mousewheel", b); OpenLayers.Event.stopObserving(document, "mousewheel", b); return !0
    } return !1
  }, CLASS_NAME: "OpenLayers.Handler.MouseWheel"
}); OpenLayers.Symbolizer = OpenLayers.Class({ zIndex: 0, initialize: function (a) { OpenLayers.Util.extend(this, a) }, clone: function () { return new (eval(this.CLASS_NAME))(OpenLayers.Util.extend({}, this)) }, CLASS_NAME: "OpenLayers.Symbolizer" }); OpenLayers.Symbolizer.Raster = OpenLayers.Class(OpenLayers.Symbolizer, { initialize: function (a) { OpenLayers.Symbolizer.prototype.initialize.apply(this, arguments) }, CLASS_NAME: "OpenLayers.Symbolizer.Raster" }); OpenLayers.Rule = OpenLayers.Class({
  id: null, name: null, title: null, description: null, context: null, filter: null, elseFilter: !1, symbolizer: null, symbolizers: null, minScaleDenominator: null, maxScaleDenominator: null, initialize: function (a) { this.symbolizer = {}; OpenLayers.Util.extend(this, a); this.symbolizers && delete this.symbolizer; this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_") }, destroy: function () { for (var a in this.symbolizer) this.symbolizer[a] = null; this.symbolizer = null; delete this.symbolizers }, evaluate: function (a) {
    var b =
      this.getContext(a), c = !0; if (this.minScaleDenominator || this.maxScaleDenominator) var d = a.layer.map.getScale(); this.minScaleDenominator && (c = d >= OpenLayers.Style.createLiteral(this.minScaleDenominator, b)); c && this.maxScaleDenominator && (c = d < OpenLayers.Style.createLiteral(this.maxScaleDenominator, b)); c && this.filter && (c = "OpenLayers.Filter.FeatureId" == this.filter.CLASS_NAME ? this.filter.evaluate(a) : this.filter.evaluate(b)); return c
  }, getContext: function (a) {
    var b = this.context; b || (b = a.attributes || a.data); "function" ==
      typeof this.context && (b = this.context(a)); return b
  }, clone: function () {
    var a = OpenLayers.Util.extend({}, this); if (this.symbolizers) { var b = this.symbolizers.length; a.symbolizers = Array(b); for (var c = 0; c < b; ++c)a.symbolizers[c] = this.symbolizers[c].clone() } else { a.symbolizer = {}; for (var d in this.symbolizer) b = this.symbolizer[d], c = typeof b, "object" === c ? a.symbolizer[d] = OpenLayers.Util.extend({}, b) : "string" === c && (a.symbolizer[d] = b) } a.filter = this.filter && this.filter.clone(); a.context = this.context && OpenLayers.Util.extend({},
      this.context); return new OpenLayers.Rule(a)
  }, CLASS_NAME: "OpenLayers.Rule"
}); OpenLayers.Format.SLD = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, { profile: null, defaultVersion: "1.0.0", stringifyOutput: !0, namedLayersAsArray: !1, CLASS_NAME: "OpenLayers.Format.SLD" }); OpenLayers.Symbolizer.Polygon = OpenLayers.Class(OpenLayers.Symbolizer, { initialize: function (a) { OpenLayers.Symbolizer.prototype.initialize.apply(this, arguments) }, CLASS_NAME: "OpenLayers.Symbolizer.Polygon" }); OpenLayers.Format.GML.v2 = OpenLayers.Class(OpenLayers.Format.GML.Base, {
  schemaLocation: "http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd", initialize: function (a) { OpenLayers.Format.GML.Base.prototype.initialize.apply(this, [a]) }, readers: {
    gml: OpenLayers.Util.applyDefaults({
      outerBoundaryIs: function (a, b) { var c = {}; this.readChildNodes(a, c); b.outer = c.components[0] }, innerBoundaryIs: function (a, b) { var c = {}; this.readChildNodes(a, c); b.inner.push(c.components[0]) }, Box: function (a, b) {
        var c =
          {}; this.readChildNodes(a, c); b.components || (b.components = []); var d = c.points[0], c = c.points[1]; b.components.push(new OpenLayers.Bounds(d.x, d.y, c.x, c.y))
      }
    }, OpenLayers.Format.GML.Base.prototype.readers.gml), feature: OpenLayers.Format.GML.Base.prototype.readers.feature, wfs: OpenLayers.Format.GML.Base.prototype.readers.wfs
  }, write: function (a) {
    var b; b = OpenLayers.Util.isArray(a) ? "wfs:FeatureCollection" : "gml:featureMember"; a = this.writeNode(b, a); this.setAttributeNS(a, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation);
    return OpenLayers.Format.XML.prototype.write.apply(this, [a])
  }, writers: {
    gml: OpenLayers.Util.applyDefaults({
      Point: function (a) { var b = this.createElementNSPlus("gml:Point"); this.writeNode("coordinates", [a], b); return b }, coordinates: function (a) { for (var b = a.length, c = Array(b), d, e = 0; e < b; ++e)d = a[e], c[e] = this.xy ? d.x + "," + d.y : d.y + "," + d.x, void 0 != d.z && (c[e] += "," + d.z); return this.createElementNSPlus("gml:coordinates", { attributes: { decimal: ".", cs: ",", ts: " " }, value: 1 == b ? c[0] : c.join(" ") }) }, LineString: function (a) {
        var b =
          this.createElementNSPlus("gml:LineString"); this.writeNode("coordinates", a.components, b); return b
      }, Polygon: function (a) { var b = this.createElementNSPlus("gml:Polygon"); this.writeNode("outerBoundaryIs", a.components[0], b); for (var c = 1; c < a.components.length; ++c)this.writeNode("innerBoundaryIs", a.components[c], b); return b }, outerBoundaryIs: function (a) { var b = this.createElementNSPlus("gml:outerBoundaryIs"); this.writeNode("LinearRing", a, b); return b }, innerBoundaryIs: function (a) {
        var b = this.createElementNSPlus("gml:innerBoundaryIs");
        this.writeNode("LinearRing", a, b); return b
      }, LinearRing: function (a) { var b = this.createElementNSPlus("gml:LinearRing"); this.writeNode("coordinates", a.components, b); return b }, Box: function (a) { var b = this.createElementNSPlus("gml:Box"); this.writeNode("coordinates", [{ x: a.left, y: a.bottom }, { x: a.right, y: a.top }], b); this.srsName && b.setAttribute("srsName", this.srsName); return b }
    }, OpenLayers.Format.GML.Base.prototype.writers.gml), feature: OpenLayers.Format.GML.Base.prototype.writers.feature, wfs: OpenLayers.Format.GML.Base.prototype.writers.wfs
  },
  CLASS_NAME: "OpenLayers.Format.GML.v2"
}); OpenLayers.Format.Filter.v1_0_0 = OpenLayers.Class(OpenLayers.Format.GML.v2, OpenLayers.Format.Filter.v1, {
  VERSION: "1.0.0", schemaLocation: "http://www.opengis.net/ogc/filter/1.0.0/filter.xsd", initialize: function (a) { OpenLayers.Format.GML.v2.prototype.initialize.apply(this, [a]) }, readers: {
    ogc: OpenLayers.Util.applyDefaults({
      PropertyIsEqualTo: function (a, b) { var c = new OpenLayers.Filter.Comparison({ type: OpenLayers.Filter.Comparison.EQUAL_TO }); this.readChildNodes(a, c); b.filters.push(c) }, PropertyIsNotEqualTo: function (a,
        b) { var c = new OpenLayers.Filter.Comparison({ type: OpenLayers.Filter.Comparison.NOT_EQUAL_TO }); this.readChildNodes(a, c); b.filters.push(c) }, PropertyIsLike: function (a, b) { var c = new OpenLayers.Filter.Comparison({ type: OpenLayers.Filter.Comparison.LIKE }); this.readChildNodes(a, c); var d = a.getAttribute("wildCard"), e = a.getAttribute("singleChar"), f = a.getAttribute("escape"); c.value2regex(d, e, f); b.filters.push(c) }
    }, OpenLayers.Format.Filter.v1.prototype.readers.ogc), gml: OpenLayers.Format.GML.v2.prototype.readers.gml,
    feature: OpenLayers.Format.GML.v2.prototype.readers.feature
  }, writers: {
    ogc: OpenLayers.Util.applyDefaults({
      PropertyIsEqualTo: function (a) { var b = this.createElementNSPlus("ogc:PropertyIsEqualTo"); this.writeNode("PropertyName", a, b); this.writeOgcExpression(a.value, b); return b }, PropertyIsNotEqualTo: function (a) { var b = this.createElementNSPlus("ogc:PropertyIsNotEqualTo"); this.writeNode("PropertyName", a, b); this.writeOgcExpression(a.value, b); return b }, PropertyIsLike: function (a) {
        var b = this.createElementNSPlus("ogc:PropertyIsLike",
          { attributes: { wildCard: "*", singleChar: ".", escape: "!" } }); this.writeNode("PropertyName", a, b); this.writeNode("Literal", a.regex2value(), b); return b
      }, BBOX: function (a) { var b = this.createElementNSPlus("ogc:BBOX"); a.property && this.writeNode("PropertyName", a, b); var c = this.writeNode("gml:Box", a.value, b); a.projection && c.setAttribute("srsName", a.projection); return b }
    }, OpenLayers.Format.Filter.v1.prototype.writers.ogc), gml: OpenLayers.Format.GML.v2.prototype.writers.gml, feature: OpenLayers.Format.GML.v2.prototype.writers.feature
  },
  writeSpatial: function (a, b) { var c = this.createElementNSPlus("ogc:" + b); this.writeNode("PropertyName", a, c); if (a.value instanceof OpenLayers.Filter.Function) this.writeNode("Function", a.value, c); else { var d; d = a.value instanceof OpenLayers.Geometry ? this.writeNode("feature:_geometry", a.value).firstChild : this.writeNode("gml:Box", a.value); a.projection && d.setAttribute("srsName", a.projection); c.appendChild(d) } return c }, CLASS_NAME: "OpenLayers.Format.Filter.v1_0_0"
}); OpenLayers.Format.WFST.v1_0_0 = OpenLayers.Class(OpenLayers.Format.Filter.v1_0_0, OpenLayers.Format.WFST.v1, {
  version: "1.0.0", srsNameInQuery: !1, schemaLocations: { wfs: "http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd" }, initialize: function (a) { OpenLayers.Format.Filter.v1_0_0.prototype.initialize.apply(this, [a]); OpenLayers.Format.WFST.v1.prototype.initialize.apply(this, [a]) }, readNode: function (a, b, c) { return OpenLayers.Format.GML.v2.prototype.readNode.apply(this, arguments) }, readers: {
    wfs: OpenLayers.Util.applyDefaults({
      WFS_TransactionResponse: function (a,
        b) { b.insertIds = []; b.success = !1; this.readChildNodes(a, b) }, InsertResult: function (a, b) { var c = { fids: [] }; this.readChildNodes(a, c); b.insertIds = b.insertIds.concat(c.fids) }, TransactionResult: function (a, b) { this.readChildNodes(a, b) }, Status: function (a, b) { this.readChildNodes(a, b) }, SUCCESS: function (a, b) { b.success = !0 }
    }, OpenLayers.Format.WFST.v1.prototype.readers.wfs), gml: OpenLayers.Format.GML.v2.prototype.readers.gml, feature: OpenLayers.Format.GML.v2.prototype.readers.feature, ogc: OpenLayers.Format.Filter.v1_0_0.prototype.readers.ogc
  },
  writers: {
    wfs: OpenLayers.Util.applyDefaults({
      Query: function (a) {
        a = OpenLayers.Util.extend({ featureNS: this.featureNS, featurePrefix: this.featurePrefix, featureType: this.featureType, srsName: this.srsName, srsNameInQuery: this.srsNameInQuery }, a); var b = a.featurePrefix, c = this.createElementNSPlus("wfs:Query", { attributes: { typeName: (b ? b + ":" : "") + a.featureType } }); a.srsNameInQuery && a.srsName && c.setAttribute("srsName", a.srsName); a.featureNS && c.setAttribute("xmlns:" + b, a.featureNS); if (a.propertyNames) for (var b = 0, d = a.propertyNames.length; b <
          d; b++)this.writeNode("ogc:PropertyName", { property: a.propertyNames[b] }, c); a.filter && (this.setFilterProperty(a.filter), this.writeNode("ogc:Filter", a.filter, c)); return c
      }
    }, OpenLayers.Format.WFST.v1.prototype.writers.wfs), gml: OpenLayers.Format.GML.v2.prototype.writers.gml, feature: OpenLayers.Format.GML.v2.prototype.writers.feature, ogc: OpenLayers.Format.Filter.v1_0_0.prototype.writers.ogc
  }, CLASS_NAME: "OpenLayers.Format.WFST.v1_0_0"
}); OpenLayers.ElementsIndexer = OpenLayers.Class({
  maxZIndex: null, order: null, indices: null, compare: null, initialize: function (a) { this.compare = a ? OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER_Y_ORDER : OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER_DRAWING_ORDER; this.clear() }, insert: function (a) {
    this.exists(a) && this.remove(a); var b = a.id; this.determineZIndex(a); for (var c = -1, d = this.order.length, e; 1 < d - c;)e = parseInt((c + d) / 2), 0 < this.compare(this, a, OpenLayers.Util.getElement(this.order[e])) ? c = e : d = e; this.order.splice(d,
      0, b); this.indices[b] = this.getZIndex(a); return this.getNextElement(d)
  }, remove: function (a) { a = a.id; var b = OpenLayers.Util.indexOf(this.order, a); 0 <= b && (this.order.splice(b, 1), delete this.indices[a], this.maxZIndex = 0 < this.order.length ? this.indices[this.order[this.order.length - 1]] : 0) }, clear: function () { this.order = []; this.indices = {}; this.maxZIndex = 0 }, exists: function (a) { return null != this.indices[a.id] }, getZIndex: function (a) { return a._style.graphicZIndex }, determineZIndex: function (a) {
    var b = a._style.graphicZIndex;
    null == b ? (b = this.maxZIndex, a._style.graphicZIndex = b) : b > this.maxZIndex && (this.maxZIndex = b)
  }, getNextElement: function (a) { a += 1; if (a < this.order.length) { var b = OpenLayers.Util.getElement(this.order[a]); void 0 == b && (b = this.getNextElement(a)); return b } return null }, CLASS_NAME: "OpenLayers.ElementsIndexer"
});
OpenLayers.ElementsIndexer.IndexingMethods = { Z_ORDER: function (a, b, c) { b = a.getZIndex(b); var d = 0; c && (a = a.getZIndex(c), d = b - a); return d }, Z_ORDER_DRAWING_ORDER: function (a, b, c) { a = OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER(a, b, c); c && 0 == a && (a = 1); return a }, Z_ORDER_Y_ORDER: function (a, b, c) { a = OpenLayers.ElementsIndexer.IndexingMethods.Z_ORDER(a, b, c); c && 0 === a && (b = c._boundsBottom - b._boundsBottom, a = 0 === b ? 1 : b); return a } };
OpenLayers.Renderer.Elements = OpenLayers.Class(OpenLayers.Renderer, {
  rendererRoot: null, root: null, vectorRoot: null, textRoot: null, xmlns: null, xOffset: 0, indexer: null, BACKGROUND_ID_SUFFIX: "_background", LABEL_ID_SUFFIX: "_label", LABEL_OUTLINE_SUFFIX: "_outline", initialize: function (a, b) {
    OpenLayers.Renderer.prototype.initialize.apply(this, arguments); this.rendererRoot = this.createRenderRoot(); this.root = this.createRoot("_root"); this.vectorRoot = this.createRoot("_vroot"); this.textRoot = this.createRoot("_troot"); this.root.appendChild(this.vectorRoot);
    this.root.appendChild(this.textRoot); this.rendererRoot.appendChild(this.root); this.container.appendChild(this.rendererRoot); b && (b.zIndexing || b.yOrdering) && (this.indexer = new OpenLayers.ElementsIndexer(b.yOrdering))
  }, destroy: function () { this.clear(); this.xmlns = this.root = this.rendererRoot = null; OpenLayers.Renderer.prototype.destroy.apply(this, arguments) }, clear: function () {
    var a, b = this.vectorRoot; if (b) for (; a = b.firstChild;)b.removeChild(a); if (b = this.textRoot) for (; a = b.firstChild;)b.removeChild(a); this.indexer &&
      this.indexer.clear()
  }, setExtent: function (a, b) { var c = OpenLayers.Renderer.prototype.setExtent.apply(this, arguments), d = this.getResolution(); if (this.map.baseLayer && this.map.baseLayer.wrapDateLine) { var e, f = a.getWidth() / this.map.getExtent().getWidth(); a = a.scale(1 / f); f = this.map.getMaxExtent(); f.right > a.left && f.right < a.right ? e = !0 : f.left > a.left && f.left < a.right && (e = !1); if (e !== this.rightOfDateLine || b) c = !1, this.xOffset = !0 === e ? f.getWidth() / d : 0; this.rightOfDateLine = e } return c }, getNodeType: function (a, b) { }, drawGeometry: function (a,
    b, c) {
      var d = a.CLASS_NAME, e = !0; if ("OpenLayers.Geometry.Collection" == d || "OpenLayers.Geometry.MultiPoint" == d || "OpenLayers.Geometry.MultiLineString" == d || "OpenLayers.Geometry.MultiPolygon" == d) { for (var d = 0, f = a.components.length; d < f; d++)e = this.drawGeometry(a.components[d], b, c) && e; return e } d = e = !1; "none" != b.display && (b.backgroundGraphic ? this.redrawBackgroundNode(a.id, a, b, c) : d = !0, e = this.redrawNode(a.id, a, b, c)); !1 == e && (b = document.getElementById(a.id)) && (b._style.backgroundGraphic && (d = !0), b.parentNode.removeChild(b));
    d && (b = document.getElementById(a.id + this.BACKGROUND_ID_SUFFIX)) && b.parentNode.removeChild(b); return e
  }, redrawNode: function (a, b, c, d) {
    c = this.applyDefaultSymbolizer(c); a = this.nodeFactory(a, this.getNodeType(b, c)); a._featureId = d; a._boundsBottom = b.getBounds().bottom; a._geometryClass = b.CLASS_NAME; a._style = c; b = this.drawGeometryNode(a, b, c); if (!1 === b) return !1; a = b.node; this.indexer ? (c = this.indexer.insert(a)) ? this.vectorRoot.insertBefore(a, c) : this.vectorRoot.appendChild(a) : a.parentNode !== this.vectorRoot && this.vectorRoot.appendChild(a);
    this.postDraw(a); return b.complete
  }, redrawBackgroundNode: function (a, b, c, d) {
    c = OpenLayers.Util.extend({}, c); c.externalGraphic = c.backgroundGraphic; c.graphicXOffset = c.backgroundXOffset; c.graphicYOffset = c.backgroundYOffset; c.graphicZIndex = c.backgroundGraphicZIndex; c.graphicWidth = c.backgroundWidth || c.graphicWidth; c.graphicHeight = c.backgroundHeight || c.graphicHeight; c.backgroundGraphic = null; c.backgroundXOffset = null; c.backgroundYOffset = null; c.backgroundGraphicZIndex = null; return this.redrawNode(a + this.BACKGROUND_ID_SUFFIX,
      b, c, null)
  }, drawGeometryNode: function (a, b, c) {
    c = c || a._style; var d = { isFilled: void 0 === c.fill ? !0 : c.fill, isStroked: void 0 === c.stroke ? !!c.strokeWidth : c.stroke }, e; switch (b.CLASS_NAME) {
      case "OpenLayers.Geometry.Point": !1 === c.graphic && (d.isFilled = !1, d.isStroked = !1); e = this.drawPoint(a, b); break; case "OpenLayers.Geometry.LineString": d.isFilled = !1; e = this.drawLineString(a, b); break; case "OpenLayers.Geometry.LinearRing": e = this.drawLinearRing(a, b); break; case "OpenLayers.Geometry.Polygon": e = this.drawPolygon(a, b); break;
      case "OpenLayers.Geometry.Rectangle": e = this.drawRectangle(a, b)
    }a._options = d; return !1 != e ? { node: this.setStyle(a, c, d, b), complete: e } : !1
  }, postDraw: function (a) { }, drawPoint: function (a, b) { }, drawLineString: function (a, b) { }, drawLinearRing: function (a, b) { }, drawPolygon: function (a, b) { }, drawRectangle: function (a, b) { }, drawCircle: function (a, b) { }, removeText: function (a) { var b = document.getElementById(a + this.LABEL_ID_SUFFIX); b && this.textRoot.removeChild(b); (a = document.getElementById(a + this.LABEL_OUTLINE_SUFFIX)) && this.textRoot.removeChild(a) },
  getFeatureIdFromEvent: function (a) { var b = a.target, c = b && b.correspondingUseElement; return (c ? c : b || a.srcElement)._featureId }, eraseGeometry: function (a, b) {
    if ("OpenLayers.Geometry.MultiPoint" == a.CLASS_NAME || "OpenLayers.Geometry.MultiLineString" == a.CLASS_NAME || "OpenLayers.Geometry.MultiPolygon" == a.CLASS_NAME || "OpenLayers.Geometry.Collection" == a.CLASS_NAME) for (var c = 0, d = a.components.length; c < d; c++)this.eraseGeometry(a.components[c], b); else (c = OpenLayers.Util.getElement(a.id)) && c.parentNode && (c.geometry && (c.geometry.destroy(),
      c.geometry = null), c.parentNode.removeChild(c), this.indexer && this.indexer.remove(c), c._style.backgroundGraphic && (c = OpenLayers.Util.getElement(a.id + this.BACKGROUND_ID_SUFFIX)) && c.parentNode && c.parentNode.removeChild(c))
  }, nodeFactory: function (a, b) { var c = OpenLayers.Util.getElement(a); c ? this.nodeTypeCompare(c, b) || (c.parentNode.removeChild(c), c = this.nodeFactory(a, b)) : c = this.createNode(b, a); return c }, nodeTypeCompare: function (a, b) { }, createNode: function (a, b) { }, moveRoot: function (a) {
    var b = this.root; a.root.parentNode ==
      this.rendererRoot && (b = a.root); b.parentNode.removeChild(b); a.rendererRoot.appendChild(b)
  }, getRenderLayerId: function () { return this.root.parentNode.parentNode.id }, isComplexSymbol: function (a) { return "circle" != a && !!a }, CLASS_NAME: "OpenLayers.Renderer.Elements"
}); OpenLayers.Control.ArgParser = OpenLayers.Class(OpenLayers.Control, {
  center: null, zoom: null, layers: null, displayProjection: null, getParameters: function (a) { a = a || window.location.href; var b = OpenLayers.Util.getParameters(a), c = a.indexOf("#"); 0 < c && (a = "?" + a.substring(c + 1, a.length), OpenLayers.Util.extend(b, OpenLayers.Util.getParameters(a))); return b }, setMap: function (a) {
    OpenLayers.Control.prototype.setMap.apply(this, arguments); for (var b = 0, c = this.map.controls.length; b < c; b++) {
      var d = this.map.controls[b]; if (d != this &&
        "OpenLayers.Control.ArgParser" == d.CLASS_NAME) { d.displayProjection != this.displayProjection && (this.displayProjection = d.displayProjection); break }
    } b == this.map.controls.length && (b = this.getParameters(), b.layers && (this.layers = b.layers, this.map.events.register("addlayer", this, this.configureLayers), this.configureLayers()), b.lat && b.lon && (this.center = new OpenLayers.LonLat(parseFloat(b.lon), parseFloat(b.lat)), b.zoom && (this.zoom = parseFloat(b.zoom)), this.map.events.register("changebaselayer", this, this.setCenter),
      this.setCenter()))
  }, setCenter: function () { this.map.baseLayer && (this.map.events.unregister("changebaselayer", this, this.setCenter), this.displayProjection && this.center.transform(this.displayProjection, this.map.getProjectionObject()), this.map.setCenter(this.center, this.zoom)) }, configureLayers: function () {
    if (this.layers.length == this.map.layers.length) {
      this.map.events.unregister("addlayer", this, this.configureLayers); for (var a = 0, b = this.layers.length; a < b; a++) {
        var c = this.map.layers[a], d = this.layers.charAt(a);
        "B" == d ? this.map.setBaseLayer(c) : "T" != d && "F" != d || c.setVisibility("T" == d)
      }
    }
  }, CLASS_NAME: "OpenLayers.Control.ArgParser"
}); OpenLayers.Control.Permalink = OpenLayers.Class(OpenLayers.Control, {
  argParserClass: OpenLayers.Control.ArgParser, element: null, anchor: !1, base: "", displayProjection: null, initialize: function (a, b, c) {
  null === a || "object" != typeof a || OpenLayers.Util.isElement(a) ? (OpenLayers.Control.prototype.initialize.apply(this, [c]), this.element = OpenLayers.Util.getElement(a), this.base = b || document.location.href) : (this.base = document.location.href, OpenLayers.Control.prototype.initialize.apply(this, [a]), null != this.element && (this.element =
    OpenLayers.Util.getElement(this.element)))
  }, destroy: function () { this.element && this.element.parentNode == this.div && (this.div.removeChild(this.element), this.element = null); this.map && this.map.events.unregister("moveend", this, this.updateLink); OpenLayers.Control.prototype.destroy.apply(this, arguments) }, setMap: function (a) {
    OpenLayers.Control.prototype.setMap.apply(this, arguments); for (var b = 0, c = this.map.controls.length; b < c; b++) {
      var d = this.map.controls[b]; if (d.CLASS_NAME == this.argParserClass.CLASS_NAME) {
      d.displayProjection !=
        this.displayProjection && (this.displayProjection = d.displayProjection); break
      }
    } b == this.map.controls.length && this.map.addControl(new this.argParserClass({ displayProjection: this.displayProjection }))
  }, draw: function () {
    OpenLayers.Control.prototype.draw.apply(this, arguments); this.element || this.anchor || (this.element = document.createElement("a"), this.element.innerHTML = OpenLayers.i18n("Permalink"), this.element.href = "", this.div.appendChild(this.element)); this.map.events.on({
      moveend: this.updateLink, changelayer: this.updateLink,
      changebaselayer: this.updateLink, scope: this
    }); this.updateLink(); return this.div
  }, updateLink: function () { var a = this.anchor ? "#" : "?", b = this.base, c = null; -1 != b.indexOf("#") && !1 == this.anchor && (c = b.substring(b.indexOf("#"), b.length)); -1 != b.indexOf(a) && (b = b.substring(0, b.indexOf(a))); b = b.split("#")[0] + a + OpenLayers.Util.getParameterString(this.createParams()); c && (b += c); this.anchor && !this.element ? window.location.href = b : this.element.href = b }, createParams: function (a, b, c) {
    a = a || this.map.getCenter(); var d = OpenLayers.Util.getParameters(this.base);
    if (a) for (d.zoom = b || this.map.getZoom(), b = a.lat, a = a.lon, this.displayProjection && (b = OpenLayers.Projection.transform({ x: a, y: b }, this.map.getProjectionObject(), this.displayProjection), a = b.x, b = b.y), d.lat = Math.round(1E5 * b) / 1E5, d.lon = Math.round(1E5 * a) / 1E5, c = c || this.map.layers, d.layers = "", a = 0, b = c.length; a < b; a++) { var e = c[a]; d.layers = e.isBaseLayer ? d.layers + (e == this.map.baseLayer ? "B" : "0") : d.layers + (e.getVisibility() ? "T" : "F") } return d
  }, CLASS_NAME: "OpenLayers.Control.Permalink"
}); OpenLayers.Layer.TMS = OpenLayers.Class(OpenLayers.Layer.Grid, {
  serviceVersion: "1.0.0", layername: null, type: null, isBaseLayer: !0, tileOrigin: null, serverResolutions: null, zoomOffset: 0, initialize: function (a, b, c) { var d = []; d.push(a, b, {}, c); OpenLayers.Layer.Grid.prototype.initialize.apply(this, d) }, clone: function (a) { null == a && (a = new OpenLayers.Layer.TMS(this.name, this.url, this.getOptions())); return a = OpenLayers.Layer.Grid.prototype.clone.apply(this, [a]) }, getURL: function (a) {
    a = this.adjustBounds(a); var b = this.getServerResolution(),
      c = Math.round((a.left - this.tileOrigin.lon) / (b * this.tileSize.w)); a = Math.round((a.bottom - this.tileOrigin.lat) / (b * this.tileSize.h)); b = this.getServerZoom(); c = this.serviceVersion + "/" + this.layername + "/" + b + "/" + c + "/" + a + "." + this.type; a = this.url; OpenLayers.Util.isArray(a) && (a = this.selectUrl(c, a)); return a + c
  }, setMap: function (a) { OpenLayers.Layer.Grid.prototype.setMap.apply(this, arguments); this.tileOrigin || (this.tileOrigin = new OpenLayers.LonLat(this.map.maxExtent.left, this.map.maxExtent.bottom)) }, CLASS_NAME: "OpenLayers.Layer.TMS"
}); OpenLayers.Format.WCSCapabilities = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, { defaultVersion: "1.1.0", CLASS_NAME: "OpenLayers.Format.WCSCapabilities" }); OpenLayers.Format.WCSCapabilities.v1 = OpenLayers.Class(OpenLayers.Format.XML, { regExes: { trimSpace: /^\s*|\s*$/g, splitSpace: /\s+/ }, defaultPrefix: "wcs", read: function (a) { "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); a && 9 == a.nodeType && (a = a.documentElement); var b = {}; this.readNode(a, b); return b }, CLASS_NAME: "OpenLayers.Format.WCSCapabilities.v1" }); OpenLayers.Format.WCSCapabilities.v1_0_0 = OpenLayers.Class(OpenLayers.Format.WCSCapabilities.v1, {
  namespaces: { wcs: "http://www.opengis.net/wcs", xlink: "http://www.w3.org/1999/xlink", xsi: "http://www.w3.org/2001/XMLSchema-instance", ows: "http://www.opengis.net/ows" }, errorProperty: "service", readers: {
    wcs: {
      WCS_Capabilities: function (a, b) { this.readChildNodes(a, b) }, Service: function (a, b) { b.service = {}; this.readChildNodes(a, b.service) }, name: function (a, b) { b.name = this.getChildValue(a) }, label: function (a, b) {
      b.label =
        this.getChildValue(a)
      }, keywords: function (a, b) { b.keywords = []; this.readChildNodes(a, b.keywords) }, keyword: function (a, b) { b.push(this.getChildValue(a)) }, responsibleParty: function (a, b) { b.responsibleParty = {}; this.readChildNodes(a, b.responsibleParty) }, individualName: function (a, b) { b.individualName = this.getChildValue(a) }, organisationName: function (a, b) { b.organisationName = this.getChildValue(a) }, positionName: function (a, b) { b.positionName = this.getChildValue(a) }, contactInfo: function (a, b) {
      b.contactInfo = {}; this.readChildNodes(a,
        b.contactInfo)
      }, phone: function (a, b) { b.phone = {}; this.readChildNodes(a, b.phone) }, voice: function (a, b) { b.voice = this.getChildValue(a) }, facsimile: function (a, b) { b.facsimile = this.getChildValue(a) }, address: function (a, b) { b.address = {}; this.readChildNodes(a, b.address) }, deliveryPoint: function (a, b) { b.deliveryPoint = this.getChildValue(a) }, city: function (a, b) { b.city = this.getChildValue(a) }, postalCode: function (a, b) { b.postalCode = this.getChildValue(a) }, country: function (a, b) { b.country = this.getChildValue(a) }, electronicMailAddress: function (a,
        b) { b.electronicMailAddress = this.getChildValue(a) }, fees: function (a, b) { b.fees = this.getChildValue(a) }, accessConstraints: function (a, b) { b.accessConstraints = this.getChildValue(a) }, ContentMetadata: function (a, b) { b.contentMetadata = []; this.readChildNodes(a, b.contentMetadata) }, CoverageOfferingBrief: function (a, b) { var c = {}; this.readChildNodes(a, c); b.push(c) }, name: function (a, b) { b.name = this.getChildValue(a) }, label: function (a, b) { b.label = this.getChildValue(a) }, lonLatEnvelope: function (a, b) {
          var c = this.getElementsByTagNameNS(a,
            "http://www.opengis.net/gml", "pos"); if (2 == c.length) { var d = {}, e = {}; OpenLayers.Format.GML.v3.prototype.readers.gml.pos.apply(this, [c[0], d]); OpenLayers.Format.GML.v3.prototype.readers.gml.pos.apply(this, [c[1], e]); b.lonLatEnvelope = {}; b.lonLatEnvelope.srsName = a.getAttribute("srsName"); b.lonLatEnvelope.min = d.points[0]; b.lonLatEnvelope.max = e.points[0] }
        }
    }
  }, CLASS_NAME: "OpenLayers.Format.WCSCapabilities.v1_0_0"
}); OpenLayers.Strategy.Fixed = OpenLayers.Class(OpenLayers.Strategy, {
  preload: !1, activate: function () { var a = OpenLayers.Strategy.prototype.activate.apply(this, arguments); if (a) if (this.layer.events.on({ refresh: this.load, scope: this }), !0 == this.layer.visibility || this.preload) this.load(); else this.layer.events.on({ visibilitychanged: this.load, scope: this }); return a }, deactivate: function () {
    var a = OpenLayers.Strategy.prototype.deactivate.call(this); a && this.layer.events.un({
      refresh: this.load, visibilitychanged: this.load,
      scope: this
    }); return a
  }, load: function (a) { var b = this.layer; b.events.triggerEvent("loadstart", { filter: b.filter }); b.protocol.read(OpenLayers.Util.applyDefaults({ callback: this.merge, filter: b.filter, scope: this }, a)); b.events.un({ visibilitychanged: this.load, scope: this }) }, merge: function (a) {
    var b = this.layer; b.destroyFeatures(); var c = a.features; if (c && 0 < c.length) { var d = b.projection, e = b.map.getProjectionObject(); if (!e.equals(d)) for (var f, g = 0, h = c.length; g < h; ++g)(f = c[g].geometry) && f.transform(d, e); b.addFeatures(c) } b.events.triggerEvent("loadend",
      { response: a })
  }, CLASS_NAME: "OpenLayers.Strategy.Fixed"
}); OpenLayers.Control.Zoom = OpenLayers.Class(OpenLayers.Control, {
  zoomInText: "+", zoomInId: "olZoomInLink", zoomOutText: "\u2212", zoomOutId: "olZoomOutLink", draw: function () { var a = OpenLayers.Control.prototype.draw.apply(this), b = this.getOrCreateLinks(a), c = b.zoomIn, b = b.zoomOut, d = this.map.events; b.parentNode !== a && (d = this.events, d.attachToElement(b.parentNode)); d.register("buttonclick", this, this.onZoomClick); this.zoomInLink = c; this.zoomOutLink = b; return a }, getOrCreateLinks: function (a) {
    var b = document.getElementById(this.zoomInId),
    c = document.getElementById(this.zoomOutId); b || (b = document.createElement("a"), b.href = "#zoomIn", b.appendChild(document.createTextNode(this.zoomInText)), b.className = "olControlZoomIn", a.appendChild(b)); OpenLayers.Element.addClass(b, "olButton"); c || (c = document.createElement("a"), c.href = "#zoomOut", c.appendChild(document.createTextNode(this.zoomOutText)), c.className = "olControlZoomOut", a.appendChild(c)); OpenLayers.Element.addClass(c, "olButton"); return { zoomIn: b, zoomOut: c }
  }, onZoomClick: function (a) {
    a = a.buttonElement;
    a === this.zoomInLink ? this.map.zoomIn() : a === this.zoomOutLink && this.map.zoomOut()
  }, destroy: function () { this.map && this.map.events.unregister("buttonclick", this, this.onZoomClick); delete this.zoomInLink; delete this.zoomOutLink; OpenLayers.Control.prototype.destroy.apply(this) }, CLASS_NAME: "OpenLayers.Control.Zoom"
}); OpenLayers.Layer.PointTrack = OpenLayers.Class(OpenLayers.Layer.Vector, {
  dataFrom: null, styleFrom: null, addNodes: function (a, b) {
    if (2 > a.length) throw Error("At least two point features have to be added to create a line from"); for (var c = Array(a.length - 1), d, e, f, g = 0, h = a.length; g < h; g++) {
      d = a[g]; f = d.geometry; if (!f) f = d.lonlat, f = new OpenLayers.Geometry.Point(f.lon, f.lat); else if ("OpenLayers.Geometry.Point" != f.CLASS_NAME) throw new TypeError("Only features with point geometries are supported."); if (0 < g) {
        d = null != this.dataFrom ?
          a[g + this.dataFrom].data || a[g + this.dataFrom].attributes : null; var k = null != this.styleFrom ? a[g + this.styleFrom].style : null; e = new OpenLayers.Geometry.LineString([e, f]); c[g - 1] = new OpenLayers.Feature.Vector(e, d, k)
      } e = f
    } this.addFeatures(c, b)
  }, CLASS_NAME: "OpenLayers.Layer.PointTrack"
}); OpenLayers.Layer.PointTrack.SOURCE_NODE = -1; OpenLayers.Layer.PointTrack.TARGET_NODE = 0; OpenLayers.Layer.PointTrack.dataFrom = { SOURCE_NODE: -1, TARGET_NODE: 0 }; OpenLayers.Protocol.WFS = function (a) { a = OpenLayers.Util.applyDefaults(a, OpenLayers.Protocol.WFS.DEFAULTS); var b = OpenLayers.Protocol.WFS["v" + a.version.replace(/\./g, "_")]; if (!b) throw "Unsupported WFS version: " + a.version; return new b(a) };
OpenLayers.Protocol.WFS.fromWMSLayer = function (a, b) { var c, d; c = a.params.LAYERS; c = (OpenLayers.Util.isArray(c) ? c[0] : c).split(":"); 1 < c.length && (d = c[0]); c = c.pop(); d = { url: a.url, featureType: c, featurePrefix: d, srsName: a.projection && a.projection.getCode() || a.map && a.map.getProjectionObject().getCode(), version: "1.1.0" }; return new OpenLayers.Protocol.WFS(OpenLayers.Util.applyDefaults(b, d)) }; OpenLayers.Protocol.WFS.DEFAULTS = { version: "1.0.0" }; OpenLayers.Layer.Markers = OpenLayers.Class(OpenLayers.Layer, {
  isBaseLayer: !1, markers: null, drawn: !1, initialize: function (a, b) { OpenLayers.Layer.prototype.initialize.apply(this, arguments); this.markers = [] }, destroy: function () { this.clearMarkers(); this.markers = null; OpenLayers.Layer.prototype.destroy.apply(this, arguments) }, setOpacity: function (a) { if (a != this.opacity) { this.opacity = a; a = 0; for (var b = this.markers.length; a < b; a++)this.markers[a].setOpacity(this.opacity) } }, moveTo: function (a, b, c) {
    OpenLayers.Layer.prototype.moveTo.apply(this,
      arguments); if (b || !this.drawn) { for (var d = 0, e = this.markers.length; d < e; d++)this.drawMarker(this.markers[d]); this.drawn = !0 }
  }, addMarker: function (a) { this.markers.push(a); 1 > this.opacity && a.setOpacity(this.opacity); this.map && this.map.getExtent() && (a.map = this.map, this.drawMarker(a)) }, removeMarker: function (a) { this.markers && this.markers.length && (OpenLayers.Util.removeItem(this.markers, a), a.erase()) }, clearMarkers: function () { if (null != this.markers) for (; 0 < this.markers.length;)this.removeMarker(this.markers[0]) },
  drawMarker: function (a) { var b = this.map.getLayerPxFromLonLat(a.lonlat); null == b ? a.display(!1) : a.isDrawn() ? a.icon && a.icon.moveTo(b) : (a = a.draw(b), this.div.appendChild(a)) }, getDataExtent: function () { var a = null; if (this.markers && 0 < this.markers.length) for (var a = new OpenLayers.Bounds, b = 0, c = this.markers.length; b < c; b++)a.extend(this.markers[b].lonlat); return a }, CLASS_NAME: "OpenLayers.Layer.Markers"
}); OpenLayers.Control.Pan = OpenLayers.Class(OpenLayers.Control.Button, {
  slideFactor: 50, slideRatio: null, direction: null, initialize: function (a, b) { this.direction = a; this.CLASS_NAME += this.direction; OpenLayers.Control.prototype.initialize.apply(this, [b]) }, trigger: function () {
    if (this.map) {
      var a = OpenLayers.Function.bind(function (a) { return this.slideRatio ? this.map.getSize()[a] * this.slideRatio : this.slideFactor }, this); switch (this.direction) {
        case OpenLayers.Control.Pan.NORTH: this.map.pan(0, -a("h")); break; case OpenLayers.Control.Pan.SOUTH: this.map.pan(0,
          a("h")); break; case OpenLayers.Control.Pan.WEST: this.map.pan(-a("w"), 0); break; case OpenLayers.Control.Pan.EAST: this.map.pan(a("w"), 0)
      }
    }
  }, CLASS_NAME: "OpenLayers.Control.Pan"
}); OpenLayers.Control.Pan.NORTH = "North"; OpenLayers.Control.Pan.SOUTH = "South"; OpenLayers.Control.Pan.EAST = "East"; OpenLayers.Control.Pan.WEST = "West"; OpenLayers.Format.CSWGetDomain = function (a) { a = OpenLayers.Util.applyDefaults(a, OpenLayers.Format.CSWGetDomain.DEFAULTS); var b = OpenLayers.Format.CSWGetDomain["v" + a.version.replace(/\./g, "_")]; if (!b) throw "Unsupported CSWGetDomain version: " + a.version; return new b(a) }; OpenLayers.Format.CSWGetDomain.DEFAULTS = { version: "2.0.2" }; OpenLayers.Format.CSWGetDomain.v2_0_2 = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { xlink: "http://www.w3.org/1999/xlink", xsi: "http://www.w3.org/2001/XMLSchema-instance", csw: "http://www.opengis.net/cat/csw/2.0.2" }, defaultPrefix: "csw", version: "2.0.2", schemaLocation: "http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd", PropertyName: null, ParameterName: null, read: function (a) {
  "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); a && 9 ==
    a.nodeType && (a = a.documentElement); var b = {}; this.readNode(a, b); return b
  }, readers: {
    csw: {
      GetDomainResponse: function (a, b) { this.readChildNodes(a, b) }, DomainValues: function (a, b) { OpenLayers.Util.isArray(b.DomainValues) || (b.DomainValues = []); for (var c = a.attributes, d = {}, e = 0, f = c.length; e < f; ++e)d[c[e].name] = c[e].nodeValue; this.readChildNodes(a, d); b.DomainValues.push(d) }, PropertyName: function (a, b) { b.PropertyName = this.getChildValue(a) }, ParameterName: function (a, b) { b.ParameterName = this.getChildValue(a) }, ListOfValues: function (a,
        b) { OpenLayers.Util.isArray(b.ListOfValues) || (b.ListOfValues = []); this.readChildNodes(a, b.ListOfValues) }, Value: function (a, b) { for (var c = a.attributes, d = {}, e = 0, f = c.length; e < f; ++e)d[c[e].name] = c[e].nodeValue; d.value = this.getChildValue(a); b.push({ Value: d }) }, ConceptualScheme: function (a, b) { b.ConceptualScheme = {}; this.readChildNodes(a, b.ConceptualScheme) }, Name: function (a, b) { b.Name = this.getChildValue(a) }, Document: function (a, b) { b.Document = this.getChildValue(a) }, Authority: function (a, b) { b.Authority = this.getChildValue(a) },
      RangeOfValues: function (a, b) { b.RangeOfValues = {}; this.readChildNodes(a, b.RangeOfValues) }, MinValue: function (a, b) { for (var c = a.attributes, d = {}, e = 0, f = c.length; e < f; ++e)d[c[e].name] = c[e].nodeValue; d.value = this.getChildValue(a); b.MinValue = d }, MaxValue: function (a, b) { for (var c = a.attributes, d = {}, e = 0, f = c.length; e < f; ++e)d[c[e].name] = c[e].nodeValue; d.value = this.getChildValue(a); b.MaxValue = d }
    }
  }, write: function (a) { a = this.writeNode("csw:GetDomain", a); return OpenLayers.Format.XML.prototype.write.apply(this, [a]) }, writers: {
    csw: {
      GetDomain: function (a) {
        var b =
          this.createElementNSPlus("csw:GetDomain", { attributes: { service: "CSW", version: this.version } }); a.PropertyName || this.PropertyName ? this.writeNode("csw:PropertyName", a.PropertyName || this.PropertyName, b) : (a.ParameterName || this.ParameterName) && this.writeNode("csw:ParameterName", a.ParameterName || this.ParameterName, b); this.readChildNodes(b, a); return b
      }, PropertyName: function (a) { return this.createElementNSPlus("csw:PropertyName", { value: a }) }, ParameterName: function (a) {
        return this.createElementNSPlus("csw:ParameterName",
          { value: a })
      }
    }
  }, CLASS_NAME: "OpenLayers.Format.CSWGetDomain.v2_0_2"
}); OpenLayers.Format.ArcXML.Features = OpenLayers.Class(OpenLayers.Format.XML, { read: function (a) { return (new OpenLayers.Format.ArcXML).read(a).features.feature } }); OpenLayers.Control.Snapping = OpenLayers.Class(OpenLayers.Control, {
  DEFAULTS: { tolerance: 10, node: !0, edge: !0, vertex: !0 }, greedy: !0, precedence: ["node", "vertex", "edge"], resolution: null, geoToleranceCache: null, layer: null, feature: null, point: null, initialize: function (a) {
    OpenLayers.Control.prototype.initialize.apply(this, [a]); this.options = a || {}; this.options.layer && this.setLayer(this.options.layer); a = OpenLayers.Util.extend({}, this.options.defaults); this.defaults = OpenLayers.Util.applyDefaults(a, this.DEFAULTS); this.setTargets(this.options.targets);
    0 === this.targets.length && this.layer && this.addTargetLayer(this.layer); this.geoToleranceCache = {}
  }, setLayer: function (a) { this.active ? (this.deactivate(), this.layer = a, this.activate()) : this.layer = a }, setTargets: function (a) { this.targets = []; if (a && a.length) for (var b, c = 0, d = a.length; c < d; ++c)b = a[c], b instanceof OpenLayers.Layer.Vector ? this.addTargetLayer(b) : this.addTarget(b) }, addTargetLayer: function (a) { this.addTarget({ layer: a }) }, addTarget: function (a) {
    a = OpenLayers.Util.applyDefaults(a, this.defaults); a.nodeTolerance =
      a.nodeTolerance || a.tolerance; a.vertexTolerance = a.vertexTolerance || a.tolerance; a.edgeTolerance = a.edgeTolerance || a.tolerance; this.targets.push(a)
  }, removeTargetLayer: function (a) { for (var b, c = this.targets.length - 1; 0 <= c; --c)b = this.targets[c], b.layer === a && this.removeTarget(b) }, removeTarget: function (a) { return OpenLayers.Util.removeItem(this.targets, a) }, activate: function () {
    var a = OpenLayers.Control.prototype.activate.call(this); if (a && this.layer && this.layer.events) this.layer.events.on({
      sketchstarted: this.onSketchModified,
      sketchmodified: this.onSketchModified, vertexmodified: this.onVertexModified, scope: this
    }); return a
  }, deactivate: function () { var a = OpenLayers.Control.prototype.deactivate.call(this); a && this.layer && this.layer.events && this.layer.events.un({ sketchstarted: this.onSketchModified, sketchmodified: this.onSketchModified, vertexmodified: this.onVertexModified, scope: this }); this.point = this.feature = null; return a }, onSketchModified: function (a) { this.feature = a.feature; this.considerSnapping(a.vertex, a.vertex) }, onVertexModified: function (a) {
  this.feature =
    a.feature; var b = this.layer.map.getLonLatFromViewPortPx(a.pixel); this.considerSnapping(a.vertex, new OpenLayers.Geometry.Point(b.lon, b.lat))
  }, considerSnapping: function (a, b) {
    for (var c = { rank: Number.POSITIVE_INFINITY, dist: Number.POSITIVE_INFINITY, x: null, y: null }, d = !1, e, f, g = 0, h = this.targets.length; g < h; ++g)if (f = this.targets[g], e = this.testTarget(f, b)) if (this.greedy) { c = e; c.target = f; d = !0; break } else if (e.rank < c.rank || e.rank === c.rank && e.dist < c.dist) c = e, c.target = f, d = !0; d && (!1 !== this.events.triggerEvent("beforesnap",
      { point: a, x: c.x, y: c.y, distance: c.dist, layer: c.target.layer, snapType: this.precedence[c.rank] }) ? (a.x = c.x, a.y = c.y, this.point = a, this.events.triggerEvent("snap", { point: a, snapType: this.precedence[c.rank], layer: c.target.layer, distance: c.dist })) : d = !1); this.point && !d && (a.x = b.x, a.y = b.y, this.point = null, this.events.triggerEvent("unsnap", { point: a }))
  }, testTarget: function (a, b) {
    var c = this.layer.map.getResolution(); if ("minResolution" in a && c < a.minResolution || "maxResolution" in a && c >= a.maxResolution) return null; for (var c =
      { node: this.getGeoTolerance(a.nodeTolerance, c), vertex: this.getGeoTolerance(a.vertexTolerance, c), edge: this.getGeoTolerance(a.edgeTolerance, c) }, d = Math.max(c.node, c.vertex, c.edge), e = { rank: Number.POSITIVE_INFINITY, dist: Number.POSITIVE_INFINITY }, f = !1, g = a.layer.features, h, k, l, m, n, p, q = this.precedence.length, r = new OpenLayers.LonLat(b.x, b.y), s = 0, t = g.length; s < t; ++s)if (h = g[s], h !== this.feature && (!h._sketch && h.state !== OpenLayers.State.DELETE && (!a.filter || a.filter.evaluate(h))) && h.atPoint(r, d, d)) for (var u = 0, v = Math.min(e.rank +
        1, q); u < v; ++u)if (k = this.precedence[u], a[k]) if ("edge" === k) { if (l = h.geometry.distanceTo(b, { details: !0 }), n = l.distance, n <= c[k] && n < e.dist) { e = { rank: u, dist: n, x: l.x0, y: l.y0 }; f = !0; break } } else { l = h.geometry.getVertices("node" === k); p = !1; for (var w = 0, x = l.length; w < x; ++w)m = l[w], n = m.distanceTo(b), n <= c[k] && (u < e.rank || u === e.rank && n < e.dist) && (e = { rank: u, dist: n, x: m.x, y: m.y }, p = f = !0); if (p) break } return f ? e : null
  }, getGeoTolerance: function (a, b) {
  b !== this.resolution && (this.resolution = b, this.geoToleranceCache = {}); var c = this.geoToleranceCache[a];
    void 0 === c && (c = a * b, this.geoToleranceCache[a] = c); return c
  }, destroy: function () { this.active && this.deactivate(); delete this.layer; delete this.targets; OpenLayers.Control.prototype.destroy.call(this) }, CLASS_NAME: "OpenLayers.Control.Snapping"
}); OpenLayers.Format.OWSCommon.v1_1_0 = OpenLayers.Class(OpenLayers.Format.OWSCommon.v1, {
  namespaces: { ows: "http://www.opengis.net/ows/1.1", xlink: "http://www.w3.org/1999/xlink" }, readers: {
    ows: OpenLayers.Util.applyDefaults({
      ExceptionReport: function (a, b) { b.exceptionReport = { version: a.getAttribute("version"), language: a.getAttribute("xml:lang"), exceptions: [] }; this.readChildNodes(a, b.exceptionReport) }, AllowedValues: function (a, b) { b.allowedValues = {}; this.readChildNodes(a, b.allowedValues) }, AnyValue: function (a, b) {
      b.anyValue =
        !0
      }, DataType: function (a, b) { b.dataType = this.getChildValue(a) }, Range: function (a, b) { b.range = {}; this.readChildNodes(a, b.range) }, MinimumValue: function (a, b) { b.minValue = this.getChildValue(a) }, MaximumValue: function (a, b) { b.maxValue = this.getChildValue(a) }, Identifier: function (a, b) { b.identifier = this.getChildValue(a) }, SupportedCRS: function (a, b) { b.supportedCRS = this.getChildValue(a) }
    }, OpenLayers.Format.OWSCommon.v1.prototype.readers.ows)
  }, writers: {
    ows: OpenLayers.Util.applyDefaults({
      Range: function (a) {
        var b = this.createElementNSPlus("ows:Range",
          { attributes: { "ows:rangeClosure": a.closure } }); this.writeNode("ows:MinimumValue", a.minValue, b); this.writeNode("ows:MaximumValue", a.maxValue, b); return b
      }, MinimumValue: function (a) { return this.createElementNSPlus("ows:MinimumValue", { value: a }) }, MaximumValue: function (a) { return this.createElementNSPlus("ows:MaximumValue", { value: a }) }, Value: function (a) { return this.createElementNSPlus("ows:Value", { value: a }) }
    }, OpenLayers.Format.OWSCommon.v1.prototype.writers.ows)
  }, CLASS_NAME: "OpenLayers.Format.OWSCommon.v1_1_0"
}); OpenLayers.Format.WCSGetCoverage = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { ows: "http://www.opengis.net/ows/1.1", wcs: "http://www.opengis.net/wcs/1.1", xlink: "http://www.w3.org/1999/xlink", xsi: "http://www.w3.org/2001/XMLSchema-instance" }, regExes: { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g }, VERSION: "1.1.2", schemaLocation: "http://www.opengis.net/wcs/1.1 http://schemas.opengis.net/wcs/1.1/wcsGetCoverage.xsd", write: function (a) {
    a = this.writeNode("wcs:GetCoverage",
      a); this.setAttributeNS(a, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation); return OpenLayers.Format.XML.prototype.write.apply(this, [a])
  }, writers: {
    wcs: {
      GetCoverage: function (a) { var b = this.createElementNSPlus("wcs:GetCoverage", { attributes: { version: a.version || this.VERSION, service: "WCS" } }); this.writeNode("ows:Identifier", a.identifier, b); this.writeNode("wcs:DomainSubset", a.domainSubset, b); this.writeNode("wcs:Output", a.output, b); return b }, DomainSubset: function (a) {
        var b = this.createElementNSPlus("wcs:DomainSubset",
          {}); this.writeNode("ows:BoundingBox", a.boundingBox, b); a.temporalSubset && this.writeNode("wcs:TemporalSubset", a.temporalSubset, b); return b
      }, TemporalSubset: function (a) { for (var b = this.createElementNSPlus("wcs:TemporalSubset", {}), c = 0, d = a.timePeriods.length; c < d; ++c)this.writeNode("wcs:TimePeriod", a.timePeriods[c], b); return b }, TimePeriod: function (a) {
        var b = this.createElementNSPlus("wcs:TimePeriod", {}); this.writeNode("wcs:BeginPosition", a.begin, b); this.writeNode("wcs:EndPosition", a.end, b); a.resolution && this.writeNode("wcs:TimeResolution",
          a.resolution, b); return b
      }, BeginPosition: function (a) { return this.createElementNSPlus("wcs:BeginPosition", { value: a }) }, EndPosition: function (a) { return this.createElementNSPlus("wcs:EndPosition", { value: a }) }, TimeResolution: function (a) { return this.createElementNSPlus("wcs:TimeResolution", { value: a }) }, Output: function (a) { var b = this.createElementNSPlus("wcs:Output", { attributes: { format: a.format, store: a.store } }); a.gridCRS && this.writeNode("wcs:GridCRS", a.gridCRS, b); return b }, GridCRS: function (a) {
        var b = this.createElementNSPlus("wcs:GridCRS",
          {}); this.writeNode("wcs:GridBaseCRS", a.baseCRS, b); a.type && this.writeNode("wcs:GridType", a.type, b); a.origin && this.writeNode("wcs:GridOrigin", a.origin, b); this.writeNode("wcs:GridOffsets", a.offsets, b); a.CS && this.writeNode("wcs:GridCS", a.CS, b); return b
      }, GridBaseCRS: function (a) { return this.createElementNSPlus("wcs:GridBaseCRS", { value: a }) }, GridOrigin: function (a) { return this.createElementNSPlus("wcs:GridOrigin", { value: a }) }, GridType: function (a) { return this.createElementNSPlus("wcs:GridType", { value: a }) }, GridOffsets: function (a) {
        return this.createElementNSPlus("wcs:GridOffsets",
          { value: a })
      }, GridCS: function (a) { return this.createElementNSPlus("wcs:GridCS", { value: a }) }
    }, ows: OpenLayers.Format.OWSCommon.v1_1_0.prototype.writers.ows
  }, CLASS_NAME: "OpenLayers.Format.WCSGetCoverage"
}); OpenLayers.Format.KML = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { kml: "http://www.opengis.net/kml/2.2", gx: "http://www.google.com/kml/ext/2.2" }, kmlns: "http://earth.google.com/kml/2.0", placemarksDesc: "No description available", foldersName: "OpenLayers export", foldersDesc: "Exported on " + new Date, extractAttributes: !0, kvpAttributes: !1, extractStyles: !1, extractTracks: !1, trackAttributes: null, internalns: null, features: null, styles: null, styleBaseUrl: "", fetched: null, maxDepth: 0, initialize: function (a) {
  this.regExes =
    { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g, kmlColor: /(\w{2})(\w{2})(\w{2})(\w{2})/, kmlIconPalette: /root:\/\/icons\/palette-(\d+)(\.\w+)/, straightBracket: /\$\[(.*?)\]/g }; this.externalProjection = new OpenLayers.Projection("EPSG:4326"); OpenLayers.Format.XML.prototype.initialize.apply(this, [a])
  }, read: function (a) { this.features = []; this.styles = {}; this.fetched = {}; return this.parseData(a, { depth: 0, styleBaseUrl: this.styleBaseUrl }) }, parseData: function (a, b) {
  "string" == typeof a &&
    (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); for (var c = ["Link", "NetworkLink", "Style", "StyleMap", "Placemark"], d = 0, e = c.length; d < e; ++d) { var f = c[d], g = this.getElementsByTagNameNS(a, "*", f); if (0 != g.length) switch (f.toLowerCase()) { case "link": case "networklink": this.parseLinks(g, b); break; case "style": this.extractStyles && this.parseStyles(g, b); break; case "stylemap": this.extractStyles && this.parseStyleMaps(g, b); break; case "placemark": this.parseFeatures(g, b) } } return this.features
  }, parseLinks: function (a,
    b) { if (b.depth >= this.maxDepth) return !1; var c = OpenLayers.Util.extend({}, b); c.depth++; for (var d = 0, e = a.length; d < e; d++) { var f = this.parseProperty(a[d], "*", "href"); f && !this.fetched[f] && (this.fetched[f] = !0, (f = this.fetchLink(f)) && this.parseData(f, c)) } }, fetchLink: function (a) { if (a = OpenLayers.Request.GET({ url: a, async: !1 })) return a.responseText }, parseStyles: function (a, b) { for (var c = 0, d = a.length; c < d; c++) { var e = this.parseStyle(a[c]); e && (this.styles[(b.styleBaseUrl || "") + "#" + e.id] = e) } }, parseKmlColor: function (a) {
      var b =
        null; a && (a = a.match(this.regExes.kmlColor)) && (b = { color: "#" + a[4] + a[3] + a[2], opacity: parseInt(a[1], 16) / 255 }); return b
    }, parseStyle: function (a) {
      for (var b = {}, c = ["LineStyle", "PolyStyle", "IconStyle", "BalloonStyle", "LabelStyle"], d, e, f = 0, g = c.length; f < g; ++f)if (d = c[f], e = this.getElementsByTagNameNS(a, "*", d)[0]) switch (d.toLowerCase()) {
        case "linestyle": d = this.parseProperty(e, "*", "color"); if (d = this.parseKmlColor(d)) b.strokeColor = d.color, b.strokeOpacity = d.opacity; (d = this.parseProperty(e, "*", "width")) && (b.strokeWidth =
          d); break; case "polystyle": d = this.parseProperty(e, "*", "color"); if (d = this.parseKmlColor(d)) b.fillOpacity = d.opacity, b.fillColor = d.color; "0" == this.parseProperty(e, "*", "fill") && (b.fillColor = "none"); "0" == this.parseProperty(e, "*", "outline") && (b.strokeWidth = "0"); break; case "iconstyle": var h = parseFloat(this.parseProperty(e, "*", "scale") || 1); d = 32 * h; var k = 32 * h, l = this.getElementsByTagNameNS(e, "*", "Icon")[0]; if (l) {
            var m = this.parseProperty(l, "*", "href"); if (m) {
              var n = this.parseProperty(l, "*", "w"), p = this.parseProperty(l,
                "*", "h"); !OpenLayers.String.startsWith(m, "http://maps.google.com/mapfiles/kml") || (n || p) || (p = n = 64, h /= 2); n = n || p; p = p || n; n && (d = parseInt(n) * h); p && (k = parseInt(p) * h); if (p = m.match(this.regExes.kmlIconPalette)) n = p[1], p = p[2], m = this.parseProperty(l, "*", "x"), l = this.parseProperty(l, "*", "y"), m = "http://maps.google.com/mapfiles/kml/pal" + n + "/icon" + (8 * (l ? 7 - l / 32 : 7) + (m ? m / 32 : 0)) + p; b.graphicOpacity = 1; b.externalGraphic = m
            }
          } if (e = this.getElementsByTagNameNS(e, "*", "hotSpot")[0]) m = parseFloat(e.getAttribute("x")), l = parseFloat(e.getAttribute("y")),
            n = e.getAttribute("xunits"), "pixels" == n ? b.graphicXOffset = -m * h : "insetPixels" == n ? b.graphicXOffset = -d + m * h : "fraction" == n && (b.graphicXOffset = -d * m), e = e.getAttribute("yunits"), "pixels" == e ? b.graphicYOffset = -k + l * h + 1 : "insetPixels" == e ? b.graphicYOffset = -(l * h) + 1 : "fraction" == e && (b.graphicYOffset = -k * (1 - l) + 1); b.graphicWidth = d; b.graphicHeight = k; break; case "balloonstyle": (e = OpenLayers.Util.getXmlNodeValue(e)) && (b.balloonStyle = e.replace(this.regExes.straightBracket, "${$1}")); break; case "labelstyle": if (d = this.parseProperty(e,
              "*", "color"), d = this.parseKmlColor(d)) b.fontColor = d.color, b.fontOpacity = d.opacity
      }!b.strokeColor && b.fillColor && (b.strokeColor = b.fillColor); (a = a.getAttribute("id")) && b && (b.id = a); return b
    }, parseStyleMaps: function (a, b) {
      for (var c = 0, d = a.length; c < d; c++)for (var e = a[c], f = this.getElementsByTagNameNS(e, "*", "Pair"), e = e.getAttribute("id"), g = 0, h = f.length; g < h; g++) {
        var k = f[g], l = this.parseProperty(k, "*", "key"); (k = this.parseProperty(k, "*", "styleUrl")) && "normal" == l && (this.styles[(b.styleBaseUrl || "") + "#" + e] = this.styles[(b.styleBaseUrl ||
          "") + k])
      }
    }, parseFeatures: function (a, b) {
      for (var c = [], d = 0, e = a.length; d < e; d++) {
        var f = a[d], g = this.parseFeature.apply(this, [f]); if (g) {
        this.extractStyles && (g.attributes && g.attributes.styleUrl) && (g.style = this.getStyle(g.attributes.styleUrl, b)); if (this.extractStyles) { var h = this.getElementsByTagNameNS(f, "*", "Style")[0]; h && (h = this.parseStyle(h)) && (g.style = OpenLayers.Util.extend(g.style, h)) } this.extractTracks ? (f = this.getElementsByTagNameNS(f, this.namespaces.gx, "Track")) && 0 < f.length && (g = { features: [], feature: g },
          this.readNode(f[0], g), 0 < g.features.length && c.push.apply(c, g.features)) : c.push(g)
        } else throw "Bad Placemark: " + d;
      } this.features = this.features.concat(c)
    }, readers: {
      kml: { when: function (a, b) { b.whens.push(OpenLayers.Date.parse(this.getChildValue(a))) }, _trackPointAttribute: function (a, b) { var c = a.nodeName.split(":").pop(); b.attributes[c].push(this.getChildValue(a)) } }, gx: {
        Track: function (a, b) {
          var c = { whens: [], points: [], angles: [] }; if (this.trackAttributes) {
            var d; c.attributes = {}; for (var e = 0, f = this.trackAttributes.length; e <
              f; ++e)d = this.trackAttributes[e], c.attributes[d] = [], d in this.readers.kml || (this.readers.kml[d] = this.readers.kml._trackPointAttribute)
          } this.readChildNodes(a, c); if (c.whens.length !== c.points.length) throw Error("gx:Track with unequal number of when (" + c.whens.length + ") and gx:coord (" + c.points.length + ") elements."); var g = 0 < c.angles.length; if (g && c.whens.length !== c.angles.length) throw Error("gx:Track with unequal number of when (" + c.whens.length + ") and gx:angles (" + c.angles.length + ") elements."); for (var h,
            e = 0, f = c.whens.length; e < f; ++e) {
              h = b.feature.clone(); h.fid = b.feature.fid || b.feature.id; d = c.points[e]; h.geometry = d; "z" in d && (h.attributes.altitude = d.z); this.internalProjection && this.externalProjection && h.geometry.transform(this.externalProjection, this.internalProjection); if (this.trackAttributes) for (var k = 0, l = this.trackAttributes.length; k < l; ++k)d = this.trackAttributes[k], h.attributes[d] = c.attributes[d][e]; h.attributes.when = c.whens[e]; h.attributes.trackId = b.feature.id; g && (d = c.angles[e], h.attributes.heading =
                parseFloat(d[0]), h.attributes.tilt = parseFloat(d[1]), h.attributes.roll = parseFloat(d[2])); b.features.push(h)
          }
        }, coord: function (a, b) { var c = this.getChildValue(a).replace(this.regExes.trimSpace, "").split(/\s+/), d = new OpenLayers.Geometry.Point(c[0], c[1]); 2 < c.length && (d.z = parseFloat(c[2])); b.points.push(d) }, angles: function (a, b) { var c = this.getChildValue(a).replace(this.regExes.trimSpace, "").split(/\s+/); b.angles.push(c) }
      }
    }, parseFeature: function (a) {
      for (var b = ["MultiGeometry", "Polygon", "LineString", "Point"],
        c, d, e, f = 0, g = b.length; f < g; ++f)if (c = b[f], this.internalns = a.namespaceURI ? a.namespaceURI : this.kmlns, d = this.getElementsByTagNameNS(a, this.internalns, c), 0 < d.length) { if (b = this.parseGeometry[c.toLowerCase()]) e = b.apply(this, [d[0]]), this.internalProjection && this.externalProjection && e.transform(this.externalProjection, this.internalProjection); else throw new TypeError("Unsupported geometry type: " + c); break } var h; this.extractAttributes && (h = this.parseAttributes(a)); c = new OpenLayers.Feature.Vector(e, h); a = a.getAttribute("id") ||
          a.getAttribute("name"); null != a && (c.fid = a); return c
    }, getStyle: function (a, b) { var c = OpenLayers.Util.removeTail(a), d = OpenLayers.Util.extend({}, b); d.depth++; d.styleBaseUrl = c; !this.styles[a] && !OpenLayers.String.startsWith(a, "#") && d.depth <= this.maxDepth && !this.fetched[c] && (c = this.fetchLink(c)) && this.parseData(c, d); return OpenLayers.Util.extend({}, this.styles[a]) }, parseGeometry: {
      point: function (a) {
        var b = this.getElementsByTagNameNS(a, this.internalns, "coordinates"); a = []; if (0 < b.length) {
          var c = b[0].firstChild.nodeValue,
          c = c.replace(this.regExes.removeSpace, ""); a = c.split(",")
        } b = null; if (1 < a.length) 2 == a.length && (a[2] = null), b = new OpenLayers.Geometry.Point(a[0], a[1], a[2]); else throw "Bad coordinate string: " + c; return b
      }, linestring: function (a, b) {
        var c = this.getElementsByTagNameNS(a, this.internalns, "coordinates"), d = null; if (0 < c.length) {
          for (var c = this.getChildValue(c[0]), c = c.replace(this.regExes.trimSpace, ""), c = c.replace(this.regExes.trimComma, ","), d = c.split(this.regExes.splitSpace), e = d.length, f = Array(e), g, h, k = 0; k < e; ++k)if (g =
            d[k].split(","), h = g.length, 1 < h) 2 == g.length && (g[2] = null), f[k] = new OpenLayers.Geometry.Point(g[0], g[1], g[2]); else throw "Bad LineString point coordinates: " + d[k]; if (e) d = b ? new OpenLayers.Geometry.LinearRing(f) : new OpenLayers.Geometry.LineString(f); else throw "Bad LineString coordinates: " + c;
        } return d
      }, polygon: function (a) {
        a = this.getElementsByTagNameNS(a, this.internalns, "LinearRing"); var b = a.length, c = Array(b); if (0 < b) for (var d = 0, e = a.length; d < e; ++d)if (b = this.parseGeometry.linestring.apply(this, [a[d], !0])) c[d] =
          b; else throw "Bad LinearRing geometry: " + d; return new OpenLayers.Geometry.Polygon(c)
      }, multigeometry: function (a) { for (var b, c = [], d = a.childNodes, e = 0, f = d.length; e < f; ++e)a = d[e], 1 == a.nodeType && (b = a.prefix ? a.nodeName.split(":")[1] : a.nodeName, (b = this.parseGeometry[b.toLowerCase()]) && c.push(b.apply(this, [a]))); return new OpenLayers.Geometry.Collection(c) }
    }, parseAttributes: function (a) {
      var b = {}, c = a.getElementsByTagName("ExtendedData"); c.length && (b = this.parseExtendedData(c[0])); var d, e, f; a = a.childNodes; for (var c =
        0, g = a.length; c < g; ++c)if (d = a[c], 1 == d.nodeType && (e = d.childNodes, 1 <= e.length && 3 >= e.length)) { switch (e.length) { case 1: f = e[0]; break; case 2: f = e[0]; e = e[1]; f = 3 == f.nodeType || 4 == f.nodeType ? f : e; break; default: f = e[1] }if (3 == f.nodeType || 4 == f.nodeType) if (d = d.prefix ? d.nodeName.split(":")[1] : d.nodeName, f = OpenLayers.Util.getXmlNodeValue(f)) f = f.replace(this.regExes.trimSpace, ""), b[d] = f } return b
    }, parseExtendedData: function (a) {
      var b = {}, c, d, e, f, g = a.getElementsByTagName("Data"); c = 0; for (d = g.length; c < d; c++) {
        e = g[c]; f = e.getAttribute("name");
        var h = {}, k = e.getElementsByTagName("value"); k.length && (h.value = this.getChildValue(k[0])); this.kvpAttributes ? b[f] = h.value : (e = e.getElementsByTagName("displayName"), e.length && (h.displayName = this.getChildValue(e[0])), b[f] = h)
      } a = a.getElementsByTagName("SimpleData"); c = 0; for (d = a.length; c < d; c++)h = {}, e = a[c], f = e.getAttribute("name"), h.value = this.getChildValue(e), this.kvpAttributes ? b[f] = h.value : (h.displayName = f, b[f] = h); return b
    }, parseProperty: function (a, b, c) {
      var d; a = this.getElementsByTagNameNS(a, b, c); try { d = OpenLayers.Util.getXmlNodeValue(a[0]) } catch (e) {
        d =
        null
      } return d
    }, write: function (a) { OpenLayers.Util.isArray(a) || (a = [a]); for (var b = this.createElementNS(this.kmlns, "kml"), c = this.createFolderXML(), d = 0, e = a.length; d < e; ++d)c.appendChild(this.createPlacemarkXML(a[d])); b.appendChild(c); return OpenLayers.Format.XML.prototype.write.apply(this, [b]) }, createFolderXML: function () {
      var a = this.createElementNS(this.kmlns, "Folder"); if (this.foldersName) { var b = this.createElementNS(this.kmlns, "name"), c = this.createTextNode(this.foldersName); b.appendChild(c); a.appendChild(b) } this.foldersDesc &&
        (b = this.createElementNS(this.kmlns, "description"), c = this.createTextNode(this.foldersDesc), b.appendChild(c), a.appendChild(b)); return a
    }, createPlacemarkXML: function (a) {
      var b = this.createElementNS(this.kmlns, "name"), c = a.style && a.style.label ? a.style.label : a.id; b.appendChild(this.createTextNode(a.attributes.name || c)); var d = this.createElementNS(this.kmlns, "description"); d.appendChild(this.createTextNode(a.attributes.description || this.placemarksDesc)); c = this.createElementNS(this.kmlns, "Placemark"); null !=
        a.fid && c.setAttribute("id", a.fid); c.appendChild(b); c.appendChild(d); b = this.buildGeometryNode(a.geometry); c.appendChild(b); a.attributes && (a = this.buildExtendedData(a.attributes)) && c.appendChild(a); return c
    }, buildGeometryNode: function (a) { var b = a.CLASS_NAME, b = b.substring(b.lastIndexOf(".") + 1), b = this.buildGeometry[b.toLowerCase()], c = null; b && (c = b.apply(this, [a])); return c }, buildGeometry: {
      point: function (a) { var b = this.createElementNS(this.kmlns, "Point"); b.appendChild(this.buildCoordinatesNode(a)); return b },
      multipoint: function (a) { return this.buildGeometry.collection.apply(this, [a]) }, linestring: function (a) { var b = this.createElementNS(this.kmlns, "LineString"); b.appendChild(this.buildCoordinatesNode(a)); return b }, multilinestring: function (a) { return this.buildGeometry.collection.apply(this, [a]) }, linearring: function (a) { var b = this.createElementNS(this.kmlns, "LinearRing"); b.appendChild(this.buildCoordinatesNode(a)); return b }, polygon: function (a) {
        var b = this.createElementNS(this.kmlns, "Polygon"); a = a.components;
        for (var c, d, e = 0, f = a.length; e < f; ++e)c = 0 == e ? "outerBoundaryIs" : "innerBoundaryIs", c = this.createElementNS(this.kmlns, c), d = this.buildGeometry.linearring.apply(this, [a[e]]), c.appendChild(d), b.appendChild(c); return b
      }, multipolygon: function (a) { return this.buildGeometry.collection.apply(this, [a]) }, collection: function (a) { for (var b = this.createElementNS(this.kmlns, "MultiGeometry"), c, d = 0, e = a.components.length; d < e; ++d)(c = this.buildGeometryNode.apply(this, [a.components[d]])) && b.appendChild(c); return b }
    }, buildCoordinatesNode: function (a) {
      var b =
        this.createElementNS(this.kmlns, "coordinates"), c; if (c = a.components) { for (var d = c.length, e = Array(d), f = 0; f < d; ++f)a = c[f], e[f] = this.buildCoordinates(a); c = e.join(" ") } else c = this.buildCoordinates(a); c = this.createTextNode(c); b.appendChild(c); return b
    }, buildCoordinates: function (a) { this.internalProjection && this.externalProjection && (a = a.clone(), a.transform(this.internalProjection, this.externalProjection)); return a.x + "," + a.y }, buildExtendedData: function (a) {
      var b = this.createElementNS(this.kmlns, "ExtendedData"),
      c; for (c in a) if (a[c] && "name" != c && "description" != c && "styleUrl" != c) { var d = this.createElementNS(this.kmlns, "Data"); d.setAttribute("name", c); var e = this.createElementNS(this.kmlns, "value"); if ("object" == typeof a[c]) { if (a[c].value && e.appendChild(this.createTextNode(a[c].value)), a[c].displayName) { var f = this.createElementNS(this.kmlns, "displayName"); f.appendChild(this.getXMLDoc().createCDATASection(a[c].displayName)); d.appendChild(f) } } else e.appendChild(this.createTextNode(a[c])); d.appendChild(e); b.appendChild(d) } return this.isSimpleContent(b) ?
        null : b
    }, CLASS_NAME: "OpenLayers.Format.KML"
}); OpenLayers.Format.WMSCapabilities = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, { defaultVersion: "1.1.1", profile: null, CLASS_NAME: "OpenLayers.Format.WMSCapabilities" }); OpenLayers.Format.WMSCapabilities.v1 = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { wms: "http://www.opengis.net/wms", xlink: "http://www.w3.org/1999/xlink", xsi: "http://www.w3.org/2001/XMLSchema-instance" }, defaultPrefix: "wms", read: function (a) { "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); var b = a; a && 9 == a.nodeType && (a = a.documentElement); var c = {}; this.readNode(a, c); void 0 === c.service && (a = new OpenLayers.Format.OGCExceptionReport, c.error = a.read(b)); return c }, readers: {
    wms: {
      Service: function (a,
        b) { b.service = {}; this.readChildNodes(a, b.service) }, Name: function (a, b) { b.name = this.getChildValue(a) }, Title: function (a, b) { b.title = this.getChildValue(a) }, Abstract: function (a, b) { b["abstract"] = this.getChildValue(a) }, BoundingBox: function (a, b) {
          var c = {}; c.bbox = [parseFloat(a.getAttribute("minx")), parseFloat(a.getAttribute("miny")), parseFloat(a.getAttribute("maxx")), parseFloat(a.getAttribute("maxy"))]; var d = { x: parseFloat(a.getAttribute("resx")), y: parseFloat(a.getAttribute("resy")) }; isNaN(d.x) && isNaN(d.y) || (c.res =
            d); return c
        }, OnlineResource: function (a, b) { b.href = this.getAttributeNS(a, this.namespaces.xlink, "href") }, ContactInformation: function (a, b) { b.contactInformation = {}; this.readChildNodes(a, b.contactInformation) }, ContactPersonPrimary: function (a, b) { b.personPrimary = {}; this.readChildNodes(a, b.personPrimary) }, ContactPerson: function (a, b) { b.person = this.getChildValue(a) }, ContactOrganization: function (a, b) { b.organization = this.getChildValue(a) }, ContactPosition: function (a, b) { b.position = this.getChildValue(a) }, ContactAddress: function (a,
          b) { b.contactAddress = {}; this.readChildNodes(a, b.contactAddress) }, AddressType: function (a, b) { b.type = this.getChildValue(a) }, Address: function (a, b) { b.address = this.getChildValue(a) }, City: function (a, b) { b.city = this.getChildValue(a) }, StateOrProvince: function (a, b) { b.stateOrProvince = this.getChildValue(a) }, PostCode: function (a, b) { b.postcode = this.getChildValue(a) }, Country: function (a, b) { b.country = this.getChildValue(a) }, ContactVoiceTelephone: function (a, b) { b.phone = this.getChildValue(a) }, ContactFacsimileTelephone: function (a,
            b) { b.fax = this.getChildValue(a) }, ContactElectronicMailAddress: function (a, b) { b.email = this.getChildValue(a) }, Fees: function (a, b) { var c = this.getChildValue(a); c && "none" != c.toLowerCase() && (b.fees = c) }, AccessConstraints: function (a, b) { var c = this.getChildValue(a); c && "none" != c.toLowerCase() && (b.accessConstraints = c) }, Capability: function (a, b) { b.capability = { nestedLayers: [], layers: [] }; this.readChildNodes(a, b.capability) }, Request: function (a, b) { b.request = {}; this.readChildNodes(a, b.request) }, GetCapabilities: function (a,
              b) { b.getcapabilities = { formats: [] }; this.readChildNodes(a, b.getcapabilities) }, Format: function (a, b) { OpenLayers.Util.isArray(b.formats) ? b.formats.push(this.getChildValue(a)) : b.format = this.getChildValue(a) }, DCPType: function (a, b) { this.readChildNodes(a, b) }, HTTP: function (a, b) { this.readChildNodes(a, b) }, Get: function (a, b) { b.get = {}; this.readChildNodes(a, b.get); b.href || (b.href = b.get.href) }, Post: function (a, b) { b.post = {}; this.readChildNodes(a, b.post); b.href || (b.href = b.get.href) }, GetMap: function (a, b) {
              b.getmap = { formats: [] };
                this.readChildNodes(a, b.getmap)
              }, GetFeatureInfo: function (a, b) { b.getfeatureinfo = { formats: [] }; this.readChildNodes(a, b.getfeatureinfo) }, Exception: function (a, b) { b.exception = { formats: [] }; this.readChildNodes(a, b.exception) }, Layer: function (a, b) {
                var c, d; b.capability ? (d = b.capability, c = b) : d = b; var e = a.getAttributeNode("queryable"), f = e && e.specified ? a.getAttribute("queryable") : null, g = (e = a.getAttributeNode("cascaded")) && e.specified ? a.getAttribute("cascaded") : null, e = (e = a.getAttributeNode("opaque")) && e.specified ?
                  a.getAttribute("opaque") : null, h = a.getAttribute("noSubsets"), k = a.getAttribute("fixedWidth"), l = a.getAttribute("fixedHeight"), m = c || {}, n = OpenLayers.Util.extend; c = {
                    nestedLayers: [], styles: c ? [].concat(c.styles) : [], srs: c ? n({}, m.srs) : {}, metadataURLs: [], bbox: c ? n({}, m.bbox) : {}, llbbox: m.llbbox, dimensions: c ? n({}, m.dimensions) : {}, authorityURLs: c ? n({}, m.authorityURLs) : {}, identifiers: {}, keywords: [], queryable: f && "" !== f ? "1" === f || "true" === f : m.queryable || !1, cascaded: null !== g ? parseInt(g) : m.cascaded || 0, opaque: e ? "1" ===
                      e || "true" === e : m.opaque || !1, noSubsets: null !== h ? "1" === h || "true" === h : m.noSubsets || !1, fixedWidth: null != k ? parseInt(k) : m.fixedWidth || 0, fixedHeight: null != l ? parseInt(l) : m.fixedHeight || 0, minScale: m.minScale, maxScale: m.maxScale, attribution: m.attribution
                  }; b.nestedLayers.push(c); c.capability = d; this.readChildNodes(a, c); delete c.capability; c.name && (f = c.name.split(":"), g = d.request, e = g.getfeatureinfo, 0 < f.length && (c.prefix = f[0]), d.layers.push(c), void 0 === c.formats && (c.formats = g.getmap.formats), void 0 === c.infoFormats &&
                    e && (c.infoFormats = e.formats))
              }, Attribution: function (a, b) { b.attribution = {}; this.readChildNodes(a, b.attribution) }, LogoURL: function (a, b) { b.logo = { width: a.getAttribute("width"), height: a.getAttribute("height") }; this.readChildNodes(a, b.logo) }, Style: function (a, b) { var c = {}; b.styles.push(c); this.readChildNodes(a, c) }, LegendURL: function (a, b) { var c = { width: a.getAttribute("width"), height: a.getAttribute("height") }; b.legend = c; this.readChildNodes(a, c) }, MetadataURL: function (a, b) {
                var c = { type: a.getAttribute("type") };
                b.metadataURLs.push(c); this.readChildNodes(a, c)
              }, DataURL: function (a, b) { b.dataURL = {}; this.readChildNodes(a, b.dataURL) }, FeatureListURL: function (a, b) { b.featureListURL = {}; this.readChildNodes(a, b.featureListURL) }, AuthorityURL: function (a, b) { var c = a.getAttribute("name"), d = {}; this.readChildNodes(a, d); b.authorityURLs[c] = d.href }, Identifier: function (a, b) { var c = a.getAttribute("authority"); b.identifiers[c] = this.getChildValue(a) }, KeywordList: function (a, b) { this.readChildNodes(a, b) }, SRS: function (a, b) {
              b.srs[this.getChildValue(a)] =
                !0
              }
    }
  }, CLASS_NAME: "OpenLayers.Format.WMSCapabilities.v1"
}); OpenLayers.Format.WMSCapabilities.v1_1 = OpenLayers.Class(OpenLayers.Format.WMSCapabilities.v1, {
  readers: {
    wms: OpenLayers.Util.applyDefaults({
      WMT_MS_Capabilities: function (a, b) { this.readChildNodes(a, b) }, Keyword: function (a, b) { b.keywords && b.keywords.push(this.getChildValue(a)) }, DescribeLayer: function (a, b) { b.describelayer = { formats: [] }; this.readChildNodes(a, b.describelayer) }, GetLegendGraphic: function (a, b) { b.getlegendgraphic = { formats: [] }; this.readChildNodes(a, b.getlegendgraphic) }, GetStyles: function (a, b) {
      b.getstyles =
        { formats: [] }; this.readChildNodes(a, b.getstyles)
      }, PutStyles: function (a, b) { b.putstyles = { formats: [] }; this.readChildNodes(a, b.putstyles) }, UserDefinedSymbolization: function (a, b) { var c = { supportSLD: 1 == parseInt(a.getAttribute("SupportSLD")), userLayer: 1 == parseInt(a.getAttribute("UserLayer")), userStyle: 1 == parseInt(a.getAttribute("UserStyle")), remoteWFS: 1 == parseInt(a.getAttribute("RemoteWFS")) }; b.userSymbols = c }, LatLonBoundingBox: function (a, b) {
      b.llbbox = [parseFloat(a.getAttribute("minx")), parseFloat(a.getAttribute("miny")),
      parseFloat(a.getAttribute("maxx")), parseFloat(a.getAttribute("maxy"))]
      }, BoundingBox: function (a, b) { var c = OpenLayers.Format.WMSCapabilities.v1.prototype.readers.wms.BoundingBox.apply(this, [a, b]); c.srs = a.getAttribute("SRS"); b.bbox[c.srs] = c }, ScaleHint: function (a, b) {
        var c = a.getAttribute("min"), d = a.getAttribute("max"), e = Math.pow(2, 0.5), f = OpenLayers.INCHES_PER_UNIT.m; 0 != c && (b.maxScale = parseFloat((c / e * f * OpenLayers.DOTS_PER_INCH).toPrecision(13))); d != Number.POSITIVE_INFINITY && (b.minScale = parseFloat((d / e * f *
          OpenLayers.DOTS_PER_INCH).toPrecision(13)))
      }, Dimension: function (a, b) { var c = { name: a.getAttribute("name").toLowerCase(), units: a.getAttribute("units"), unitsymbol: a.getAttribute("unitSymbol") }; b.dimensions[c.name] = c }, Extent: function (a, b) {
        var c = a.getAttribute("name").toLowerCase(); if (c in b.dimensions) {
          c = b.dimensions[c]; c.nearestVal = "1" === a.getAttribute("nearestValue"); c.multipleVal = "1" === a.getAttribute("multipleValues"); c.current = "1" === a.getAttribute("current"); c["default"] = a.getAttribute("default") ||
            ""; var d = this.getChildValue(a); c.values = d.split(",")
        }
      }
    }, OpenLayers.Format.WMSCapabilities.v1.prototype.readers.wms)
  }, CLASS_NAME: "OpenLayers.Format.WMSCapabilities.v1_1"
}); OpenLayers.Format.WMSCapabilities.v1_1_0 = OpenLayers.Class(OpenLayers.Format.WMSCapabilities.v1_1, { version: "1.1.0", readers: { wms: OpenLayers.Util.applyDefaults({ SRS: function (a, b) { for (var c = this.getChildValue(a).split(/ +/), d = 0, e = c.length; d < e; d++)b.srs[c[d]] = !0 } }, OpenLayers.Format.WMSCapabilities.v1_1.prototype.readers.wms) }, CLASS_NAME: "OpenLayers.Format.WMSCapabilities.v1_1_0" }); OpenLayers.Protocol.WFS.v1 = OpenLayers.Class(OpenLayers.Protocol, {
  version: null, srsName: "EPSG:4326", featureType: null, featureNS: null, geometryName: "the_geom", schema: null, featurePrefix: "feature", formatOptions: null, readFormat: null, readOptions: null, initialize: function (a) {
    OpenLayers.Protocol.prototype.initialize.apply(this, [a]); a.format || (this.format = OpenLayers.Format.WFST(OpenLayers.Util.extend({
      version: this.version, featureType: this.featureType, featureNS: this.featureNS, featurePrefix: this.featurePrefix, geometryName: this.geometryName,
      srsName: this.srsName, schema: this.schema
    }, this.formatOptions))); !a.geometryName && 1 < parseFloat(this.format.version) && this.setGeometryName(null)
  }, destroy: function () { this.options && !this.options.format && this.format.destroy(); this.format = null; OpenLayers.Protocol.prototype.destroy.apply(this) }, read: function (a) {
    OpenLayers.Protocol.prototype.read.apply(this, arguments); a = OpenLayers.Util.extend({}, a); OpenLayers.Util.applyDefaults(a, this.options || {}); var b = new OpenLayers.Protocol.Response({ requestType: "read" }),
      c = OpenLayers.Format.XML.prototype.write.apply(this.format, [this.format.writeNode("wfs:GetFeature", a)]); b.priv = OpenLayers.Request.POST({ url: a.url, callback: this.createCallback(this.handleRead, b, a), params: a.params, headers: a.headers, data: c }); return b
  }, setFeatureType: function (a) { this.featureType = a; this.format.featureType = a }, setGeometryName: function (a) { this.geometryName = a; this.format.geometryName = a }, handleRead: function (a, b) {
    b = OpenLayers.Util.extend({}, b); OpenLayers.Util.applyDefaults(b, this.options); if (b.callback) {
      var c =
        a.priv; 200 <= c.status && 300 > c.status ? (c = this.parseResponse(c, b.readOptions)) && !1 !== c.success ? (b.readOptions && "object" == b.readOptions.output ? OpenLayers.Util.extend(a, c) : a.features = c, a.code = OpenLayers.Protocol.Response.SUCCESS) : (a.code = OpenLayers.Protocol.Response.FAILURE, a.error = c) : a.code = OpenLayers.Protocol.Response.FAILURE; b.callback.call(b.scope, a)
    }
  }, parseResponse: function (a, b) {
    var c = a.responseXML; c && c.documentElement || (c = a.responseText); if (!c || 0 >= c.length) return null; c = null !== this.readFormat ? this.readFormat.read(c) :
      this.format.read(c, b); if (!this.featureNS) { var d = this.readFormat || this.format; this.featureNS = d.featureNS; d.autoConfig = !1; this.geometryName || this.setGeometryName(d.geometryName) } return c
  }, commit: function (a, b) {
    b = OpenLayers.Util.extend({}, b); OpenLayers.Util.applyDefaults(b, this.options); var c = new OpenLayers.Protocol.Response({ requestType: "commit", reqFeatures: a }); c.priv = OpenLayers.Request.POST({ url: b.url, headers: b.headers, data: this.format.write(a, b), callback: this.createCallback(this.handleCommit, c, b) });
    return c
  }, handleCommit: function (a, b) { if (b.callback) { var c = a.priv, d = c.responseXML; d && d.documentElement || (d = c.responseText); c = this.format.read(d) || {}; a.insertIds = c.insertIds || []; c.success ? a.code = OpenLayers.Protocol.Response.SUCCESS : (a.code = OpenLayers.Protocol.Response.FAILURE, a.error = c); b.callback.call(b.scope, a) } }, filterDelete: function (a, b) {
    b = OpenLayers.Util.extend({}, b); OpenLayers.Util.applyDefaults(b, this.options); new OpenLayers.Protocol.Response({ requestType: "commit" }); var c = this.format.createElementNSPlus("wfs:Transaction",
      { attributes: { service: "WFS", version: this.version } }), d = this.format.createElementNSPlus("wfs:Delete", { attributes: { typeName: (b.featureNS ? this.featurePrefix + ":" : "") + b.featureType } }); b.featureNS && d.setAttribute("xmlns:" + this.featurePrefix, b.featureNS); var e = this.format.writeNode("ogc:Filter", a); d.appendChild(e); c.appendChild(d); c = OpenLayers.Format.XML.prototype.write.apply(this.format, [c]); return OpenLayers.Request.POST({ url: this.url, callback: b.callback || function () { }, data: c })
  }, abort: function (a) { a && a.priv.abort() },
  CLASS_NAME: "OpenLayers.Protocol.WFS.v1"
}); OpenLayers.Handler.Feature = OpenLayers.Class(OpenLayers.Handler, {
  EVENTMAP: { click: { "in": "click", out: "clickout" }, mousemove: { "in": "over", out: "out" }, dblclick: { "in": "dblclick", out: null }, mousedown: { "in": null, out: null }, mouseup: { "in": null, out: null }, touchstart: { "in": "click", out: "clickout" } }, feature: null, lastFeature: null, down: null, up: null, clickTolerance: 4, geometryTypes: null, stopClick: !0, stopDown: !0, stopUp: !1, initialize: function (a, b, c, d) {
    OpenLayers.Handler.prototype.initialize.apply(this, [a, c, d]); this.layer =
      b
  }, touchstart: function (a) { this.startTouch(); return OpenLayers.Event.isMultiTouch(a) ? !0 : this.mousedown(a) }, touchmove: function (a) { OpenLayers.Event.preventDefault(a) }, mousedown: function (a) { if (OpenLayers.Event.isLeftClick(a) || OpenLayers.Event.isSingleTouch(a)) this.down = a.xy; return this.handle(a) ? !this.stopDown : !0 }, mouseup: function (a) { this.up = a.xy; return this.handle(a) ? !this.stopUp : !0 }, click: function (a) { return this.handle(a) ? !this.stopClick : !0 }, mousemove: function (a) {
    if (!this.callbacks.over && !this.callbacks.out) return !0;
    this.handle(a); return !0
  }, dblclick: function (a) { return !this.handle(a) }, geometryTypeMatches: function (a) { return null == this.geometryTypes || -1 < OpenLayers.Util.indexOf(this.geometryTypes, a.geometry.CLASS_NAME) }, handle: function (a) {
  this.feature && !this.feature.layer && (this.feature = null); var b = a.type, c = !1, d = !!this.feature, e = "click" == b || "dblclick" == b || "touchstart" == b; (this.feature = this.layer.getFeatureFromEvent(a)) && !this.feature.layer && (this.feature = null); this.lastFeature && !this.lastFeature.layer && (this.lastFeature =
    null); this.feature ? ("touchstart" === b && OpenLayers.Event.preventDefault(a), a = this.feature != this.lastFeature, this.geometryTypeMatches(this.feature) ? (d && a ? (this.lastFeature && this.triggerCallback(b, "out", [this.lastFeature]), this.triggerCallback(b, "in", [this.feature])) : d && !e || this.triggerCallback(b, "in", [this.feature]), this.lastFeature = this.feature, c = !0) : (this.lastFeature && (d && a || e) && this.triggerCallback(b, "out", [this.lastFeature]), this.feature = null)) : this.lastFeature && (d || e) && this.triggerCallback(b, "out",
      [this.lastFeature]); return c
  }, triggerCallback: function (a, b, c) { if (b = this.EVENTMAP[a][b]) "click" == a && this.up && this.down ? (Math.sqrt(Math.pow(this.up.x - this.down.x, 2) + Math.pow(this.up.y - this.down.y, 2)) <= this.clickTolerance && this.callback(b, c), this.up = this.down = null) : this.callback(b, c) }, activate: function () {
    var a = !1; OpenLayers.Handler.prototype.activate.apply(this, arguments) && (this.moveLayerToTop(), this.map.events.on({ removelayer: this.handleMapEvents, changelayer: this.handleMapEvents, scope: this }), a = !0);
    return a
  }, deactivate: function () { var a = !1; OpenLayers.Handler.prototype.deactivate.apply(this, arguments) && (this.moveLayerBack(), this.up = this.down = this.lastFeature = this.feature = null, this.map.events.un({ removelayer: this.handleMapEvents, changelayer: this.handleMapEvents, scope: this }), a = !0); return a }, handleMapEvents: function (a) { "removelayer" != a.type && "order" != a.property || this.moveLayerToTop() }, moveLayerToTop: function () { var a = Math.max(this.map.Z_INDEX_BASE.Feature - 1, this.layer.getZIndex()) + 1; this.layer.setZIndex(a) },
  moveLayerBack: function () { var a = this.layer.getZIndex() - 1; a >= this.map.Z_INDEX_BASE.Feature ? this.layer.setZIndex(a) : this.map.setLayerZIndex(this.layer, this.map.getLayerIndex(this.layer)) }, CLASS_NAME: "OpenLayers.Handler.Feature"
}); OpenLayers.Layer.Vector.RootContainer = OpenLayers.Class(OpenLayers.Layer.Vector, {
  displayInLayerSwitcher: !1, layers: null, display: function () { }, getFeatureFromEvent: function (a) { for (var b = this.layers, c, d = 0; d < b.length; d++)if (c = b[d].getFeatureFromEvent(a)) return c }, setMap: function (a) { OpenLayers.Layer.Vector.prototype.setMap.apply(this, arguments); this.collectRoots(); a.events.register("changelayer", this, this.handleChangeLayer) }, removeMap: function (a) {
    a.events.unregister("changelayer", this, this.handleChangeLayer);
    this.resetRoots(); OpenLayers.Layer.Vector.prototype.removeMap.apply(this, arguments)
  }, collectRoots: function () { for (var a, b = 0; b < this.map.layers.length; ++b)a = this.map.layers[b], -1 != OpenLayers.Util.indexOf(this.layers, a) && a.renderer.moveRoot(this.renderer) }, resetRoots: function () { for (var a, b = 0; b < this.layers.length; ++b)a = this.layers[b], this.renderer && a.renderer.getRenderLayerId() == this.id && this.renderer.moveRoot(a.renderer) }, handleChangeLayer: function (a) {
    var b = a.layer; "order" == a.property && -1 != OpenLayers.Util.indexOf(this.layers,
      b) && (this.resetRoots(), this.collectRoots())
  }, CLASS_NAME: "OpenLayers.Layer.Vector.RootContainer"
}); OpenLayers.Control.SelectFeature = OpenLayers.Class(OpenLayers.Control, {
  multipleKey: null, toggleKey: null, multiple: !1, clickout: !0, toggle: !1, hover: !1, highlightOnly: !1, box: !1, onBeforeSelect: function () { }, onSelect: function () { }, onUnselect: function () { }, scope: null, geometryTypes: null, layer: null, layers: null, callbacks: null, selectStyle: null, renderIntent: "select", handlers: null, initialize: function (a, b) {
    OpenLayers.Control.prototype.initialize.apply(this, [b]); null === this.scope && (this.scope = this); this.initLayer(a); var c =
      { click: this.clickFeature, clickout: this.clickoutFeature }; this.hover && (c.over = this.overFeature, c.out = this.outFeature); this.callbacks = OpenLayers.Util.extend(c, this.callbacks); this.handlers = { feature: new OpenLayers.Handler.Feature(this, this.layer, this.callbacks, { geometryTypes: this.geometryTypes }) }; this.box && (this.handlers.box = new OpenLayers.Handler.Box(this, { done: this.selectBox }, { boxDivClassName: "olHandlerBoxSelectFeature" }))
  }, initLayer: function (a) {
    OpenLayers.Util.isArray(a) ? (this.layers = a, this.layer =
      new OpenLayers.Layer.Vector.RootContainer(this.id + "_container", { layers: a })) : this.layer = a
  }, destroy: function () { this.active && this.layers && this.map.removeLayer(this.layer); OpenLayers.Control.prototype.destroy.apply(this, arguments); this.layers && this.layer.destroy() }, activate: function () { this.active || (this.layers && this.map.addLayer(this.layer), this.handlers.feature.activate(), this.box && this.handlers.box && this.handlers.box.activate()); return OpenLayers.Control.prototype.activate.apply(this, arguments) }, deactivate: function () {
  this.active &&
    (this.handlers.feature.deactivate(), this.handlers.box && this.handlers.box.deactivate(), this.layers && this.map.removeLayer(this.layer)); return OpenLayers.Control.prototype.deactivate.apply(this, arguments)
  }, unselectAll: function (a) { var b = this.layers || [this.layer], c, d, e, f; for (e = 0; e < b.length; ++e)if (c = b[e], f = 0, null != c.selectedFeatures) for (; c.selectedFeatures.length > f;)d = c.selectedFeatures[f], a && a.except == d ? ++f : this.unselect(d) }, clickFeature: function (a) {
  this.hover || (-1 < OpenLayers.Util.indexOf(a.layer.selectedFeatures,
    a) ? this.toggleSelect() ? this.unselect(a) : this.multipleSelect() || this.unselectAll({ except: a }) : (this.multipleSelect() || this.unselectAll({ except: a }), this.select(a)))
  }, multipleSelect: function () { return this.multiple || this.handlers.feature.evt && this.handlers.feature.evt[this.multipleKey] }, toggleSelect: function () { return this.toggle || this.handlers.feature.evt && this.handlers.feature.evt[this.toggleKey] }, clickoutFeature: function (a) { !this.hover && this.clickout && this.unselectAll() }, overFeature: function (a) {
    var b =
      a.layer; this.hover && (this.highlightOnly ? this.highlight(a) : -1 == OpenLayers.Util.indexOf(b.selectedFeatures, a) && this.select(a))
  }, outFeature: function (a) { if (this.hover) if (this.highlightOnly) { if (a._lastHighlighter == this.id) if (a._prevHighlighter && a._prevHighlighter != this.id) { delete a._lastHighlighter; var b = this.map.getControl(a._prevHighlighter); b && b.highlight(a) } else this.unhighlight(a) } else this.unselect(a) }, highlight: function (a) {
    var b = a.layer; !1 !== this.events.triggerEvent("beforefeaturehighlighted", { feature: a }) &&
      (a._prevHighlighter = a._lastHighlighter, a._lastHighlighter = this.id, b.drawFeature(a, this.selectStyle || this.renderIntent), this.events.triggerEvent("featurehighlighted", { feature: a }))
  }, unhighlight: function (a) { var b = a.layer; void 0 == a._prevHighlighter ? delete a._lastHighlighter : (a._prevHighlighter != this.id && (a._lastHighlighter = a._prevHighlighter), delete a._prevHighlighter); b.drawFeature(a, a.style || a.layer.style || "default"); this.events.triggerEvent("featureunhighlighted", { feature: a }) }, select: function (a) {
    var b =
      this.onBeforeSelect.call(this.scope, a), c = a.layer; !1 !== b && (b = c.events.triggerEvent("beforefeatureselected", { feature: a }), !1 !== b && (c.selectedFeatures.push(a), this.highlight(a), this.handlers.feature.lastFeature || (this.handlers.feature.lastFeature = c.selectedFeatures[0]), c.events.triggerEvent("featureselected", { feature: a }), this.onSelect.call(this.scope, a)))
  }, unselect: function (a) {
    var b = a.layer; this.unhighlight(a); OpenLayers.Util.removeItem(b.selectedFeatures, a); b.events.triggerEvent("featureunselected",
      { feature: a }); this.onUnselect.call(this.scope, a)
  }, selectBox: function (a) {
    if (a instanceof OpenLayers.Bounds) {
      var b = this.map.getLonLatFromPixel({ x: a.left, y: a.bottom }); a = this.map.getLonLatFromPixel({ x: a.right, y: a.top }); b = new OpenLayers.Bounds(b.lon, b.lat, a.lon, a.lat); this.multipleSelect() || this.unselectAll(); a = this.multiple; this.multiple = !0; var c = this.layers || [this.layer]; this.events.triggerEvent("boxselectionstart", { layers: c }); for (var d, e = 0; e < c.length; ++e) {
        d = c[e]; for (var f = 0, g = d.features.length; f < g; ++f) {
          var h =
            d.features[f]; h.getVisibility() && (null == this.geometryTypes || -1 < OpenLayers.Util.indexOf(this.geometryTypes, h.geometry.CLASS_NAME)) && b.toGeometry().intersects(h.geometry) && -1 == OpenLayers.Util.indexOf(d.selectedFeatures, h) && this.select(h)
        }
      } this.multiple = a; this.events.triggerEvent("boxselectionend", { layers: c })
    }
  }, setMap: function (a) { this.handlers.feature.setMap(a); this.box && this.handlers.box.setMap(a); OpenLayers.Control.prototype.setMap.apply(this, arguments) }, setLayer: function (a) {
    var b = this.active; this.unselectAll();
    this.deactivate(); this.layers && (this.layer.destroy(), this.layers = null); this.initLayer(a); this.handlers.feature.layer = this.layer; b && this.activate()
  }, CLASS_NAME: "OpenLayers.Control.SelectFeature"
}); OpenLayers.Handler.Point = OpenLayers.Class(OpenLayers.Handler, {
  point: null, layer: null, multi: !1, citeCompliant: !1, mouseDown: !1, stoppedDown: null, lastDown: null, lastUp: null, persist: !1, stopDown: !1, stopUp: !1, layerOptions: null, pixelTolerance: 5, lastTouchPx: null, initialize: function (a, b, c) { c && c.layerOptions && c.layerOptions.styleMap || (this.style = OpenLayers.Util.extend(OpenLayers.Feature.Vector.style["default"], {})); OpenLayers.Handler.prototype.initialize.apply(this, arguments) }, activate: function () {
    if (!OpenLayers.Handler.prototype.activate.apply(this,
      arguments)) return !1; var a = OpenLayers.Util.extend({ displayInLayerSwitcher: !1, calculateInRange: OpenLayers.Function.True, wrapDateLine: this.citeCompliant }, this.layerOptions); this.layer = new OpenLayers.Layer.Vector(this.CLASS_NAME, a); this.map.addLayer(this.layer); return !0
  }, createFeature: function (a) {
    a = this.layer.getLonLatFromViewPortPx(a); a = new OpenLayers.Geometry.Point(a.lon, a.lat); this.point = new OpenLayers.Feature.Vector(a); this.callback("create", [this.point.geometry, this.point]); this.point.geometry.clearBounds();
    this.layer.addFeatures([this.point], { silent: !0 })
  }, deactivate: function () { if (!OpenLayers.Handler.prototype.deactivate.apply(this, arguments)) return !1; this.cancel(); null != this.layer.map && (this.destroyFeature(!0), this.layer.destroy(!1)); this.layer = null; return !0 }, destroyFeature: function (a) { !this.layer || !a && this.persist || this.layer.destroyFeatures(); this.point = null }, destroyPersistedFeature: function () { var a = this.layer; a && 1 < a.features.length && this.layer.features[0].destroy() }, finalize: function (a) {
  this.mouseDown =
    !1; this.lastTouchPx = this.lastUp = this.lastDown = null; this.callback(a ? "cancel" : "done", [this.geometryClone()]); this.destroyFeature(a)
  }, cancel: function () { this.finalize(!0) }, click: function (a) { OpenLayers.Event.stop(a); return !1 }, dblclick: function (a) { OpenLayers.Event.stop(a); return !1 }, modifyFeature: function (a) {
  this.point || this.createFeature(a); a = this.layer.getLonLatFromViewPortPx(a); this.point.geometry.x = a.lon; this.point.geometry.y = a.lat; this.callback("modify", [this.point.geometry, this.point, !1]); this.point.geometry.clearBounds();
    this.drawFeature()
  }, drawFeature: function () { this.layer.drawFeature(this.point, this.style) }, getGeometry: function () { var a = this.point && this.point.geometry; a && this.multi && (a = new OpenLayers.Geometry.MultiPoint([a])); return a }, geometryClone: function () { var a = this.getGeometry(); return a && a.clone() }, mousedown: function (a) { return this.down(a) }, touchstart: function (a) { this.startTouch(); this.lastTouchPx = a.xy; return this.down(a) }, mousemove: function (a) { return this.move(a) }, touchmove: function (a) {
  this.lastTouchPx = a.xy;
    return this.move(a)
  }, mouseup: function (a) { return this.up(a) }, touchend: function (a) { a.xy = this.lastTouchPx; return this.up(a) }, down: function (a) { this.mouseDown = !0; this.lastDown = a.xy; this.touch || this.modifyFeature(a.xy); this.stoppedDown = this.stopDown; return !this.stopDown }, move: function (a) { this.touch || this.mouseDown && !this.stoppedDown || this.modifyFeature(a.xy); return !0 }, up: function (a) {
  this.mouseDown = !1; this.stoppedDown = this.stopDown; if (!this.checkModifiers(a) || this.lastUp && this.lastUp.equals(a.xy) || !this.lastDown ||
    !this.passesTolerance(this.lastDown, a.xy, this.pixelTolerance)) return !0; this.touch && this.modifyFeature(a.xy); this.persist && this.destroyPersistedFeature(); this.lastUp = a.xy; this.finalize(); return !this.stopUp
  }, mouseout: function (a) { OpenLayers.Util.mouseLeft(a, this.map.viewPortDiv) && (this.stoppedDown = this.stopDown, this.mouseDown = !1) }, passesTolerance: function (a, b, c) { var d = !0; null != c && a && b && a.distanceTo(b) > c && (d = !1); return d }, CLASS_NAME: "OpenLayers.Handler.Point"
}); OpenLayers.Handler.Path = OpenLayers.Class(OpenLayers.Handler.Point, {
  line: null, maxVertices: null, doubleTouchTolerance: 20, freehand: !1, freehandToggle: "shiftKey", timerId: null, redoStack: null, createFeature: function (a) {
    a = this.layer.getLonLatFromViewPortPx(a); a = new OpenLayers.Geometry.Point(a.lon, a.lat); this.point = new OpenLayers.Feature.Vector(a); this.line = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([this.point.geometry])); this.callback("create", [this.point.geometry, this.getSketch()]);
    this.point.geometry.clearBounds(); this.layer.addFeatures([this.line, this.point], { silent: !0 })
  }, destroyFeature: function (a) { OpenLayers.Handler.Point.prototype.destroyFeature.call(this, a); this.line = null }, destroyPersistedFeature: function () { var a = this.layer; a && 2 < a.features.length && this.layer.features[0].destroy() }, removePoint: function () { this.point && this.layer.removeFeatures([this.point]) }, addPoint: function (a) {
    this.layer.removeFeatures([this.point]); a = this.layer.getLonLatFromViewPortPx(a); this.point = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(a.lon,
      a.lat)); this.line.geometry.addComponent(this.point.geometry, this.line.geometry.components.length); this.layer.addFeatures([this.point]); this.callback("point", [this.point.geometry, this.getGeometry()]); this.callback("modify", [this.point.geometry, this.getSketch()]); this.drawFeature(); delete this.redoStack
  }, insertXY: function (a, b) { this.line.geometry.addComponent(new OpenLayers.Geometry.Point(a, b), this.getCurrentPointIndex()); this.drawFeature(); delete this.redoStack }, insertDeltaXY: function (a, b) {
    var c = this.getCurrentPointIndex() -
      1, c = this.line.geometry.components[c]; !c || (isNaN(c.x) || isNaN(c.y)) || this.insertXY(c.x + a, c.y + b)
  }, insertDirectionLength: function (a, b) { a *= Math.PI / 180; var c = b * Math.cos(a), d = b * Math.sin(a); this.insertDeltaXY(c, d) }, insertDeflectionLength: function (a, b) { var c = this.getCurrentPointIndex() - 1; if (0 < c) { var d = this.line.geometry.components[c], c = this.line.geometry.components[c - 1], d = Math.atan2(d.y - c.y, d.x - c.x); this.insertDirectionLength(180 * d / Math.PI + a, b) } }, getCurrentPointIndex: function () {
    return this.line.geometry.components.length -
      1
  }, undo: function () { var a = this.line.geometry, b = a.components, c = this.getCurrentPointIndex() - 1, d = b[c], e = a.removeComponent(d); e && (this.touch && 0 < c && (b = a.components, a = b[c - 1], c = this.getCurrentPointIndex(), b = b[c], b.x = a.x, b.y = a.y), this.redoStack || (this.redoStack = []), this.redoStack.push(d), this.drawFeature()); return e }, redo: function () { var a = this.redoStack && this.redoStack.pop(); a && (this.line.geometry.addComponent(a, this.getCurrentPointIndex()), this.drawFeature()); return !!a }, freehandMode: function (a) {
    return this.freehandToggle &&
      a[this.freehandToggle] ? !this.freehand : this.freehand
  }, modifyFeature: function (a, b) { this.line || this.createFeature(a); var c = this.layer.getLonLatFromViewPortPx(a); this.point.geometry.x = c.lon; this.point.geometry.y = c.lat; this.callback("modify", [this.point.geometry, this.getSketch(), b]); this.point.geometry.clearBounds(); this.drawFeature() }, drawFeature: function () { this.layer.drawFeature(this.line, this.style); this.layer.drawFeature(this.point, this.style) }, getSketch: function () { return this.line }, getGeometry: function () {
    var a =
      this.line && this.line.geometry; a && this.multi && (a = new OpenLayers.Geometry.MultiLineString([a])); return a
  }, touchstart: function (a) {
    if (this.timerId && this.passesTolerance(this.lastTouchPx, a.xy, this.doubleTouchTolerance)) return this.finishGeometry(), window.clearTimeout(this.timerId), this.timerId = null, !1; this.timerId && (window.clearTimeout(this.timerId), this.timerId = null); this.timerId = window.setTimeout(OpenLayers.Function.bind(function () { this.timerId = null }, this), 300); return OpenLayers.Handler.Point.prototype.touchstart.call(this,
      a)
  }, down: function (a) { var b = this.stopDown; this.freehandMode(a) && (b = !0, this.touch && (this.modifyFeature(a.xy, !!this.lastUp), OpenLayers.Event.stop(a))); this.touch || this.lastDown && this.passesTolerance(this.lastDown, a.xy, this.pixelTolerance) || this.modifyFeature(a.xy, !!this.lastUp); this.mouseDown = !0; this.lastDown = a.xy; this.stoppedDown = b; return !b }, move: function (a) {
    if (this.stoppedDown && this.freehandMode(a)) return this.persist && this.destroyPersistedFeature(), this.maxVertices && this.line && this.line.geometry.components.length ===
      this.maxVertices ? (this.removePoint(), this.finalize()) : this.addPoint(a.xy), !1; this.touch || this.mouseDown && !this.stoppedDown || this.modifyFeature(a.xy, !!this.lastUp); return !0
  }, up: function (a) {
  !this.mouseDown || this.lastUp && this.lastUp.equals(a.xy) || (this.stoppedDown && this.freehandMode(a) ? (this.persist && this.destroyPersistedFeature(), this.removePoint(), this.finalize()) : this.passesTolerance(this.lastDown, a.xy, this.pixelTolerance) && (this.touch && this.modifyFeature(a.xy), null == this.lastUp && this.persist && this.destroyPersistedFeature(),
    this.addPoint(a.xy), this.lastUp = a.xy, this.line.geometry.components.length === this.maxVertices + 1 && this.finishGeometry())); this.stoppedDown = this.stopDown; this.mouseDown = !1; return !this.stopUp
  }, finishGeometry: function () { this.line.geometry.removeComponent(this.line.geometry.components[this.line.geometry.components.length - 1]); this.removePoint(); this.finalize() }, dblclick: function (a) { this.freehandMode(a) || this.finishGeometry(); return !1 }, CLASS_NAME: "OpenLayers.Handler.Path"
}); OpenLayers.Spherical = OpenLayers.Spherical || {}; OpenLayers.Spherical.DEFAULT_RADIUS = 6378137; OpenLayers.Spherical.computeDistanceBetween = function (a, b, c) { c = c || OpenLayers.Spherical.DEFAULT_RADIUS; var d = Math.sin(Math.PI * (b.lon - a.lon) / 360), e = Math.sin(Math.PI * (b.lat - a.lat) / 360); a = e * e + d * d * Math.cos(Math.PI * a.lat / 180) * Math.cos(Math.PI * b.lat / 180); return 2 * c * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) };
OpenLayers.Spherical.computeHeading = function (a, b) { var c = Math.sin(Math.PI * (a.lon - b.lon) / 180) * Math.cos(Math.PI * b.lat / 180), d = Math.cos(Math.PI * a.lat / 180) * Math.sin(Math.PI * b.lat / 180) - Math.sin(Math.PI * a.lat / 180) * Math.cos(Math.PI * b.lat / 180) * Math.cos(Math.PI * (a.lon - b.lon) / 180); return 180 * Math.atan2(c, d) / Math.PI }; OpenLayers.Control.CacheWrite = OpenLayers.Class(OpenLayers.Control, {
  layers: null, imageFormat: "image/png", quotaRegEx: /quota/i, setMap: function (a) { OpenLayers.Control.prototype.setMap.apply(this, arguments); var b, c = this.layers || a.layers; for (b = c.length - 1; 0 <= b; --b)this.addLayer({ layer: c[b] }); if (!this.layers) a.events.on({ addlayer: this.addLayer, removeLayer: this.removeLayer, scope: this }) }, addLayer: function (a) { a.layer.events.on({ tileloadstart: this.makeSameOrigin, tileloaded: this.onTileLoaded, scope: this }) }, removeLayer: function (a) {
    a.layer.events.un({
      tileloadstart: this.makeSameOrigin,
      tileloaded: this.onTileLoaded, scope: this
    })
  }, makeSameOrigin: function (a) { if (this.active && (a = a.tile, a instanceof OpenLayers.Tile.Image && !a.crossOriginKeyword && "data:" !== a.url.substr(0, 5))) { var b = OpenLayers.Request.makeSameOrigin(a.url, OpenLayers.ProxyHost); OpenLayers.Control.CacheWrite.urlMap[b] = a.url; a.url = b } }, onTileLoaded: function (a) { this.active && (!a.aborted && a.tile instanceof OpenLayers.Tile.Image && "data:" !== a.tile.url.substr(0, 5)) && (this.cache({ tile: a.tile }), delete OpenLayers.Control.CacheWrite.urlMap[a.tile.url]) },
  cache: function (a) { if (window.localStorage) { a = a.tile; try { var b = a.getCanvasContext(); b && window.localStorage.setItem("olCache_" + (OpenLayers.Control.CacheWrite.urlMap[a.url] || a.url), b.canvas.toDataURL(this.imageFormat)) } catch (c) { (b = c.name || c.message) && this.quotaRegEx.test(b) ? this.events.triggerEvent("cachefull", { tile: a }) : OpenLayers.Console.error(c.toString()) } } }, destroy: function () {
    if (this.layers || this.map) { var a, b = this.layers || this.map.layers; for (a = b.length - 1; 0 <= a; --a)this.removeLayer({ layer: b[a] }) } this.map &&
      this.map.events.un({ addlayer: this.addLayer, removeLayer: this.removeLayer, scope: this }); OpenLayers.Control.prototype.destroy.apply(this, arguments)
  }, CLASS_NAME: "OpenLayers.Control.CacheWrite"
}); OpenLayers.Control.CacheWrite.clearCache = function () { if (window.localStorage) { var a, b; for (a = window.localStorage.length - 1; 0 <= a; --a)b = window.localStorage.key(a), "olCache_" === b.substr(0, 8) && window.localStorage.removeItem(b) } }; OpenLayers.Control.CacheWrite.urlMap = {}; OpenLayers.Format.Context = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, {
  layerOptions: null, layerParams: null, read: function (a, b) { var c = OpenLayers.Format.XML.VersionedOGC.prototype.read.apply(this, arguments); if (b && b.map) if (this.context = c, b.map instanceof OpenLayers.Map) c = this.mergeContextToMap(c, b.map); else { var d = b.map; if (OpenLayers.Util.isElement(d) || "string" == typeof d) d = { div: d }; c = this.contextToMap(c, d) } return c }, getLayerFromContext: function (a) {
    var b, c, d = {
      queryable: a.queryable, visibility: a.visibility,
      maxExtent: a.maxExtent, metadata: OpenLayers.Util.applyDefaults(a.metadata, { styles: a.styles, formats: a.formats, "abstract": a["abstract"], dataURL: a.dataURL }), numZoomLevels: a.numZoomLevels, units: a.units, isBaseLayer: a.isBaseLayer, opacity: a.opacity, displayInLayerSwitcher: a.displayInLayerSwitcher, singleTile: a.singleTile, tileSize: a.tileSize ? new OpenLayers.Size(a.tileSize.width, a.tileSize.height) : void 0, minScale: a.minScale || a.maxScaleDenominator, maxScale: a.maxScale || a.minScaleDenominator, srs: a.srs, dimensions: a.dimensions,
      metadataURL: a.metadataURL
    }; this.layerOptions && OpenLayers.Util.applyDefaults(d, this.layerOptions); var e = { layers: a.name, transparent: a.transparent, version: a.version }; if (a.formats && 0 < a.formats.length) for (e.format = a.formats[0].value, b = 0, c = a.formats.length; b < c; b++) { var f = a.formats[b]; if (!0 == f.current) { e.format = f.value; break } } if (a.styles && 0 < a.styles.length) for (b = 0, c = a.styles.length; b < c; b++)if (f = a.styles[b], !0 == f.current) { f.href ? e.sld = f.href : f.body ? e.sld_body = f.body : e.styles = f.name; break } this.layerParams &&
      OpenLayers.Util.applyDefaults(e, this.layerParams); b = null; c = a.service; c == OpenLayers.Format.Context.serviceTypes.WFS ? (d.strategies = [new OpenLayers.Strategy.BBOX], d.protocol = new OpenLayers.Protocol.WFS({ url: a.url, featurePrefix: a.name.split(":")[0], featureType: a.name.split(":").pop() }), b = new OpenLayers.Layer.Vector(a.title || a.name, d)) : c == OpenLayers.Format.Context.serviceTypes.KML ? (d.strategies = [new OpenLayers.Strategy.Fixed], d.protocol = new OpenLayers.Protocol.HTTP({ url: a.url, format: new OpenLayers.Format.KML }),
        b = new OpenLayers.Layer.Vector(a.title || a.name, d)) : c == OpenLayers.Format.Context.serviceTypes.GML ? (d.strategies = [new OpenLayers.Strategy.Fixed], d.protocol = new OpenLayers.Protocol.HTTP({ url: a.url, format: new OpenLayers.Format.GML }), b = new OpenLayers.Layer.Vector(a.title || a.name, d)) : a.features ? (b = new OpenLayers.Layer.Vector(a.title || a.name, d), b.addFeatures(a.features)) : !0 !== a.categoryLayer && (b = new OpenLayers.Layer.WMS(a.title || a.name, a.url, e, d)); return b
  }, getLayersFromContext: function (a) {
    for (var b = [], c =
      0, d = a.length; c < d; c++) { var e = this.getLayerFromContext(a[c]); null !== e && b.push(e) } return b
  }, contextToMap: function (a, b) {
    b = OpenLayers.Util.applyDefaults({ maxExtent: a.maxExtent, projection: a.projection, units: a.units }, b); b.maxExtent && (b.maxResolution = b.maxExtent.getWidth() / OpenLayers.Map.TILE_WIDTH); b.metadata = { contactInformation: a.contactInformation, "abstract": a["abstract"], keywords: a.keywords, logo: a.logo, descriptionURL: a.descriptionURL }; var c = new OpenLayers.Map(b); c.addLayers(this.getLayersFromContext(a.layersContext));
    c.setCenter(a.bounds.getCenterLonLat(), c.getZoomForExtent(a.bounds, !0)); return c
  }, mergeContextToMap: function (a, b) { b.addLayers(this.getLayersFromContext(a.layersContext)); return b }, write: function (a, b) { a = this.toContext(a); return OpenLayers.Format.XML.VersionedOGC.prototype.write.apply(this, arguments) }, CLASS_NAME: "OpenLayers.Format.Context"
});
OpenLayers.Format.Context.serviceTypes = { WMS: "urn:ogc:serviceType:WMS", WFS: "urn:ogc:serviceType:WFS", WCS: "urn:ogc:serviceType:WCS", GML: "urn:ogc:serviceType:GML", SLD: "urn:ogc:serviceType:SLD", FES: "urn:ogc:serviceType:FES", KML: "urn:ogc:serviceType:KML" }; OpenLayers.Format.WMC = OpenLayers.Class(OpenLayers.Format.Context, {
  defaultVersion: "1.1.0", layerToContext: function (a) {
    var b = this.getParser(), c = {
      queryable: a.queryable, visibility: a.visibility, name: a.params.LAYERS, title: a.name, "abstract": a.metadata["abstract"], dataURL: a.metadata.dataURL, metadataURL: a.metadataURL, server: { version: a.params.VERSION, url: a.url }, maxExtent: a.maxExtent, transparent: a.params.TRANSPARENT, numZoomLevels: a.numZoomLevels, units: a.units, isBaseLayer: a.isBaseLayer, opacity: 1 == a.opacity ? void 0 :
        a.opacity, displayInLayerSwitcher: a.displayInLayerSwitcher, singleTile: a.singleTile, tileSize: a.singleTile || !a.tileSize ? void 0 : { width: a.tileSize.w, height: a.tileSize.h }, minScale: a.options.resolutions || a.options.scales || a.options.maxResolution || a.options.minScale ? a.minScale : void 0, maxScale: a.options.resolutions || a.options.scales || a.options.minResolution || a.options.maxScale ? a.maxScale : void 0, formats: [], styles: [], srs: a.srs, dimensions: a.dimensions
    }; a.metadata.servertitle && (c.server.title = a.metadata.servertitle);
    if (a.metadata.formats && 0 < a.metadata.formats.length) for (var d = 0, e = a.metadata.formats.length; d < e; d++) { var f = a.metadata.formats[d]; c.formats.push({ value: f.value, current: f.value == a.params.FORMAT }) } else c.formats.push({ value: a.params.FORMAT, current: !0 }); if (a.metadata.styles && 0 < a.metadata.styles.length) for (d = 0, e = a.metadata.styles.length; d < e; d++)b = a.metadata.styles[d], b.current = b.href == a.params.SLD || b.body == a.params.SLD_BODY || b.name == a.params.STYLES ? !0 : !1, c.styles.push(b); else c.styles.push({
      href: a.params.SLD,
      body: a.params.SLD_BODY, name: a.params.STYLES || b.defaultStyleName, title: b.defaultStyleTitle, current: !0
    }); return c
  }, toContext: function (a) {
    var b = {}, c = a.layers; if ("OpenLayers.Map" == a.CLASS_NAME) { var d = a.metadata || {}; b.size = a.getSize(); b.bounds = a.getExtent(); b.projection = a.projection; b.title = a.title; b.keywords = d.keywords; b["abstract"] = d["abstract"]; b.logo = d.logo; b.descriptionURL = d.descriptionURL; b.contactInformation = d.contactInformation; b.maxExtent = a.maxExtent } else OpenLayers.Util.applyDefaults(b, a), void 0 !=
      b.layers && delete b.layers; void 0 == b.layersContext && (b.layersContext = []); if (void 0 != c && OpenLayers.Util.isArray(c)) for (a = 0, d = c.length; a < d; a++) { var e = c[a]; e instanceof OpenLayers.Layer.WMS && b.layersContext.push(this.layerToContext(e)) } return b
  }, CLASS_NAME: "OpenLayers.Format.WMC"
}); OpenLayers.Format.WMC.v1 = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { ol: "http://openlayers.org/context", wmc: "http://www.opengis.net/context", sld: "http://www.opengis.net/sld", xlink: "http://www.w3.org/1999/xlink", xsi: "http://www.w3.org/2001/XMLSchema-instance" }, schemaLocation: "", getNamespacePrefix: function (a) { var b = null; if (null == a) b = this.namespaces[this.defaultPrefix]; else for (b in this.namespaces) if (this.namespaces[b] == a) break; return b }, defaultPrefix: "wmc", rootPrefix: null, defaultStyleName: "",
  defaultStyleTitle: "Default", initialize: function (a) { OpenLayers.Format.XML.prototype.initialize.apply(this, [a]) }, read: function (a) { "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); a = a.documentElement; this.rootPrefix = a.prefix; var b = { version: a.getAttribute("version") }; this.runChildNodes(b, a); return b }, runChildNodes: function (a, b) {
    for (var c = b.childNodes, d, e, f, g = 0, h = c.length; g < h; ++g)d = c[g], 1 == d.nodeType && (e = this.getNamespacePrefix(d.namespaceURI), f = d.nodeName.split(":").pop(),
      (e = this["read_" + e + "_" + f]) && e.apply(this, [a, d]))
  }, read_wmc_General: function (a, b) { this.runChildNodes(a, b) }, read_wmc_BoundingBox: function (a, b) { a.projection = b.getAttribute("SRS"); a.bounds = new OpenLayers.Bounds(b.getAttribute("minx"), b.getAttribute("miny"), b.getAttribute("maxx"), b.getAttribute("maxy")) }, read_wmc_LayerList: function (a, b) { a.layersContext = []; this.runChildNodes(a, b) }, read_wmc_Layer: function (a, b) {
    var c = {
      visibility: "1" != b.getAttribute("hidden"), queryable: "1" == b.getAttribute("queryable"), formats: [],
      styles: [], metadata: {}
    }; this.runChildNodes(c, b); a.layersContext.push(c)
  }, read_wmc_Extension: function (a, b) { this.runChildNodes(a, b) }, read_ol_units: function (a, b) { a.units = this.getChildValue(b) }, read_ol_maxExtent: function (a, b) { var c = new OpenLayers.Bounds(b.getAttribute("minx"), b.getAttribute("miny"), b.getAttribute("maxx"), b.getAttribute("maxy")); a.maxExtent = c }, read_ol_transparent: function (a, b) { a.transparent = this.getChildValue(b) }, read_ol_numZoomLevels: function (a, b) { a.numZoomLevels = parseInt(this.getChildValue(b)) },
  read_ol_opacity: function (a, b) { a.opacity = parseFloat(this.getChildValue(b)) }, read_ol_singleTile: function (a, b) { a.singleTile = "true" == this.getChildValue(b) }, read_ol_tileSize: function (a, b) { var c = { width: b.getAttribute("width"), height: b.getAttribute("height") }; a.tileSize = c }, read_ol_isBaseLayer: function (a, b) { a.isBaseLayer = "true" == this.getChildValue(b) }, read_ol_displayInLayerSwitcher: function (a, b) { a.displayInLayerSwitcher = "true" == this.getChildValue(b) }, read_wmc_Server: function (a, b) {
  a.version = b.getAttribute("version");
    a.url = this.getOnlineResource_href(b); a.metadata.servertitle = b.getAttribute("title")
  }, read_wmc_FormatList: function (a, b) { this.runChildNodes(a, b) }, read_wmc_Format: function (a, b) { var c = { value: this.getChildValue(b) }; "1" == b.getAttribute("current") && (c.current = !0); a.formats.push(c) }, read_wmc_StyleList: function (a, b) { this.runChildNodes(a, b) }, read_wmc_Style: function (a, b) { var c = {}; this.runChildNodes(c, b); "1" == b.getAttribute("current") && (c.current = !0); a.styles.push(c) }, read_wmc_SLD: function (a, b) {
    this.runChildNodes(a,
      b)
  }, read_sld_StyledLayerDescriptor: function (a, b) { var c = OpenLayers.Format.XML.prototype.write.apply(this, [b]); a.body = c }, read_sld_FeatureTypeStyle: function (a, b) { var c = OpenLayers.Format.XML.prototype.write.apply(this, [b]); a.body = c }, read_wmc_OnlineResource: function (a, b) { a.href = this.getAttributeNS(b, this.namespaces.xlink, "href") }, read_wmc_Name: function (a, b) { var c = this.getChildValue(b); c && (a.name = c) }, read_wmc_Title: function (a, b) { var c = this.getChildValue(b); c && (a.title = c) }, read_wmc_MetadataURL: function (a,
    b) { a.metadataURL = this.getOnlineResource_href(b) }, read_wmc_KeywordList: function (a, b) { a.keywords = []; this.runChildNodes(a.keywords, b) }, read_wmc_Keyword: function (a, b) { a.push(this.getChildValue(b)) }, read_wmc_Abstract: function (a, b) { var c = this.getChildValue(b); c && (a["abstract"] = c) }, read_wmc_LogoURL: function (a, b) { a.logo = { width: b.getAttribute("width"), height: b.getAttribute("height"), format: b.getAttribute("format"), href: this.getOnlineResource_href(b) } }, read_wmc_DescriptionURL: function (a, b) {
    a.descriptionURL =
      this.getOnlineResource_href(b)
    }, read_wmc_ContactInformation: function (a, b) { var c = {}; this.runChildNodes(c, b); a.contactInformation = c }, read_wmc_ContactPersonPrimary: function (a, b) { var c = {}; this.runChildNodes(c, b); a.personPrimary = c }, read_wmc_ContactPerson: function (a, b) { var c = this.getChildValue(b); c && (a.person = c) }, read_wmc_ContactOrganization: function (a, b) { var c = this.getChildValue(b); c && (a.organization = c) }, read_wmc_ContactPosition: function (a, b) { var c = this.getChildValue(b); c && (a.position = c) }, read_wmc_ContactAddress: function (a,
      b) { var c = {}; this.runChildNodes(c, b); a.contactAddress = c }, read_wmc_AddressType: function (a, b) { var c = this.getChildValue(b); c && (a.type = c) }, read_wmc_Address: function (a, b) { var c = this.getChildValue(b); c && (a.address = c) }, read_wmc_City: function (a, b) { var c = this.getChildValue(b); c && (a.city = c) }, read_wmc_StateOrProvince: function (a, b) { var c = this.getChildValue(b); c && (a.stateOrProvince = c) }, read_wmc_PostCode: function (a, b) { var c = this.getChildValue(b); c && (a.postcode = c) }, read_wmc_Country: function (a, b) {
        var c = this.getChildValue(b);
        c && (a.country = c)
      }, read_wmc_ContactVoiceTelephone: function (a, b) { var c = this.getChildValue(b); c && (a.phone = c) }, read_wmc_ContactFacsimileTelephone: function (a, b) { var c = this.getChildValue(b); c && (a.fax = c) }, read_wmc_ContactElectronicMailAddress: function (a, b) { var c = this.getChildValue(b); c && (a.email = c) }, read_wmc_DataURL: function (a, b) { a.dataURL = this.getOnlineResource_href(b) }, read_wmc_LegendURL: function (a, b) {
        var c = {
          width: b.getAttribute("width"), height: b.getAttribute("height"), format: b.getAttribute("format"),
          href: this.getOnlineResource_href(b)
        }; a.legend = c
      }, read_wmc_DimensionList: function (a, b) { a.dimensions = {}; this.runChildNodes(a.dimensions, b) }, read_wmc_Dimension: function (a, b) {
        var c = {
          name: b.getAttribute("name").toLowerCase(), units: b.getAttribute("units") || "", unitSymbol: b.getAttribute("unitSymbol") || "", userValue: b.getAttribute("userValue") || "", nearestValue: "1" === b.getAttribute("nearestValue"), multipleValues: "1" === b.getAttribute("multipleValues"), current: "1" === b.getAttribute("current"), "default": b.getAttribute("default") ||
            ""
        }, d = this.getChildValue(b); c.values = d.split(","); a[c.name] = c
      }, write: function (a, b) { var c = this.createElementDefaultNS("ViewContext"); this.setAttributes(c, { version: this.VERSION, id: b && "string" == typeof b.id ? b.id : OpenLayers.Util.createUniqueID("OpenLayers_Context_") }); this.setAttributeNS(c, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation); c.appendChild(this.write_wmc_General(a)); c.appendChild(this.write_wmc_LayerList(a)); return OpenLayers.Format.XML.prototype.write.apply(this, [c]) }, createElementDefaultNS: function (a,
        b, c) { a = this.createElementNS(this.namespaces[this.defaultPrefix], a); b && a.appendChild(this.createTextNode(b)); c && this.setAttributes(a, c); return a }, setAttributes: function (a, b) { var c, d; for (d in b) c = b[d].toString(), c.match(/[A-Z]/) ? this.setAttributeNS(a, null, d, c) : a.setAttribute(d, c) }, write_wmc_General: function (a) {
          var b = this.createElementDefaultNS("General"); a.size && b.appendChild(this.createElementDefaultNS("Window", null, { width: a.size.w, height: a.size.h })); var c = a.bounds; b.appendChild(this.createElementDefaultNS("BoundingBox",
            null, { minx: c.left.toPrecision(18), miny: c.bottom.toPrecision(18), maxx: c.right.toPrecision(18), maxy: c.top.toPrecision(18), SRS: a.projection })); b.appendChild(this.createElementDefaultNS("Title", a.title)); a.keywords && b.appendChild(this.write_wmc_KeywordList(a.keywords)); a["abstract"] && b.appendChild(this.createElementDefaultNS("Abstract", a["abstract"])); a.logo && b.appendChild(this.write_wmc_URLType("LogoURL", a.logo.href, a.logo)); a.descriptionURL && b.appendChild(this.write_wmc_URLType("DescriptionURL", a.descriptionURL));
          a.contactInformation && b.appendChild(this.write_wmc_ContactInformation(a.contactInformation)); b.appendChild(this.write_ol_MapExtension(a)); return b
        }, write_wmc_KeywordList: function (a) { for (var b = this.createElementDefaultNS("KeywordList"), c = 0, d = a.length; c < d; c++)b.appendChild(this.createElementDefaultNS("Keyword", a[c])); return b }, write_wmc_ContactInformation: function (a) {
          var b = this.createElementDefaultNS("ContactInformation"); a.personPrimary && b.appendChild(this.write_wmc_ContactPersonPrimary(a.personPrimary));
          a.position && b.appendChild(this.createElementDefaultNS("ContactPosition", a.position)); a.contactAddress && b.appendChild(this.write_wmc_ContactAddress(a.contactAddress)); a.phone && b.appendChild(this.createElementDefaultNS("ContactVoiceTelephone", a.phone)); a.fax && b.appendChild(this.createElementDefaultNS("ContactFacsimileTelephone", a.fax)); a.email && b.appendChild(this.createElementDefaultNS("ContactElectronicMailAddress", a.email)); return b
        }, write_wmc_ContactPersonPrimary: function (a) {
          var b = this.createElementDefaultNS("ContactPersonPrimary");
          a.person && b.appendChild(this.createElementDefaultNS("ContactPerson", a.person)); a.organization && b.appendChild(this.createElementDefaultNS("ContactOrganization", a.organization)); return b
        }, write_wmc_ContactAddress: function (a) {
          var b = this.createElementDefaultNS("ContactAddress"); a.type && b.appendChild(this.createElementDefaultNS("AddressType", a.type)); a.address && b.appendChild(this.createElementDefaultNS("Address", a.address)); a.city && b.appendChild(this.createElementDefaultNS("City", a.city)); a.stateOrProvince &&
            b.appendChild(this.createElementDefaultNS("StateOrProvince", a.stateOrProvince)); a.postcode && b.appendChild(this.createElementDefaultNS("PostCode", a.postcode)); a.country && b.appendChild(this.createElementDefaultNS("Country", a.country)); return b
        }, write_ol_MapExtension: function (a) {
          var b = this.createElementDefaultNS("Extension"); if (a = a.maxExtent) {
            var c = this.createElementNS(this.namespaces.ol, "ol:maxExtent"); this.setAttributes(c, {
              minx: a.left.toPrecision(18), miny: a.bottom.toPrecision(18), maxx: a.right.toPrecision(18),
              maxy: a.top.toPrecision(18)
            }); b.appendChild(c)
          } return b
        }, write_wmc_LayerList: function (a) { for (var b = this.createElementDefaultNS("LayerList"), c = 0, d = a.layersContext.length; c < d; ++c)b.appendChild(this.write_wmc_Layer(a.layersContext[c])); return b }, write_wmc_Layer: function (a) {
          var b = this.createElementDefaultNS("Layer", null, { queryable: a.queryable ? "1" : "0", hidden: a.visibility ? "0" : "1" }); b.appendChild(this.write_wmc_Server(a)); b.appendChild(this.createElementDefaultNS("Name", a.name)); b.appendChild(this.createElementDefaultNS("Title",
            a.title)); a["abstract"] && b.appendChild(this.createElementDefaultNS("Abstract", a["abstract"])); a.dataURL && b.appendChild(this.write_wmc_URLType("DataURL", a.dataURL)); a.metadataURL && b.appendChild(this.write_wmc_URLType("MetadataURL", a.metadataURL)); return b
        }, write_wmc_LayerExtension: function (a) {
          var b = this.createElementDefaultNS("Extension"), c = a.maxExtent, d = this.createElementNS(this.namespaces.ol, "ol:maxExtent"); this.setAttributes(d, {
            minx: c.left.toPrecision(18), miny: c.bottom.toPrecision(18), maxx: c.right.toPrecision(18),
            maxy: c.top.toPrecision(18)
          }); b.appendChild(d); a.tileSize && !a.singleTile && (c = this.createElementNS(this.namespaces.ol, "ol:tileSize"), this.setAttributes(c, a.tileSize), b.appendChild(c)); for (var c = "transparent numZoomLevels units isBaseLayer opacity displayInLayerSwitcher singleTile".split(" "), e = 0, f = c.length; e < f; ++e)(d = this.createOLPropertyNode(a, c[e])) && b.appendChild(d); return b
        }, createOLPropertyNode: function (a, b) {
          var c = null; null != a[b] && (c = this.createElementNS(this.namespaces.ol, "ol:" + b), c.appendChild(this.createTextNode(a[b].toString())));
          return c
        }, write_wmc_Server: function (a) { a = a.server; var b = this.createElementDefaultNS("Server"), c = { service: "OGC:WMS", version: a.version }; a.title && (c.title = a.title); this.setAttributes(b, c); b.appendChild(this.write_wmc_OnlineResource(a.url)); return b }, write_wmc_URLType: function (a, b, c) { a = this.createElementDefaultNS(a); a.appendChild(this.write_wmc_OnlineResource(b)); if (c) { b = ["width", "height", "format"]; for (var d = 0; d < b.length; d++)b[d] in c && a.setAttribute(b[d], c[b[d]]) } return a }, write_wmc_DimensionList: function (a) {
          var b =
            this.createElementDefaultNS("DimensionList"), c; for (c in a.dimensions) { var d = {}, e = a.dimensions[c], f; for (f in e) d[f] = "boolean" == typeof e[f] ? Number(e[f]) : e[f]; e = ""; d.values && (e = d.values.join(","), delete d.values); b.appendChild(this.createElementDefaultNS("Dimension", e, d)) } return b
        }, write_wmc_FormatList: function (a) {
          for (var b = this.createElementDefaultNS("FormatList"), c = 0, d = a.formats.length; c < d; c++) {
            var e = a.formats[c]; b.appendChild(this.createElementDefaultNS("Format", e.value, e.current && !0 == e.current ? { current: "1" } :
              null))
          } return b
        }, write_wmc_StyleList: function (a) {
          var b = this.createElementDefaultNS("StyleList"); if ((a = a.styles) && OpenLayers.Util.isArray(a)) for (var c, d = 0, e = a.length; d < e; d++) {
            var f = a[d], g = this.createElementDefaultNS("Style", null, f.current && !0 == f.current ? { current: "1" } : null); f.href ? (c = this.createElementDefaultNS("SLD"), f.name && c.appendChild(this.createElementDefaultNS("Name", f.name)), f.title && c.appendChild(this.createElementDefaultNS("Title", f.title)), f.legend && c.appendChild(this.write_wmc_URLType("LegendURL",
              f.legend.href, f.legend)), f = this.write_wmc_OnlineResource(f.href), c.appendChild(f), g.appendChild(c)) : f.body ? (c = this.createElementDefaultNS("SLD"), f.name && c.appendChild(this.createElementDefaultNS("Name", f.name)), f.title && c.appendChild(this.createElementDefaultNS("Title", f.title)), f.legend && c.appendChild(this.write_wmc_URLType("LegendURL", f.legend.href, f.legend)), f = OpenLayers.Format.XML.prototype.read.apply(this, [f.body]).documentElement, c.ownerDocument && c.ownerDocument.importNode && (f = c.ownerDocument.importNode(f,
                !0)), c.appendChild(f), g.appendChild(c)) : (g.appendChild(this.createElementDefaultNS("Name", f.name)), g.appendChild(this.createElementDefaultNS("Title", f.title)), f["abstract"] && g.appendChild(this.createElementDefaultNS("Abstract", f["abstract"])), f.legend && g.appendChild(this.write_wmc_URLType("LegendURL", f.legend.href, f.legend))); b.appendChild(g)
          } return b
        }, write_wmc_OnlineResource: function (a) {
          var b = this.createElementDefaultNS("OnlineResource"); this.setAttributeNS(b, this.namespaces.xlink, "xlink:type",
            "simple"); this.setAttributeNS(b, this.namespaces.xlink, "xlink:href", a); return b
        }, getOnlineResource_href: function (a) { var b = {}; a = a.getElementsByTagName("OnlineResource"); 0 < a.length && this.read_wmc_OnlineResource(b, a[0]); return b.href }, CLASS_NAME: "OpenLayers.Format.WMC.v1"
}); OpenLayers.Control.PanPanel = OpenLayers.Class(OpenLayers.Control.Panel, {
  slideFactor: 50, slideRatio: null, initialize: function (a) { OpenLayers.Control.Panel.prototype.initialize.apply(this, [a]); a = { slideFactor: this.slideFactor, slideRatio: this.slideRatio }; this.addControls([new OpenLayers.Control.Pan(OpenLayers.Control.Pan.NORTH, a), new OpenLayers.Control.Pan(OpenLayers.Control.Pan.SOUTH, a), new OpenLayers.Control.Pan(OpenLayers.Control.Pan.EAST, a), new OpenLayers.Control.Pan(OpenLayers.Control.Pan.WEST, a)]) },
  CLASS_NAME: "OpenLayers.Control.PanPanel"
}); OpenLayers.Control.Attribution = OpenLayers.Class(OpenLayers.Control, {
  separator: ", ", template: "${layers}", destroy: function () { this.map.events.un({ removelayer: this.updateAttribution, addlayer: this.updateAttribution, changelayer: this.updateAttribution, changebaselayer: this.updateAttribution, scope: this }); OpenLayers.Control.prototype.destroy.apply(this, arguments) }, draw: function () {
    OpenLayers.Control.prototype.draw.apply(this, arguments); this.map.events.on({
      changebaselayer: this.updateAttribution, changelayer: this.updateAttribution,
      addlayer: this.updateAttribution, removelayer: this.updateAttribution, scope: this
    }); this.updateAttribution(); return this.div
  }, updateAttribution: function () { var a = []; if (this.map && this.map.layers) { for (var b = 0, c = this.map.layers.length; b < c; b++) { var d = this.map.layers[b]; d.attribution && d.getVisibility() && -1 === OpenLayers.Util.indexOf(a, d.attribution) && a.push(d.attribution) } this.div.innerHTML = OpenLayers.String.format(this.template, { layers: a.join(this.separator) }) } }, CLASS_NAME: "OpenLayers.Control.Attribution"
}); OpenLayers.Kinetic = OpenLayers.Class({
  threshold: 0, deceleration: 0.0035, nbPoints: 100, delay: 200, points: void 0, timerId: void 0, initialize: function (a) { OpenLayers.Util.extend(this, a) }, begin: function () { OpenLayers.Animation.stop(this.timerId); this.timerId = void 0; this.points = [] }, update: function (a) { this.points.unshift({ xy: a, tick: (new Date).getTime() }); this.points.length > this.nbPoints && this.points.pop() }, end: function (a) {
    for (var b, c = (new Date).getTime(), d = 0, e = this.points.length, f; d < e; d++) {
      f = this.points[d]; if (c -
        f.tick > this.delay) break; b = f
    } if (b && (d = (new Date).getTime() - b.tick, c = Math.sqrt(Math.pow(a.x - b.xy.x, 2) + Math.pow(a.y - b.xy.y, 2)), d = c / d, !(0 == d || d < this.threshold))) return c = Math.asin((a.y - b.xy.y) / c), b.xy.x <= a.x && (c = Math.PI - c), { speed: d, theta: c }
  }, move: function (a, b) {
    var c = a.speed, d = Math.cos(a.theta), e = -Math.sin(a.theta), f = (new Date).getTime(), g = 0, h = 0; this.timerId = OpenLayers.Animation.start(OpenLayers.Function.bind(function () {
      if (null != this.timerId) {
        var a = (new Date).getTime() - f, l = -this.deceleration * Math.pow(a,
          2) / 2 + c * a, m = l * d, l = l * e, n, p; n = !1; 0 >= -this.deceleration * a + c && (OpenLayers.Animation.stop(this.timerId), this.timerId = null, n = !0); a = m - g; p = l - h; g = m; h = l; b(a, p, n)
      }
    }, this))
  }, CLASS_NAME: "OpenLayers.Kinetic"
}); OpenLayers.Format.WPSExecute = OpenLayers.Class(OpenLayers.Format.XML, OpenLayers.Format.Filter.v1_1_0, {
  namespaces: { ows: "http://www.opengis.net/ows/1.1", gml: "http://www.opengis.net/gml", wps: "http://www.opengis.net/wps/1.0.0", wfs: "http://www.opengis.net/wfs", ogc: "http://www.opengis.net/ogc", wcs: "http://www.opengis.net/wcs", xlink: "http://www.w3.org/1999/xlink", xsi: "http://www.w3.org/2001/XMLSchema-instance" }, regExes: { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g }, VERSION: "1.0.0",
  schemaLocation: "http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd", schemaLocationAttr: function (a) { }, write: function (a) { var b; window.ActiveXObject ? this.xmldom = b = new ActiveXObject("Microsoft.XMLDOM") : b = document.implementation.createDocument("", "", null); a = this.writeNode("wps:Execute", a, b); this.setAttributeNS(a, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation); return OpenLayers.Format.XML.prototype.write.apply(this, [a]) }, read: function (a) {
  "string" == typeof a && (a =
    OpenLayers.Format.XML.prototype.read.apply(this, [a])); a && 9 == a.nodeType && (a = a.documentElement); var b = {}; this.readNode(a, b); return b
  }, writers: {
    wps: {
      Execute: function (a) { var b = this.createElementNSPlus("wps:Execute", { attributes: { version: this.VERSION, service: "WPS" } }); this.writeNode("ows:Identifier", a.identifier, b); this.writeNode("wps:DataInputs", a.dataInputs, b); this.writeNode("wps:ResponseForm", a.responseForm, b); return b }, ResponseForm: function (a) {
        var b = this.createElementNSPlus("wps:ResponseForm", {}); a.rawDataOutput &&
          this.writeNode("wps:RawDataOutput", a.rawDataOutput, b); a.responseDocument && this.writeNode("wps:ResponseDocument", a.responseDocument, b); return b
      }, ResponseDocument: function (a) { var b = this.createElementNSPlus("wps:ResponseDocument", { attributes: { storeExecuteResponse: a.storeExecuteResponse, lineage: a.lineage, status: a.status } }); if (a.outputs) for (var c = 0, d = a.outputs.length; c < d; c++)this.writeNode("wps:Output", a.outputs[c], b); return b }, Output: function (a) {
        var b = this.createElementNSPlus("wps:Output", {
          attributes: {
            asReference: a.asReference,
            mimeType: a.mimeType, encoding: a.encoding, schema: a.schema
          }
        }); this.writeNode("ows:Identifier", a.identifier, b); this.writeNode("ows:Title", a.title, b); this.writeNode("ows:Abstract", a["abstract"], b); return b
      }, RawDataOutput: function (a) { var b = this.createElementNSPlus("wps:RawDataOutput", { attributes: { mimeType: a.mimeType, encoding: a.encoding, schema: a.schema } }); this.writeNode("ows:Identifier", a.identifier, b); return b }, DataInputs: function (a) {
        for (var b = this.createElementNSPlus("wps:DataInputs", {}), c = 0, d = a.length; c <
          d; ++c)this.writeNode("wps:Input", a[c], b); return b
      }, Input: function (a) { var b = this.createElementNSPlus("wps:Input", {}); this.writeNode("ows:Identifier", a.identifier, b); a.title && this.writeNode("ows:Title", a.title, b); a.data && this.writeNode("wps:Data", a.data, b); a.reference && this.writeNode("wps:Reference", a.reference, b); a.boundingBoxData && this.writeNode("wps:BoundingBoxData", a.boundingBoxData, b); return b }, Data: function (a) {
        var b = this.createElementNSPlus("wps:Data", {}); a.literalData ? this.writeNode("wps:LiteralData",
          a.literalData, b) : a.complexData ? this.writeNode("wps:ComplexData", a.complexData, b) : a.boundingBoxData && this.writeNode("ows:BoundingBox", a.boundingBoxData, b); return b
      }, LiteralData: function (a) { return this.createElementNSPlus("wps:LiteralData", { attributes: { uom: a.uom }, value: a.value }) }, ComplexData: function (a) {
        var b = this.createElementNSPlus("wps:ComplexData", { attributes: { mimeType: a.mimeType, encoding: a.encoding, schema: a.schema } }), c = a.value; "string" === typeof c ? b.appendChild(this.getXMLDoc().createCDATASection(a.value)) :
          b.appendChild(c); return b
      }, Reference: function (a) { var b = this.createElementNSPlus("wps:Reference", { attributes: { mimeType: a.mimeType, "xlink:href": a.href, method: a.method, encoding: a.encoding, schema: a.schema } }); a.body && this.writeNode("wps:Body", a.body, b); return b }, BoundingBoxData: function (a, b) { this.writers.ows.BoundingBox.apply(this, [a, b, "wps:BoundingBoxData"]) }, Body: function (a) {
        var b = this.createElementNSPlus("wps:Body", {}); a.wcs ? this.writeNode("wcs:GetCoverage", a.wcs, b) : a.wfs ? (this.featureType = a.wfs.featureType,
          this.version = a.wfs.version, this.writeNode("wfs:GetFeature", a.wfs, b)) : this.writeNode("wps:Execute", a, b); return b
      }
    }, wcs: OpenLayers.Format.WCSGetCoverage.prototype.writers.wcs, wfs: OpenLayers.Format.WFST.v1_1_0.prototype.writers.wfs, ogc: OpenLayers.Format.Filter.v1_1_0.prototype.writers.ogc, ows: OpenLayers.Format.OWSCommon.v1_1_0.prototype.writers.ows
  }, readers: {
    wps: {
      ExecuteResponse: function (a, b) {
      b.executeResponse = {
        lang: a.getAttribute("lang"), statusLocation: a.getAttribute("statusLocation"), serviceInstance: a.getAttribute("serviceInstance"),
        service: a.getAttribute("service")
      }; this.readChildNodes(a, b.executeResponse)
      }, Process: function (a, b) { b.process = {}; this.readChildNodes(a, b.process) }, Status: function (a, b) { b.status = { creationTime: a.getAttribute("creationTime") }; this.readChildNodes(a, b.status) }, ProcessSucceeded: function (a, b) { b.processSucceeded = !0 }, ProcessOutputs: function (a, b) { b.processOutputs = []; this.readChildNodes(a, b.processOutputs) }, Output: function (a, b) { var c = {}; this.readChildNodes(a, c); b.push(c) }, Reference: function (a, b) {
      b.reference =
        { href: a.getAttribute("href"), mimeType: a.getAttribute("mimeType"), encoding: a.getAttribute("encoding"), schema: a.getAttribute("schema") }
      }, Data: function (a, b) { b.data = {}; this.readChildNodes(a, b) }, LiteralData: function (a, b) { b.literalData = { dataType: a.getAttribute("dataType"), uom: a.getAttribute("uom"), value: this.getChildValue(a) } }, ComplexData: function (a, b) {
      b.complexData = { mimeType: a.getAttribute("mimeType"), schema: a.getAttribute("schema"), encoding: a.getAttribute("encoding"), value: "" }; if (this.isSimpleContent(a)) {
        var c;
        for (c = a.firstChild; c; c = c.nextSibling)switch (c.nodeType) { case 3: case 4: b.complexData.value += c.nodeValue }
      } else for (c = a.firstChild; c; c = c.nextSibling)1 == c.nodeType && (b.complexData.value = c)
      }, BoundingBox: function (a, b) { b.boundingBoxData = { dimensions: a.getAttribute("dimensions"), crs: a.getAttribute("crs") }; this.readChildNodes(a, b.boundingBoxData) }
    }, ows: OpenLayers.Format.OWSCommon.v1_1_0.prototype.readers.ows
  }, CLASS_NAME: "OpenLayers.Format.WPSExecute"
}); OpenLayers.Layer.GeoRSS = OpenLayers.Class(OpenLayers.Layer.Markers, {
  location: null, features: null, formatOptions: null, selectedFeature: null, icon: null, popupSize: null, useFeedTitle: !0, initialize: function (a, b, c) { OpenLayers.Layer.Markers.prototype.initialize.apply(this, [a, c]); this.location = b; this.features = [] }, destroy: function () { OpenLayers.Layer.Markers.prototype.destroy.apply(this, arguments); this.clearFeatures(); this.features = null }, loadRSS: function () {
  this.loaded || (this.events.triggerEvent("loadstart"), OpenLayers.Request.GET({
    url: this.location,
    success: this.parseData, scope: this
  }), this.loaded = !0)
  }, moveTo: function (a, b, c) { OpenLayers.Layer.Markers.prototype.moveTo.apply(this, arguments); this.visibility && !this.loaded && this.loadRSS() }, parseData: function (a) {
    var b = a.responseXML; b && b.documentElement || (b = OpenLayers.Format.XML.prototype.read(a.responseText)); if (this.useFeedTitle) { a = null; try { a = b.getElementsByTagNameNS("*", "title")[0].firstChild.nodeValue } catch (c) { a = b.getElementsByTagName("title")[0].firstChild.nodeValue } a && this.setName(a) } a = {}; OpenLayers.Util.extend(a,
      this.formatOptions); this.map && !this.projection.equals(this.map.getProjectionObject()) && (a.externalProjection = this.projection, a.internalProjection = this.map.getProjectionObject()); b = (new OpenLayers.Format.GeoRSS(a)).read(b); a = 0; for (var d = b.length; a < d; a++) {
        var e = {}, f = b[a]; if (f.geometry) {
          var g = f.attributes.title ? f.attributes.title : "Untitled", h = f.attributes.description ? f.attributes.description : "No description.", k = f.attributes.link ? f.attributes.link : "", f = f.geometry.getBounds().getCenterLonLat(); e.icon =
            null == this.icon ? OpenLayers.Marker.defaultIcon() : this.icon.clone(); e.popupSize = this.popupSize ? this.popupSize.clone() : new OpenLayers.Size(250, 120); if (g || h) { e.title = g; e.description = h; var l = '<div class="olLayerGeoRSSClose">[x]</div>', l = l + '<div class="olLayerGeoRSSTitle">'; k && (l += '<a class="link" href="' + k + '" target="_blank">'); l += g; k && (l += "</a>"); l += "</div>"; l += '<div style="" class="olLayerGeoRSSDescription">'; l += h; l += "</div>"; e.popupContentHTML = l } f = new OpenLayers.Feature(this, f, e); this.features.push(f);
          e = f.createMarker(); e.events.register("click", f, this.markerClick); this.addMarker(e)
        }
      } this.events.triggerEvent("loadend")
  }, markerClick: function (a) {
    var b = this == this.layer.selectedFeature; this.layer.selectedFeature = b ? null : this; for (var c = 0, d = this.layer.map.popups.length; c < d; c++)this.layer.map.removePopup(this.layer.map.popups[c]); b || (b = this.createPopup(), OpenLayers.Event.observe(b.div, "click", OpenLayers.Function.bind(function () { for (var a = 0, b = this.layer.map.popups.length; a < b; a++)this.layer.map.removePopup(this.layer.map.popups[a]) },
      this)), this.layer.map.addPopup(b)); OpenLayers.Event.stop(a)
  }, clearFeatures: function () { if (null != this.features) for (; 0 < this.features.length;) { var a = this.features[0]; OpenLayers.Util.removeItem(this.features, a); a.destroy() } }, CLASS_NAME: "OpenLayers.Layer.GeoRSS"
}); OpenLayers.Symbolizer.Point = OpenLayers.Class(OpenLayers.Symbolizer, { initialize: function (a) { OpenLayers.Symbolizer.prototype.initialize.apply(this, arguments) }, CLASS_NAME: "OpenLayers.Symbolizer.Point" }); OpenLayers.Symbolizer.Line = OpenLayers.Class(OpenLayers.Symbolizer, { initialize: function (a) { OpenLayers.Symbolizer.prototype.initialize.apply(this, arguments) }, CLASS_NAME: "OpenLayers.Symbolizer.Line" }); OpenLayers.Symbolizer.Text = OpenLayers.Class(OpenLayers.Symbolizer, { initialize: function (a) { OpenLayers.Symbolizer.prototype.initialize.apply(this, arguments) }, CLASS_NAME: "OpenLayers.Symbolizer.Text" }); OpenLayers.Format.SLD.v1 = OpenLayers.Class(OpenLayers.Format.Filter.v1_0_0, {
  namespaces: { sld: "http://www.opengis.net/sld", ogc: "http://www.opengis.net/ogc", gml: "http://www.opengis.net/gml", xlink: "http://www.w3.org/1999/xlink", xsi: "http://www.w3.org/2001/XMLSchema-instance" }, defaultPrefix: "sld", schemaLocation: null, multipleSymbolizers: !1, featureTypeCounter: null, defaultSymbolizer: {
    fillColor: "#808080", fillOpacity: 1, strokeColor: "#000000", strokeOpacity: 1, strokeWidth: 1, strokeDashstyle: "solid", pointRadius: 3,
    graphicName: "square"
  }, read: function (a, b) { b = OpenLayers.Util.applyDefaults(b, this.options); var c = { namedLayers: !0 === b.namedLayersAsArray ? [] : {} }; this.readChildNodes(a, c); return c }, readers: OpenLayers.Util.applyDefaults({
    sld: {
      StyledLayerDescriptor: function (a, b) { b.version = a.getAttribute("version"); this.readChildNodes(a, b) }, Name: function (a, b) { b.name = this.getChildValue(a) }, Title: function (a, b) { b.title = this.getChildValue(a) }, Abstract: function (a, b) { b.description = this.getChildValue(a) }, NamedLayer: function (a, b) {
        var c =
          { userStyles: [], namedStyles: [] }; this.readChildNodes(a, c); for (var d = 0, e = c.userStyles.length; d < e; ++d)c.userStyles[d].layerName = c.name; OpenLayers.Util.isArray(b.namedLayers) ? b.namedLayers.push(c) : b.namedLayers[c.name] = c
      }, NamedStyle: function (a, b) { b.namedStyles.push(this.getChildName(a.firstChild)) }, UserStyle: function (a, b) {
        var c = { defaultsPerSymbolizer: !0, rules: [] }; this.featureTypeCounter = -1; this.readChildNodes(a, c); this.multipleSymbolizers ? (delete c.defaultsPerSymbolizer, c = new OpenLayers.Style2(c)) : c = new OpenLayers.Style(this.defaultSymbolizer,
          c); b.userStyles.push(c)
      }, IsDefault: function (a, b) { "1" == this.getChildValue(a) && (b.isDefault = !0) }, FeatureTypeStyle: function (a, b) { ++this.featureTypeCounter; var c = { rules: this.multipleSymbolizers ? b.rules : [] }; this.readChildNodes(a, c); this.multipleSymbolizers || (b.rules = c.rules) }, Rule: function (a, b) { var c; this.multipleSymbolizers && (c = { symbolizers: [] }); c = new OpenLayers.Rule(c); this.readChildNodes(a, c); b.rules.push(c) }, ElseFilter: function (a, b) { b.elseFilter = !0 }, MinScaleDenominator: function (a, b) {
      b.minScaleDenominator =
        parseFloat(this.getChildValue(a))
      }, MaxScaleDenominator: function (a, b) { b.maxScaleDenominator = parseFloat(this.getChildValue(a)) }, TextSymbolizer: function (a, b) { var c = {}; this.readChildNodes(a, c); this.multipleSymbolizers ? (c.zIndex = this.featureTypeCounter, b.symbolizers.push(new OpenLayers.Symbolizer.Text(c))) : b.symbolizer.Text = OpenLayers.Util.applyDefaults(c, b.symbolizer.Text) }, LabelPlacement: function (a, b) { this.readChildNodes(a, b) }, PointPlacement: function (a, b) {
        var c = {}; this.readChildNodes(a, c); c.labelRotation =
          c.rotation; delete c.rotation; var d, e = b.labelAnchorPointX, f = b.labelAnchorPointY; e <= 1 / 3 ? d = "l" : e > 1 / 3 && e < 2 / 3 ? d = "c" : e >= 2 / 3 && (d = "r"); f <= 1 / 3 ? d += "b" : f > 1 / 3 && f < 2 / 3 ? d += "m" : f >= 2 / 3 && (d += "t"); c.labelAlign = d; OpenLayers.Util.applyDefaults(b, c)
      }, AnchorPoint: function (a, b) { this.readChildNodes(a, b) }, AnchorPointX: function (a, b) { var c = this.readers.ogc._expression.call(this, a); c && (b.labelAnchorPointX = c) }, AnchorPointY: function (a, b) { var c = this.readers.ogc._expression.call(this, a); c && (b.labelAnchorPointY = c) }, Displacement: function (a,
        b) { this.readChildNodes(a, b) }, DisplacementX: function (a, b) { var c = this.readers.ogc._expression.call(this, a); c && (b.labelXOffset = c) }, DisplacementY: function (a, b) { var c = this.readers.ogc._expression.call(this, a); c && (b.labelYOffset = c) }, LinePlacement: function (a, b) { this.readChildNodes(a, b) }, PerpendicularOffset: function (a, b) { var c = this.readers.ogc._expression.call(this, a); c && (b.labelPerpendicularOffset = c) }, Label: function (a, b) { var c = this.readers.ogc._expression.call(this, a); c && (b.label = c) }, Font: function (a, b) {
          this.readChildNodes(a,
            b)
        }, Halo: function (a, b) { var c = {}; this.readChildNodes(a, c); b.haloRadius = c.haloRadius; b.haloColor = c.fillColor; b.haloOpacity = c.fillOpacity }, Radius: function (a, b) { var c = this.readers.ogc._expression.call(this, a); null != c && (b.haloRadius = c) }, RasterSymbolizer: function (a, b) { var c = {}; this.readChildNodes(a, c); this.multipleSymbolizers ? (c.zIndex = this.featureTypeCounter, b.symbolizers.push(new OpenLayers.Symbolizer.Raster(c))) : b.symbolizer.Raster = OpenLayers.Util.applyDefaults(c, b.symbolizer.Raster) }, Geometry: function (a,
          b) { b.geometry = {}; this.readChildNodes(a, b.geometry) }, ColorMap: function (a, b) { b.colorMap = []; this.readChildNodes(a, b.colorMap) }, ColorMapEntry: function (a, b) { var c = a.getAttribute("quantity"), d = a.getAttribute("opacity"); b.push({ color: a.getAttribute("color"), quantity: null !== c ? parseFloat(c) : void 0, label: a.getAttribute("label") || void 0, opacity: null !== d ? parseFloat(d) : void 0 }) }, LineSymbolizer: function (a, b) {
            var c = {}; this.readChildNodes(a, c); this.multipleSymbolizers ? (c.zIndex = this.featureTypeCounter, b.symbolizers.push(new OpenLayers.Symbolizer.Line(c))) :
              b.symbolizer.Line = OpenLayers.Util.applyDefaults(c, b.symbolizer.Line)
          }, PolygonSymbolizer: function (a, b) { var c = { fill: !1, stroke: !1 }; this.multipleSymbolizers || (c = b.symbolizer.Polygon || c); this.readChildNodes(a, c); this.multipleSymbolizers ? (c.zIndex = this.featureTypeCounter, b.symbolizers.push(new OpenLayers.Symbolizer.Polygon(c))) : b.symbolizer.Polygon = c }, PointSymbolizer: function (a, b) {
            var c = { fill: !1, stroke: !1, graphic: !1 }; this.multipleSymbolizers || (c = b.symbolizer.Point || c); this.readChildNodes(a, c); this.multipleSymbolizers ?
              (c.zIndex = this.featureTypeCounter, b.symbolizers.push(new OpenLayers.Symbolizer.Point(c))) : b.symbolizer.Point = c
          }, Stroke: function (a, b) { b.stroke = !0; this.readChildNodes(a, b) }, Fill: function (a, b) { b.fill = !0; this.readChildNodes(a, b) }, CssParameter: function (a, b) { var c = a.getAttribute("name"), d = this.cssMap[c]; b.label && ("fill" === c ? d = "fontColor" : "fill-opacity" === c && (d = "fontOpacity")); d && (c = this.readers.ogc._expression.call(this, a)) && (b[d] = c) }, Graphic: function (a, b) {
          b.graphic = !0; var c = {}; this.readChildNodes(a, c);
            for (var d = "stroke strokeColor strokeWidth strokeOpacity strokeLinecap fill fillColor fillOpacity graphicName rotation graphicFormat".split(" "), e, f, g = 0, h = d.length; g < h; ++g)e = d[g], f = c[e], void 0 != f && (b[e] = f); void 0 != c.opacity && (b.graphicOpacity = c.opacity); void 0 != c.size && (isNaN(c.size / 2) ? b.graphicWidth = c.size : b.pointRadius = c.size / 2); void 0 != c.href && (b.externalGraphic = c.href); void 0 != c.rotation && (b.rotation = c.rotation)
          }, ExternalGraphic: function (a, b) { this.readChildNodes(a, b) }, Mark: function (a, b) {
            this.readChildNodes(a,
              b)
          }, WellKnownName: function (a, b) { b.graphicName = this.getChildValue(a) }, Opacity: function (a, b) { var c = this.readers.ogc._expression.call(this, a); c && (b.opacity = c) }, Size: function (a, b) { var c = this.readers.ogc._expression.call(this, a); c && (b.size = c) }, Rotation: function (a, b) { var c = this.readers.ogc._expression.call(this, a); c && (b.rotation = c) }, OnlineResource: function (a, b) { b.href = this.getAttributeNS(a, this.namespaces.xlink, "href") }, Format: function (a, b) { b.graphicFormat = this.getChildValue(a) }
    }
  }, OpenLayers.Format.Filter.v1_0_0.prototype.readers),
  cssMap: { stroke: "strokeColor", "stroke-opacity": "strokeOpacity", "stroke-width": "strokeWidth", "stroke-linecap": "strokeLinecap", "stroke-dasharray": "strokeDashstyle", fill: "fillColor", "fill-opacity": "fillOpacity", "font-family": "fontFamily", "font-size": "fontSize", "font-weight": "fontWeight", "font-style": "fontStyle" }, getCssProperty: function (a) { var b = null, c; for (c in this.cssMap) if (this.cssMap[c] == a) { b = c; break } return b }, getGraphicFormat: function (a) {
    var b, c; for (c in this.graphicFormats) if (this.graphicFormats[c].test(a)) {
      b =
      c; break
    } return b || this.defaultGraphicFormat
  }, defaultGraphicFormat: "image/png", graphicFormats: { "image/jpeg": /\.jpe?g$/i, "image/gif": /\.gif$/i, "image/png": /\.png$/i }, write: function (a) { return this.writers.sld.StyledLayerDescriptor.apply(this, [a]) }, writers: OpenLayers.Util.applyDefaults({
    sld: {
      _OGCExpression: function (a, b) {
        var c = this.createElementNSPlus(a), d = "string" == typeof b ? b.split("${") : [b]; c.appendChild(this.createTextNode(d[0])); for (var e, f, g = 1, h = d.length; g < h; g++)e = d[g], f = e.indexOf("}"), 0 < f ? (this.writeNode("ogc:PropertyName",
          { property: e.substring(0, f) }, c), c.appendChild(this.createTextNode(e.substring(++f)))) : c.appendChild(this.createTextNode("${" + e)); return c
      }, StyledLayerDescriptor: function (a) {
        var b = this.createElementNSPlus("sld:StyledLayerDescriptor", { attributes: { version: this.VERSION, "xsi:schemaLocation": this.schemaLocation } }); b.setAttribute("xmlns:ogc", this.namespaces.ogc); b.setAttribute("xmlns:gml", this.namespaces.gml); a.name && this.writeNode("Name", a.name, b); a.title && this.writeNode("Title", a.title, b); a.description &&
          this.writeNode("Abstract", a.description, b); if (OpenLayers.Util.isArray(a.namedLayers)) for (var c = 0, d = a.namedLayers.length; c < d; ++c)this.writeNode("NamedLayer", a.namedLayers[c], b); else for (c in a.namedLayers) this.writeNode("NamedLayer", a.namedLayers[c], b); return b
      }, Name: function (a) { return this.createElementNSPlus("sld:Name", { value: a }) }, Title: function (a) { return this.createElementNSPlus("sld:Title", { value: a }) }, Abstract: function (a) { return this.createElementNSPlus("sld:Abstract", { value: a }) }, NamedLayer: function (a) {
        var b =
          this.createElementNSPlus("sld:NamedLayer"); this.writeNode("Name", a.name, b); if (a.namedStyles) for (var c = 0, d = a.namedStyles.length; c < d; ++c)this.writeNode("NamedStyle", a.namedStyles[c], b); if (a.userStyles) for (c = 0, d = a.userStyles.length; c < d; ++c)this.writeNode("UserStyle", a.userStyles[c], b); return b
      }, NamedStyle: function (a) { var b = this.createElementNSPlus("sld:NamedStyle"); this.writeNode("Name", a, b); return b }, UserStyle: function (a) {
        var b = this.createElementNSPlus("sld:UserStyle"); a.name && this.writeNode("Name",
          a.name, b); a.title && this.writeNode("Title", a.title, b); a.description && this.writeNode("Abstract", a.description, b); a.isDefault && this.writeNode("IsDefault", a.isDefault, b); if (this.multipleSymbolizers && a.rules) {
            for (var c = { 0: [] }, d = [0], e, f, g, h, k, l = 0, m = a.rules.length; l < m; ++l)if (e = a.rules[l], e.symbolizers) { f = {}; for (var n = 0, p = e.symbolizers.length; n < p; ++n)g = e.symbolizers[n], h = g.zIndex, h in f || (k = e.clone(), k.symbolizers = [], f[h] = k), f[h].symbolizers.push(g.clone()); for (h in f) h in c || (d.push(h), c[h] = []), c[h].push(f[h]) } else c[0].push(e.clone());
            d.sort(); l = 0; for (m = d.length; l < m; ++l)e = c[d[l]], 0 < e.length && (k = a.clone(), k.rules = c[d[l]], this.writeNode("FeatureTypeStyle", k, b))
          } else this.writeNode("FeatureTypeStyle", a, b); return b
      }, IsDefault: function (a) { return this.createElementNSPlus("sld:IsDefault", { value: a ? "1" : "0" }) }, FeatureTypeStyle: function (a) { for (var b = this.createElementNSPlus("sld:FeatureTypeStyle"), c = 0, d = a.rules.length; c < d; ++c)this.writeNode("Rule", a.rules[c], b); return b }, Rule: function (a) {
        var b = this.createElementNSPlus("sld:Rule"); a.name &&
          this.writeNode("Name", a.name, b); a.title && this.writeNode("Title", a.title, b); a.description && this.writeNode("Abstract", a.description, b); a.elseFilter ? this.writeNode("ElseFilter", null, b) : a.filter && this.writeNode("ogc:Filter", a.filter, b); void 0 != a.minScaleDenominator && this.writeNode("MinScaleDenominator", a.minScaleDenominator, b); void 0 != a.maxScaleDenominator && this.writeNode("MaxScaleDenominator", a.maxScaleDenominator, b); var c, d; if (this.multipleSymbolizers && a.symbolizers) for (var e = 0, f = a.symbolizers.length; e <
            f; ++e)d = a.symbolizers[e], c = d.CLASS_NAME.split(".").pop(), this.writeNode(c + "Symbolizer", d, b); else for (var f = OpenLayers.Style.SYMBOLIZER_PREFIXES, e = 0, g = f.length; e < g; ++e)c = f[e], (d = a.symbolizer[c]) && this.writeNode(c + "Symbolizer", d, b); return b
      }, ElseFilter: function () { return this.createElementNSPlus("sld:ElseFilter") }, MinScaleDenominator: function (a) { return this.createElementNSPlus("sld:MinScaleDenominator", { value: a }) }, MaxScaleDenominator: function (a) {
        return this.createElementNSPlus("sld:MaxScaleDenominator",
          { value: a })
      }, LineSymbolizer: function (a) { var b = this.createElementNSPlus("sld:LineSymbolizer"); this.writeNode("Stroke", a, b); return b }, Stroke: function (a) {
        var b = this.createElementNSPlus("sld:Stroke"); void 0 != a.strokeColor && this.writeNode("CssParameter", { symbolizer: a, key: "strokeColor" }, b); void 0 != a.strokeOpacity && this.writeNode("CssParameter", { symbolizer: a, key: "strokeOpacity" }, b); void 0 != a.strokeWidth && this.writeNode("CssParameter", { symbolizer: a, key: "strokeWidth" }, b); void 0 != a.strokeDashstyle && "solid" !==
          a.strokeDashstyle && this.writeNode("CssParameter", { symbolizer: a, key: "strokeDashstyle" }, b); void 0 != a.strokeLinecap && this.writeNode("CssParameter", { symbolizer: a, key: "strokeLinecap" }, b); return b
      }, CssParameter: function (a) { return this.createElementNSPlus("sld:CssParameter", { attributes: { name: this.getCssProperty(a.key) }, value: a.symbolizer[a.key] }) }, TextSymbolizer: function (a) {
        var b = this.createElementNSPlus("sld:TextSymbolizer"); null != a.label && this.writeNode("Label", a.label, b); null == a.fontFamily && null == a.fontSize &&
          null == a.fontWeight && null == a.fontStyle || this.writeNode("Font", a, b); null == a.labelAnchorPointX && null == a.labelAnchorPointY && null == a.labelAlign && null == a.labelXOffset && null == a.labelYOffset && null == a.labelRotation && null == a.labelPerpendicularOffset || this.writeNode("LabelPlacement", a, b); null == a.haloRadius && null == a.haloColor && null == a.haloOpacity || this.writeNode("Halo", a, b); null == a.fontColor && null == a.fontOpacity || this.writeNode("Fill", { fillColor: a.fontColor, fillOpacity: a.fontOpacity }, b); return b
      }, LabelPlacement: function (a) {
        var b =
          this.createElementNSPlus("sld:LabelPlacement"); null == a.labelAnchorPointX && null == a.labelAnchorPointY && null == a.labelAlign && null == a.labelXOffset && null == a.labelYOffset && null == a.labelRotation || null != a.labelPerpendicularOffset || this.writeNode("PointPlacement", a, b); null != a.labelPerpendicularOffset && this.writeNode("LinePlacement", a, b); return b
      }, LinePlacement: function (a) { var b = this.createElementNSPlus("sld:LinePlacement"); this.writeNode("PerpendicularOffset", a.labelPerpendicularOffset, b); return b }, PerpendicularOffset: function (a) {
        return this.createElementNSPlus("sld:PerpendicularOffset",
          { value: a })
      }, PointPlacement: function (a) { var b = this.createElementNSPlus("sld:PointPlacement"); null == a.labelAnchorPointX && null == a.labelAnchorPointY && null == a.labelAlign || this.writeNode("AnchorPoint", a, b); null == a.labelXOffset && null == a.labelYOffset || this.writeNode("Displacement", a, b); null != a.labelRotation && this.writeNode("Rotation", a.labelRotation, b); return b }, AnchorPoint: function (a) {
        var b = this.createElementNSPlus("sld:AnchorPoint"), c = a.labelAnchorPointX, d = a.labelAnchorPointY; null != c && this.writeNode("AnchorPointX",
          c, b); null != d && this.writeNode("AnchorPointY", d, b); if (null == c && null == d) { var e = a.labelAlign.substr(0, 1); a = a.labelAlign.substr(1, 1); "l" === e ? c = 0 : "c" === e ? c = 0.5 : "r" === e && (c = 1); "b" === a ? d = 0 : "m" === a ? d = 0.5 : "t" === a && (d = 1); this.writeNode("AnchorPointX", c, b); this.writeNode("AnchorPointY", d, b) } return b
      }, AnchorPointX: function (a) { return this.createElementNSPlus("sld:AnchorPointX", { value: a }) }, AnchorPointY: function (a) { return this.createElementNSPlus("sld:AnchorPointY", { value: a }) }, Displacement: function (a) {
        var b = this.createElementNSPlus("sld:Displacement");
        null != a.labelXOffset && this.writeNode("DisplacementX", a.labelXOffset, b); null != a.labelYOffset && this.writeNode("DisplacementY", a.labelYOffset, b); return b
      }, DisplacementX: function (a) { return this.createElementNSPlus("sld:DisplacementX", { value: a }) }, DisplacementY: function (a) { return this.createElementNSPlus("sld:DisplacementY", { value: a }) }, Font: function (a) {
        var b = this.createElementNSPlus("sld:Font"); a.fontFamily && this.writeNode("CssParameter", { symbolizer: a, key: "fontFamily" }, b); a.fontSize && this.writeNode("CssParameter",
          { symbolizer: a, key: "fontSize" }, b); a.fontWeight && this.writeNode("CssParameter", { symbolizer: a, key: "fontWeight" }, b); a.fontStyle && this.writeNode("CssParameter", { symbolizer: a, key: "fontStyle" }, b); return b
      }, Label: function (a) { return this.writers.sld._OGCExpression.call(this, "sld:Label", a) }, Halo: function (a) {
        var b = this.createElementNSPlus("sld:Halo"); a.haloRadius && this.writeNode("Radius", a.haloRadius, b); (a.haloColor || a.haloOpacity) && this.writeNode("Fill", { fillColor: a.haloColor, fillOpacity: a.haloOpacity }, b);
        return b
      }, Radius: function (a) { return this.createElementNSPlus("sld:Radius", { value: a }) }, RasterSymbolizer: function (a) { var b = this.createElementNSPlus("sld:RasterSymbolizer"); a.geometry && this.writeNode("Geometry", a.geometry, b); a.opacity && this.writeNode("Opacity", a.opacity, b); a.colorMap && this.writeNode("ColorMap", a.colorMap, b); return b }, Geometry: function (a) { var b = this.createElementNSPlus("sld:Geometry"); a.property && this.writeNode("ogc:PropertyName", a, b); return b }, ColorMap: function (a) {
        for (var b = this.createElementNSPlus("sld:ColorMap"),
          c = 0, d = a.length; c < d; ++c)this.writeNode("ColorMapEntry", a[c], b); return b
      }, ColorMapEntry: function (a) { var b = this.createElementNSPlus("sld:ColorMapEntry"); b.setAttribute("color", a.color); void 0 !== a.opacity && b.setAttribute("opacity", parseFloat(a.opacity)); void 0 !== a.quantity && b.setAttribute("quantity", parseFloat(a.quantity)); void 0 !== a.label && b.setAttribute("label", a.label); return b }, PolygonSymbolizer: function (a) {
        var b = this.createElementNSPlus("sld:PolygonSymbolizer"); !1 !== a.fill && this.writeNode("Fill",
          a, b); !1 !== a.stroke && this.writeNode("Stroke", a, b); return b
      }, Fill: function (a) { var b = this.createElementNSPlus("sld:Fill"); a.fillColor && this.writeNode("CssParameter", { symbolizer: a, key: "fillColor" }, b); null != a.fillOpacity && this.writeNode("CssParameter", { symbolizer: a, key: "fillOpacity" }, b); return b }, PointSymbolizer: function (a) { var b = this.createElementNSPlus("sld:PointSymbolizer"); this.writeNode("Graphic", a, b); return b }, Graphic: function (a) {
        var b = this.createElementNSPlus("sld:Graphic"); void 0 != a.externalGraphic ?
          this.writeNode("ExternalGraphic", a, b) : this.writeNode("Mark", a, b); void 0 != a.graphicOpacity && this.writeNode("Opacity", a.graphicOpacity, b); void 0 != a.pointRadius ? this.writeNode("Size", 2 * a.pointRadius, b) : void 0 != a.graphicWidth && this.writeNode("Size", a.graphicWidth, b); void 0 != a.rotation && this.writeNode("Rotation", a.rotation, b); return b
      }, ExternalGraphic: function (a) {
        var b = this.createElementNSPlus("sld:ExternalGraphic"); this.writeNode("OnlineResource", a.externalGraphic, b); a = a.graphicFormat || this.getGraphicFormat(a.externalGraphic);
        this.writeNode("Format", a, b); return b
      }, Mark: function (a) { var b = this.createElementNSPlus("sld:Mark"); a.graphicName && this.writeNode("WellKnownName", a.graphicName, b); !1 !== a.fill && this.writeNode("Fill", a, b); !1 !== a.stroke && this.writeNode("Stroke", a, b); return b }, WellKnownName: function (a) { return this.createElementNSPlus("sld:WellKnownName", { value: a }) }, Opacity: function (a) { return this.createElementNSPlus("sld:Opacity", { value: a }) }, Size: function (a) {
        return this.writers.sld._OGCExpression.call(this, "sld:Size",
          a)
      }, Rotation: function (a) { return this.createElementNSPlus("sld:Rotation", { value: a }) }, OnlineResource: function (a) { return this.createElementNSPlus("sld:OnlineResource", { attributes: { "xlink:type": "simple", "xlink:href": a } }) }, Format: function (a) { return this.createElementNSPlus("sld:Format", { value: a }) }
    }
  }, OpenLayers.Format.Filter.v1_0_0.prototype.writers), CLASS_NAME: "OpenLayers.Format.SLD.v1"
}); OpenLayers.Layer.WMS = OpenLayers.Class(OpenLayers.Layer.Grid, {
  DEFAULT_PARAMS: { service: "WMS", version: "1.1.1", request: "GetMap", styles: "", format: "image/jpeg" }, isBaseLayer: !0, encodeBBOX: !1, noMagic: !1, yx: {}, initialize: function (a, b, c, d) {
    var e = []; c = OpenLayers.Util.upperCaseObject(c); 1.3 <= parseFloat(c.VERSION) && !c.EXCEPTIONS && (c.EXCEPTIONS = "INIMAGE"); e.push(a, b, c, d); OpenLayers.Layer.Grid.prototype.initialize.apply(this, e); OpenLayers.Util.applyDefaults(this.params, OpenLayers.Util.upperCaseObject(this.DEFAULT_PARAMS));
    !this.noMagic && (this.params.TRANSPARENT && "true" == this.params.TRANSPARENT.toString().toLowerCase()) && (null != d && d.isBaseLayer || (this.isBaseLayer = !1), "image/jpeg" == this.params.FORMAT && (this.params.FORMAT = OpenLayers.Util.alphaHack() ? "image/gif" : "image/png"))
  }, clone: function (a) { null == a && (a = new OpenLayers.Layer.WMS(this.name, this.url, this.params, this.getOptions())); return a = OpenLayers.Layer.Grid.prototype.clone.apply(this, [a]) }, reverseAxisOrder: function () {
    var a = this.projection.getCode(); return 1.3 <= parseFloat(this.params.VERSION) &&
      !!(this.yx[a] || OpenLayers.Projection.defaults[a] && OpenLayers.Projection.defaults[a].yx)
  }, getURL: function (a) { a = this.adjustBounds(a); var b = this.getImageSize(), c = {}, d = this.reverseAxisOrder(); c.BBOX = this.encodeBBOX ? a.toBBOX(null, d) : a.toArray(d); c.WIDTH = b.w; c.HEIGHT = b.h; return this.getFullRequestString(c) }, mergeNewParams: function (a) { a = [OpenLayers.Util.upperCaseObject(a)]; return OpenLayers.Layer.Grid.prototype.mergeNewParams.apply(this, a) }, getFullRequestString: function (a, b) {
    var c = this.map.getProjectionObject(),
    c = this.projection && this.projection.equals(c) ? this.projection.getCode() : c.getCode(), c = "none" == c ? null : c; 1.3 <= parseFloat(this.params.VERSION) ? this.params.CRS = c : this.params.SRS = c; "boolean" == typeof this.params.TRANSPARENT && (a.TRANSPARENT = this.params.TRANSPARENT ? "TRUE" : "FALSE"); return OpenLayers.Layer.Grid.prototype.getFullRequestString.apply(this, arguments)
  }, CLASS_NAME: "OpenLayers.Layer.WMS"
}); OpenLayers.Layer.KaMap = OpenLayers.Class(OpenLayers.Layer.Grid, {
  isBaseLayer: !0, DEFAULT_PARAMS: { i: "jpeg", map: "" }, initialize: function (a, b, c, d) { OpenLayers.Layer.Grid.prototype.initialize.apply(this, arguments); this.params = OpenLayers.Util.applyDefaults(this.params, this.DEFAULT_PARAMS) }, getURL: function (a) { a = this.adjustBounds(a); var b = this.map.getResolution(), c = Math.round(1E4 * this.map.getScale()) / 1E4, d = Math.round(a.left / b); a = -Math.round(a.top / b); return this.getFullRequestString({ t: a, l: d, s: c }) }, calculateGridLayout: function (a,
    b, c) { b = c * this.tileSize.w; c *= this.tileSize.h; return { tilelon: b, tilelat: c, startcol: Math.floor(a.left / b) - this.buffer, startrow: Math.floor(a.top / c) + this.buffer } }, getTileBoundsForGridIndex: function (a, b) { this.getTileOrigin(); var c = this.gridLayout, d = c.tilelon, e = c.tilelat, f = (c.startcol + b) * d, c = (c.startrow - a) * e; return new OpenLayers.Bounds(f, c, f + d, c + e) }, clone: function (a) {
    null == a && (a = new OpenLayers.Layer.KaMap(this.name, this.url, this.params, this.getOptions())); a = OpenLayers.Layer.Grid.prototype.clone.apply(this,
      [a]); null != this.tileSize && (a.tileSize = this.tileSize.clone()); a.grid = []; return a
    }, getTileBounds: function (a) { var b = this.getResolution(), c = b * this.tileSize.w, b = b * this.tileSize.h, d = this.getLonLatFromViewPortPx(a); a = c * Math.floor(d.lon / c); d = b * Math.floor(d.lat / b); return new OpenLayers.Bounds(a, d, a + c, d + b) }, CLASS_NAME: "OpenLayers.Layer.KaMap"
}); OpenLayers.Format.WMC.v1_1_0 = OpenLayers.Class(OpenLayers.Format.WMC.v1, {
  VERSION: "1.1.0", schemaLocation: "http://www.opengis.net/context http://schemas.opengis.net/context/1.1.0/context.xsd", initialize: function (a) { OpenLayers.Format.WMC.v1.prototype.initialize.apply(this, [a]) }, read_sld_MinScaleDenominator: function (a, b) { var c = parseFloat(this.getChildValue(b)); 0 < c && (a.maxScale = c) }, read_sld_MaxScaleDenominator: function (a, b) { a.minScale = parseFloat(this.getChildValue(b)) }, read_wmc_SRS: function (a, b) {
  "srs" in
    a || (a.srs = {}); a.srs[this.getChildValue(b)] = !0
  }, write_wmc_Layer: function (a) {
    var b = OpenLayers.Format.WMC.v1.prototype.write_wmc_Layer.apply(this, [a]); if (a.maxScale) { var c = this.createElementNS(this.namespaces.sld, "sld:MinScaleDenominator"); c.appendChild(this.createTextNode(a.maxScale.toPrecision(16))); b.appendChild(c) } a.minScale && (c = this.createElementNS(this.namespaces.sld, "sld:MaxScaleDenominator"), c.appendChild(this.createTextNode(a.minScale.toPrecision(16))), b.appendChild(c)); if (a.srs) for (var d in a.srs) b.appendChild(this.createElementDefaultNS("SRS",
      d)); b.appendChild(this.write_wmc_FormatList(a)); b.appendChild(this.write_wmc_StyleList(a)); a.dimensions && b.appendChild(this.write_wmc_DimensionList(a)); b.appendChild(this.write_wmc_LayerExtension(a)); return b
  }, CLASS_NAME: "OpenLayers.Format.WMC.v1_1_0"
}); OpenLayers.Format.XLS = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, { defaultVersion: "1.1.0", stringifyOutput: !0, CLASS_NAME: "OpenLayers.Format.XLS" }); OpenLayers.Format.XLS.v1 = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { xls: "http://www.opengis.net/xls", gml: "http://www.opengis.net/gml", xsi: "http://www.w3.org/2001/XMLSchema-instance" }, regExes: { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g }, xy: !0, defaultPrefix: "xls", schemaLocation: null, read: function (a, b) { OpenLayers.Util.applyDefaults(b, this.options); var c = {}; this.readChildNodes(a, c); return c }, readers: {
    xls: {
      XLS: function (a, b) {
      b.version = a.getAttribute("version");
        this.readChildNodes(a, b)
      }, Response: function (a, b) { this.readChildNodes(a, b) }, GeocodeResponse: function (a, b) { b.responseLists = []; this.readChildNodes(a, b) }, GeocodeResponseList: function (a, b) { var c = { features: [], numberOfGeocodedAddresses: parseInt(a.getAttribute("numberOfGeocodedAddresses")) }; b.responseLists.push(c); this.readChildNodes(a, c) }, GeocodedAddress: function (a, b) { var c = new OpenLayers.Feature.Vector; b.features.push(c); this.readChildNodes(a, c); c.geometry = c.components[0] }, GeocodeMatchCode: function (a, b) {
        b.attributes.matchCode =
        { accuracy: parseFloat(a.getAttribute("accuracy")), matchType: a.getAttribute("matchType") }
      }, Address: function (a, b) { var c = { countryCode: a.getAttribute("countryCode"), addressee: a.getAttribute("addressee"), street: [], place: [] }; b.attributes.address = c; this.readChildNodes(a, c) }, freeFormAddress: function (a, b) { b.freeFormAddress = this.getChildValue(a) }, StreetAddress: function (a, b) { this.readChildNodes(a, b) }, Building: function (a, b) {
      b.building = {
        number: a.getAttribute("number"), subdivision: a.getAttribute("subdivision"),
        buildingName: a.getAttribute("buildingName")
      }
      }, Street: function (a, b) { b.street.push(this.getChildValue(a)) }, Place: function (a, b) { b.place[a.getAttribute("type")] = this.getChildValue(a) }, PostalCode: function (a, b) { b.postalCode = this.getChildValue(a) }
    }, gml: OpenLayers.Format.GML.v3.prototype.readers.gml
  }, write: function (a) { return this.writers.xls.XLS.apply(this, [a]) }, writers: {
    xls: {
      XLS: function (a) {
        var b = this.createElementNSPlus("xls:XLS", { attributes: { version: this.VERSION, "xsi:schemaLocation": this.schemaLocation } });
        this.writeNode("RequestHeader", a.header, b); this.writeNode("Request", a, b); return b
      }, RequestHeader: function (a) { return this.createElementNSPlus("xls:RequestHeader") }, Request: function (a) { var b = this.createElementNSPlus("xls:Request", { attributes: { methodName: "GeocodeRequest", requestID: a.requestID || "", version: this.VERSION } }); this.writeNode("GeocodeRequest", a.addresses, b); return b }, GeocodeRequest: function (a) {
        for (var b = this.createElementNSPlus("xls:GeocodeRequest"), c = 0, d = a.length; c < d; c++)this.writeNode("Address",
          a[c], b); return b
      }, Address: function (a) { var b = this.createElementNSPlus("xls:Address", { attributes: { countryCode: a.countryCode } }); a.freeFormAddress ? this.writeNode("freeFormAddress", a.freeFormAddress, b) : (a.street && this.writeNode("StreetAddress", a, b), a.municipality && this.writeNode("Municipality", a.municipality, b), a.countrySubdivision && this.writeNode("CountrySubdivision", a.countrySubdivision, b), a.postalCode && this.writeNode("PostalCode", a.postalCode, b)); return b }, freeFormAddress: function (a) {
        return this.createElementNSPlus("freeFormAddress",
          { value: a })
      }, StreetAddress: function (a) { var b = this.createElementNSPlus("xls:StreetAddress"); a.building && this.writeNode(b, "Building", a.building); a = a.street; OpenLayers.Util.isArray(a) || (a = [a]); for (var c = 0, d = a.length; c < d; c++)this.writeNode("Street", a[c], b); return b }, Building: function (a) { return this.createElementNSPlus("xls:Building", { attributes: { number: a.number, subdivision: a.subdivision, buildingName: a.buildingName } }) }, Street: function (a) { return this.createElementNSPlus("xls:Street", { value: a }) }, Municipality: function (a) {
        return this.createElementNSPlus("xls:Place",
          { attributes: { type: "Municipality" }, value: a })
      }, CountrySubdivision: function (a) { return this.createElementNSPlus("xls:Place", { attributes: { type: "CountrySubdivision" }, value: a }) }, PostalCode: function (a) { return this.createElementNSPlus("xls:PostalCode", { value: a }) }
    }
  }, CLASS_NAME: "OpenLayers.Format.XLS.v1"
}); OpenLayers.Format.XLS.v1_1_0 = OpenLayers.Class(OpenLayers.Format.XLS.v1, { VERSION: "1.1", schemaLocation: "http://www.opengis.net/xls http://schemas.opengis.net/ols/1.1.0/LocationUtilityService.xsd", CLASS_NAME: "OpenLayers.Format.XLS.v1_1_0" }); OpenLayers.Format.XLS.v1_1 = OpenLayers.Format.XLS.v1_1_0; OpenLayers.Renderer.SVG = OpenLayers.Class(OpenLayers.Renderer.Elements, {
  xmlns: "http://www.w3.org/2000/svg", xlinkns: "http://www.w3.org/1999/xlink", MAX_PIXEL: 15E3, translationParameters: null, symbolMetrics: null, initialize: function (a) { this.supported() && (OpenLayers.Renderer.Elements.prototype.initialize.apply(this, arguments), this.translationParameters = { x: 0, y: 0 }, this.symbolMetrics = {}) }, supported: function () {
    return document.implementation && (document.implementation.hasFeature("org.w3c.svg", "1.0") || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#SVG",
      "1.1") || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"))
  }, inValidRange: function (a, b, c) { a += c ? 0 : this.translationParameters.x; b += c ? 0 : this.translationParameters.y; return a >= -this.MAX_PIXEL && a <= this.MAX_PIXEL && b >= -this.MAX_PIXEL && b <= this.MAX_PIXEL }, setExtent: function (a, b) {
    var c = OpenLayers.Renderer.Elements.prototype.setExtent.apply(this, arguments), d = this.getResolution(), e = -a.left / d, d = a.top / d; if (b) return this.left = e, this.top = d, this.rendererRoot.setAttributeNS(null,
      "viewBox", "0 0 " + this.size.w + " " + this.size.h), this.translate(this.xOffset, 0), !0; (e = this.translate(e - this.left + this.xOffset, d - this.top)) || this.setExtent(a, !0); return c && e
  }, translate: function (a, b) { if (this.inValidRange(a, b, !0)) { var c = ""; if (a || b) c = "translate(" + a + "," + b + ")"; this.root.setAttributeNS(null, "transform", c); this.translationParameters = { x: a, y: b }; return !0 } return !1 }, setSize: function (a) {
    OpenLayers.Renderer.prototype.setSize.apply(this, arguments); this.rendererRoot.setAttributeNS(null, "width", this.size.w);
    this.rendererRoot.setAttributeNS(null, "height", this.size.h)
  }, getNodeType: function (a, b) { var c = null; switch (a.CLASS_NAME) { case "OpenLayers.Geometry.Point": c = b.externalGraphic ? "image" : this.isComplexSymbol(b.graphicName) ? "svg" : "circle"; break; case "OpenLayers.Geometry.Rectangle": c = "rect"; break; case "OpenLayers.Geometry.LineString": c = "polyline"; break; case "OpenLayers.Geometry.LinearRing": c = "polygon"; break; case "OpenLayers.Geometry.Polygon": case "OpenLayers.Geometry.Curve": c = "path" }return c }, setStyle: function (a,
    b, c) {
      b = b || a._style; c = c || a._options; var d = b.title || b.graphicTitle; if (d) { a.setAttributeNS(null, "title", d); var e = a.getElementsByTagName("title"); 0 < e.length ? e[0].firstChild.textContent = d : (e = this.nodeFactory(null, "title"), e.textContent = d, a.appendChild(e)) } var e = parseFloat(a.getAttributeNS(null, "r")), d = 1, f; if ("OpenLayers.Geometry.Point" == a._geometryClass && e) {
        a.style.visibility = ""; if (!1 === b.graphic) a.style.visibility = "hidden"; else if (b.externalGraphic) {
          f = this.getPosition(a); b.graphicWidth && b.graphicHeight &&
            a.setAttributeNS(null, "preserveAspectRatio", "none"); var e = b.graphicWidth || b.graphicHeight, g = b.graphicHeight || b.graphicWidth, e = e ? e : 2 * b.pointRadius, g = g ? g : 2 * b.pointRadius, h = void 0 != b.graphicYOffset ? b.graphicYOffset : -(0.5 * g), k = b.graphicOpacity || b.fillOpacity; a.setAttributeNS(null, "x", (f.x + (void 0 != b.graphicXOffset ? b.graphicXOffset : -(0.5 * e))).toFixed()); a.setAttributeNS(null, "y", (f.y + h).toFixed()); a.setAttributeNS(null, "width", e); a.setAttributeNS(null, "height", g); a.setAttributeNS(this.xlinkns, "xlink:href",
              b.externalGraphic); a.setAttributeNS(null, "style", "opacity: " + k); a.onclick = OpenLayers.Event.preventDefault
        } else if (this.isComplexSymbol(b.graphicName)) {
          var e = 3 * b.pointRadius, g = 2 * e, l = this.importSymbol(b.graphicName); f = this.getPosition(a); d = 3 * this.symbolMetrics[l.id][0] / g; h = a.parentNode; k = a.nextSibling; h && h.removeChild(a); a.firstChild && a.removeChild(a.firstChild); a.appendChild(l.firstChild.cloneNode(!0)); a.setAttributeNS(null, "viewBox", l.getAttributeNS(null, "viewBox")); a.setAttributeNS(null, "width",
            g); a.setAttributeNS(null, "height", g); a.setAttributeNS(null, "x", f.x - e); a.setAttributeNS(null, "y", f.y - e); k ? h.insertBefore(a, k) : h && h.appendChild(a)
        } else a.setAttributeNS(null, "r", b.pointRadius); e = b.rotation; void 0 === e && void 0 === a._rotation || !f || (a._rotation = e, e |= 0, "svg" !== a.nodeName ? a.setAttributeNS(null, "transform", "rotate(" + e + " " + f.x + " " + f.y + ")") : (f = this.symbolMetrics[l.id], a.firstChild.setAttributeNS(null, "transform", "rotate(" + e + " " + f[1] + " " + f[2] + ")")))
      } c.isFilled ? (a.setAttributeNS(null, "fill", b.fillColor),
        a.setAttributeNS(null, "fill-opacity", b.fillOpacity)) : a.setAttributeNS(null, "fill", "none"); c.isStroked ? (a.setAttributeNS(null, "stroke", b.strokeColor), a.setAttributeNS(null, "stroke-opacity", b.strokeOpacity), a.setAttributeNS(null, "stroke-width", b.strokeWidth * d), a.setAttributeNS(null, "stroke-linecap", b.strokeLinecap || "round"), a.setAttributeNS(null, "stroke-linejoin", "round"), b.strokeDashstyle && a.setAttributeNS(null, "stroke-dasharray", this.dashStyle(b, d))) : a.setAttributeNS(null, "stroke", "none"); b.pointerEvents &&
          a.setAttributeNS(null, "pointer-events", b.pointerEvents); null != b.cursor && a.setAttributeNS(null, "cursor", b.cursor); return a
  }, dashStyle: function (a, b) { var c = a.strokeWidth * b, d = a.strokeDashstyle; switch (d) { case "solid": return "none"; case "dot": return [1, 4 * c].join(); case "dash": return [4 * c, 4 * c].join(); case "dashdot": return [4 * c, 4 * c, 1, 4 * c].join(); case "longdash": return [8 * c, 4 * c].join(); case "longdashdot": return [8 * c, 4 * c, 1, 4 * c].join(); default: return OpenLayers.String.trim(d).replace(/\s+/g, ",") } }, createNode: function (a,
    b) { var c = document.createElementNS(this.xmlns, a); b && c.setAttributeNS(null, "id", b); return c }, nodeTypeCompare: function (a, b) { return b == a.nodeName }, createRenderRoot: function () { var a = this.nodeFactory(this.container.id + "_svgRoot", "svg"); a.style.display = "block"; return a }, createRoot: function (a) { return this.nodeFactory(this.container.id + a, "g") }, createDefs: function () { var a = this.nodeFactory(this.container.id + "_defs", "defs"); this.rendererRoot.appendChild(a); return a }, drawPoint: function (a, b) {
      return this.drawCircle(a,
        b, 1)
    }, drawCircle: function (a, b, c) { var d = this.getResolution(), e = (b.x - this.featureDx) / d + this.left; b = this.top - b.y / d; return this.inValidRange(e, b) ? (a.setAttributeNS(null, "cx", e), a.setAttributeNS(null, "cy", b), a.setAttributeNS(null, "r", c), a) : !1 }, drawLineString: function (a, b) { var c = this.getComponentsString(b.components); return c.path ? (a.setAttributeNS(null, "points", c.path), c.complete ? a : null) : !1 }, drawLinearRing: function (a, b) {
      var c = this.getComponentsString(b.components); return c.path ? (a.setAttributeNS(null,
        "points", c.path), c.complete ? a : null) : !1
    }, drawPolygon: function (a, b) { for (var c = "", d = !0, e = !0, f, g, h = 0, k = b.components.length; h < k; h++)c += " M", f = this.getComponentsString(b.components[h].components, " "), (g = f.path) ? (c += " " + g, e = f.complete && e) : d = !1; return d ? (a.setAttributeNS(null, "d", c + " z"), a.setAttributeNS(null, "fill-rule", "evenodd"), e ? a : null) : !1 }, drawRectangle: function (a, b) {
      var c = this.getResolution(), d = (b.x - this.featureDx) / c + this.left, e = this.top - b.y / c; return this.inValidRange(d, e) ? (a.setAttributeNS(null, "x",
        d), a.setAttributeNS(null, "y", e), a.setAttributeNS(null, "width", b.width / c), a.setAttributeNS(null, "height", b.height / c), a) : !1
    }, drawText: function (a, b, c) {
      var d = !!b.labelOutlineWidth; if (d) { var e = OpenLayers.Util.extend({}, b); e.fontColor = e.labelOutlineColor; e.fontStrokeColor = e.labelOutlineColor; e.fontStrokeWidth = b.labelOutlineWidth; b.labelOutlineOpacity && (e.fontOpacity = b.labelOutlineOpacity); delete e.labelOutlineWidth; this.drawText(a, e, c) } var f = this.getResolution(), e = (c.x - this.featureDx) / f + this.left, g = c.y /
        f - this.top, d = d ? this.LABEL_OUTLINE_SUFFIX : this.LABEL_ID_SUFFIX, f = this.nodeFactory(a + d, "text"); f.setAttributeNS(null, "x", e); f.setAttributeNS(null, "y", -g); b.fontColor && f.setAttributeNS(null, "fill", b.fontColor); b.fontStrokeColor && f.setAttributeNS(null, "stroke", b.fontStrokeColor); b.fontStrokeWidth && f.setAttributeNS(null, "stroke-width", b.fontStrokeWidth); b.fontOpacity && f.setAttributeNS(null, "opacity", b.fontOpacity); b.fontFamily && f.setAttributeNS(null, "font-family", b.fontFamily); b.fontSize && f.setAttributeNS(null,
          "font-size", b.fontSize); b.fontWeight && f.setAttributeNS(null, "font-weight", b.fontWeight); b.fontStyle && f.setAttributeNS(null, "font-style", b.fontStyle); !0 === b.labelSelect ? (f.setAttributeNS(null, "pointer-events", "visible"), f._featureId = a) : f.setAttributeNS(null, "pointer-events", "none"); g = b.labelAlign || OpenLayers.Renderer.defaultSymbolizer.labelAlign; f.setAttributeNS(null, "text-anchor", OpenLayers.Renderer.SVG.LABEL_ALIGN[g[0]] || "middle"); !0 === OpenLayers.IS_GECKO && f.setAttributeNS(null, "dominant-baseline",
            OpenLayers.Renderer.SVG.LABEL_ALIGN[g[1]] || "central"); for (var h = b.label.split("\n"), k = h.length; f.childNodes.length > k;)f.removeChild(f.lastChild); for (var l = 0; l < k; l++) {
              var m = this.nodeFactory(a + d + "_tspan_" + l, "tspan"); !0 === b.labelSelect && (m._featureId = a, m._geometry = c, m._geometryClass = c.CLASS_NAME); !1 === OpenLayers.IS_GECKO && m.setAttributeNS(null, "baseline-shift", OpenLayers.Renderer.SVG.LABEL_VSHIFT[g[1]] || "-35%"); m.setAttribute("x", e); if (0 == l) {
                var n = OpenLayers.Renderer.SVG.LABEL_VFACTOR[g[1]]; null == n &&
                  (n = -0.5); m.setAttribute("dy", n * (k - 1) + "em")
              } else m.setAttribute("dy", "1em"); m.textContent = "" === h[l] ? " " : h[l]; m.parentNode || f.appendChild(m)
            } f.parentNode || this.textRoot.appendChild(f)
    }, getComponentsString: function (a, b) { for (var c = [], d = !0, e = a.length, f = [], g, h = 0; h < e; h++)g = a[h], c.push(g), (g = this.getShortString(g)) ? f.push(g) : (0 < h && this.getShortString(a[h - 1]) && f.push(this.clipLine(a[h], a[h - 1])), h < e - 1 && this.getShortString(a[h + 1]) && f.push(this.clipLine(a[h], a[h + 1])), d = !1); return { path: f.join(b || ","), complete: d } },
  clipLine: function (a, b) { if (b.equals(a)) return ""; var c = this.getResolution(), d = this.MAX_PIXEL - this.translationParameters.x, e = this.MAX_PIXEL - this.translationParameters.y, f = (b.x - this.featureDx) / c + this.left, g = this.top - b.y / c, h = (a.x - this.featureDx) / c + this.left, c = this.top - a.y / c, k; if (h < -d || h > d) k = (c - g) / (h - f), h = 0 > h ? -d : d, c = g + (h - f) * k; if (c < -e || c > e) k = (h - f) / (c - g), c = 0 > c ? -e : e, h = f + (c - g) * k; return h + "," + c }, getShortString: function (a) {
    var b = this.getResolution(), c = (a.x - this.featureDx) / b + this.left; a = this.top - a.y / b; return this.inValidRange(c,
      a) ? c + "," + a : !1
  }, getPosition: function (a) { return { x: parseFloat(a.getAttributeNS(null, "cx")), y: parseFloat(a.getAttributeNS(null, "cy")) } }, importSymbol: function (a) {
  this.defs || (this.defs = this.createDefs()); var b = this.container.id + "-" + a, c = document.getElementById(b); if (null != c) return c; var d = OpenLayers.Renderer.symbol[a]; if (!d) throw Error(a + " is not a valid symbol name"); a = this.nodeFactory(b, "symbol"); var e = this.nodeFactory(null, "polygon"); a.appendChild(e); for (var c = new OpenLayers.Bounds(Number.MAX_VALUE, Number.MAX_VALUE,
    0, 0), f = [], g, h, k = 0; k < d.length; k += 2)g = d[k], h = d[k + 1], c.left = Math.min(c.left, g), c.bottom = Math.min(c.bottom, h), c.right = Math.max(c.right, g), c.top = Math.max(c.top, h), f.push(g, ",", h); e.setAttributeNS(null, "points", f.join(" ")); d = c.getWidth(); e = c.getHeight(); a.setAttributeNS(null, "viewBox", [c.left - d, c.bottom - e, 3 * d, 3 * e].join(" ")); this.symbolMetrics[b] = [Math.max(d, e), c.getCenterLonLat().lon, c.getCenterLonLat().lat]; this.defs.appendChild(a); return a
  }, getFeatureIdFromEvent: function (a) {
    var b = OpenLayers.Renderer.Elements.prototype.getFeatureIdFromEvent.apply(this,
      arguments); b || (b = a.target, b = b.parentNode && b != this.rendererRoot ? b.parentNode._featureId : void 0); return b
  }, CLASS_NAME: "OpenLayers.Renderer.SVG"
}); OpenLayers.Renderer.SVG.LABEL_ALIGN = { l: "start", r: "end", b: "bottom", t: "hanging" }; OpenLayers.Renderer.SVG.LABEL_VSHIFT = { t: "-70%", b: "0" }; OpenLayers.Renderer.SVG.LABEL_VFACTOR = { t: 0, b: -1 }; OpenLayers.Renderer.SVG.preventDefault = function (a) { OpenLayers.Event.preventDefault(a) }; OpenLayers.Format.SLD.v1_0_0 = OpenLayers.Class(OpenLayers.Format.SLD.v1, { VERSION: "1.0.0", schemaLocation: "http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd", CLASS_NAME: "OpenLayers.Format.SLD.v1_0_0" }); OpenLayers.Format.OWSContext = OpenLayers.Class(OpenLayers.Format.Context, { defaultVersion: "0.3.1", getVersion: function (a, b) { var c = OpenLayers.Format.XML.VersionedOGC.prototype.getVersion.apply(this, arguments); "0.3.0" === c && (c = this.defaultVersion); return c }, toContext: function (a) { var b = {}; "OpenLayers.Map" == a.CLASS_NAME && (b.bounds = a.getExtent(), b.maxExtent = a.maxExtent, b.projection = a.projection, b.size = a.getSize(), b.layers = a.layers); return b }, CLASS_NAME: "OpenLayers.Format.OWSContext" }); OpenLayers.Format.OWSContext.v0_3_1 = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { owc: "http://www.opengis.net/ows-context", gml: "http://www.opengis.net/gml", kml: "http://www.opengis.net/kml/2.2", ogc: "http://www.opengis.net/ogc", ows: "http://www.opengis.net/ows", sld: "http://www.opengis.net/sld", xlink: "http://www.w3.org/1999/xlink", xsi: "http://www.w3.org/2001/XMLSchema-instance" }, VERSION: "0.3.1", schemaLocation: "http://www.opengis.net/ows-context http://www.ogcnetwork.net/schemas/owc/0.3.1/owsContext.xsd",
  defaultPrefix: "owc", extractAttributes: !0, xy: !0, regExes: { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g }, featureNS: "http://mapserver.gis.umn.edu/mapserver", featureType: "vector", geometryName: "geometry", nestingLayerLookup: null, initialize: function (a) { OpenLayers.Format.XML.prototype.initialize.apply(this, [a]); OpenLayers.Format.GML.v2.prototype.setGeometryTypes.call(this) }, setNestingPath: function (a) {
    if (a.layersContext) for (var b = 0, c = a.layersContext.length; b < c; b++) {
      var d =
        a.layersContext[b], e = [], f = a.title || ""; a.metadata && a.metadata.nestingPath && (e = a.metadata.nestingPath.slice()); "" != f && e.push(f); d.metadata.nestingPath = e; d.layersContext && this.setNestingPath(d)
    }
  }, decomposeNestingPath: function (a) { var b = []; if (OpenLayers.Util.isArray(a)) { for (a = a.slice(); 0 < a.length;)b.push(a.slice()), a.pop(); b.reverse() } return b }, read: function (a) {
  "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); a && 9 == a.nodeType && (a = a.documentElement); var b = {}; this.readNode(a,
    b); this.setNestingPath({ layersContext: b.layersContext }); a = []; this.processLayer(a, b); delete b.layersContext; b.layersContext = a; return b
  }, processLayer: function (a, b) { if (b.layersContext) for (var c = 0, d = b.layersContext.length; c < d; c++) { var e = b.layersContext[c]; a.push(e); e.layersContext && this.processLayer(a, e) } }, write: function (a, b) {
  this.nestingLayerLookup = {}; b = b || {}; OpenLayers.Util.applyDefaults(b, a); var c = this.writeNode("OWSContext", b); this.nestingLayerLookup = null; this.setAttributeNS(c, this.namespaces.xsi,
    "xsi:schemaLocation", this.schemaLocation); return OpenLayers.Format.XML.prototype.write.apply(this, [c])
  }, readers: {
    kml: { Document: function (a, b) { b.features = (new OpenLayers.Format.KML({ kmlns: this.namespaces.kml, extractStyles: !0 })).read(a) } }, owc: {
      OWSContext: function (a, b) { this.readChildNodes(a, b) }, General: function (a, b) { this.readChildNodes(a, b) }, ResourceList: function (a, b) { this.readChildNodes(a, b) }, Layer: function (a, b) {
        var c = {
          metadata: {}, visibility: "1" != a.getAttribute("hidden"), queryable: "1" == a.getAttribute("queryable"),
          opacity: null != a.getAttribute("opacity") ? parseFloat(a.getAttribute("opacity")) : null, name: a.getAttribute("name"), categoryLayer: null == a.getAttribute("name"), formats: [], styles: []
        }; b.layersContext || (b.layersContext = []); b.layersContext.push(c); this.readChildNodes(a, c)
      }, InlineGeometry: function (a, b) {
      b.features = []; var c = this.getElementsByTagNameNS(a, this.namespaces.gml, "featureMember"), d; 1 <= c.length && (d = c[0]); d && d.firstChild && (c = d.firstChild.nextSibling ? d.firstChild.nextSibling : d.firstChild, this.setNamespace("feature",
        c.namespaceURI), this.featureType = c.localName || c.nodeName.split(":").pop(), this.readChildNodes(a, b))
      }, Server: function (a, b) { if (!b.service && !b.version || b.service != OpenLayers.Format.Context.serviceTypes.WMS) b.service = a.getAttribute("service"), b.version = a.getAttribute("version"), this.readChildNodes(a, b) }, Name: function (a, b) { b.name = this.getChildValue(a); this.readChildNodes(a, b) }, Title: function (a, b) { b.title = this.getChildValue(a); this.readChildNodes(a, b) }, StyleList: function (a, b) { this.readChildNodes(a, b.styles) },
      Style: function (a, b) { var c = {}; b.push(c); this.readChildNodes(a, c) }, LegendURL: function (a, b) { var c = {}; b.legend = c; this.readChildNodes(a, c) }, OnlineResource: function (a, b) { b.url = this.getAttributeNS(a, this.namespaces.xlink, "href"); this.readChildNodes(a, b) }
    }, ows: OpenLayers.Format.OWSCommon.v1_0_0.prototype.readers.ows, gml: OpenLayers.Format.GML.v2.prototype.readers.gml, sld: OpenLayers.Format.SLD.v1_0_0.prototype.readers.sld, feature: OpenLayers.Format.GML.v2.prototype.readers.feature
  }, writers: {
    owc: {
      OWSContext: function (a) {
        var b =
          this.createElementNSPlus("OWSContext", { attributes: { version: this.VERSION, id: a.id || OpenLayers.Util.createUniqueID("OpenLayers_OWSContext_") } }); this.writeNode("General", a, b); this.writeNode("ResourceList", a, b); return b
      }, General: function (a) { var b = this.createElementNSPlus("General"); this.writeNode("ows:BoundingBox", a, b); this.writeNode("ows:Title", a.title || "OpenLayers OWSContext", b); return b }, ResourceList: function (a) {
        for (var b = this.createElementNSPlus("ResourceList"), c = 0, d = a.layers.length; c < d; c++) {
          var e =
            a.layers[c], f = this.decomposeNestingPath(e.metadata.nestingPath); this.writeNode("_Layer", { layer: e, subPaths: f }, b)
        } return b
      }, Server: function (a) { var b = this.createElementNSPlus("Server", { attributes: { version: a.version, service: a.service } }); this.writeNode("OnlineResource", a, b); return b }, OnlineResource: function (a) { return this.createElementNSPlus("OnlineResource", { attributes: { "xlink:href": a.url } }) }, InlineGeometry: function (a) {
        var b = this.createElementNSPlus("InlineGeometry"), c = a.getDataExtent(); null !== c && this.writeNode("gml:boundedBy",
          c, b); for (var c = 0, d = a.features.length; c < d; c++)this.writeNode("gml:featureMember", a.features[c], b); return b
      }, StyleList: function (a) { for (var b = this.createElementNSPlus("StyleList"), c = 0, d = a.length; c < d; c++)this.writeNode("Style", a[c], b); return b }, Style: function (a) { var b = this.createElementNSPlus("Style"); this.writeNode("Name", a, b); this.writeNode("Title", a, b); a.legend && this.writeNode("LegendURL", a, b); return b }, Name: function (a) { return this.createElementNSPlus("Name", { value: a.name }) }, Title: function (a) {
        return this.createElementNSPlus("Title",
          { value: a.title })
      }, LegendURL: function (a) { var b = this.createElementNSPlus("LegendURL"); this.writeNode("OnlineResource", a.legend, b); return b }, _WMS: function (a) {
        var b = this.createElementNSPlus("Layer", { attributes: { name: a.params.LAYERS, queryable: a.queryable ? "1" : "0", hidden: a.visibility ? "0" : "1", opacity: a.hasOwnProperty("opacity") ? a.opacity : null } }); this.writeNode("ows:Title", a.name, b); this.writeNode("ows:OutputFormat", a.params.FORMAT, b); this.writeNode("Server", {
          service: OpenLayers.Format.Context.serviceTypes.WMS,
          version: a.params.VERSION, url: a.url
        }, b); a.metadata.styles && 0 < a.metadata.styles.length && this.writeNode("StyleList", a.metadata.styles, b); return b
      }, _Layer: function (a) {
        var b, c, d; b = a.layer; c = a.subPaths; d = null; 0 < c.length ? (b = c[0].join("/"), c = b.lastIndexOf("/"), d = this.nestingLayerLookup[b], c = 0 < c ? b.substring(c + 1, b.length) : b, d || (d = this.createElementNSPlus("Layer"), this.writeNode("ows:Title", c, d), this.nestingLayerLookup[b] = d), a.subPaths.shift(), this.writeNode("_Layer", a, d)) : (b instanceof OpenLayers.Layer.WMS ?
          d = this.writeNode("_WMS", b) : b instanceof OpenLayers.Layer.Vector && (b.protocol instanceof OpenLayers.Protocol.WFS.v1 ? d = this.writeNode("_WFS", b) : b.protocol instanceof OpenLayers.Protocol.HTTP ? b.protocol.format instanceof OpenLayers.Format.GML ? (b.protocol.format.version = "2.1.2", d = this.writeNode("_GML", b)) : b.protocol.format instanceof OpenLayers.Format.KML && (b.protocol.format.version = "2.2", d = this.writeNode("_KML", b)) : (this.setNamespace("feature", this.featureNS), d = this.writeNode("_InlineGeometry", b))),
          b.options.maxScale && this.writeNode("sld:MinScaleDenominator", b.options.maxScale, d), b.options.minScale && this.writeNode("sld:MaxScaleDenominator", b.options.minScale, d), this.nestingLayerLookup[b.name] = d); return d
      }, _WFS: function (a) {
        var b = this.createElementNSPlus("Layer", { attributes: { name: a.protocol.featurePrefix + ":" + a.protocol.featureType, hidden: a.visibility ? "0" : "1" } }); this.writeNode("ows:Title", a.name, b); this.writeNode("Server", {
          service: OpenLayers.Format.Context.serviceTypes.WFS, version: a.protocol.version,
          url: a.protocol.url
        }, b); return b
      }, _InlineGeometry: function (a) { var b = this.createElementNSPlus("Layer", { attributes: { name: this.featureType, hidden: a.visibility ? "0" : "1" } }); this.writeNode("ows:Title", a.name, b); this.writeNode("InlineGeometry", a, b); return b }, _GML: function (a) { var b = this.createElementNSPlus("Layer"); this.writeNode("ows:Title", a.name, b); this.writeNode("Server", { service: OpenLayers.Format.Context.serviceTypes.GML, url: a.protocol.url, version: a.protocol.format.version }, b); return b }, _KML: function (a) {
        var b =
          this.createElementNSPlus("Layer"); this.writeNode("ows:Title", a.name, b); this.writeNode("Server", { service: OpenLayers.Format.Context.serviceTypes.KML, version: a.protocol.format.version, url: a.protocol.url }, b); return b
      }
    }, gml: OpenLayers.Util.applyDefaults({ boundedBy: function (a) { var b = this.createElementNSPlus("gml:boundedBy"); this.writeNode("gml:Box", a, b); return b } }, OpenLayers.Format.GML.v2.prototype.writers.gml), ows: OpenLayers.Format.OWSCommon.v1_0_0.prototype.writers.ows, sld: OpenLayers.Format.SLD.v1_0_0.prototype.writers.sld,
    feature: OpenLayers.Format.GML.v2.prototype.writers.feature
  }, CLASS_NAME: "OpenLayers.Format.OWSContext.v0_3_1"
}); OpenLayers.Popup = OpenLayers.Class({
  events: null, id: "", lonlat: null, div: null, contentSize: null, size: null, contentHTML: null, backgroundColor: "", opacity: "", border: "", contentDiv: null, groupDiv: null, closeDiv: null, autoSize: !1, minSize: null, maxSize: null, displayClass: "olPopup", contentDisplayClass: "olPopupContent", padding: 0, disableFirefoxOverflowHack: !1, fixPadding: function () { "number" == typeof this.padding && (this.padding = new OpenLayers.Bounds(this.padding, this.padding, this.padding, this.padding)) }, panMapIfOutOfView: !1,
  keepInMap: !1, closeOnMove: !1, map: null, initialize: function (a, b, c, d, e, f) {
  null == a && (a = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_")); this.id = a; this.lonlat = b; this.contentSize = null != c ? c : new OpenLayers.Size(OpenLayers.Popup.WIDTH, OpenLayers.Popup.HEIGHT); null != d && (this.contentHTML = d); this.backgroundColor = OpenLayers.Popup.COLOR; this.opacity = OpenLayers.Popup.OPACITY; this.border = OpenLayers.Popup.BORDER; this.div = OpenLayers.Util.createDiv(this.id, null, null, null, null, null, "hidden"); this.div.className = this.displayClass;
    this.groupDiv = OpenLayers.Util.createDiv(this.id + "_GroupDiv", null, null, null, "relative", null, "hidden"); a = this.div.id + "_contentDiv"; this.contentDiv = OpenLayers.Util.createDiv(a, null, this.contentSize.clone(), null, "relative"); this.contentDiv.className = this.contentDisplayClass; this.groupDiv.appendChild(this.contentDiv); this.div.appendChild(this.groupDiv); e && this.addCloseBox(f); this.registerEvents()
  }, destroy: function () {
  this.border = this.opacity = this.backgroundColor = this.contentHTML = this.size = this.lonlat = this.id =
    null; this.closeOnMove && this.map && this.map.events.unregister("movestart", this, this.hide); this.events.destroy(); this.events = null; this.closeDiv && (OpenLayers.Event.stopObservingElement(this.closeDiv), this.groupDiv.removeChild(this.closeDiv)); this.closeDiv = null; this.div.removeChild(this.groupDiv); this.groupDiv = null; null != this.map && this.map.removePopup(this); this.panMapIfOutOfView = this.padding = this.maxSize = this.minSize = this.autoSize = this.div = this.map = null
  }, draw: function (a) {
  null == a && null != this.lonlat && null !=
    this.map && (a = this.map.getLayerPxFromLonLat(this.lonlat)); this.closeOnMove && this.map.events.register("movestart", this, this.hide); this.disableFirefoxOverflowHack || "firefox" != OpenLayers.BROWSER_NAME || (this.map.events.register("movestart", this, function () { var a = document.defaultView.getComputedStyle(this.contentDiv, null).getPropertyValue("overflow"); "hidden" != a && (this.contentDiv._oldOverflow = a, this.contentDiv.style.overflow = "hidden") }), this.map.events.register("moveend", this, function () {
      var a = this.contentDiv._oldOverflow;
      a && (this.contentDiv.style.overflow = a, this.contentDiv._oldOverflow = null)
    })); this.moveTo(a); this.autoSize || this.size || this.setSize(this.contentSize); this.setBackgroundColor(); this.setOpacity(); this.setBorder(); this.setContentHTML(); this.panMapIfOutOfView && this.panIntoView(); return this.div
  }, updatePosition: function () { if (this.lonlat && this.map) { var a = this.map.getLayerPxFromLonLat(this.lonlat); a && this.moveTo(a) } }, moveTo: function (a) {
  null != a && null != this.div && (this.div.style.left = a.x + "px", this.div.style.top =
    a.y + "px")
  }, visible: function () { return OpenLayers.Element.visible(this.div) }, toggle: function () { this.visible() ? this.hide() : this.show() }, show: function () { this.div.style.display = ""; this.panMapIfOutOfView && this.panIntoView() }, hide: function () { this.div.style.display = "none" }, setSize: function (a) {
  this.size = a.clone(); var b = this.getContentDivPadding(), c = b.left + b.right, d = b.top + b.bottom; this.fixPadding(); c += this.padding.left + this.padding.right; d += this.padding.top + this.padding.bottom; if (this.closeDiv) var e = parseInt(this.closeDiv.style.width),
    c = c + (e + b.right); this.size.w += c; this.size.h += d; "msie" == OpenLayers.BROWSER_NAME && (this.contentSize.w += b.left + b.right, this.contentSize.h += b.bottom + b.top); null != this.div && (this.div.style.width = this.size.w + "px", this.div.style.height = this.size.h + "px"); null != this.contentDiv && (this.contentDiv.style.width = a.w + "px", this.contentDiv.style.height = a.h + "px")
  }, updateSize: function () {
    var a = "<div class='" + this.contentDisplayClass + "'>" + this.contentDiv.innerHTML + "</div>", b = this.map ? this.map.div : document.body, c = OpenLayers.Util.getRenderedDimensions(a,
      null, { displayClass: this.displayClass, containerElement: b }), d = this.getSafeContentSize(c), e = null; d.equals(c) ? e = c : (c = { w: d.w < c.w ? d.w : null, h: d.h < c.h ? d.h : null }, c.w && c.h ? e = d : (a = OpenLayers.Util.getRenderedDimensions(a, c, { displayClass: this.contentDisplayClass, containerElement: b }), "hidden" != OpenLayers.Element.getStyle(this.contentDiv, "overflow") && a.equals(d) && (d = OpenLayers.Util.getScrollbarWidth(), c.w ? a.h += d : a.w += d), e = this.getSafeContentSize(a))); this.setSize(e)
  }, setBackgroundColor: function (a) {
  void 0 != a && (this.backgroundColor =
    a); null != this.div && (this.div.style.backgroundColor = this.backgroundColor)
  }, setOpacity: function (a) { void 0 != a && (this.opacity = a); null != this.div && (this.div.style.opacity = this.opacity, this.div.style.filter = "alpha(opacity=" + 100 * this.opacity + ")") }, setBorder: function (a) { void 0 != a && (this.border = a); null != this.div && (this.div.style.border = this.border) }, setContentHTML: function (a) {
  null != a && (this.contentHTML = a); null != this.contentDiv && (null != this.contentHTML && this.contentHTML != this.contentDiv.innerHTML) && (this.contentDiv.innerHTML =
    this.contentHTML, this.autoSize && (this.registerImageListeners(), this.updateSize()))
  }, registerImageListeners: function () {
    for (var a = function () { null !== this.popup.id && (this.popup.updateSize(), this.popup.visible() && this.popup.panMapIfOutOfView && this.popup.panIntoView(), OpenLayers.Event.stopObserving(this.img, "load", this.img._onImgLoad)) }, b = this.contentDiv.getElementsByTagName("img"), c = 0, d = b.length; c < d; c++) {
      var e = b[c]; if (0 == e.width || 0 == e.height) e._onImgLoad = OpenLayers.Function.bind(a, { popup: this, img: e }),
        OpenLayers.Event.observe(e, "load", e._onImgLoad)
    }
  }, getSafeContentSize: function (a) {
    a = a.clone(); var b = this.getContentDivPadding(), c = b.left + b.right, d = b.top + b.bottom; this.fixPadding(); c += this.padding.left + this.padding.right; d += this.padding.top + this.padding.bottom; if (this.closeDiv) var e = parseInt(this.closeDiv.style.width), c = c + (e + b.right); this.minSize && (a.w = Math.max(a.w, this.minSize.w - c), a.h = Math.max(a.h, this.minSize.h - d)); this.maxSize && (a.w = Math.min(a.w, this.maxSize.w - c), a.h = Math.min(a.h, this.maxSize.h -
      d)); if (this.map && this.map.size) {
        e = b = 0; if (this.keepInMap && !this.panMapIfOutOfView) switch (e = this.map.getPixelFromLonLat(this.lonlat), this.relativePosition) { case "tr": b = e.x; e = this.map.size.h - e.y; break; case "tl": b = this.map.size.w - e.x; e = this.map.size.h - e.y; break; case "bl": b = this.map.size.w - e.x; e = e.y; break; case "br": b = e.x; e = e.y; break; default: b = e.x, e = this.map.size.h - e.y }d = this.map.size.h - this.map.paddingForPopups.top - this.map.paddingForPopups.bottom - d - e; a.w = Math.min(a.w, this.map.size.w - this.map.paddingForPopups.left -
          this.map.paddingForPopups.right - c - b); a.h = Math.min(a.h, d)
      } return a
  }, getContentDivPadding: function () {
    var a = this._contentDivPadding; a || (null == this.div.parentNode && (this.div.style.display = "none", document.body.appendChild(this.div)), this._contentDivPadding = a = new OpenLayers.Bounds(OpenLayers.Element.getStyle(this.contentDiv, "padding-left"), OpenLayers.Element.getStyle(this.contentDiv, "padding-bottom"), OpenLayers.Element.getStyle(this.contentDiv, "padding-right"), OpenLayers.Element.getStyle(this.contentDiv,
      "padding-top")), this.div.parentNode == document.body && (document.body.removeChild(this.div), this.div.style.display = "")); return a
  }, addCloseBox: function (a) {
  this.closeDiv = OpenLayers.Util.createDiv(this.id + "_close", null, { w: 17, h: 17 }); this.closeDiv.className = "olPopupCloseBox"; var b = this.getContentDivPadding(); this.closeDiv.style.right = b.right + "px"; this.closeDiv.style.top = b.top + "px"; this.groupDiv.appendChild(this.closeDiv); a = a || function (a) { this.hide(); OpenLayers.Event.stop(a) }; OpenLayers.Event.observe(this.closeDiv,
    "touchend", OpenLayers.Function.bindAsEventListener(a, this)); OpenLayers.Event.observe(this.closeDiv, "click", OpenLayers.Function.bindAsEventListener(a, this))
  }, panIntoView: function () {
    var a = this.map.getSize(), b = this.map.getViewPortPxFromLayerPx(new OpenLayers.Pixel(parseInt(this.div.style.left), parseInt(this.div.style.top))), c = b.clone(); b.x < this.map.paddingForPopups.left ? c.x = this.map.paddingForPopups.left : b.x + this.size.w > a.w - this.map.paddingForPopups.right && (c.x = a.w - this.map.paddingForPopups.right - this.size.w);
    b.y < this.map.paddingForPopups.top ? c.y = this.map.paddingForPopups.top : b.y + this.size.h > a.h - this.map.paddingForPopups.bottom && (c.y = a.h - this.map.paddingForPopups.bottom - this.size.h); this.map.pan(b.x - c.x, b.y - c.y)
  }, registerEvents: function () {
  this.events = new OpenLayers.Events(this, this.div, null, !0); this.events.on({
    mousedown: this.onmousedown, mousemove: this.onmousemove, mouseup: this.onmouseup, click: this.onclick, mouseout: this.onmouseout, dblclick: this.ondblclick, touchstart: function (a) { OpenLayers.Event.stop(a, !0) },
    scope: this
  })
  }, onmousedown: function (a) { this.mousedown = !0; OpenLayers.Event.stop(a, !0) }, onmousemove: function (a) { this.mousedown && OpenLayers.Event.stop(a, !0) }, onmouseup: function (a) { this.mousedown && (this.mousedown = !1, OpenLayers.Event.stop(a, !0)) }, onclick: function (a) { OpenLayers.Event.stop(a, !0) }, onmouseout: function (a) { this.mousedown = !1 }, ondblclick: function (a) { OpenLayers.Event.stop(a, !0) }, CLASS_NAME: "OpenLayers.Popup"
}); OpenLayers.Popup.WIDTH = 200; OpenLayers.Popup.HEIGHT = 200; OpenLayers.Popup.COLOR = "white";
OpenLayers.Popup.OPACITY = 1; OpenLayers.Popup.BORDER = "0px"; OpenLayers.Control.ScaleLine = OpenLayers.Class(OpenLayers.Control, {
  maxWidth: 100, topOutUnits: "km", topInUnits: "m", bottomOutUnits: "mi", bottomInUnits: "ft", eTop: null, eBottom: null, geodesic: !1, draw: function () {
    OpenLayers.Control.prototype.draw.apply(this, arguments); this.eTop || (this.eTop = document.createElement("div"), this.eTop.className = this.displayClass + "Top", this.div.appendChild(this.eTop), this.eTop.style.visibility = "" == this.topOutUnits || "" == this.topInUnits ? "hidden" : "visible", this.eBottom = document.createElement("div"),
      this.eBottom.className = this.displayClass + "Bottom", this.div.appendChild(this.eBottom), this.eBottom.style.visibility = "" == this.bottomOutUnits || "" == this.bottomInUnits ? "hidden" : "visible"); this.map.events.register("moveend", this, this.update); this.update(); return this.div
  }, getBarLen: function (a) { var b = parseInt(Math.log(a) / Math.log(10)), b = Math.pow(10, b); a = parseInt(a / b); return (5 < a ? 5 : 2 < a ? 2 : 1) * b }, update: function () {
    var a = this.map.getResolution(); if (a) {
      var b = this.map.getUnits(), c = OpenLayers.INCHES_PER_UNIT, d = this.maxWidth *
        a * c[b], e = 1; !0 === this.geodesic && (e = (this.map.getGeodesicPixelSize().w || 1E-6) * this.maxWidth / (d / c.km), d *= e); var f, g; 1E5 < d ? (f = this.topOutUnits, g = this.bottomOutUnits) : (f = this.topInUnits, g = this.bottomInUnits); var h = d / c[f], k = d / c[g], d = this.getBarLen(h), l = this.getBarLen(k), h = d / c[b] * c[f], k = l / c[b] * c[g], b = h / a / e, a = k / a / e; "visible" == this.eBottom.style.visibility && (this.eBottom.style.width = Math.round(a) + "px", this.eBottom.innerHTML = l + " " + g); "visible" == this.eTop.style.visibility && (this.eTop.style.width = Math.round(b) +
          "px", this.eTop.innerHTML = d + " " + f)
    }
  }, CLASS_NAME: "OpenLayers.Control.ScaleLine"
}); OpenLayers.Icon = OpenLayers.Class({
  url: null, size: null, offset: null, calculateOffset: null, imageDiv: null, px: null, initialize: function (a, b, c, d) { this.url = a; this.size = b || { w: 20, h: 20 }; this.offset = c || { x: -(this.size.w / 2), y: -(this.size.h / 2) }; this.calculateOffset = d; a = OpenLayers.Util.createUniqueID("OL_Icon_"); this.imageDiv = OpenLayers.Util.createAlphaImageDiv(a) }, destroy: function () { this.erase(); OpenLayers.Event.stopObservingElement(this.imageDiv.firstChild); this.imageDiv.innerHTML = ""; this.imageDiv = null }, clone: function () {
    return new OpenLayers.Icon(this.url,
      this.size, this.offset, this.calculateOffset)
  }, setSize: function (a) { null != a && (this.size = a); this.draw() }, setUrl: function (a) { null != a && (this.url = a); this.draw() }, draw: function (a) { OpenLayers.Util.modifyAlphaImageDiv(this.imageDiv, null, null, this.size, this.url, "absolute"); this.moveTo(a); return this.imageDiv }, erase: function () { null != this.imageDiv && null != this.imageDiv.parentNode && OpenLayers.Element.remove(this.imageDiv) }, setOpacity: function (a) {
    OpenLayers.Util.modifyAlphaImageDiv(this.imageDiv, null, null, null, null,
      null, null, null, a)
  }, moveTo: function (a) { null != a && (this.px = a); null != this.imageDiv && (null == this.px ? this.display(!1) : (this.calculateOffset && (this.offset = this.calculateOffset(this.size)), OpenLayers.Util.modifyAlphaImageDiv(this.imageDiv, null, { x: this.px.x + this.offset.x, y: this.px.y + this.offset.y }))) }, display: function (a) { this.imageDiv.style.display = a ? "" : "none" }, isDrawn: function () { return this.imageDiv && this.imageDiv.parentNode && 11 != this.imageDiv.parentNode.nodeType }, CLASS_NAME: "OpenLayers.Icon"
}); OpenLayers.Marker = OpenLayers.Class({
  icon: null, lonlat: null, events: null, map: null, initialize: function (a, b) { this.lonlat = a; var c = b ? b : OpenLayers.Marker.defaultIcon(); null == this.icon ? this.icon = c : (this.icon.url = c.url, this.icon.size = c.size, this.icon.offset = c.offset, this.icon.calculateOffset = c.calculateOffset); this.events = new OpenLayers.Events(this, this.icon.imageDiv) }, destroy: function () { this.erase(); this.map = null; this.events.destroy(); this.events = null; null != this.icon && (this.icon.destroy(), this.icon = null) },
  draw: function (a) { return this.icon.draw(a) }, erase: function () { null != this.icon && this.icon.erase() }, moveTo: function (a) { null != a && null != this.icon && this.icon.moveTo(a); this.lonlat = this.map.getLonLatFromLayerPx(a) }, isDrawn: function () { return this.icon && this.icon.isDrawn() }, onScreen: function () { var a = !1; this.map && (a = this.map.getExtent().containsLonLat(this.lonlat)); return a }, inflate: function (a) { this.icon && this.icon.setSize({ w: this.icon.size.w * a, h: this.icon.size.h * a }) }, setOpacity: function (a) { this.icon.setOpacity(a) },
  setUrl: function (a) { this.icon.setUrl(a) }, display: function (a) { this.icon.display(a) }, CLASS_NAME: "OpenLayers.Marker"
}); OpenLayers.Marker.defaultIcon = function () { return new OpenLayers.Icon(OpenLayers.Util.getImageLocation("marker.png"), { w: 21, h: 25 }, { x: -10.5, y: -25 }) }; OpenLayers.Layer.TileCache = OpenLayers.Class(OpenLayers.Layer.Grid, {
  isBaseLayer: !0, format: "image/png", serverResolutions: null, initialize: function (a, b, c, d) { this.layername = c; OpenLayers.Layer.Grid.prototype.initialize.apply(this, [a, b, {}, d]); this.extension = this.format.split("/")[1].toLowerCase(); this.extension = "jpg" == this.extension ? "jpeg" : this.extension }, clone: function (a) {
  null == a && (a = new OpenLayers.Layer.TileCache(this.name, this.url, this.layername, this.getOptions())); return a = OpenLayers.Layer.Grid.prototype.clone.apply(this,
    [a])
  }, getURL: function (a) {
    var b = this.getServerResolution(), c = this.maxExtent, d = this.tileSize, e = Math.round((a.left - c.left) / (b * d.w)); a = Math.round((a.bottom - c.bottom) / (b * d.h)); b = null != this.serverResolutions ? OpenLayers.Util.indexOf(this.serverResolutions, b) : this.map.getZoom(); e = [this.layername, OpenLayers.Number.zeroPad(b, 2), OpenLayers.Number.zeroPad(parseInt(e / 1E6), 3), OpenLayers.Number.zeroPad(parseInt(e / 1E3) % 1E3, 3), OpenLayers.Number.zeroPad(parseInt(e) % 1E3, 3), OpenLayers.Number.zeroPad(parseInt(a / 1E6),
      3), OpenLayers.Number.zeroPad(parseInt(a / 1E3) % 1E3, 3), OpenLayers.Number.zeroPad(parseInt(a) % 1E3, 3) + "." + this.extension].join("/"); b = this.url; OpenLayers.Util.isArray(b) && (b = this.selectUrl(e, b)); b = "/" == b.charAt(b.length - 1) ? b : b + "/"; return b + e
  }, CLASS_NAME: "OpenLayers.Layer.TileCache"
}); OpenLayers.Strategy.Paging = OpenLayers.Class(OpenLayers.Strategy, {
  features: null, length: 10, num: null, paging: !1, activate: function () { var a = OpenLayers.Strategy.prototype.activate.call(this); if (a) this.layer.events.on({ beforefeaturesadded: this.cacheFeatures, scope: this }); return a }, deactivate: function () { var a = OpenLayers.Strategy.prototype.deactivate.call(this); a && (this.clearCache(), this.layer.events.un({ beforefeaturesadded: this.cacheFeatures, scope: this })); return a }, cacheFeatures: function (a) {
  this.paging || (this.clearCache(),
    this.features = a.features, this.pageNext(a))
  }, clearCache: function () { if (this.features) for (var a = 0; a < this.features.length; ++a)this.features[a].destroy(); this.num = this.features = null }, pageCount: function () { return Math.ceil((this.features ? this.features.length : 0) / this.length) }, pageNum: function () { return this.num }, pageLength: function (a) { a && 0 < a && (this.length = a); return this.length }, pageNext: function (a) { var b = !1; this.features && (null === this.num && (this.num = -1), b = this.page((this.num + 1) * this.length, a)); return b }, pagePrevious: function () {
    var a =
      !1; this.features && (null === this.num && (this.num = this.pageCount()), a = this.page((this.num - 1) * this.length)); return a
  }, page: function (a, b) { var c = !1; if (this.features && 0 <= a && a < this.features.length) { var d = Math.floor(a / this.length); d != this.num && (this.paging = !0, c = this.features.slice(a, a + this.length), this.layer.removeFeatures(this.layer.features), this.num = d, b && b.features ? b.features = c : this.layer.addFeatures(c), this.paging = !1, c = !0) } return c }, CLASS_NAME: "OpenLayers.Strategy.Paging"
}); OpenLayers.Control.DragFeature = OpenLayers.Class(OpenLayers.Control, {
  geometryTypes: null, onStart: function (a, b) { }, onDrag: function (a, b) { }, onComplete: function (a, b) { }, onEnter: function (a) { }, onLeave: function (a) { }, documentDrag: !1, layer: null, feature: null, dragCallbacks: {}, featureCallbacks: {}, lastPixel: null, initialize: function (a, b) {
    OpenLayers.Control.prototype.initialize.apply(this, [b]); this.layer = a; this.handlers = {
      drag: new OpenLayers.Handler.Drag(this, OpenLayers.Util.extend({
        down: this.downFeature, move: this.moveFeature,
        up: this.upFeature, out: this.cancel, done: this.doneDragging
      }, this.dragCallbacks), { documentDrag: this.documentDrag }), feature: new OpenLayers.Handler.Feature(this, this.layer, OpenLayers.Util.extend({ click: this.clickFeature, clickout: this.clickoutFeature, over: this.overFeature, out: this.outFeature }, this.featureCallbacks), { geometryTypes: this.geometryTypes })
    }
  }, clickFeature: function (a) {
    this.handlers.feature.touch && (!this.over && this.overFeature(a)) && (this.handlers.drag.dragstart(this.handlers.feature.evt), this.handlers.drag.stopDown =
      !1)
  }, clickoutFeature: function (a) { this.handlers.feature.touch && this.over && (this.outFeature(a), this.handlers.drag.stopDown = !0) }, destroy: function () { this.layer = null; OpenLayers.Control.prototype.destroy.apply(this, []) }, activate: function () { return this.handlers.feature.activate() && OpenLayers.Control.prototype.activate.apply(this, arguments) }, deactivate: function () {
    this.handlers.drag.deactivate(); this.handlers.feature.deactivate(); this.feature = null; this.dragging = !1; this.lastPixel = null; OpenLayers.Element.removeClass(this.map.viewPortDiv,
      this.displayClass + "Over"); return OpenLayers.Control.prototype.deactivate.apply(this, arguments)
  }, overFeature: function (a) { var b = !1; this.handlers.drag.dragging ? this.over = this.feature.id == a.id ? !0 : !1 : (this.feature = a, this.handlers.drag.activate(), this.over = b = !0, OpenLayers.Element.addClass(this.map.viewPortDiv, this.displayClass + "Over"), this.onEnter(a)); return b }, downFeature: function (a) { this.lastPixel = a; this.onStart(this.feature, a) }, moveFeature: function (a) {
    var b = this.map.getResolution(); this.feature.geometry.move(b *
      (a.x - this.lastPixel.x), b * (this.lastPixel.y - a.y)); this.layer.drawFeature(this.feature); this.lastPixel = a; this.onDrag(this.feature, a)
  }, upFeature: function (a) { this.over || this.handlers.drag.deactivate() }, doneDragging: function (a) { this.onComplete(this.feature, a) }, outFeature: function (a) { this.handlers.drag.dragging ? this.feature.id == a.id && (this.over = !1) : (this.over = !1, this.handlers.drag.deactivate(), OpenLayers.Element.removeClass(this.map.viewPortDiv, this.displayClass + "Over"), this.onLeave(a), this.feature = null) },
  cancel: function () { this.handlers.drag.deactivate(); this.over = !1 }, setMap: function (a) { this.handlers.drag.setMap(a); this.handlers.feature.setMap(a); OpenLayers.Control.prototype.setMap.apply(this, arguments) }, CLASS_NAME: "OpenLayers.Control.DragFeature"
}); OpenLayers.Control.TransformFeature = OpenLayers.Class(OpenLayers.Control, {
  geometryTypes: null, layer: null, preserveAspectRatio: !1, rotate: !0, feature: null, renderIntent: "temporary", rotationHandleSymbolizer: null, box: null, center: null, scale: 1, ratio: 1, rotation: 0, handles: null, rotationHandles: null, dragControl: null, irregular: !1, initialize: function (a, b) {
    OpenLayers.Control.prototype.initialize.apply(this, [b]); this.layer = a; this.rotationHandleSymbolizer || (this.rotationHandleSymbolizer = {
      stroke: !1, pointRadius: 10, fillOpacity: 0,
      cursor: "pointer"
    }); this.createBox(); this.createControl()
  }, activate: function () { var a = !1; OpenLayers.Control.prototype.activate.apply(this, arguments) && (this.dragControl.activate(), this.layer.addFeatures([this.box]), this.rotate && this.layer.addFeatures(this.rotationHandles), this.layer.addFeatures(this.handles), a = !0); return a }, deactivate: function () {
    var a = !1; OpenLayers.Control.prototype.deactivate.apply(this, arguments) && (this.layer.removeFeatures(this.handles), this.rotate && this.layer.removeFeatures(this.rotationHandles),
      this.layer.removeFeatures([this.box]), this.dragControl.deactivate(), a = !0); return a
  }, setMap: function (a) { this.dragControl.setMap(a); OpenLayers.Control.prototype.setMap.apply(this, arguments) }, setFeature: function (a, b) {
    b = OpenLayers.Util.applyDefaults(b, { rotation: 0, scale: 1, ratio: 1 }); var c = this.rotation, d = this.center; OpenLayers.Util.extend(this, b); if (!1 !== this.events.triggerEvent("beforesetfeature", { feature: a })) {
    this.feature = a; this.activate(); this._setfeature = !0; var e = this.feature.geometry.getBounds(); this.box.move(e.getCenterLonLat());
      this.box.geometry.rotate(-c, d); this._angle = 0; this.rotation ? (c = a.geometry.clone(), c.rotate(-this.rotation, this.center), c = new OpenLayers.Feature.Vector(c.getBounds().toGeometry()), c.geometry.rotate(this.rotation, this.center), this.box.geometry.rotate(this.rotation, this.center), this.box.move(c.geometry.getBounds().getCenterLonLat()), c = c.geometry.components[0].components[0].getBounds().getCenterLonLat()) : c = new OpenLayers.LonLat(e.left, e.bottom); this.handles[0].move(c); delete this._setfeature; this.events.triggerEvent("setfeature",
        { feature: a })
    }
  }, unsetFeature: function () { this.active ? this.deactivate() : (this.feature = null, this.rotation = 0, this.ratio = this.scale = 1) }, createBox: function () {
    var a = this; this.center = new OpenLayers.Geometry.Point(0, 0); this.box = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([new OpenLayers.Geometry.Point(-1, -1), new OpenLayers.Geometry.Point(0, -1), new OpenLayers.Geometry.Point(1, -1), new OpenLayers.Geometry.Point(1, 0), new OpenLayers.Geometry.Point(1, 1), new OpenLayers.Geometry.Point(0, 1), new OpenLayers.Geometry.Point(-1,
      1), new OpenLayers.Geometry.Point(-1, 0), new OpenLayers.Geometry.Point(-1, -1)]), null, "string" == typeof this.renderIntent ? null : this.renderIntent); this.box.geometry.move = function (b, c) { a._moving = !0; OpenLayers.Geometry.LineString.prototype.move.apply(this, arguments); a.center.move(b, c); delete a._moving }; for (var b = function (a, b) { OpenLayers.Geometry.Point.prototype.move.apply(this, arguments); this._rotationHandle && this._rotationHandle.geometry.move(a, b); this._handle.geometry.move(a, b) }, c = function (a, b, c) {
        OpenLayers.Geometry.Point.prototype.resize.apply(this,
          arguments); this._rotationHandle && this._rotationHandle.geometry.resize(a, b, c); this._handle.geometry.resize(a, b, c)
      }, d = function (a, b) { OpenLayers.Geometry.Point.prototype.rotate.apply(this, arguments); this._rotationHandle && this._rotationHandle.geometry.rotate(a, b); this._handle.geometry.rotate(a, b) }, e = function (b, c) {
        var d = this.x, e = this.y; OpenLayers.Geometry.Point.prototype.move.call(this, b, c); if (!a._moving) {
          var f = a.dragControl.handlers.drag.evt, g = !(!a._setfeature && a.preserveAspectRatio) && !(f && f.shiftKey),
          h = new OpenLayers.Geometry.Point(d, e), f = a.center; this.rotate(-a.rotation, f); h.rotate(-a.rotation, f); var k = this.x - f.x, l = this.y - f.y, m = k - (this.x - h.x), n = l - (this.y - h.y); a.irregular && !a._setfeature && (k -= (this.x - h.x) / 2, l -= (this.y - h.y) / 2); this.x = d; this.y = e; h = 1; g ? (l = 1E-5 > Math.abs(n) ? 1 : l / n, h = (1E-5 > Math.abs(m) ? 1 : k / m) / l) : (m = Math.sqrt(m * m + n * n), l = Math.sqrt(k * k + l * l) / m); a._moving = !0; a.box.geometry.rotate(-a.rotation, f); delete a._moving; a.box.geometry.resize(l, f, h); a.box.geometry.rotate(a.rotation, f); a.transformFeature({
            scale: l,
            ratio: h
          }); a.irregular && !a._setfeature && (k = f.clone(), k.x += 1E-5 > Math.abs(d - f.x) ? 0 : this.x - d, k.y += 1E-5 > Math.abs(e - f.y) ? 0 : this.y - e, a.box.geometry.move(this.x - d, this.y - e), a.transformFeature({ center: k }))
        }
      }, f = function (b, c) {
        var d = this.x, e = this.y; OpenLayers.Geometry.Point.prototype.move.call(this, b, c); if (!a._moving) {
          var f = a.dragControl.handlers.drag.evt, f = f && f.shiftKey ? 45 : 1, g = a.center, h = this.x - g.x, k = this.y - g.y; this.x = d; this.y = e; d = Math.atan2(k - c, h - b); d = Math.atan2(k, h) - d; d *= 180 / Math.PI; a._angle = (a._angle + d) %
            360; d = a.rotation % f; if (Math.abs(a._angle) >= f || 0 !== d) d = Math.round(a._angle / f) * f - d, a._angle = 0, a.box.geometry.rotate(d, g), a.transformFeature({ rotation: d })
        }
      }, g = Array(8), h = Array(4), k, l, m, n = "sw s se e ne n nw w".split(" "), p = 0; 8 > p; ++p)k = this.box.geometry.components[p], l = new OpenLayers.Feature.Vector(k.clone(), { role: n[p] + "-resize" }, "string" == typeof this.renderIntent ? null : this.renderIntent), 0 == p % 2 && (m = new OpenLayers.Feature.Vector(k.clone(), { role: n[p] + "-rotate" }, "string" == typeof this.rotationHandleSymbolizer ?
        null : this.rotationHandleSymbolizer), m.geometry.move = f, k._rotationHandle = m, h[p / 2] = m), k.move = b, k.resize = c, k.rotate = d, l.geometry.move = e, k._handle = l, g[p] = l; this.rotationHandles = h; this.handles = g
  }, createControl: function () {
    var a = this; this.dragControl = new OpenLayers.Control.DragFeature(this.layer, {
      documentDrag: !0, moveFeature: function (b) { this.feature === a.feature && (this.feature = a.box); OpenLayers.Control.DragFeature.prototype.moveFeature.apply(this, arguments) }, onDrag: function (b, c) { b === a.box && a.transformFeature({ center: a.center }) },
      onStart: function (b, c) { var d = !a.geometryTypes || -1 !== OpenLayers.Util.indexOf(a.geometryTypes, b.geometry.CLASS_NAME), e = OpenLayers.Util.indexOf(a.handles, b), e = e + OpenLayers.Util.indexOf(a.rotationHandles, b); b !== a.feature && (b !== a.box && -2 == e && d) && a.setFeature(b) }, onComplete: function (b, c) { a.events.triggerEvent("transformcomplete", { feature: a.feature }) }
    })
  }, drawHandles: function () {
    for (var a = this.layer, b = 0; 8 > b; ++b)this.rotate && 0 === b % 2 && a.drawFeature(this.rotationHandles[b / 2], this.rotationHandleSymbolizer), a.drawFeature(this.handles[b],
      this.renderIntent)
  }, transformFeature: function (a) {
    if (!this._setfeature) {
    this.scale *= a.scale || 1; this.ratio *= a.ratio || 1; var b = this.rotation; this.rotation = (this.rotation + (a.rotation || 0)) % 360; if (!1 !== this.events.triggerEvent("beforetransform", a)) {
      var c = this.feature, d = c.geometry, e = this.center; d.rotate(-b, e); a.scale || a.ratio ? d.resize(a.scale, e, a.ratio) : a.center && c.move(a.center.getBounds().getCenterLonLat()); d.rotate(this.rotation, e); this.layer.drawFeature(c); c.toState(OpenLayers.State.UPDATE); this.events.triggerEvent("transform",
        a)
    }
    } this.layer.drawFeature(this.box, this.renderIntent); this.drawHandles()
  }, destroy: function () { for (var a, b = 0; 8 > b; ++b)a = this.box.geometry.components[b], a._handle.destroy(), a._handle = null, a._rotationHandle && a._rotationHandle.destroy(), a._rotationHandle = null; this.rotationHandles = this.rotationHandleSymbolizer = this.handles = this.feature = this.center = null; this.box.destroy(); this.layer = this.box = null; this.dragControl.destroy(); this.dragControl = null; OpenLayers.Control.prototype.destroy.apply(this, arguments) },
  CLASS_NAME: "OpenLayers.Control.TransformFeature"
}); OpenLayers.Handler.Box = OpenLayers.Class(OpenLayers.Handler, {
  dragHandler: null, boxDivClassName: "olHandlerBoxZoomBox", boxOffsets: null, initialize: function (a, b, c) { OpenLayers.Handler.prototype.initialize.apply(this, arguments); this.dragHandler = new OpenLayers.Handler.Drag(this, { down: this.startBox, move: this.moveBox, out: this.removeBox, up: this.endBox }, { keyMask: this.keyMask }) }, destroy: function () {
    OpenLayers.Handler.prototype.destroy.apply(this, arguments); this.dragHandler && (this.dragHandler.destroy(), this.dragHandler =
      null)
  }, setMap: function (a) { OpenLayers.Handler.prototype.setMap.apply(this, arguments); this.dragHandler && this.dragHandler.setMap(a) }, startBox: function (a) { this.callback("start", []); this.zoomBox = OpenLayers.Util.createDiv("zoomBox", { x: -9999, y: -9999 }); this.zoomBox.className = this.boxDivClassName; this.zoomBox.style.zIndex = this.map.Z_INDEX_BASE.Popup - 1; this.map.viewPortDiv.appendChild(this.zoomBox); OpenLayers.Element.addClass(this.map.viewPortDiv, "olDrawBox") }, moveBox: function (a) {
    var b = this.dragHandler.start.x,
    c = this.dragHandler.start.y, d = Math.abs(b - a.x), e = Math.abs(c - a.y), f = this.getBoxOffsets(); this.zoomBox.style.width = d + f.width + 1 + "px"; this.zoomBox.style.height = e + f.height + 1 + "px"; this.zoomBox.style.left = (a.x < b ? b - d - f.left : b - f.left) + "px"; this.zoomBox.style.top = (a.y < c ? c - e - f.top : c - f.top) + "px"
  }, endBox: function (a) {
    var b; if (5 < Math.abs(this.dragHandler.start.x - a.x) || 5 < Math.abs(this.dragHandler.start.y - a.y)) {
      var c = this.dragHandler.start; b = Math.min(c.y, a.y); var d = Math.max(c.y, a.y), e = Math.min(c.x, a.x); a = Math.max(c.x,
        a.x); b = new OpenLayers.Bounds(e, d, a, b)
    } else b = this.dragHandler.start.clone(); this.removeBox(); this.callback("done", [b])
  }, removeBox: function () { this.map.viewPortDiv.removeChild(this.zoomBox); this.boxOffsets = this.zoomBox = null; OpenLayers.Element.removeClass(this.map.viewPortDiv, "olDrawBox") }, activate: function () { return OpenLayers.Handler.prototype.activate.apply(this, arguments) ? (this.dragHandler.activate(), !0) : !1 }, deactivate: function () {
    return OpenLayers.Handler.prototype.deactivate.apply(this, arguments) ?
      (this.dragHandler.deactivate() && this.zoomBox && this.removeBox(), !0) : !1
  }, getBoxOffsets: function () {
    if (!this.boxOffsets) {
      var a = document.createElement("div"); a.style.position = "absolute"; a.style.border = "1px solid black"; a.style.width = "3px"; document.body.appendChild(a); var b = 3 == a.clientWidth; document.body.removeChild(a); var a = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-left-width")), c = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-right-width")), d = parseInt(OpenLayers.Element.getStyle(this.zoomBox,
        "border-top-width")), e = parseInt(OpenLayers.Element.getStyle(this.zoomBox, "border-bottom-width")); this.boxOffsets = { left: a, right: c, top: d, bottom: e, width: !1 === b ? a + c : 0, height: !1 === b ? d + e : 0 }
    } return this.boxOffsets
  }, CLASS_NAME: "OpenLayers.Handler.Box"
}); OpenLayers.Control.ZoomBox = OpenLayers.Class(OpenLayers.Control, {
  type: OpenLayers.Control.TYPE_TOOL, out: !1, keyMask: null, alwaysZoom: !1, zoomOnClick: !0, draw: function () { this.handler = new OpenLayers.Handler.Box(this, { done: this.zoomBox }, { keyMask: this.keyMask }) }, zoomBox: function (a) {
    if (a instanceof OpenLayers.Bounds) {
      var b, c = a.getCenterPixel(); if (this.out) {
        b = Math.min(this.map.size.h / (a.bottom - a.top), this.map.size.w / (a.right - a.left)); var d = this.map.getExtent(), e = this.map.getLonLatFromPixel(c), f = e.lon - d.getWidth() /
          2 * b; a = e.lon + d.getWidth() / 2 * b; var g = e.lat - d.getHeight() / 2 * b; b = e.lat + d.getHeight() / 2 * b; b = new OpenLayers.Bounds(f, g, a, b)
      } else f = this.map.getLonLatFromPixel({ x: a.left, y: a.bottom }), a = this.map.getLonLatFromPixel({ x: a.right, y: a.top }), b = new OpenLayers.Bounds(f.lon, f.lat, a.lon, a.lat); f = this.map.getZoom(); g = this.map.getSize(); a = g.w / 2; g = g.h / 2; b = this.map.getZoomForExtent(b); d = this.map.getResolution(); e = this.map.getResolutionForZoom(b); d == e ? this.map.setCenter(this.map.getLonLatFromPixel(c)) : this.map.zoomTo(b,
        { x: (d * c.x - e * a) / (d - e), y: (d * c.y - e * g) / (d - e) }); f == this.map.getZoom() && !0 == this.alwaysZoom && this.map.zoomTo(f + (this.out ? -1 : 1))
    } else this.zoomOnClick && (this.out ? this.map.zoomTo(this.map.getZoom() - 1, a) : this.map.zoomTo(this.map.getZoom() + 1, a))
  }, CLASS_NAME: "OpenLayers.Control.ZoomBox"
}); OpenLayers.Control.DragPan = OpenLayers.Class(OpenLayers.Control, {
  type: OpenLayers.Control.TYPE_TOOL, panned: !1, interval: 0, documentDrag: !1, kinetic: null, enableKinetic: !0, kineticInterval: 10, draw: function () {
    if (this.enableKinetic && OpenLayers.Kinetic) { var a = { interval: this.kineticInterval }; "object" === typeof this.enableKinetic && (a = OpenLayers.Util.extend(a, this.enableKinetic)); this.kinetic = new OpenLayers.Kinetic(a) } this.handler = new OpenLayers.Handler.Drag(this, { move: this.panMap, done: this.panMapDone, down: this.panMapStart },
      { interval: this.interval, documentDrag: this.documentDrag })
  }, panMapStart: function () { this.kinetic && this.kinetic.begin() }, panMap: function (a) { this.kinetic && this.kinetic.update(a); this.panned = !0; this.map.pan(this.handler.last.x - a.x, this.handler.last.y - a.y, { dragging: !0, animate: !1 }) }, panMapDone: function (a) {
    if (this.panned) {
      var b = null; this.kinetic && (b = this.kinetic.end(a)); this.map.pan(this.handler.last.x - a.x, this.handler.last.y - a.y, { dragging: !!b, animate: !1 }); if (b) {
        var c = this; this.kinetic.move(b, function (a, b,
          f) { c.map.pan(a, b, { dragging: !f, animate: !1 }) })
      } this.panned = !1
    }
  }, CLASS_NAME: "OpenLayers.Control.DragPan"
}); OpenLayers.Control.Navigation = OpenLayers.Class(OpenLayers.Control, {
  dragPan: null, dragPanOptions: null, pinchZoom: null, pinchZoomOptions: null, documentDrag: !1, zoomBox: null, zoomBoxEnabled: !0, zoomWheelEnabled: !0, mouseWheelOptions: null, handleRightClicks: !1, zoomBoxKeyMask: OpenLayers.Handler.MOD_SHIFT, autoActivate: !0, initialize: function (a) { this.handlers = {}; OpenLayers.Control.prototype.initialize.apply(this, arguments) }, destroy: function () {
    this.deactivate(); this.dragPan && this.dragPan.destroy(); this.dragPan = null;
    this.zoomBox && this.zoomBox.destroy(); this.zoomBox = null; this.pinchZoom && this.pinchZoom.destroy(); this.pinchZoom = null; OpenLayers.Control.prototype.destroy.apply(this, arguments)
  }, activate: function () { this.dragPan.activate(); this.zoomWheelEnabled && this.handlers.wheel.activate(); this.handlers.click.activate(); this.zoomBoxEnabled && this.zoomBox.activate(); this.pinchZoom && this.pinchZoom.activate(); return OpenLayers.Control.prototype.activate.apply(this, arguments) }, deactivate: function () {
  this.pinchZoom && this.pinchZoom.deactivate();
    this.zoomBox.deactivate(); this.dragPan.deactivate(); this.handlers.click.deactivate(); this.handlers.wheel.deactivate(); return OpenLayers.Control.prototype.deactivate.apply(this, arguments)
  }, draw: function () {
  this.handleRightClicks && (this.map.viewPortDiv.oncontextmenu = OpenLayers.Function.False); this.handlers.click = new OpenLayers.Handler.Click(this, { click: this.defaultClick, dblclick: this.defaultDblClick, dblrightclick: this.defaultDblRightClick }, { "double": !0, stopDouble: !0 }); this.dragPan = new OpenLayers.Control.DragPan(OpenLayers.Util.extend({
    map: this.map,
    documentDrag: this.documentDrag
  }, this.dragPanOptions)); this.zoomBox = new OpenLayers.Control.ZoomBox({ map: this.map, keyMask: this.zoomBoxKeyMask }); this.dragPan.draw(); this.zoomBox.draw(); this.handlers.wheel = new OpenLayers.Handler.MouseWheel(this, { up: this.wheelUp, down: this.wheelDown }, OpenLayers.Util.extend(this.map.fractionalZoom ? {} : { cumulative: !1, interval: 50, maxDelta: 6 }, this.mouseWheelOptions)); OpenLayers.Control.PinchZoom && (this.pinchZoom = new OpenLayers.Control.PinchZoom(OpenLayers.Util.extend({ map: this.map },
    this.pinchZoomOptions)))
  }, defaultClick: function (a) { a.lastTouches && 2 == a.lastTouches.length && this.map.zoomOut() }, defaultDblClick: function (a) { this.map.zoomTo(this.map.zoom + 1, a.xy) }, defaultDblRightClick: function (a) { this.map.zoomTo(this.map.zoom - 1, a.xy) }, wheelChange: function (a, b) { this.map.fractionalZoom || (b = Math.round(b)); var c = this.map.getZoom(), d; d = Math.max(c + b, 0); d = Math.min(d, this.map.getNumZoomLevels()); d !== c && this.map.zoomTo(d, a.xy) }, wheelUp: function (a, b) { this.wheelChange(a, b || 1) }, wheelDown: function (a,
    b) { this.wheelChange(a, b || -1) }, disableZoomBox: function () { this.zoomBoxEnabled = !1; this.zoomBox.deactivate() }, enableZoomBox: function () { this.zoomBoxEnabled = !0; this.active && this.zoomBox.activate() }, disableZoomWheel: function () { this.zoomWheelEnabled = !1; this.handlers.wheel.deactivate() }, enableZoomWheel: function () { this.zoomWheelEnabled = !0; this.active && this.handlers.wheel.activate() }, CLASS_NAME: "OpenLayers.Control.Navigation"
}); OpenLayers.Control.DrawFeature = OpenLayers.Class(OpenLayers.Control, {
  layer: null, callbacks: null, multi: !1, featureAdded: function () { }, initialize: function (a, b, c) {
    OpenLayers.Control.prototype.initialize.apply(this, [c]); this.callbacks = OpenLayers.Util.extend({ done: this.drawFeature, modify: function (a, b) { this.layer.events.triggerEvent("sketchmodified", { vertex: a, feature: b }) }, create: function (a, b) { this.layer.events.triggerEvent("sketchstarted", { vertex: a, feature: b }) } }, this.callbacks); this.layer = a; this.handlerOptions =
      this.handlerOptions || {}; this.handlerOptions.layerOptions = OpenLayers.Util.applyDefaults(this.handlerOptions.layerOptions, { renderers: a.renderers, rendererOptions: a.rendererOptions }); "multi" in this.handlerOptions || (this.handlerOptions.multi = this.multi); if (a = this.layer.styleMap && this.layer.styleMap.styles.temporary) this.handlerOptions.layerOptions = OpenLayers.Util.applyDefaults(this.handlerOptions.layerOptions, { styleMap: new OpenLayers.StyleMap({ "default": a }) }); this.handler = new b(this, this.callbacks, this.handlerOptions)
  },
  drawFeature: function (a) { a = new OpenLayers.Feature.Vector(a); !1 !== this.layer.events.triggerEvent("sketchcomplete", { feature: a }) && (a.state = OpenLayers.State.INSERT, this.layer.addFeatures([a]), this.featureAdded(a), this.events.triggerEvent("featureadded", { feature: a })) }, insertXY: function (a, b) { this.handler && this.handler.line && this.handler.insertXY(a, b) }, insertDeltaXY: function (a, b) { this.handler && this.handler.line && this.handler.insertDeltaXY(a, b) }, insertDirectionLength: function (a, b) {
  this.handler && this.handler.line &&
    this.handler.insertDirectionLength(a, b)
  }, insertDeflectionLength: function (a, b) { this.handler && this.handler.line && this.handler.insertDeflectionLength(a, b) }, undo: function () { return this.handler.undo && this.handler.undo() }, redo: function () { return this.handler.redo && this.handler.redo() }, finishSketch: function () { this.handler.finishGeometry() }, cancel: function () { this.handler.cancel() }, CLASS_NAME: "OpenLayers.Control.DrawFeature"
}); OpenLayers.Handler.Polygon = OpenLayers.Class(OpenLayers.Handler.Path, {
  holeModifier: null, drawingHole: !1, polygon: null, createFeature: function (a) {
    a = this.layer.getLonLatFromViewPortPx(a); a = new OpenLayers.Geometry.Point(a.lon, a.lat); this.point = new OpenLayers.Feature.Vector(a); this.line = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LinearRing([this.point.geometry])); this.polygon = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon([this.line.geometry])); this.callback("create", [this.point.geometry,
    this.getSketch()]); this.point.geometry.clearBounds(); this.layer.addFeatures([this.polygon, this.point], { silent: !0 })
  }, addPoint: function (a) {
    if (!this.drawingHole && this.holeModifier && this.evt && this.evt[this.holeModifier]) for (var b = this.point.geometry, c = this.control.layer.features, d, e = c.length - 1; 0 <= e; --e)if (d = c[e].geometry, (d instanceof OpenLayers.Geometry.Polygon || d instanceof OpenLayers.Geometry.MultiPolygon) && d.intersects(b)) {
      b = c[e]; this.control.layer.removeFeatures([b], { silent: !0 }); this.control.layer.events.registerPriority("sketchcomplete",
        this, this.finalizeInteriorRing); this.control.layer.events.registerPriority("sketchmodified", this, this.enforceTopology); b.geometry.addComponent(this.line.geometry); this.polygon = b; this.drawingHole = !0; break
    } OpenLayers.Handler.Path.prototype.addPoint.apply(this, arguments)
  }, getCurrentPointIndex: function () { return this.line.geometry.components.length - 2 }, enforceTopology: function (a) { a = a.vertex; var b = this.line.geometry.components; this.polygon.geometry.intersects(a) || (b = b[b.length - 3], a.x = b.x, a.y = b.y) }, finishGeometry: function () {
    this.line.geometry.removeComponent(this.line.geometry.components[this.line.geometry.components.length -
      2]); this.removePoint(); this.finalize()
  }, finalizeInteriorRing: function () { var a = this.line.geometry, b = 0 !== a.getArea(); if (b) { for (var c = this.polygon.geometry.components, d = c.length - 2; 0 <= d; --d)if (a.intersects(c[d])) { b = !1; break } if (b) a: for (d = c.length - 2; 0 < d; --d)for (var e = c[d].components, f = 0, g = e.length; f < g; ++f)if (a.containsPoint(e[f])) { b = !1; break a } } b ? this.polygon.state !== OpenLayers.State.INSERT && (this.polygon.state = OpenLayers.State.UPDATE) : this.polygon.geometry.removeComponent(a); this.restoreFeature(); return !1 },
  cancel: function () { this.drawingHole && (this.polygon.geometry.removeComponent(this.line.geometry), this.restoreFeature(!0)); return OpenLayers.Handler.Path.prototype.cancel.apply(this, arguments) }, restoreFeature: function (a) {
    this.control.layer.events.unregister("sketchcomplete", this, this.finalizeInteriorRing); this.control.layer.events.unregister("sketchmodified", this, this.enforceTopology); this.layer.removeFeatures([this.polygon], { silent: !0 }); this.control.layer.addFeatures([this.polygon], { silent: !0 }); this.drawingHole =
      !1; a || this.control.layer.events.triggerEvent("sketchcomplete", { feature: this.polygon })
  }, destroyFeature: function (a) { OpenLayers.Handler.Path.prototype.destroyFeature.call(this, a); this.polygon = null }, drawFeature: function () { this.layer.drawFeature(this.polygon, this.style); this.layer.drawFeature(this.point, this.style) }, getSketch: function () { return this.polygon }, getGeometry: function () { var a = this.polygon && this.polygon.geometry; a && this.multi && (a = new OpenLayers.Geometry.MultiPolygon([a])); return a }, CLASS_NAME: "OpenLayers.Handler.Polygon"
}); OpenLayers.Control.EditingToolbar = OpenLayers.Class(OpenLayers.Control.Panel, {
  citeCompliant: !1, initialize: function (a, b) {
    OpenLayers.Control.Panel.prototype.initialize.apply(this, [b]); this.addControls([new OpenLayers.Control.Navigation]); var c = [new OpenLayers.Control.DrawFeature(a, OpenLayers.Handler.Point, { displayClass: "olControlDrawFeaturePoint", handlerOptions: { citeCompliant: this.citeCompliant } }), new OpenLayers.Control.DrawFeature(a, OpenLayers.Handler.Path, { displayClass: "olControlDrawFeaturePath", handlerOptions: { citeCompliant: this.citeCompliant } }),
    new OpenLayers.Control.DrawFeature(a, OpenLayers.Handler.Polygon, { displayClass: "olControlDrawFeaturePolygon", handlerOptions: { citeCompliant: this.citeCompliant } })]; this.addControls(c)
  }, draw: function () { var a = OpenLayers.Control.Panel.prototype.draw.apply(this, arguments); null === this.defaultControl && (this.defaultControl = this.controls[0]); return a }, CLASS_NAME: "OpenLayers.Control.EditingToolbar"
}); OpenLayers.Strategy.BBOX = OpenLayers.Class(OpenLayers.Strategy, {
  bounds: null, resolution: null, ratio: 2, resFactor: null, response: null, activate: function () { var a = OpenLayers.Strategy.prototype.activate.call(this); a && (this.layer.events.on({ moveend: this.update, refresh: this.update, visibilitychanged: this.update, scope: this }), this.update()); return a }, deactivate: function () {
    var a = OpenLayers.Strategy.prototype.deactivate.call(this); a && this.layer.events.un({
      moveend: this.update, refresh: this.update, visibilitychanged: this.update,
      scope: this
    }); return a
  }, update: function (a) { var b = this.getMapBounds(); null !== b && (a && a.force || this.layer.visibility && this.layer.calculateInRange() && this.invalidBounds(b)) && (this.calculateBounds(b), this.resolution = this.layer.map.getResolution(), this.triggerRead(a)) }, getMapBounds: function () {
    if (null === this.layer.map) return null; var a = this.layer.map.getExtent(); a && !this.layer.projection.equals(this.layer.map.getProjectionObject()) && (a = a.clone().transform(this.layer.map.getProjectionObject(), this.layer.projection));
    return a
  }, invalidBounds: function (a) { a || (a = this.getMapBounds()); a = !this.bounds || !this.bounds.containsBounds(a); !a && this.resFactor && (a = this.resolution / this.layer.map.getResolution(), a = a >= this.resFactor || a <= 1 / this.resFactor); return a }, calculateBounds: function (a) { a || (a = this.getMapBounds()); var b = a.getCenterLonLat(), c = a.getWidth() * this.ratio; a = a.getHeight() * this.ratio; this.bounds = new OpenLayers.Bounds(b.lon - c / 2, b.lat - a / 2, b.lon + c / 2, b.lat + a / 2) }, triggerRead: function (a) {
  !this.response || a && !0 === a.noAbort ||
    (this.layer.protocol.abort(this.response), this.layer.events.triggerEvent("loadend")); var b = { filter: this.createFilter() }; this.layer.events.triggerEvent("loadstart", b); this.response = this.layer.protocol.read(OpenLayers.Util.applyDefaults({ filter: b.filter, callback: this.merge, scope: this }, a))
  }, createFilter: function () {
    var a = new OpenLayers.Filter.Spatial({ type: OpenLayers.Filter.Spatial.BBOX, value: this.bounds, projection: this.layer.projection }); this.layer.filter && (a = new OpenLayers.Filter.Logical({
      type: OpenLayers.Filter.Logical.AND,
      filters: [this.layer.filter, a]
    })); return a
  }, merge: function (a) { this.layer.destroyFeatures(); if (a.success()) { var b = a.features; if (b && 0 < b.length) { var c = this.layer.projection, d = this.layer.map.getProjectionObject(); if (!d.equals(c)) for (var e, f = 0, g = b.length; f < g; ++f)(e = b[f].geometry) && e.transform(c, d); this.layer.addFeatures(b) } } else this.bounds = null; this.response = null; this.layer.events.triggerEvent("loadend", { response: a }) }, CLASS_NAME: "OpenLayers.Strategy.BBOX"
}); OpenLayers.Layer.WorldWind = OpenLayers.Class(OpenLayers.Layer.Grid, {
  DEFAULT_PARAMS: {}, isBaseLayer: !0, lzd: null, zoomLevels: null, initialize: function (a, b, c, d, e, f) { this.lzd = c; this.zoomLevels = d; c = []; c.push(a, b, e, f); OpenLayers.Layer.Grid.prototype.initialize.apply(this, c); this.params = OpenLayers.Util.applyDefaults(this.params, this.DEFAULT_PARAMS) }, getZoom: function () { var a = this.map.getZoom(); this.map.getMaxExtent(); return a -= Math.log(this.maxResolution / (this.lzd / 512)) / Math.log(2) }, getURL: function (a) {
    a = this.adjustBounds(a);
    var b = this.getZoom(), c = this.map.getMaxExtent(), d = this.lzd / Math.pow(2, this.getZoom()), e = Math.floor((a.left - c.left) / d); a = Math.floor((a.bottom - c.bottom) / d); return this.map.getResolution() <= this.lzd / 512 && this.getZoom() <= this.zoomLevels ? this.getFullRequestString({ L: b, X: e, Y: a }) : OpenLayers.Util.getImageLocation("blank.gif")
  }, CLASS_NAME: "OpenLayers.Layer.WorldWind"
}); OpenLayers.Protocol.CSW = function (a) { a = OpenLayers.Util.applyDefaults(a, OpenLayers.Protocol.CSW.DEFAULTS); var b = OpenLayers.Protocol.CSW["v" + a.version.replace(/\./g, "_")]; if (!b) throw "Unsupported CSW version: " + a.version; return new b(a) }; OpenLayers.Protocol.CSW.DEFAULTS = { version: "2.0.2" }; OpenLayers.Format.WMTSCapabilities = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, {
  defaultVersion: "1.0.0", yx: { "urn:ogc:def:crs:EPSG::4326": !0 }, createLayer: function (a, b) {
    if (!("layer" in b)) throw Error("Missing property 'layer' in configuration."); for (var c = a.contents, d, e = 0, f = c.layers.length; e < f; ++e)if (c.layers[e].identifier === b.layer) { d = c.layers[e]; break } if (!d) throw Error("Layer not found"); var g = b.format; !g && (d.formats && d.formats.length) && (g = d.formats[0]); var h; b.matrixSet ? h = c.tileMatrixSets[b.matrixSet] :
      1 <= d.tileMatrixSetLinks.length && (h = c.tileMatrixSets[d.tileMatrixSetLinks[0].tileMatrixSet]); if (!h) throw Error("matrixSet not found"); for (var k, e = 0, f = d.styles.length; e < f && (k = d.styles[e], !k.isDefault); ++e); c = b.requestEncoding; if (!c && (c = "KVP", a.operationsMetadata.GetTile.dcp.http)) { var l = a.operationsMetadata.GetTile.dcp.http; l.get[0].constraints && (l = l.get[0].constraints.GetEncoding.allowedValues, l.KVP || !l.REST && !l.RESTful || (c = "REST")) } var l = [], m = b.params || {}; delete b.params; for (var n = 0, p = d.dimensions.length; n <
        p; n++) { var q = d.dimensions[n]; l.push(q.identifier); m.hasOwnProperty(q.identifier) || (m[q.identifier] = q["default"]) } var n = b.projection || h.supportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3"), p = b.units || ("EPSG:4326" === n ? "degrees" : "m"), q = [], r; for (r in h.matrixIds) h.matrixIds.hasOwnProperty(r) && q.push(2.8E-4 * h.matrixIds[r].scaleDenominator / OpenLayers.METERS_PER_INCH / OpenLayers.INCHES_PER_UNIT[p]); if ("REST" === c && d.resourceUrls) {
          r = []; for (var f = 0, s = d.resourceUrls.length; f < s; ++f)e = d.resourceUrls[f],
            e.format === g && "tile" === e.resourceType && r.push(e.template)
        } else { s = a.operationsMetadata.GetTile.dcp.http.get; r = []; for (var t, e = 0, f = s.length; e < f; e++)t = s[e].constraints, (!t || t && t.GetEncoding.allowedValues[c]) && r.push(s[e].url) } return new OpenLayers.Layer.WMTS(OpenLayers.Util.applyDefaults(b, {
          url: r, requestEncoding: c, name: d.title, style: k.identifier, format: g, matrixIds: h.matrixIds, matrixSet: h.identifier, projection: n, units: p, resolutions: !1 === b.isBaseLayer ? void 0 : q, serverResolutions: q, tileFullExtent: h.bounds,
          dimensions: l, params: m
        }))
  }, CLASS_NAME: "OpenLayers.Format.WMTSCapabilities"
}); OpenLayers.Layer.Google.v3 = {
  DEFAULTS: { sphericalMercator: !0, projection: "EPSG:900913" }, animationEnabled: !0, loadMapObject: function () {
  this.type || (this.type = google.maps.MapTypeId.ROADMAP); var a, b = OpenLayers.Layer.Google.cache[this.map.id]; b ? (a = b.mapObject, ++b.count) : (a = this.map.getCenter(), b = document.createElement("div"), b.className = "olForeignContainer", b.style.width = "100%", b.style.height = "100%", a = new google.maps.Map(b, {
    center: a ? new google.maps.LatLng(a.lat, a.lon) : new google.maps.LatLng(0, 0), zoom: this.map.getZoom() ||
      0, mapTypeId: this.type, disableDefaultUI: !0, keyboardShortcuts: !1, draggable: !1, disableDoubleClickZoom: !0, scrollwheel: !1, streetViewControl: !1
  }), b = document.createElement("div"), b.style.width = "100%", b.style.height = "100%", a.controls[google.maps.ControlPosition.TOP_LEFT].push(b), b = { googleControl: b, mapObject: a, count: 1 }, OpenLayers.Layer.Google.cache[this.map.id] = b); this.mapObject = a; this.setGMapVisibility(this.visibility)
  }, onMapResize: function () { this.visibility && google.maps.event.trigger(this.mapObject, "resize") },
  setGMapVisibility: function (a) {
    var b = OpenLayers.Layer.Google.cache[this.map.id], c = this.map; if (b) {
      for (var d = this.type, e = c.layers, f, g = e.length - 1; 0 <= g; --g)if (f = e[g], f instanceof OpenLayers.Layer.Google && !0 === f.visibility && !0 === f.inRange) { d = f.type; a = !0; break } e = this.mapObject.getDiv(); if (!0 === a) {
        if (e.parentNode !== c.div) if (b.rendered) c.div.appendChild(e), b.googleControl.appendChild(c.viewPortDiv), google.maps.event.trigger(this.mapObject, "resize"); else {
          var h = this; google.maps.event.addListenerOnce(this.mapObject,
            "tilesloaded", function () { b.rendered = !0; h.setGMapVisibility(h.getVisibility()); h.moveTo(h.map.getCenter()) })
        } this.mapObject.setMapTypeId(d)
      } else b.googleControl.hasChildNodes() && (c.div.appendChild(c.viewPortDiv), c.div.removeChild(e))
    }
  }, getMapContainer: function () { return this.mapObject.getDiv() }, getMapObjectBoundsFromOLBounds: function (a) {
    var b = null; null != a && (b = this.sphericalMercator ? this.inverseMercator(a.bottom, a.left) : new OpenLayers.LonLat(a.bottom, a.left), a = this.sphericalMercator ? this.inverseMercator(a.top,
      a.right) : new OpenLayers.LonLat(a.top, a.right), b = new google.maps.LatLngBounds(new google.maps.LatLng(b.lat, b.lon), new google.maps.LatLng(a.lat, a.lon))); return b
  }, getMapObjectLonLatFromMapObjectPixel: function (a) {
    var b = this.map.getSize(), c = this.getLongitudeFromMapObjectLonLat(this.mapObject.center), d = this.getLatitudeFromMapObjectLonLat(this.mapObject.center), e = this.map.getResolution(); a = new OpenLayers.LonLat(c + (a.x - b.w / 2) * e, d - (a.y - b.h / 2) * e); this.wrapDateLine && (a = a.wrapDateLine(this.maxExtent)); return this.getMapObjectLonLatFromLonLat(a.lon,
      a.lat)
  }, getMapObjectPixelFromMapObjectLonLat: function (a) { var b = this.getLongitudeFromMapObjectLonLat(a); a = this.getLatitudeFromMapObjectLonLat(a); var c = this.map.getResolution(), d = this.map.getExtent(); return this.getMapObjectPixelFromXY(1 / c * (b - d.left), 1 / c * (d.top - a)) }, setMapObjectCenter: function (a, b) {
    if (!1 === this.animationEnabled && b != this.mapObject.zoom) { var c = this.getMapContainer(); google.maps.event.addListenerOnce(this.mapObject, "idle", function () { c.style.visibility = "" }); c.style.visibility = "hidden" } this.mapObject.setOptions({
      center: a,
      zoom: b
    })
  }, getMapObjectZoomFromMapObjectBounds: function (a) { return this.mapObject.getBoundsZoomLevel(a) }, getMapObjectLonLatFromLonLat: function (a, b) { var c; this.sphericalMercator ? (c = this.inverseMercator(a, b), c = new google.maps.LatLng(c.lat, c.lon)) : c = new google.maps.LatLng(b, a); return c }, getMapObjectPixelFromXY: function (a, b) { return new google.maps.Point(a, b) }
}; OpenLayers.Format.WPSDescribeProcess = OpenLayers.Class(OpenLayers.Format.XML, {
  VERSION: "1.0.0", namespaces: { wps: "http://www.opengis.net/wps/1.0.0", ows: "http://www.opengis.net/ows/1.1", xsi: "http://www.w3.org/2001/XMLSchema-instance" }, schemaLocation: "http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd", defaultPrefix: "wps", regExes: { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g }, read: function (a) {
  "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this,
    [a])); a && 9 == a.nodeType && (a = a.documentElement); var b = {}; this.readNode(a, b); return b
  }, readers: {
    wps: {
      ProcessDescriptions: function (a, b) { b.processDescriptions = {}; this.readChildNodes(a, b.processDescriptions) }, ProcessDescription: function (a, b) { var c = { processVersion: this.getAttributeNS(a, this.namespaces.wps, "processVersion"), statusSupported: "true" === a.getAttribute("statusSupported"), storeSupported: "true" === a.getAttribute("storeSupported") }; this.readChildNodes(a, c); b[c.identifier] = c }, DataInputs: function (a,
        b) { b.dataInputs = []; this.readChildNodes(a, b.dataInputs) }, ProcessOutputs: function (a, b) { b.processOutputs = []; this.readChildNodes(a, b.processOutputs) }, Output: function (a, b) { var c = {}; this.readChildNodes(a, c); b.push(c) }, ComplexOutput: function (a, b) { b.complexOutput = {}; this.readChildNodes(a, b.complexOutput) }, LiteralOutput: function (a, b) { b.literalOutput = {}; this.readChildNodes(a, b.literalOutput) }, Input: function (a, b) {
          var c = { maxOccurs: parseInt(a.getAttribute("maxOccurs")), minOccurs: parseInt(a.getAttribute("minOccurs")) };
          this.readChildNodes(a, c); b.push(c)
        }, BoundingBoxData: function (a, b) { b.boundingBoxData = {}; this.readChildNodes(a, b.boundingBoxData) }, CRS: function (a, b) { b.CRSs || (b.CRSs = {}); b.CRSs[this.getChildValue(a)] = !0 }, LiteralData: function (a, b) { b.literalData = {}; this.readChildNodes(a, b.literalData) }, ComplexData: function (a, b) { b.complexData = {}; this.readChildNodes(a, b.complexData) }, Default: function (a, b) { b["default"] = {}; this.readChildNodes(a, b["default"]) }, Supported: function (a, b) { b.supported = {}; this.readChildNodes(a, b.supported) },
      Format: function (a, b) { var c = {}; this.readChildNodes(a, c); b.formats || (b.formats = {}); b.formats[c.mimeType] = !0 }, MimeType: function (a, b) { b.mimeType = this.getChildValue(a) }
    }, ows: OpenLayers.Format.OWSCommon.v1_1_0.prototype.readers.ows
  }, CLASS_NAME: "OpenLayers.Format.WPSDescribeProcess"
}); OpenLayers.Format.WKT = OpenLayers.Class(OpenLayers.Format, {
  initialize: function (a) { this.regExes = { typeStr: /^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/, spaces: /\s+/, parenComma: /\)\s*,\s*\(/, doubleParenComma: /\)\s*\)\s*,\s*\(\s*\(/, trimParens: /^\s*\(?(.*?)\)?\s*$/ }; OpenLayers.Format.prototype.initialize.apply(this, [a]) }, read: function (a) {
    var b, c; a = a.replace(/[\n\r]/g, " "); if (c = this.regExes.typeStr.exec(a)) if (a = c[1].toLowerCase(), c = c[2], this.parse[a] && (b = this.parse[a].apply(this, [c])), this.internalProjection && this.externalProjection) if (b &&
      "OpenLayers.Feature.Vector" == b.CLASS_NAME) b.geometry.transform(this.externalProjection, this.internalProjection); else if (b && "geometrycollection" != a && "object" == typeof b) for (a = 0, c = b.length; a < c; a++)b[a].geometry.transform(this.externalProjection, this.internalProjection); return b
  }, write: function (a) { var b, c; a.constructor == Array ? c = !0 : (a = [a], c = !1); var d = []; c && d.push("GEOMETRYCOLLECTION("); for (var e = 0, f = a.length; e < f; ++e)c && 0 < e && d.push(","), b = a[e].geometry, d.push(this.extractGeometry(b)); c && d.push(")"); return d.join("") },
  extractGeometry: function (a) { var b = a.CLASS_NAME.split(".")[2].toLowerCase(); if (!this.extract[b]) return null; this.internalProjection && this.externalProjection && (a = a.clone(), a.transform(this.internalProjection, this.externalProjection)); return ("collection" == b ? "GEOMETRYCOLLECTION" : b.toUpperCase()) + "(" + this.extract[b].apply(this, [a]) + ")" }, extract: {
    point: function (a) { return a.x + " " + a.y }, multipoint: function (a) {
      for (var b = [], c = 0, d = a.components.length; c < d; ++c)b.push("(" + this.extract.point.apply(this, [a.components[c]]) +
        ")"); return b.join(",")
    }, linestring: function (a) { for (var b = [], c = 0, d = a.components.length; c < d; ++c)b.push(this.extract.point.apply(this, [a.components[c]])); return b.join(",") }, multilinestring: function (a) { for (var b = [], c = 0, d = a.components.length; c < d; ++c)b.push("(" + this.extract.linestring.apply(this, [a.components[c]]) + ")"); return b.join(",") }, polygon: function (a) { for (var b = [], c = 0, d = a.components.length; c < d; ++c)b.push("(" + this.extract.linestring.apply(this, [a.components[c]]) + ")"); return b.join(",") }, multipolygon: function (a) {
      for (var b =
        [], c = 0, d = a.components.length; c < d; ++c)b.push("(" + this.extract.polygon.apply(this, [a.components[c]]) + ")"); return b.join(",")
    }, collection: function (a) { for (var b = [], c = 0, d = a.components.length; c < d; ++c)b.push(this.extractGeometry.apply(this, [a.components[c]])); return b.join(",") }
  }, parse: {
    point: function (a) { a = OpenLayers.String.trim(a).split(this.regExes.spaces); return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(a[0], a[1])) }, multipoint: function (a) {
      for (var b = OpenLayers.String.trim(a).split(","),
        c = [], d = 0, e = b.length; d < e; ++d)a = b[d].replace(this.regExes.trimParens, "$1"), c.push(this.parse.point.apply(this, [a]).geometry); return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.MultiPoint(c))
    }, linestring: function (a) { a = OpenLayers.String.trim(a).split(","); for (var b = [], c = 0, d = a.length; c < d; ++c)b.push(this.parse.point.apply(this, [a[c]]).geometry); return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(b)) }, multilinestring: function (a) {
      for (var b = OpenLayers.String.trim(a).split(this.regExes.parenComma),
        c = [], d = 0, e = b.length; d < e; ++d)a = b[d].replace(this.regExes.trimParens, "$1"), c.push(this.parse.linestring.apply(this, [a]).geometry); return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.MultiLineString(c))
    }, polygon: function (a) { var b; a = OpenLayers.String.trim(a).split(this.regExes.parenComma); for (var c = [], d = 0, e = a.length; d < e; ++d)b = a[d].replace(this.regExes.trimParens, "$1"), b = this.parse.linestring.apply(this, [b]).geometry, b = new OpenLayers.Geometry.LinearRing(b.components), c.push(b); return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Polygon(c)) },
    multipolygon: function (a) { for (var b = OpenLayers.String.trim(a).split(this.regExes.doubleParenComma), c = [], d = 0, e = b.length; d < e; ++d)a = b[d].replace(this.regExes.trimParens, "$1"), c.push(this.parse.polygon.apply(this, [a]).geometry); return new OpenLayers.Feature.Vector(new OpenLayers.Geometry.MultiPolygon(c)) }, geometrycollection: function (a) {
      a = a.replace(/,\s*([A-Za-z])/g, "|$1"); a = OpenLayers.String.trim(a).split("|"); for (var b = [], c = 0, d = a.length; c < d; ++c)b.push(OpenLayers.Format.WKT.prototype.read.apply(this, [a[c]]));
      return b
    }
  }, CLASS_NAME: "OpenLayers.Format.WKT"
}); OpenLayers.WPSProcess = OpenLayers.Class({
  client: null, server: null, identifier: null, description: null, localWPS: "http://geoserver/wps", formats: null, chained: 0, executeCallbacks: null, initialize: function (a) { OpenLayers.Util.extend(this, a); this.executeCallbacks = []; this.formats = { "application/wkt": new OpenLayers.Format.WKT, "application/json": new OpenLayers.Format.GeoJSON } }, describe: function (a) {
    a = a || {}; if (!this.description) this.client.describeProcess(this.server, this.identifier, function (b) {
    this.description || this.parseDescription(b);
      a.callback && a.callback.call(a.scope, this.description)
    }, this); else if (a.callback) { var b = this.description; window.setTimeout(function () { a.callback.call(a.scope, b) }, 0) }
  }, configure: function (a) { this.describe({ callback: function () { var b = this.description, c = a.inputs, d, e, f; e = 0; for (f = b.dataInputs.length; e < f; ++e)d = b.dataInputs[e], this.setInputData(d, c[d.identifier]); a.callback && a.callback.call(a.scope) }, scope: this }); return this }, execute: function (a) {
    this.configure({
      inputs: a.inputs, callback: function () {
        var b = this,
        c = this.getOutputIndex(b.description.processOutputs, a.output); b.setResponseForm({ outputIndex: c }); (function e() {
          OpenLayers.Util.removeItem(b.executeCallbacks, e); 0 !== b.chained ? b.executeCallbacks.push(e) : OpenLayers.Request.POST({
            url: b.client.servers[b.server].url, data: (new OpenLayers.Format.WPSExecute).write(b.description), success: function (e) {
              var g = b.findMimeType(b.description.processOutputs[c].complexOutput.supported.formats); e = b.formats[g].read(e.responseText); e instanceof OpenLayers.Feature.Vector &&
                (e = [e]); a.success && (g = {}, g[a.output || "result"] = e, a.success.call(a.scope, g))
            }, scope: b
          })
        })()
      }, scope: this
    })
  }, output: function (a) { return new OpenLayers.WPSProcess.ChainLink({ process: this, output: a }) }, parseDescription: function (a) { a = this.client.servers[this.server]; this.description = (new OpenLayers.Format.WPSDescribeProcess).read(a.processDescription[this.identifier]).processDescriptions[this.identifier] }, setInputData: function (a, b) {
    delete a.data; delete a.reference; if (b instanceof OpenLayers.WPSProcess.ChainLink)++this.chained,
      a.reference = { method: "POST", href: b.process.server === this.server ? this.localWPS : this.client.servers[b.process.server].url }, b.process.describe({ callback: function () { --this.chained; this.chainProcess(a, b) }, scope: this }); else { a.data = {}; var c = a.complexData; c ? (c = this.findMimeType(c.supported.formats), a.data.complexData = { mimeType: c, value: this.formats[c].write(this.toFeatures(b)) }) : a.data.literalData = { value: b } }
  }, setResponseForm: function (a) {
    a = a || {}; var b = this.description.processOutputs[a.outputIndex || 0]; this.description.responseForm =
      { rawDataOutput: { identifier: b.identifier, mimeType: this.findMimeType(b.complexOutput.supported.formats, a.supportedFormats) } }
  }, getOutputIndex: function (a, b) { var c; if (b) for (var d = a.length - 1; 0 <= d; --d) { if (a[d].identifier === b) { c = d; break } } else c = 0; return c }, chainProcess: function (a, b) {
    var c = this.getOutputIndex(b.process.description.processOutputs, b.output); a.reference.mimeType = this.findMimeType(a.complexData.supported.formats, b.process.description.processOutputs[c].complexOutput.supported.formats); var d = {};
    d[a.reference.mimeType] = !0; b.process.setResponseForm({ outputIndex: c, supportedFormats: d }); for (a.reference.body = b.process.description; 0 < this.executeCallbacks.length;)this.executeCallbacks[0]()
  }, toFeatures: function (a) { var b = OpenLayers.Util.isArray(a); b || (a = [a]); for (var c = Array(a.length), d, e = 0, f = a.length; e < f; ++e)d = a[e], c[e] = d instanceof OpenLayers.Feature.Vector ? d : new OpenLayers.Feature.Vector(d); return b ? c : c[0] }, findMimeType: function (a, b) { b = b || this.formats; for (var c in a) if (c in b) return c }, CLASS_NAME: "OpenLayers.WPSProcess"
});
OpenLayers.WPSProcess.ChainLink = OpenLayers.Class({ process: null, output: null, initialize: function (a) { OpenLayers.Util.extend(this, a) }, CLASS_NAME: "OpenLayers.WPSProcess.ChainLink" }); OpenLayers.WPSClient = OpenLayers.Class({
  servers: null, version: "1.0.0", lazy: !1, events: null, initialize: function (a) { OpenLayers.Util.extend(this, a); this.events = new OpenLayers.Events(this); this.servers = {}; for (var b in a.servers) this.servers[b] = "string" == typeof a.servers[b] ? { url: a.servers[b], version: this.version, processDescription: {} } : a.servers[b] }, execute: function (a) { this.getProcess(a.server, a.process).execute({ inputs: a.inputs, success: a.success, scope: a.scope }) }, getProcess: function (a, b) {
    var c = new OpenLayers.WPSProcess({
      client: this,
      server: a, identifier: b
    }); this.lazy || c.describe(); return c
  }, describeProcess: function (a, b, c, d) {
    var e = this.servers[a]; e.processDescription[b] ? window.setTimeout(function () { c.call(d, e.processDescription[b]) }, 0) : b in e.processDescription ? this.events.register("describeprocess", this, function g(a) { a.identifier === b && (this.events.unregister("describeprocess", this, g), c.call(d, a.raw)) }) : (e.processDescription[b] = null, OpenLayers.Request.GET({
      url: e.url, params: {
        SERVICE: "WPS", VERSION: e.version, REQUEST: "DescribeProcess",
        IDENTIFIER: b
      }, success: function (a) { e.processDescription[b] = a.responseText; this.events.triggerEvent("describeprocess", { identifier: b, raw: a.responseText }) }, scope: this
    }))
  }, destroy: function () { this.events.destroy(); this.servers = this.events = null }, CLASS_NAME: "OpenLayers.WPSClient"
}); OpenLayers.Format.CSWGetRecords.v2_0_2 = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { csw: "http://www.opengis.net/cat/csw/2.0.2", dc: "http://purl.org/dc/elements/1.1/", dct: "http://purl.org/dc/terms/", gmd: "http://www.isotc211.org/2005/gmd", geonet: "http://www.fao.org/geonetwork", ogc: "http://www.opengis.net/ogc", ows: "http://www.opengis.net/ows", xlink: "http://www.w3.org/1999/xlink", xsi: "http://www.w3.org/2001/XMLSchema-instance" }, defaultPrefix: "csw", version: "2.0.2", schemaLocation: "http://www.opengis.net/cat/csw/2.0.2 http://schemas.opengis.net/csw/2.0.2/CSW-discovery.xsd",
  requestId: null, resultType: null, outputFormat: null, outputSchema: null, startPosition: null, maxRecords: null, DistributedSearch: null, ResponseHandler: null, Query: null, regExes: { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g }, initialize: function (a) { OpenLayers.Format.XML.prototype.initialize.apply(this, [a]) }, read: function (a) { "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); a && 9 == a.nodeType && (a = a.documentElement); var b = {}; this.readNode(a, b); return b },
  readers: {
    csw: {
      GetRecordsResponse: function (a, b) { b.records = []; this.readChildNodes(a, b); var c = this.getAttributeNS(a, "", "version"); "" != c && (b.version = c) }, RequestId: function (a, b) { b.RequestId = this.getChildValue(a) }, SearchStatus: function (a, b) { b.SearchStatus = {}; var c = this.getAttributeNS(a, "", "timestamp"); "" != c && (b.SearchStatus.timestamp = c) }, SearchResults: function (a, b) {
        this.readChildNodes(a, b); for (var c = a.attributes, d = {}, e = 0, f = c.length; e < f; ++e)d[c[e].name] = "numberOfRecordsMatched" == c[e].name || "numberOfRecordsReturned" ==
          c[e].name || "nextRecord" == c[e].name ? parseInt(c[e].nodeValue) : c[e].nodeValue; b.SearchResults = d
      }, SummaryRecord: function (a, b) { var c = { type: "SummaryRecord" }; this.readChildNodes(a, c); b.records.push(c) }, BriefRecord: function (a, b) { var c = { type: "BriefRecord" }; this.readChildNodes(a, c); b.records.push(c) }, DCMIRecord: function (a, b) { var c = { type: "DCMIRecord" }; this.readChildNodes(a, c); b.records.push(c) }, Record: function (a, b) { var c = { type: "Record" }; this.readChildNodes(a, c); b.records.push(c) }, "*": function (a, b) {
        var c = a.localName ||
          a.nodeName.split(":").pop(); b[c] = this.getChildValue(a)
      }
    }, geonet: { info: function (a, b) { var c = {}; this.readChildNodes(a, c); b.gninfo = c } }, dc: { "*": function (a, b) { var c = a.localName || a.nodeName.split(":").pop(); OpenLayers.Util.isArray(b[c]) || (b[c] = []); for (var d = {}, e = a.attributes, f = 0, g = e.length; f < g; ++f)d[e[f].name] = e[f].nodeValue; d.value = this.getChildValue(a); "" != d.value && b[c].push(d) } }, dct: { "*": function (a, b) { var c = a.localName || a.nodeName.split(":").pop(); OpenLayers.Util.isArray(b[c]) || (b[c] = []); b[c].push(this.getChildValue(a)) } },
    ows: OpenLayers.Util.applyDefaults({ BoundingBox: function (a, b) { b.bounds && (b.BoundingBox = [{ crs: b.projection, value: [b.bounds.left, b.bounds.bottom, b.bounds.right, b.bounds.top] }], delete b.projection, delete b.bounds); OpenLayers.Format.OWSCommon.v1_0_0.prototype.readers.ows.BoundingBox.apply(this, arguments) } }, OpenLayers.Format.OWSCommon.v1_0_0.prototype.readers.ows)
  }, write: function (a) {
    a = this.writeNode("csw:GetRecords", a); a.setAttribute("xmlns:gmd", this.namespaces.gmd); return OpenLayers.Format.XML.prototype.write.apply(this,
      [a])
  }, writers: {
    csw: {
      GetRecords: function (a) {
        a || (a = {}); var b = this.createElementNSPlus("csw:GetRecords", { attributes: { service: "CSW", version: this.version, requestId: a.requestId || this.requestId, resultType: a.resultType || this.resultType, outputFormat: a.outputFormat || this.outputFormat, outputSchema: a.outputSchema || this.outputSchema, startPosition: a.startPosition || this.startPosition, maxRecords: a.maxRecords || this.maxRecords } }); (a.DistributedSearch || this.DistributedSearch) && this.writeNode("csw:DistributedSearch",
          a.DistributedSearch || this.DistributedSearch, b); var c = a.ResponseHandler || this.ResponseHandler; if (OpenLayers.Util.isArray(c) && 0 < c.length) for (var d = 0, e = c.length; d < e; d++)this.writeNode("csw:ResponseHandler", c[d], b); this.writeNode("Query", a.Query || this.Query, b); return b
      }, DistributedSearch: function (a) { return this.createElementNSPlus("csw:DistributedSearch", { attributes: { hopCount: a.hopCount } }) }, ResponseHandler: function (a) { return this.createElementNSPlus("csw:ResponseHandler", { value: a.value }) }, Query: function (a) {
        a ||
        (a = {}); var b = this.createElementNSPlus("csw:Query", { attributes: { typeNames: a.typeNames || "csw:Record" } }), c = a.ElementName; if (OpenLayers.Util.isArray(c) && 0 < c.length) for (var d = 0, e = c.length; d < e; d++)this.writeNode("csw:ElementName", c[d], b); else this.writeNode("csw:ElementSetName", a.ElementSetName || { value: "summary" }, b); a.Constraint && this.writeNode("csw:Constraint", a.Constraint, b); a.SortBy && this.writeNode("ogc:SortBy", a.SortBy, b); return b
      }, ElementName: function (a) {
        return this.createElementNSPlus("csw:ElementName",
          { value: a.value })
      }, ElementSetName: function (a) { return this.createElementNSPlus("csw:ElementSetName", { attributes: { typeNames: a.typeNames }, value: a.value }) }, Constraint: function (a) { var b = this.createElementNSPlus("csw:Constraint", { attributes: { version: a.version } }); if (a.Filter) { var c = new OpenLayers.Format.Filter({ version: a.version }); b.appendChild(c.write(a.Filter)) } else a.CqlText && (a = this.createElementNSPlus("CqlText", { value: a.CqlText.value }), b.appendChild(a)); return b }
    }, ogc: OpenLayers.Format.Filter.v1_1_0.prototype.writers.ogc
  },
  CLASS_NAME: "OpenLayers.Format.CSWGetRecords.v2_0_2"
});/*
 Apache 2 

 Contains portions of Rico <http://openrico.org/>

 Copyright 2005 Sabre Airline Solutions  

 Licensed under the Apache License, Version 2.0 (the "License"); you
 may not use this file except in compliance with the License. You
 may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0  

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
 implied. See the License for the specific language governing
 permissions and limitations under the License. 
*/
OpenLayers.Marker.Box = OpenLayers.Class(OpenLayers.Marker, {
  bounds: null, div: null, initialize: function (a, b, c) { this.bounds = a; this.div = OpenLayers.Util.createDiv(); this.div.style.overflow = "hidden"; this.events = new OpenLayers.Events(this, this.div); this.setBorder(b, c) }, destroy: function () { this.div = this.bounds = null; OpenLayers.Marker.prototype.destroy.apply(this, arguments) }, setBorder: function (a, b) { a || (a = "red"); b || (b = 2); this.div.style.border = b + "px solid " + a }, draw: function (a, b) {
    OpenLayers.Util.modifyDOMElement(this.div,
      null, a, b); return this.div
  }, onScreen: function () { var a = !1; this.map && (a = this.map.getExtent().containsBounds(this.bounds, !0, !0)); return a }, display: function (a) { this.div.style.display = a ? "" : "none" }, CLASS_NAME: "OpenLayers.Marker.Box"
}); OpenLayers.Format.Text = OpenLayers.Class(OpenLayers.Format, {
  defaultStyle: null, extractStyles: !0, initialize: function (a) { a = a || {}; !1 !== a.extractStyles && (a.defaultStyle = { externalGraphic: OpenLayers.Util.getImageLocation("marker.png"), graphicWidth: 21, graphicHeight: 25, graphicXOffset: -10.5, graphicYOffset: -12.5 }); OpenLayers.Format.prototype.initialize.apply(this, [a]) }, read: function (a) {
    a = a.split("\n"); for (var b, c = [], d = 0; d < a.length - 1; d++) {
      var e = a[d].replace(/^\s*/, "").replace(/\s*$/, ""); if ("#" != e.charAt(0)) if (b) {
        for (var e =
          e.split("\t"), f = new OpenLayers.Geometry.Point(0, 0), g = {}, h = this.defaultStyle ? OpenLayers.Util.applyDefaults({}, this.defaultStyle) : null, k = !1, l = 0; l < e.length; l++)if (e[l]) if ("point" == b[l]) k = e[l].split(","), f.y = parseFloat(k[0]), f.x = parseFloat(k[1]), k = !0; else if ("lat" == b[l]) f.y = parseFloat(e[l]), k = !0; else if ("lon" == b[l]) f.x = parseFloat(e[l]), k = !0; else if ("title" == b[l]) g.title = e[l]; else if ("image" == b[l] || "icon" == b[l] && h) h.externalGraphic = e[l]; else if ("iconSize" == b[l] && h) {
            var m = e[l].split(","); h.graphicWidth =
              parseFloat(m[0]); h.graphicHeight = parseFloat(m[1])
          } else "iconOffset" == b[l] && h ? (m = e[l].split(","), h.graphicXOffset = parseFloat(m[0]), h.graphicYOffset = parseFloat(m[1])) : "description" == b[l] ? g.description = e[l] : "overflow" == b[l] ? g.overflow = e[l] : g[b[l]] = e[l]; k && (this.internalProjection && this.externalProjection && f.transform(this.externalProjection, this.internalProjection), e = new OpenLayers.Feature.Vector(f, g, h), c.push(e))
      } else b = e.split("\t")
    } return c
  }, CLASS_NAME: "OpenLayers.Format.Text"
}); OpenLayers.Layer.Text = OpenLayers.Class(OpenLayers.Layer.Markers, {
  location: null, features: null, formatOptions: null, selectedFeature: null, initialize: function (a, b) { OpenLayers.Layer.Markers.prototype.initialize.apply(this, arguments); this.features = [] }, destroy: function () { OpenLayers.Layer.Markers.prototype.destroy.apply(this, arguments); this.clearFeatures(); this.features = null }, loadText: function () {
  this.loaded || null == this.location || (this.events.triggerEvent("loadstart"), OpenLayers.Request.GET({
    url: this.location,
    success: this.parseData, failure: function (a) { this.events.triggerEvent("loadend") }, scope: this
  }), this.loaded = !0)
  }, moveTo: function (a, b, c) { OpenLayers.Layer.Markers.prototype.moveTo.apply(this, arguments); this.visibility && !this.loaded && this.loadText() }, parseData: function (a) {
    a = a.responseText; var b = {}; OpenLayers.Util.extend(b, this.formatOptions); this.map && !this.projection.equals(this.map.getProjectionObject()) && (b.externalProjection = this.projection, b.internalProjection = this.map.getProjectionObject()); a = (new OpenLayers.Format.Text(b)).read(a);
    for (var b = 0, c = a.length; b < c; b++) {
      var d = {}, e = a[b], f, g, h; f = new OpenLayers.LonLat(e.geometry.x, e.geometry.y); e.style.graphicWidth && e.style.graphicHeight && (g = new OpenLayers.Size(e.style.graphicWidth, e.style.graphicHeight)); void 0 !== e.style.graphicXOffset && void 0 !== e.style.graphicYOffset && (h = new OpenLayers.Pixel(e.style.graphicXOffset, e.style.graphicYOffset)); null != e.style.externalGraphic ? d.icon = new OpenLayers.Icon(e.style.externalGraphic, g, h) : (d.icon = OpenLayers.Marker.defaultIcon(), null != g && d.icon.setSize(g));
      null != e.attributes.title && null != e.attributes.description && (d.popupContentHTML = "<h2>" + e.attributes.title + "</h2><p>" + e.attributes.description + "</p>"); d.overflow = e.attributes.overflow || "auto"; d = new OpenLayers.Feature(this, f, d); this.features.push(d); f = d.createMarker(); null != e.attributes.title && null != e.attributes.description && f.events.register("click", d, this.markerClick); this.addMarker(f)
    } this.events.triggerEvent("loadend")
  }, markerClick: function (a) {
    var b = this == this.layer.selectedFeature; this.layer.selectedFeature =
      b ? null : this; for (var c = 0, d = this.layer.map.popups.length; c < d; c++)this.layer.map.removePopup(this.layer.map.popups[c]); b || this.layer.map.addPopup(this.createPopup()); OpenLayers.Event.stop(a)
  }, clearFeatures: function () { if (null != this.features) for (; 0 < this.features.length;) { var a = this.features[0]; OpenLayers.Util.removeItem(this.features, a); a.destroy() } }, CLASS_NAME: "OpenLayers.Layer.Text"
}); OpenLayers.Handler.RegularPolygon = OpenLayers.Class(OpenLayers.Handler.Drag, {
  sides: 4, radius: null, snapAngle: null, snapToggle: "shiftKey", layerOptions: null, persist: !1, irregular: !1, citeCompliant: !1, angle: null, fixedRadius: !1, feature: null, layer: null, origin: null, initialize: function (a, b, c) { c && c.layerOptions && c.layerOptions.styleMap || (this.style = OpenLayers.Util.extend(OpenLayers.Feature.Vector.style["default"], {})); OpenLayers.Handler.Drag.prototype.initialize.apply(this, [a, b, c]); this.options = c ? c : {} }, setOptions: function (a) {
    OpenLayers.Util.extend(this.options,
      a); OpenLayers.Util.extend(this, a)
  }, activate: function () { var a = !1; OpenLayers.Handler.Drag.prototype.activate.apply(this, arguments) && (a = OpenLayers.Util.extend({ displayInLayerSwitcher: !1, calculateInRange: OpenLayers.Function.True, wrapDateLine: this.citeCompliant }, this.layerOptions), this.layer = new OpenLayers.Layer.Vector(this.CLASS_NAME, a), this.map.addLayer(this.layer), a = !0); return a }, deactivate: function () {
    var a = !1; OpenLayers.Handler.Drag.prototype.deactivate.apply(this, arguments) && (this.dragging && this.cancel(),
      null != this.layer.map && (this.layer.destroy(!1), this.feature && this.feature.destroy()), this.feature = this.layer = null, a = !0); return a
  }, down: function (a) {
  this.fixedRadius = !!this.radius; a = this.layer.getLonLatFromViewPortPx(a.xy); this.origin = new OpenLayers.Geometry.Point(a.lon, a.lat); if (!this.fixedRadius || this.irregular) this.radius = this.map.getResolution(); this.persist && this.clear(); this.feature = new OpenLayers.Feature.Vector; this.createGeometry(); this.callback("create", [this.origin, this.feature]); this.layer.addFeatures([this.feature],
    { silent: !0 }); this.layer.drawFeature(this.feature, this.style)
  }, move: function (a) {
    var b = this.layer.getLonLatFromViewPortPx(a.xy), b = new OpenLayers.Geometry.Point(b.lon, b.lat); this.irregular ? (a = Math.sqrt(2) * Math.abs(b.y - this.origin.y) / 2, this.radius = Math.max(this.map.getResolution() / 2, a)) : this.fixedRadius ? this.origin = b : (this.calculateAngle(b, a), this.radius = Math.max(this.map.getResolution() / 2, b.distanceTo(this.origin))); this.modifyGeometry(); if (this.irregular) {
      a = b.x - this.origin.x; var b = b.y - this.origin.y,
        c; c = 0 == b ? a / (this.radius * Math.sqrt(2)) : a / b; this.feature.geometry.resize(1, this.origin, c); this.feature.geometry.move(a / 2, b / 2)
    } this.layer.drawFeature(this.feature, this.style)
  }, up: function (a) { this.finalize(); this.start == this.last && this.callback("done", [a.xy]) }, out: function (a) { this.finalize() }, createGeometry: function () {
  this.angle = Math.PI * (1 / this.sides - 0.5); this.snapAngle && (this.angle += this.snapAngle * (Math.PI / 180)); this.feature.geometry = OpenLayers.Geometry.Polygon.createRegularPolygon(this.origin, this.radius,
    this.sides, this.snapAngle)
  }, modifyGeometry: function () { var a, b, c = this.feature.geometry.components[0]; c.components.length != this.sides + 1 && (this.createGeometry(), c = this.feature.geometry.components[0]); for (var d = 0; d < this.sides; ++d)b = c.components[d], a = this.angle + 2 * d * Math.PI / this.sides, b.x = this.origin.x + this.radius * Math.cos(a), b.y = this.origin.y + this.radius * Math.sin(a), b.clearBounds() }, calculateAngle: function (a, b) {
    var c = Math.atan2(a.y - this.origin.y, a.x - this.origin.x); if (this.snapAngle && this.snapToggle && !b[this.snapToggle]) {
      var d =
        Math.PI / 180 * this.snapAngle; this.angle = Math.round(c / d) * d
    } else this.angle = c
  }, cancel: function () { this.callback("cancel", null); this.finalize() }, finalize: function () { this.origin = null; this.radius = this.options.radius }, clear: function () { this.layer && (this.layer.renderer.clear(), this.layer.destroyFeatures()) }, callback: function (a, b) { this.callbacks[a] && this.callbacks[a].apply(this.control, [this.feature.geometry.clone()]); this.persist || "done" != a && "cancel" != a || this.clear() }, CLASS_NAME: "OpenLayers.Handler.RegularPolygon"
}); OpenLayers.Control.SLDSelect = OpenLayers.Class(OpenLayers.Control, {
  clearOnDeactivate: !1, layers: null, callbacks: null, selectionSymbolizer: { Polygon: { fillColor: "#FF0000", stroke: !1 }, Line: { strokeColor: "#FF0000", strokeWidth: 2 }, Point: { graphicName: "square", fillColor: "#FF0000", pointRadius: 5 } }, layerOptions: null, sketchStyle: null, wfsCache: {}, layerCache: {}, initialize: function (a, b) {
    OpenLayers.Control.prototype.initialize.apply(this, [b]); this.callbacks = OpenLayers.Util.extend({ done: this.select, click: this.select }, this.callbacks);
    this.handlerOptions = this.handlerOptions || {}; this.layerOptions = OpenLayers.Util.applyDefaults(this.layerOptions, { displayInLayerSwitcher: !1, tileOptions: { maxGetUrlLength: 2048 } }); this.sketchStyle && (this.handlerOptions.layerOptions = OpenLayers.Util.applyDefaults(this.handlerOptions.layerOptions, { styleMap: new OpenLayers.StyleMap({ "default": this.sketchStyle }) })); this.handler = new a(this, this.callbacks, this.handlerOptions)
  }, destroy: function () {
    for (var a in this.layerCache) delete this.layerCache[a]; for (a in this.wfsCache) delete this.wfsCache[a];
    OpenLayers.Control.prototype.destroy.apply(this, arguments)
  }, coupleLayerVisiblity: function (a) { this.setVisibility(a.object.getVisibility()) }, createSelectionLayer: function (a) { var b; if (this.layerCache[a.id]) b = this.layerCache[a.id]; else { b = new OpenLayers.Layer.WMS(a.name, a.url, a.params, OpenLayers.Util.applyDefaults(this.layerOptions, a.getOptions())); this.layerCache[a.id] = b; if (!1 === this.layerOptions.displayInLayerSwitcher) a.events.on({ visibilitychanged: this.coupleLayerVisiblity, scope: b }); this.map.addLayer(b) } return b },
  createSLD: function (a, b, c) {
    for (var d = { version: "1.0.0", namedLayers: {} }, e = ("" + a.params.LAYERS).split(","), f = 0, g = e.length; f < g; f++) {
      var h = e[f]; d.namedLayers[h] = { name: h, userStyles: [] }; var k = this.selectionSymbolizer, l = c[f]; 0 <= l.type.indexOf("Polygon") ? k = { Polygon: this.selectionSymbolizer.Polygon } : 0 <= l.type.indexOf("LineString") ? k = { Line: this.selectionSymbolizer.Line } : 0 <= l.type.indexOf("Point") && (k = { Point: this.selectionSymbolizer.Point }); d.namedLayers[h].userStyles.push({
        name: "default", rules: [new OpenLayers.Rule({
          symbolizer: k,
          filter: b[f], maxScaleDenominator: a.options.minScale
        })]
      })
    } return (new OpenLayers.Format.SLD({ srsName: this.map.getProjection() })).write(d)
  }, parseDescribeLayer: function (a) {
    var b = new OpenLayers.Format.WMSDescribeLayer, c = a.responseXML; c && c.documentElement || (c = a.responseText); a = b.read(c); for (var b = [], c = null, d = 0, e = a.length; d < e; d++)"WFS" == a[d].owsType && (b.push(a[d].typeName), c = a[d].owsURL); OpenLayers.Request.GET({
      url: c, params: { SERVICE: "WFS", TYPENAME: b.toString(), REQUEST: "DescribeFeatureType", VERSION: "1.0.0" },
      callback: function (a) { var b = new OpenLayers.Format.WFSDescribeFeatureType, c = a.responseXML; c && c.documentElement || (c = a.responseText); a = b.read(c); this.control.wfsCache[this.layer.id] = a; this.control._queue && this.control.applySelection() }, scope: this
    })
  }, getGeometryAttributes: function (a) {
    var b = []; a = this.wfsCache[a.id]; for (var c = 0, d = a.featureTypes.length; c < d; c++)for (var e = a.featureTypes[c].properties, f = 0, g = e.length; f < g; f++) {
      var h = e[f], k = h.type; (0 <= k.indexOf("LineString") || 0 <= k.indexOf("GeometryAssociationType") ||
        0 <= k.indexOf("GeometryPropertyType") || 0 <= k.indexOf("Point") || 0 <= k.indexOf("Polygon")) && b.push(h)
    } return b
  }, activate: function () { var a = OpenLayers.Control.prototype.activate.call(this); if (a) for (var b = 0, c = this.layers.length; b < c; b++) { var d = this.layers[b]; d && !this.wfsCache[d.id] && OpenLayers.Request.GET({ url: d.url, params: { SERVICE: "WMS", VERSION: d.params.VERSION, LAYERS: d.params.LAYERS, REQUEST: "DescribeLayer" }, callback: this.parseDescribeLayer, scope: { layer: d, control: this } }) } return a }, deactivate: function () {
    var a =
      OpenLayers.Control.prototype.deactivate.call(this); if (a) for (var b = 0, c = this.layers.length; b < c; b++) { var d = this.layers[b]; if (d && !0 === this.clearOnDeactivate) { var e = this.layerCache, f = e[d.id]; f && (d.events.un({ visibilitychanged: this.coupleLayerVisiblity, scope: f }), f.destroy(), delete e[d.id]) } } return a
  }, setLayers: function (a) { this.active ? (this.deactivate(), this.layers = a, this.activate()) : this.layers = a }, createFilter: function (a, b) {
    var c = null; this.handler instanceof OpenLayers.Handler.RegularPolygon ? c = !0 === this.handler.irregular ?
      new OpenLayers.Filter.Spatial({ type: OpenLayers.Filter.Spatial.BBOX, property: a.name, value: b.getBounds() }) : new OpenLayers.Filter.Spatial({ type: OpenLayers.Filter.Spatial.INTERSECTS, property: a.name, value: b }) : this.handler instanceof OpenLayers.Handler.Polygon ? c = new OpenLayers.Filter.Spatial({ type: OpenLayers.Filter.Spatial.INTERSECTS, property: a.name, value: b }) : this.handler instanceof OpenLayers.Handler.Path ? c = 0 <= a.type.indexOf("Point") ? new OpenLayers.Filter.Spatial({
        type: OpenLayers.Filter.Spatial.DWITHIN,
        property: a.name, distance: 0.01 * this.map.getExtent().getWidth(), distanceUnits: this.map.getUnits(), value: b
      }) : new OpenLayers.Filter.Spatial({ type: OpenLayers.Filter.Spatial.INTERSECTS, property: a.name, value: b }) : this.handler instanceof OpenLayers.Handler.Click && (c = 0 <= a.type.indexOf("Polygon") ? new OpenLayers.Filter.Spatial({ type: OpenLayers.Filter.Spatial.INTERSECTS, property: a.name, value: b }) : new OpenLayers.Filter.Spatial({
        type: OpenLayers.Filter.Spatial.DWITHIN, property: a.name, distance: 0.01 * this.map.getExtent().getWidth(),
        distanceUnits: this.map.getUnits(), value: b
      })); return c
  }, select: function (a) {
  this._queue = function () {
    for (var b = 0, c = this.layers.length; b < c; b++) {
      for (var d = this.layers[b], e = this.getGeometryAttributes(d), f = [], g = 0, h = e.length; g < h; g++) { var k = e[g]; if (null !== k) { if (!(a instanceof OpenLayers.Geometry)) { var l = this.map.getLonLatFromPixel(a.xy); a = new OpenLayers.Geometry.Point(l.lon, l.lat) } k = this.createFilter(k, a); null !== k && f.push(k) } } g = this.createSelectionLayer(d); this.events.triggerEvent("selected", { layer: d, filters: f });
      d = this.createSLD(d, f, e); g.mergeNewParams({ SLD_BODY: d }); delete this._queue
    }
  }; this.applySelection()
  }, applySelection: function () { for (var a = !0, b = 0, c = this.layers.length; b < c; b++)if (!this.wfsCache[this.layers[b].id]) { a = !1; break } a && this._queue.call(this) }, CLASS_NAME: "OpenLayers.Control.SLDSelect"
}); OpenLayers.Control.Scale = OpenLayers.Class(OpenLayers.Control, {
  element: null, geodesic: !1, initialize: function (a, b) { OpenLayers.Control.prototype.initialize.apply(this, [b]); this.element = OpenLayers.Util.getElement(a) }, draw: function () { OpenLayers.Control.prototype.draw.apply(this, arguments); this.element || (this.element = document.createElement("div"), this.div.appendChild(this.element)); this.map.events.register("moveend", this, this.updateScale); this.updateScale(); return this.div }, updateScale: function () {
    var a;
    if (!0 === this.geodesic) { if (!this.map.getUnits()) return; a = OpenLayers.INCHES_PER_UNIT; a = (this.map.getGeodesicPixelSize().w || 1E-6) * a.km * OpenLayers.DOTS_PER_INCH } else a = this.map.getScale(); a && (a = 9500 <= a && 95E4 >= a ? Math.round(a / 1E3) + "K" : 95E4 <= a ? Math.round(a / 1E6) + "M" : Math.round(a), this.element.innerHTML = OpenLayers.i18n("Scale = 1 : ${scaleDenom}", { scaleDenom: a }))
  }, CLASS_NAME: "OpenLayers.Control.Scale"
}); OpenLayers.Layer.MapGuide = OpenLayers.Class(OpenLayers.Layer.Grid, {
  isBaseLayer: !0, useHttpTile: !1, singleTile: !1, useOverlay: !1, useAsyncOverlay: !0, TILE_PARAMS: { operation: "GETTILEIMAGE", version: "1.2.0" }, SINGLE_TILE_PARAMS: { operation: "GETMAPIMAGE", format: "PNG", locale: "en", clip: "1", version: "1.0.0" }, OVERLAY_PARAMS: { operation: "GETDYNAMICMAPOVERLAYIMAGE", format: "PNG", locale: "en", clip: "1", version: "2.0.0" }, FOLDER_PARAMS: { tileColumnsPerFolder: 30, tileRowsPerFolder: 30, format: "png", querystring: null }, defaultSize: new OpenLayers.Size(300,
    300), tileOriginCorner: "tl", initialize: function (a, b, c, d) {
      OpenLayers.Layer.Grid.prototype.initialize.apply(this, arguments); if (null == d || null == d.isBaseLayer) this.isBaseLayer = "true" != this.transparent && !0 != this.transparent; d && null != d.useOverlay && (this.useOverlay = d.useOverlay); this.singleTile ? this.useOverlay ? (OpenLayers.Util.applyDefaults(this.params, this.OVERLAY_PARAMS), this.useAsyncOverlay || (this.params.version = "1.0.0")) : OpenLayers.Util.applyDefaults(this.params, this.SINGLE_TILE_PARAMS) : (this.useHttpTile ?
        OpenLayers.Util.applyDefaults(this.params, this.FOLDER_PARAMS) : OpenLayers.Util.applyDefaults(this.params, this.TILE_PARAMS), this.setTileSize(this.defaultSize))
    }, clone: function (a) { null == a && (a = new OpenLayers.Layer.MapGuide(this.name, this.url, this.params, this.getOptions())); return a = OpenLayers.Layer.Grid.prototype.clone.apply(this, [a]) }, getURL: function (a) {
      var b; b = a.getCenterLonLat(); var c = this.map.getSize(); this.singleTile ? (a = {
        setdisplaydpi: OpenLayers.DOTS_PER_INCH, setdisplayheight: c.h * this.ratio, setdisplaywidth: c.w *
          this.ratio, setviewcenterx: b.lon, setviewcentery: b.lat, setviewscale: this.map.getScale()
      }, this.useOverlay && !this.useAsyncOverlay && (b = {}, b = OpenLayers.Util.extend(b, a), b.operation = "GETVISIBLEMAPEXTENT", b.version = "1.0.0", b.session = this.params.session, b.mapName = this.params.mapName, b.format = "text/xml", b = this.getFullRequestString(b), OpenLayers.Request.GET({ url: b, async: !1 })), b = this.getFullRequestString(a)) : (c = this.map.getResolution(), b = Math.floor((a.left - this.maxExtent.left) / c), b = Math.round(b / this.tileSize.w),
        a = Math.floor((this.maxExtent.top - a.top) / c), a = Math.round(a / this.tileSize.h), b = this.useHttpTile ? this.getImageFilePath({ tilecol: b, tilerow: a, scaleindex: this.resolutions.length - this.map.zoom - 1 }) : this.getFullRequestString({ tilecol: b, tilerow: a, scaleindex: this.resolutions.length - this.map.zoom - 1 })); return b
    }, getFullRequestString: function (a, b) {
      var c = null == b ? this.url : b; "object" == typeof c && (c = c[Math.floor(Math.random() * c.length)]); var d = c, e = OpenLayers.Util.extend({}, this.params), e = OpenLayers.Util.extend(e, a),
        f = OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(c)), g; for (g in e) g.toUpperCase() in f && delete e[g]; e = OpenLayers.Util.getParameterString(e); e = e.replace(/,/g, "+"); "" != e && (f = c.charAt(c.length - 1), d = "&" == f || "?" == f ? d + e : -1 == c.indexOf("?") ? d + ("?" + e) : d + ("&" + e)); return d
    }, getImageFilePath: function (a, b) {
      var c = null == b ? this.url : b; "object" == typeof c && (c = c[Math.floor(Math.random() * c.length)]); var d = "", e = ""; 0 > a.tilerow && (d = "-"); d = 0 == a.tilerow ? d + "0" : d + Math.floor(Math.abs(a.tilerow / this.params.tileRowsPerFolder)) *
        this.params.tileRowsPerFolder; 0 > a.tilecol && (e = "-"); e = 0 == a.tilecol ? e + "0" : e + Math.floor(Math.abs(a.tilecol / this.params.tileColumnsPerFolder)) * this.params.tileColumnsPerFolder; d = "/S" + Math.floor(a.scaleindex) + "/" + this.params.basemaplayergroupname + "/R" + d + "/C" + e + "/" + a.tilerow % this.params.tileRowsPerFolder + "_" + a.tilecol % this.params.tileColumnsPerFolder + "." + this.params.format; this.params.querystring && (d += "?" + this.params.querystring); return c + d
    }, CLASS_NAME: "OpenLayers.Layer.MapGuide"
}); OpenLayers.Control.Measure = OpenLayers.Class(OpenLayers.Control, {
  callbacks: null, displaySystem: "metric", geodesic: !1, displaySystemUnits: { geographic: ["dd"], english: ["mi", "ft", "in"], metric: ["km", "m"] }, partialDelay: 300, delayedTrigger: null, persist: !1, immediate: !1, initialize: function (a, b) {
    OpenLayers.Control.prototype.initialize.apply(this, [b]); var c = { done: this.measureComplete, point: this.measurePartial }; this.immediate && (c.modify = this.measureImmediate); this.callbacks = OpenLayers.Util.extend(c, this.callbacks);
    this.handlerOptions = OpenLayers.Util.extend({ persist: this.persist }, this.handlerOptions); this.handler = new a(this, this.callbacks, this.handlerOptions)
  }, deactivate: function () { this.cancelDelay(); return OpenLayers.Control.prototype.deactivate.apply(this, arguments) }, cancel: function () { this.cancelDelay(); this.handler.cancel() }, setImmediate: function (a) { (this.immediate = a) ? this.callbacks.modify = this.measureImmediate : delete this.callbacks.modify }, updateHandler: function (a, b) {
    var c = this.active; c && this.deactivate();
    this.handler = new a(this, this.callbacks, b); c && this.activate()
  }, measureComplete: function (a) { this.cancelDelay(); this.measure(a, "measure") }, measurePartial: function (a, b) { this.cancelDelay(); b = b.clone(); this.handler.freehandMode(this.handler.evt) ? this.measure(b, "measurepartial") : this.delayedTrigger = window.setTimeout(OpenLayers.Function.bind(function () { this.delayedTrigger = null; this.measure(b, "measurepartial") }, this), this.partialDelay) }, measureImmediate: function (a, b, c) {
  c && !this.handler.freehandMode(this.handler.evt) &&
    (this.cancelDelay(), this.measure(b.geometry, "measurepartial"))
  }, cancelDelay: function () { null !== this.delayedTrigger && (window.clearTimeout(this.delayedTrigger), this.delayedTrigger = null) }, measure: function (a, b) { var c, d; -1 < a.CLASS_NAME.indexOf("LineString") ? (c = this.getBestLength(a), d = 1) : (c = this.getBestArea(a), d = 2); this.events.triggerEvent(b, { measure: c[0], units: c[1], order: d, geometry: a }) }, getBestArea: function (a) {
    for (var b = this.displaySystemUnits[this.displaySystem], c, d, e = 0, f = b.length; e < f && !(c = b[e], d = this.getArea(a,
      c), 1 < d); ++e); return [d, c]
  }, getArea: function (a, b) { var c, d; this.geodesic ? (c = a.getGeodesicArea(this.map.getProjectionObject()), d = "m") : (c = a.getArea(), d = this.map.getUnits()); var e = OpenLayers.INCHES_PER_UNIT[b]; e && (c *= Math.pow(OpenLayers.INCHES_PER_UNIT[d] / e, 2)); return c }, getBestLength: function (a) { for (var b = this.displaySystemUnits[this.displaySystem], c, d, e = 0, f = b.length; e < f && !(c = b[e], d = this.getLength(a, c), 1 < d); ++e); return [d, c] }, getLength: function (a, b) {
    var c, d; this.geodesic ? (c = a.getGeodesicLength(this.map.getProjectionObject()),
      d = "m") : (c = a.getLength(), d = this.map.getUnits()); var e = OpenLayers.INCHES_PER_UNIT[b]; e && (c *= OpenLayers.INCHES_PER_UNIT[d] / e); return c
  }, CLASS_NAME: "OpenLayers.Control.Measure"
}); OpenLayers.Format.WMC.v1_0_0 = OpenLayers.Class(OpenLayers.Format.WMC.v1, {
  VERSION: "1.0.0", schemaLocation: "http://www.opengis.net/context http://schemas.opengis.net/context/1.0.0/context.xsd", initialize: function (a) { OpenLayers.Format.WMC.v1.prototype.initialize.apply(this, [a]) }, read_wmc_SRS: function (a, b) { var c = this.getChildValue(b); "object" != typeof a.projections && (a.projections = {}); for (var c = c.split(/ +/), d = 0, e = c.length; d < e; d++)a.projections[c[d]] = !0 }, write_wmc_Layer: function (a) {
    var b = OpenLayers.Format.WMC.v1.prototype.write_wmc_Layer.apply(this,
      [a]); if (a.srs) { var c = [], d; for (d in a.srs) c.push(d); b.appendChild(this.createElementDefaultNS("SRS", c.join(" "))) } b.appendChild(this.write_wmc_FormatList(a)); b.appendChild(this.write_wmc_StyleList(a)); a.dimensions && b.appendChild(this.write_wmc_DimensionList(a)); b.appendChild(this.write_wmc_LayerExtension(a))
  }, CLASS_NAME: "OpenLayers.Format.WMC.v1_0_0"
}); OpenLayers.Popup.Anchored = OpenLayers.Class(OpenLayers.Popup, {
  relativePosition: null, keepInMap: !0, anchor: null, initialize: function (a, b, c, d, e, f, g) { OpenLayers.Popup.prototype.initialize.apply(this, [a, b, c, d, f, g]); this.anchor = null != e ? e : { size: new OpenLayers.Size(0, 0), offset: new OpenLayers.Pixel(0, 0) } }, destroy: function () { this.relativePosition = this.anchor = null; OpenLayers.Popup.prototype.destroy.apply(this, arguments) }, show: function () { this.updatePosition(); OpenLayers.Popup.prototype.show.apply(this, arguments) },
  moveTo: function (a) { var b = this.relativePosition; this.relativePosition = this.calculateRelativePosition(a); OpenLayers.Popup.prototype.moveTo.call(this, this.calculateNewPx(a)); this.relativePosition != b && this.updateRelativePosition() }, setSize: function (a) { OpenLayers.Popup.prototype.setSize.apply(this, arguments); if (this.lonlat && this.map) { var b = this.map.getLayerPxFromLonLat(this.lonlat); this.moveTo(b) } }, calculateRelativePosition: function (a) {
    a = this.map.getLonLatFromLayerPx(a); a = this.map.getExtent().determineQuadrant(a);
    return OpenLayers.Bounds.oppositeQuadrant(a)
  }, updateRelativePosition: function () { }, calculateNewPx: function (a) { a = a.offset(this.anchor.offset); var b = this.size || this.contentSize, c = "t" == this.relativePosition.charAt(0); a.y += c ? -b.h : this.anchor.size.h; c = "l" == this.relativePosition.charAt(1); a.x += c ? -b.w : this.anchor.size.w; return a }, CLASS_NAME: "OpenLayers.Popup.Anchored"
}); OpenLayers.Popup.Framed = OpenLayers.Class(OpenLayers.Popup.Anchored, {
  imageSrc: null, imageSize: null, isAlphaImage: !1, positionBlocks: null, blocks: null, fixedRelativePosition: !1, initialize: function (a, b, c, d, e, f, g) {
    OpenLayers.Popup.Anchored.prototype.initialize.apply(this, arguments); this.fixedRelativePosition && (this.updateRelativePosition(), this.calculateRelativePosition = function (a) { return this.relativePosition }); this.contentDiv.style.position = "absolute"; this.contentDiv.style.zIndex = 1; f && (this.closeDiv.style.zIndex =
      1); this.groupDiv.style.position = "absolute"; this.groupDiv.style.top = "0px"; this.groupDiv.style.left = "0px"; this.groupDiv.style.height = "100%"; this.groupDiv.style.width = "100%"
  }, destroy: function () {
  this.isAlphaImage = this.imageSize = this.imageSrc = null; this.fixedRelativePosition = !1; this.positionBlocks = null; for (var a = 0; a < this.blocks.length; a++) { var b = this.blocks[a]; b.image && b.div.removeChild(b.image); b.image = null; b.div && this.groupDiv.removeChild(b.div); b.div = null } this.blocks = null; OpenLayers.Popup.Anchored.prototype.destroy.apply(this,
    arguments)
  }, setBackgroundColor: function (a) { }, setBorder: function () { }, setOpacity: function (a) { }, setSize: function (a) { OpenLayers.Popup.Anchored.prototype.setSize.apply(this, arguments); this.updateBlocks() }, updateRelativePosition: function () { this.padding = this.positionBlocks[this.relativePosition].padding; if (this.closeDiv) { var a = this.getContentDivPadding(); this.closeDiv.style.right = a.right + this.padding.right + "px"; this.closeDiv.style.top = a.top + this.padding.top + "px" } this.updateBlocks() }, calculateNewPx: function (a) {
    var b =
      OpenLayers.Popup.Anchored.prototype.calculateNewPx.apply(this, arguments); return b = b.offset(this.positionBlocks[this.relativePosition].offset)
  }, createBlocks: function () {
  this.blocks = []; var a = null, b; for (b in this.positionBlocks) { a = b; break } a = this.positionBlocks[a]; for (b = 0; b < a.blocks.length; b++) {
    var c = {}; this.blocks.push(c); c.div = OpenLayers.Util.createDiv(this.id + "_FrameDecorationDiv_" + b, null, null, null, "absolute", null, "hidden", null); c.image = (this.isAlphaImage ? OpenLayers.Util.createAlphaImageDiv : OpenLayers.Util.createImage)(this.id +
      "_FrameDecorationImg_" + b, null, this.imageSize, this.imageSrc, "absolute", null, null, null); c.div.appendChild(c.image); this.groupDiv.appendChild(c.div)
  }
  }, updateBlocks: function () {
  this.blocks || this.createBlocks(); if (this.size && this.relativePosition) {
    for (var a = this.positionBlocks[this.relativePosition], b = 0; b < a.blocks.length; b++) {
      var c = a.blocks[b], d = this.blocks[b], e = c.anchor.left, f = c.anchor.bottom, g = c.anchor.right, h = c.anchor.top, k = isNaN(c.size.w) ? this.size.w - (g + e) : c.size.w, l = isNaN(c.size.h) ? this.size.h - (f +
        h) : c.size.h; d.div.style.width = (0 > k ? 0 : k) + "px"; d.div.style.height = (0 > l ? 0 : l) + "px"; d.div.style.left = null != e ? e + "px" : ""; d.div.style.bottom = null != f ? f + "px" : ""; d.div.style.right = null != g ? g + "px" : ""; d.div.style.top = null != h ? h + "px" : ""; d.image.style.left = c.position.x + "px"; d.image.style.top = c.position.y + "px"
    } this.contentDiv.style.left = this.padding.left + "px"; this.contentDiv.style.top = this.padding.top + "px"
  }
  }, CLASS_NAME: "OpenLayers.Popup.Framed"
}); OpenLayers.Popup.FramedCloud = OpenLayers.Class(OpenLayers.Popup.Framed, {
  contentDisplayClass: "olFramedCloudPopupContent", autoSize: !0, panMapIfOutOfView: !0, imageSize: new OpenLayers.Size(1276, 736), isAlphaImage: !1, fixedRelativePosition: !1, positionBlocks: {
    tl: {
      offset: new OpenLayers.Pixel(44, 0), padding: new OpenLayers.Bounds(8, 40, 8, 9), blocks: [{ size: new OpenLayers.Size("auto", "auto"), anchor: new OpenLayers.Bounds(0, 51, 22, 0), position: new OpenLayers.Pixel(0, 0) }, {
        size: new OpenLayers.Size(22, "auto"), anchor: new OpenLayers.Bounds(null,
          50, 0, 0), position: new OpenLayers.Pixel(-1238, 0)
      }, { size: new OpenLayers.Size("auto", 19), anchor: new OpenLayers.Bounds(0, 32, 22, null), position: new OpenLayers.Pixel(0, -631) }, { size: new OpenLayers.Size(22, 18), anchor: new OpenLayers.Bounds(null, 32, 0, null), position: new OpenLayers.Pixel(-1238, -632) }, { size: new OpenLayers.Size(81, 35), anchor: new OpenLayers.Bounds(null, 0, 0, null), position: new OpenLayers.Pixel(0, -688) }]
    }, tr: {
      offset: new OpenLayers.Pixel(-45, 0), padding: new OpenLayers.Bounds(8, 40, 8, 9), blocks: [{
        size: new OpenLayers.Size("auto",
          "auto"), anchor: new OpenLayers.Bounds(0, 51, 22, 0), position: new OpenLayers.Pixel(0, 0)
      }, { size: new OpenLayers.Size(22, "auto"), anchor: new OpenLayers.Bounds(null, 50, 0, 0), position: new OpenLayers.Pixel(-1238, 0) }, { size: new OpenLayers.Size("auto", 19), anchor: new OpenLayers.Bounds(0, 32, 22, null), position: new OpenLayers.Pixel(0, -631) }, { size: new OpenLayers.Size(22, 19), anchor: new OpenLayers.Bounds(null, 32, 0, null), position: new OpenLayers.Pixel(-1238, -631) }, {
        size: new OpenLayers.Size(81, 35), anchor: new OpenLayers.Bounds(0,
          0, null, null), position: new OpenLayers.Pixel(-215, -687)
      }]
    }, bl: {
      offset: new OpenLayers.Pixel(45, 0), padding: new OpenLayers.Bounds(8, 9, 8, 40), blocks: [{ size: new OpenLayers.Size("auto", "auto"), anchor: new OpenLayers.Bounds(0, 21, 22, 32), position: new OpenLayers.Pixel(0, 0) }, { size: new OpenLayers.Size(22, "auto"), anchor: new OpenLayers.Bounds(null, 21, 0, 32), position: new OpenLayers.Pixel(-1238, 0) }, { size: new OpenLayers.Size("auto", 21), anchor: new OpenLayers.Bounds(0, 0, 22, null), position: new OpenLayers.Pixel(0, -629) }, {
        size: new OpenLayers.Size(22,
          21), anchor: new OpenLayers.Bounds(null, 0, 0, null), position: new OpenLayers.Pixel(-1238, -629)
      }, { size: new OpenLayers.Size(81, 33), anchor: new OpenLayers.Bounds(null, null, 0, 0), position: new OpenLayers.Pixel(-101, -674) }]
    }, br: {
      offset: new OpenLayers.Pixel(-44, 0), padding: new OpenLayers.Bounds(8, 9, 8, 40), blocks: [{ size: new OpenLayers.Size("auto", "auto"), anchor: new OpenLayers.Bounds(0, 21, 22, 32), position: new OpenLayers.Pixel(0, 0) }, {
        size: new OpenLayers.Size(22, "auto"), anchor: new OpenLayers.Bounds(null, 21, 0, 32), position: new OpenLayers.Pixel(-1238,
          0)
      }, { size: new OpenLayers.Size("auto", 21), anchor: new OpenLayers.Bounds(0, 0, 22, null), position: new OpenLayers.Pixel(0, -629) }, { size: new OpenLayers.Size(22, 21), anchor: new OpenLayers.Bounds(null, 0, 0, null), position: new OpenLayers.Pixel(-1238, -629) }, { size: new OpenLayers.Size(81, 33), anchor: new OpenLayers.Bounds(0, null, null, 0), position: new OpenLayers.Pixel(-311, -674) }]
    }
  }, minSize: new OpenLayers.Size(105, 10), maxSize: new OpenLayers.Size(1200, 660), initialize: function (a, b, c, d, e, f, g) {
  this.imageSrc = OpenLayers.Util.getImageLocation("cloud-popup-relative.png");
    OpenLayers.Popup.Framed.prototype.initialize.apply(this, arguments); this.contentDiv.className = this.contentDisplayClass
  }, CLASS_NAME: "OpenLayers.Popup.FramedCloud"
}); OpenLayers.Tile.Image.IFrame = {
  useIFrame: null, blankImageUrl: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAQAIBRAA7", draw: function () {
    if (OpenLayers.Tile.Image.prototype.shouldDraw.call(this)) {
      var a = this.layer.getURL(this.bounds), b = this.useIFrame; this.useIFrame = null !== this.maxGetUrlLength && !this.layer.async && a.length > this.maxGetUrlLength; a = b && !this.useIFrame; b = !b && this.useIFrame; if (a || b) this.imgDiv && this.imgDiv.parentNode === this.frame && this.frame.removeChild(this.imgDiv), this.imgDiv =
        null, a && this.frame.removeChild(this.frame.firstChild)
    } return OpenLayers.Tile.Image.prototype.draw.apply(this, arguments)
  }, getImage: function () {
    if (!0 === this.useIFrame) {
      if (!this.frame.childNodes.length) { var a = document.createElement("div"), b = a.style; b.position = "absolute"; b.width = "100%"; b.height = "100%"; b.zIndex = 1; b.backgroundImage = "url(" + this.blankImageUrl + ")"; this.frame.appendChild(a) } a = this.id + "_iFrame"; 9 > parseFloat(navigator.appVersion.split("MSIE")[1]) ? (b = document.createElement('<iframe name="' + a + '">'),
        b.style.backgroundColor = "#FFFFFF", b.style.filter = "chroma(color=#FFFFFF)") : (b = document.createElement("iframe"), b.style.backgroundColor = "transparent", b.name = a); b.scrolling = "no"; b.marginWidth = "0px"; b.marginHeight = "0px"; b.frameBorder = "0"; b.style.position = "absolute"; b.style.width = "100%"; b.style.height = "100%"; 1 > this.layer.opacity && OpenLayers.Util.modifyDOMElement(b, null, null, null, null, null, null, this.layer.opacity); this.frame.appendChild(b); return this.imgDiv = b
    } return OpenLayers.Tile.Image.prototype.getImage.apply(this,
      arguments)
  }, createRequestForm: function () { var a = document.createElement("form"); a.method = "POST"; var b = this.layer.params._OLSALT, b = (b ? b + "_" : "") + this.bounds.toBBOX(); a.action = OpenLayers.Util.urlAppend(this.layer.url, b); a.target = this.id + "_iFrame"; this.layer.getImageSize(); var b = OpenLayers.Util.getParameters(this.url), c, d; for (d in b) c = document.createElement("input"), c.type = "hidden", c.name = d, c.value = b[d], a.appendChild(c); return a }, setImgSrc: function (a) {
    if (!0 === this.useIFrame) if (a) {
      var b = this.createRequestForm();
      this.frame.appendChild(b); b.submit(); this.frame.removeChild(b)
    } else this.imgDiv.parentNode === this.frame && (this.frame.removeChild(this.imgDiv), this.imgDiv = null); else OpenLayers.Tile.Image.prototype.setImgSrc.apply(this, arguments)
  }, onImageLoad: function () { OpenLayers.Tile.Image.prototype.onImageLoad.apply(this, arguments); !0 === this.useIFrame && (this.imgDiv.style.opacity = 1, this.frame.style.opacity = this.layer.opacity) }, createBackBuffer: function () {
    var a; !1 === this.useIFrame && (a = OpenLayers.Tile.Image.prototype.createBackBuffer.call(this));
    return a
  }
}; OpenLayers.Format.SOSCapabilities = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, { defaultVersion: "1.0.0", CLASS_NAME: "OpenLayers.Format.SOSCapabilities" }); OpenLayers.Format.SOSCapabilities.v1_0_0 = OpenLayers.Class(OpenLayers.Format.SOSCapabilities, {
  namespaces: { ows: "http://www.opengis.net/ows/1.1", sos: "http://www.opengis.net/sos/1.0", gml: "http://www.opengis.net/gml", xlink: "http://www.w3.org/1999/xlink" }, regExes: { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g }, initialize: function (a) { OpenLayers.Format.XML.prototype.initialize.apply(this, [a]); this.options = a }, read: function (a) {
  "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this,
    [a])); a && 9 == a.nodeType && (a = a.documentElement); var b = {}; this.readNode(a, b); return b
  }, readers: {
    gml: OpenLayers.Util.applyDefaults({ name: function (a, b) { b.name = this.getChildValue(a) }, TimePeriod: function (a, b) { b.timePeriod = {}; this.readChildNodes(a, b.timePeriod) }, beginPosition: function (a, b) { b.beginPosition = this.getChildValue(a) }, endPosition: function (a, b) { b.endPosition = this.getChildValue(a) } }, OpenLayers.Format.GML.v3.prototype.readers.gml), sos: {
      Capabilities: function (a, b) { this.readChildNodes(a, b) }, Contents: function (a,
        b) { b.contents = {}; this.readChildNodes(a, b.contents) }, ObservationOfferingList: function (a, b) { b.offeringList = {}; this.readChildNodes(a, b.offeringList) }, ObservationOffering: function (a, b) { var c = this.getAttributeNS(a, this.namespaces.gml, "id"); b[c] = { procedures: [], observedProperties: [], featureOfInterestIds: [], responseFormats: [], resultModels: [], responseModes: [] }; this.readChildNodes(a, b[c]) }, time: function (a, b) { b.time = {}; this.readChildNodes(a, b.time) }, procedure: function (a, b) {
          b.procedures.push(this.getAttributeNS(a,
            this.namespaces.xlink, "href"))
        }, observedProperty: function (a, b) { b.observedProperties.push(this.getAttributeNS(a, this.namespaces.xlink, "href")) }, featureOfInterest: function (a, b) { b.featureOfInterestIds.push(this.getAttributeNS(a, this.namespaces.xlink, "href")) }, responseFormat: function (a, b) { b.responseFormats.push(this.getChildValue(a)) }, resultModel: function (a, b) { b.resultModels.push(this.getChildValue(a)) }, responseMode: function (a, b) { b.responseModes.push(this.getChildValue(a)) }
    }, ows: OpenLayers.Format.OWSCommon.v1_1_0.prototype.readers.ows
  },
  CLASS_NAME: "OpenLayers.Format.SOSCapabilities.v1_0_0"
}); OpenLayers.Handler.Pinch = OpenLayers.Class(OpenLayers.Handler, {
  started: !1, stopDown: !1, pinching: !1, last: null, start: null, touchstart: function (a) { var b = !0; this.pinching = !1; if (OpenLayers.Event.isMultiTouch(a)) this.started = !0, this.last = this.start = { distance: this.getDistance(a.touches), delta: 0, scale: 1 }, this.callback("start", [a, this.start]), b = !this.stopDown; else { if (this.started) return !1; this.started = !1; this.last = this.start = null } OpenLayers.Event.preventDefault(a); return b }, touchmove: function (a) {
    if (this.started &&
      OpenLayers.Event.isMultiTouch(a)) { this.pinching = !0; var b = this.getPinchData(a); this.callback("move", [a, b]); this.last = b; OpenLayers.Event.stop(a) } else if (this.started) return !1; return !0
  }, touchend: function (a) { return this.started && !OpenLayers.Event.isMultiTouch(a) ? (this.pinching = this.started = !1, this.callback("done", [a, this.start, this.last]), this.last = this.start = null, !1) : !0 }, activate: function () { var a = !1; OpenLayers.Handler.prototype.activate.apply(this, arguments) && (this.pinching = !1, a = !0); return a }, deactivate: function () {
    var a =
      !1; OpenLayers.Handler.prototype.deactivate.apply(this, arguments) && (this.pinching = this.started = !1, this.last = this.start = null, a = !0); return a
  }, getDistance: function (a) { var b = a[0]; a = a[1]; return Math.sqrt(Math.pow(b.olClientX - a.olClientX, 2) + Math.pow(b.olClientY - a.olClientY, 2)) }, getPinchData: function (a) { a = this.getDistance(a.touches); return { distance: a, delta: this.last.distance - a, scale: a / this.start.distance } }, CLASS_NAME: "OpenLayers.Handler.Pinch"
}); OpenLayers.Control.NavToolbar = OpenLayers.Class(OpenLayers.Control.Panel, { initialize: function (a) { OpenLayers.Control.Panel.prototype.initialize.apply(this, [a]); this.addControls([new OpenLayers.Control.Navigation, new OpenLayers.Control.ZoomBox]) }, draw: function () { var a = OpenLayers.Control.Panel.prototype.draw.apply(this, arguments); null === this.defaultControl && (this.defaultControl = this.controls[0]); return a }, CLASS_NAME: "OpenLayers.Control.NavToolbar" }); OpenLayers.Strategy.Refresh = OpenLayers.Class(OpenLayers.Strategy, {
  force: !1, interval: 0, timer: null, activate: function () { var a = OpenLayers.Strategy.prototype.activate.call(this); a && (!0 === this.layer.visibility && this.start(), this.layer.events.on({ visibilitychanged: this.reset, scope: this })); return a }, deactivate: function () { var a = OpenLayers.Strategy.prototype.deactivate.call(this); a && (this.stop(), this.layer.events.un({ visibilitychanged: this.reset, scope: this })); return a }, reset: function () {
  !0 === this.layer.visibility ?
    this.start() : this.stop()
  }, start: function () { this.interval && ("number" === typeof this.interval && 0 < this.interval) && (this.timer = window.setInterval(OpenLayers.Function.bind(this.refresh, this), this.interval)) }, refresh: function () { this.layer && (this.layer.refresh && "function" == typeof this.layer.refresh) && this.layer.refresh({ force: this.force }) }, stop: function () { null !== this.timer && (window.clearInterval(this.timer), this.timer = null) }, CLASS_NAME: "OpenLayers.Strategy.Refresh"
}); OpenLayers.Layer.ArcGIS93Rest = OpenLayers.Class(OpenLayers.Layer.Grid, {
  DEFAULT_PARAMS: { format: "png" }, isBaseLayer: !0, initialize: function (a, b, c, d) {
    var e = []; c = OpenLayers.Util.upperCaseObject(c); e.push(a, b, c, d); OpenLayers.Layer.Grid.prototype.initialize.apply(this, e); OpenLayers.Util.applyDefaults(this.params, OpenLayers.Util.upperCaseObject(this.DEFAULT_PARAMS)); this.params.TRANSPARENT && "true" == this.params.TRANSPARENT.toString().toLowerCase() && (null != d && d.isBaseLayer || (this.isBaseLayer = !1), "jpg" == this.params.FORMAT &&
      (this.params.FORMAT = OpenLayers.Util.alphaHack() ? "gif" : "png"))
  }, clone: function (a) { null == a && (a = new OpenLayers.Layer.ArcGIS93Rest(this.name, this.url, this.params, this.getOptions())); return a = OpenLayers.Layer.Grid.prototype.clone.apply(this, [a]) }, getURL: function (a) {
    a = this.adjustBounds(a); var b = this.projection.getCode().split(":"), b = b[b.length - 1], c = this.getImageSize(); a = { BBOX: a.toBBOX(), SIZE: c.w + "," + c.h, F: "image", BBOXSR: b, IMAGESR: b }; if (this.layerDefs) {
      var b = [], d; for (d in this.layerDefs) this.layerDefs.hasOwnProperty(d) &&
        this.layerDefs[d] && (b.push(d), b.push(":"), b.push(this.layerDefs[d]), b.push(";")); 0 < b.length && (a.LAYERDEFS = b.join(""))
    } return this.getFullRequestString(a)
  }, setLayerFilter: function (a, b) { this.layerDefs || (this.layerDefs = {}); b ? this.layerDefs[a] = b : delete this.layerDefs[a] }, clearLayerFilter: function (a) { a ? delete this.layerDefs[a] : delete this.layerDefs }, mergeNewParams: function (a) { a = [OpenLayers.Util.upperCaseObject(a)]; return OpenLayers.Layer.Grid.prototype.mergeNewParams.apply(this, a) }, CLASS_NAME: "OpenLayers.Layer.ArcGIS93Rest"
}); OpenLayers.Handler.Hover = OpenLayers.Class(OpenLayers.Handler, {
  delay: 500, pixelTolerance: null, stopMove: !1, px: null, timerId: null, mousemove: function (a) { this.passesTolerance(a.xy) && (this.clearTimer(), this.callback("move", [a]), this.px = a.xy, a = OpenLayers.Util.extend({}, a), this.timerId = window.setTimeout(OpenLayers.Function.bind(this.delayedCall, this, a), this.delay)); return !this.stopMove }, mouseout: function (a) { OpenLayers.Util.mouseLeft(a, this.map.viewPortDiv) && (this.clearTimer(), this.callback("move", [a])); return !0 },
  passesTolerance: function (a) { var b = !0; this.pixelTolerance && this.px && Math.sqrt(Math.pow(this.px.x - a.x, 2) + Math.pow(this.px.y - a.y, 2)) < this.pixelTolerance && (b = !1); return b }, clearTimer: function () { null != this.timerId && (window.clearTimeout(this.timerId), this.timerId = null) }, delayedCall: function (a) { this.callback("pause", [a]) }, deactivate: function () { var a = !1; OpenLayers.Handler.prototype.deactivate.apply(this, arguments) && (this.clearTimer(), a = !0); return a }, CLASS_NAME: "OpenLayers.Handler.Hover"
}); OpenLayers.Control.GetFeature = OpenLayers.Class(OpenLayers.Control, {
  protocol: null, multipleKey: null, toggleKey: null, modifiers: null, multiple: !1, click: !0, single: !0, clickout: !0, toggle: !1, clickTolerance: 5, hover: !1, box: !1, maxFeatures: 10, features: null, hoverFeature: null, handlers: null, hoverResponse: null, filterType: OpenLayers.Filter.Spatial.BBOX, initialize: function (a) {
  a.handlerOptions = a.handlerOptions || {}; OpenLayers.Control.prototype.initialize.apply(this, [a]); this.features = {}; this.handlers = {}; this.click && (this.handlers.click =
    new OpenLayers.Handler.Click(this, { click: this.selectClick }, this.handlerOptions.click || {})); this.box && (this.handlers.box = new OpenLayers.Handler.Box(this, { done: this.selectBox }, OpenLayers.Util.extend(this.handlerOptions.box, { boxDivClassName: "olHandlerBoxSelectFeature" }))); this.hover && (this.handlers.hover = new OpenLayers.Handler.Hover(this, { move: this.cancelHover, pause: this.selectHover }, OpenLayers.Util.extend(this.handlerOptions.hover, { delay: 250, pixelTolerance: 2 })))
  }, activate: function () {
    if (!this.active) for (var a in this.handlers) this.handlers[a].activate();
    return OpenLayers.Control.prototype.activate.apply(this, arguments)
  }, deactivate: function () { if (this.active) for (var a in this.handlers) this.handlers[a].deactivate(); return OpenLayers.Control.prototype.deactivate.apply(this, arguments) }, selectClick: function (a) { var b = this.pixelToBounds(a.xy); this.setModifiers(a); this.request(b, { single: this.single }) }, selectBox: function (a) {
    var b; if (a instanceof OpenLayers.Bounds) b = this.map.getLonLatFromPixel({ x: a.left, y: a.bottom }), a = this.map.getLonLatFromPixel({
      x: a.right,
      y: a.top
    }), b = new OpenLayers.Bounds(b.lon, b.lat, a.lon, a.lat); else { if (this.click) return; b = this.pixelToBounds(a) } this.setModifiers(this.handlers.box.dragHandler.evt); this.request(b)
  }, selectHover: function (a) { a = this.pixelToBounds(a.xy); this.request(a, { single: !0, hover: !0 }) }, cancelHover: function () { this.hoverResponse && (this.protocol.abort(this.hoverResponse), this.hoverResponse = null, OpenLayers.Element.removeClass(this.map.viewPortDiv, "olCursorWait")) }, request: function (a, b) {
    b = b || {}; var c = new OpenLayers.Filter.Spatial({
      type: this.filterType,
      value: a
    }); OpenLayers.Element.addClass(this.map.viewPortDiv, "olCursorWait"); c = this.protocol.read({ maxFeatures: !0 == b.single ? this.maxFeatures : void 0, filter: c, callback: function (c) { c.success() && (c.features.length ? !0 == b.single ? this.selectBestFeature(c.features, a.getCenterLonLat(), b) : this.select(c.features) : b.hover ? this.hoverSelect() : (this.events.triggerEvent("clickout"), this.clickout && this.unselectAll())); OpenLayers.Element.removeClass(this.map.viewPortDiv, "olCursorWait") }, scope: this }); !0 == b.hover && (this.hoverResponse =
      c)
  }, selectBestFeature: function (a, b, c) { c = c || {}; if (a.length) { b = new OpenLayers.Geometry.Point(b.lon, b.lat); for (var d, e, f, g = Number.MAX_VALUE, h = 0; h < a.length && !(d = a[h], d.geometry && (f = b.distanceTo(d.geometry, { edge: !1 }), f < g && (g = f, e = d, 0 == g))); ++h); !0 == c.hover ? this.hoverSelect(e) : this.select(e || a) } }, setModifiers: function (a) { this.modifiers = { multiple: this.multiple || this.multipleKey && a[this.multipleKey], toggle: this.toggle || this.toggleKey && a[this.toggleKey] } }, select: function (a) {
    this.modifiers.multiple || this.modifiers.toggle ||
    this.unselectAll(); OpenLayers.Util.isArray(a) || (a = [a]); var b = this.events.triggerEvent("beforefeaturesselected", { features: a }); if (!1 !== b) { for (var c = [], d, e = 0, f = a.length; e < f; ++e)d = a[e], this.features[d.fid || d.id] ? this.modifiers.toggle && this.unselect(this.features[d.fid || d.id]) : (b = this.events.triggerEvent("beforefeatureselected", { feature: d }), !1 !== b && (this.features[d.fid || d.id] = d, c.push(d), this.events.triggerEvent("featureselected", { feature: d }))); this.events.triggerEvent("featuresselected", { features: c }) }
  },
  hoverSelect: function (a) { var b = a ? a.fid || a.id : null, c = this.hoverFeature ? this.hoverFeature.fid || this.hoverFeature.id : null; c && c != b && (this.events.triggerEvent("outfeature", { feature: this.hoverFeature }), this.hoverFeature = null); b && b != c && (this.events.triggerEvent("hoverfeature", { feature: a }), this.hoverFeature = a) }, unselect: function (a) { delete this.features[a.fid || a.id]; this.events.triggerEvent("featureunselected", { feature: a }) }, unselectAll: function () { for (var a in this.features) this.unselect(this.features[a]) },
  setMap: function (a) { for (var b in this.handlers) this.handlers[b].setMap(a); OpenLayers.Control.prototype.setMap.apply(this, arguments) }, pixelToBounds: function (a) { var b = a.add(-this.clickTolerance / 2, this.clickTolerance / 2); a = a.add(this.clickTolerance / 2, -this.clickTolerance / 2); b = this.map.getLonLatFromPixel(b); a = this.map.getLonLatFromPixel(a); return new OpenLayers.Bounds(b.lon, b.lat, a.lon, a.lat) }, CLASS_NAME: "OpenLayers.Control.GetFeature"
}); OpenLayers.Format.QueryStringFilter = function () {
  function a(a) { a = a.replace(/%/g, "\\%"); a = a.replace(/\\\\\.(\*)?/g, function (a, b) { return b ? a : "\\\\_" }); a = a.replace(/\\\\\.\*/g, "\\\\%"); a = a.replace(/(\\)?\.(\*)?/g, function (a, b, c) { return b || c ? a : "_" }); a = a.replace(/(\\)?\.\*/g, function (a, b) { return b ? a : "%" }); a = a.replace(/\\\./g, "."); return a = a.replace(/(\\)?\\\*/g, function (a, b) { return b ? a : "*" }) } var b = {}; b[OpenLayers.Filter.Comparison.EQUAL_TO] = "eq"; b[OpenLayers.Filter.Comparison.NOT_EQUAL_TO] = "ne"; b[OpenLayers.Filter.Comparison.LESS_THAN] =
    "lt"; b[OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO] = "lte"; b[OpenLayers.Filter.Comparison.GREATER_THAN] = "gt"; b[OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO] = "gte"; b[OpenLayers.Filter.Comparison.LIKE] = "ilike"; return OpenLayers.Class(OpenLayers.Format, {
      wildcarded: !1, srsInBBOX: !1, write: function (c, d) {
        d = d || {}; var e = c.CLASS_NAME, e = e.substring(e.lastIndexOf(".") + 1); switch (e) {
          case "Spatial": switch (c.type) {
            case OpenLayers.Filter.Spatial.BBOX: d.bbox = c.value.toArray(); this.srsInBBOX && c.projection &&
              d.bbox.push(c.projection.getCode()); break; case OpenLayers.Filter.Spatial.DWITHIN: d.tolerance = c.distance; case OpenLayers.Filter.Spatial.WITHIN: d.lon = c.value.x; d.lat = c.value.y; break; default: OpenLayers.Console.warn("Unknown spatial filter type " + c.type)
          }break; case "Comparison": e = b[c.type]; if (void 0 !== e) { var f = c.value; c.type == OpenLayers.Filter.Comparison.LIKE && (f = a(f), this.wildcarded && (f = "%" + f + "%")); d[c.property + "__" + e] = f; d.queryable = d.queryable || []; d.queryable.push(c.property) } else OpenLayers.Console.warn("Unknown comparison filter type " +
            c.type); break; case "Logical": if (c.type === OpenLayers.Filter.Logical.AND) for (e = 0, f = c.filters.length; e < f; e++)d = this.write(c.filters[e], d); else OpenLayers.Console.warn("Unsupported logical filter type " + c.type); break; default: OpenLayers.Console.warn("Unknown filter type " + e)
        }return d
      }, CLASS_NAME: "OpenLayers.Format.QueryStringFilter"
    })
}(); OpenLayers.Control.MousePosition = OpenLayers.Class(OpenLayers.Control, {
  autoActivate: !0, element: null, prefix: "", separator: ", ", suffix: "", numDigits: 5, granularity: 10, emptyString: null, lastXy: null, displayProjection: null, destroy: function () { this.deactivate(); OpenLayers.Control.prototype.destroy.apply(this, arguments) }, activate: function () {
    return OpenLayers.Control.prototype.activate.apply(this, arguments) ? (this.map.events.register("mousemove", this, this.redraw), this.map.events.register("mouseout", this, this.reset),
      this.redraw(), !0) : !1
  }, deactivate: function () { return OpenLayers.Control.prototype.deactivate.apply(this, arguments) ? (this.map.events.unregister("mousemove", this, this.redraw), this.map.events.unregister("mouseout", this, this.reset), this.element.innerHTML = "", !0) : !1 }, draw: function () { OpenLayers.Control.prototype.draw.apply(this, arguments); this.element || (this.div.left = "", this.div.top = "", this.element = this.div); return this.div }, redraw: function (a) {
    var b; if (null == a) this.reset(); else if (null == this.lastXy || Math.abs(a.xy.x -
      this.lastXy.x) > this.granularity || Math.abs(a.xy.y - this.lastXy.y) > this.granularity) this.lastXy = a.xy; else if (b = this.map.getLonLatFromPixel(a.xy)) this.displayProjection && b.transform(this.map.getProjectionObject(), this.displayProjection), this.lastXy = a.xy, a = this.formatOutput(b), a != this.element.innerHTML && (this.element.innerHTML = a)
  }, reset: function (a) { null != this.emptyString && (this.element.innerHTML = this.emptyString) }, formatOutput: function (a) {
    var b = parseInt(this.numDigits); return this.prefix + a.lon.toFixed(b) +
      this.separator + a.lat.toFixed(b) + this.suffix
  }, CLASS_NAME: "OpenLayers.Control.MousePosition"
}); OpenLayers.Control.Geolocate = OpenLayers.Class(OpenLayers.Control, {
  geolocation: null, available: "geolocation" in navigator, bind: !0, watch: !1, geolocationOptions: null, destroy: function () { this.deactivate(); OpenLayers.Control.prototype.destroy.apply(this, arguments) }, activate: function () {
  this.available && !this.geolocation && (this.geolocation = navigator.geolocation); return this.geolocation ? OpenLayers.Control.prototype.activate.apply(this, arguments) ? (this.watch ? this.watchId = this.geolocation.watchPosition(OpenLayers.Function.bind(this.geolocate,
    this), OpenLayers.Function.bind(this.failure, this), this.geolocationOptions) : this.getCurrentLocation(), !0) : !1 : (this.events.triggerEvent("locationuncapable"), !1)
  }, deactivate: function () { this.active && null !== this.watchId && this.geolocation.clearWatch(this.watchId); return OpenLayers.Control.prototype.deactivate.apply(this, arguments) }, geolocate: function (a) {
    var b = (new OpenLayers.LonLat(a.coords.longitude, a.coords.latitude)).transform(new OpenLayers.Projection("EPSG:4326"), this.map.getProjectionObject()); this.bind &&
      this.map.setCenter(b); this.events.triggerEvent("locationupdated", { position: a, point: new OpenLayers.Geometry.Point(b.lon, b.lat) })
  }, getCurrentLocation: function () { if (!this.active || this.watch) return !1; this.geolocation.getCurrentPosition(OpenLayers.Function.bind(this.geolocate, this), OpenLayers.Function.bind(this.failure, this), this.geolocationOptions); return !0 }, failure: function (a) { this.events.triggerEvent("locationfailed", { error: a }) }, CLASS_NAME: "OpenLayers.Control.Geolocate"
}); OpenLayers.Tile.UTFGrid = OpenLayers.Class(OpenLayers.Tile, {
  url: null, utfgridResolution: 2, json: null, format: null, destroy: function () { this.clear(); OpenLayers.Tile.prototype.destroy.apply(this, arguments) }, draw: function () {
    var a = OpenLayers.Tile.prototype.draw.apply(this, arguments); if (a) if (this.isLoading ? (this.abortLoading(), this.events.triggerEvent("reload")) : (this.isLoading = !0, this.events.triggerEvent("loadstart")), this.url = this.layer.getURL(this.bounds), this.layer.useJSONP) {
      var b = new OpenLayers.Protocol.Script({
        url: this.url,
        callback: function (a) { this.isLoading = !1; this.events.triggerEvent("loadend"); this.json = a.data }, scope: this
      }); b.read(); this.request = b
    } else this.request = OpenLayers.Request.GET({ url: this.url, callback: function (a) { this.isLoading = !1; this.events.triggerEvent("loadend"); 200 === a.status && this.parseData(a.responseText) }, scope: this }); else this.unload(); return a
  }, abortLoading: function () { this.request && (this.request.abort(), delete this.request); this.isLoading = !1 }, getFeatureInfo: function (a, b) {
    var c = null; if (this.json) {
      var d =
        this.getFeatureId(a, b); null !== d && (c = { id: d, data: this.json.data[d] })
    } return c
  }, getFeatureId: function (a, b) { var c = null; if (this.json) { var d = this.utfgridResolution, d = this.json.grid[Math.floor(b / d)].charCodeAt(Math.floor(a / d)), d = this.indexFromCharCode(d), e = this.json.keys; !isNaN(d) && d in e && (c = e[d]) } return c }, indexFromCharCode: function (a) { 93 <= a && a--; 35 <= a && a--; return a - 32 }, parseData: function (a) { this.format || (this.format = new OpenLayers.Format.JSON); this.json = this.format.read(a) }, clear: function () {
  this.json =
    null
  }, CLASS_NAME: "OpenLayers.Tile.UTFGrid"
}); OpenLayers.Protocol.HTTP = OpenLayers.Class(OpenLayers.Protocol, {
  url: null, headers: null, params: null, callback: null, scope: null, readWithPOST: !1, updateWithPOST: !1, deleteWithPOST: !1, wildcarded: !1, srsInBBOX: !1, initialize: function (a) {
    a = a || {}; this.params = {}; this.headers = {}; OpenLayers.Protocol.prototype.initialize.apply(this, arguments); if (!this.filterToParams && OpenLayers.Format.QueryStringFilter) {
      var b = new OpenLayers.Format.QueryStringFilter({ wildcarded: this.wildcarded, srsInBBOX: this.srsInBBOX }); this.filterToParams =
        function (a, d) { return b.write(a, d) }
    }
  }, destroy: function () { this.headers = this.params = null; OpenLayers.Protocol.prototype.destroy.apply(this) }, read: function (a) {
    OpenLayers.Protocol.prototype.read.apply(this, arguments); a = a || {}; a.params = OpenLayers.Util.applyDefaults(a.params, this.options.params); a = OpenLayers.Util.applyDefaults(a, this.options); a.filter && this.filterToParams && (a.params = this.filterToParams(a.filter, a.params)); var b = void 0 !== a.readWithPOST ? a.readWithPOST : this.readWithPOST, c = new OpenLayers.Protocol.Response({ requestType: "read" });
    b ? (b = a.headers || {}, b["Content-Type"] = "application/x-www-form-urlencoded", c.priv = OpenLayers.Request.POST({ url: a.url, callback: this.createCallback(this.handleRead, c, a), data: OpenLayers.Util.getParameterString(a.params), headers: b })) : c.priv = OpenLayers.Request.GET({ url: a.url, callback: this.createCallback(this.handleRead, c, a), params: a.params, headers: a.headers }); return c
  }, handleRead: function (a, b) { this.handleResponse(a, b) }, create: function (a, b) {
    b = OpenLayers.Util.applyDefaults(b, this.options); var c = new OpenLayers.Protocol.Response({
      reqFeatures: a,
      requestType: "create"
    }); c.priv = OpenLayers.Request.POST({ url: b.url, callback: this.createCallback(this.handleCreate, c, b), headers: b.headers, data: this.format.write(a) }); return c
  }, handleCreate: function (a, b) { this.handleResponse(a, b) }, update: function (a, b) {
    b = b || {}; var c = b.url || a.url || this.options.url + "/" + a.fid; b = OpenLayers.Util.applyDefaults(b, this.options); var d = new OpenLayers.Protocol.Response({ reqFeatures: a, requestType: "update" }); d.priv = OpenLayers.Request[this.updateWithPOST ? "POST" : "PUT"]({
      url: c, callback: this.createCallback(this.handleUpdate,
        d, b), headers: b.headers, data: this.format.write(a)
    }); return d
  }, handleUpdate: function (a, b) { this.handleResponse(a, b) }, "delete": function (a, b) {
    b = b || {}; var c = b.url || a.url || this.options.url + "/" + a.fid; b = OpenLayers.Util.applyDefaults(b, this.options); var d = new OpenLayers.Protocol.Response({ reqFeatures: a, requestType: "delete" }), e = this.deleteWithPOST ? "POST" : "DELETE", c = { url: c, callback: this.createCallback(this.handleDelete, d, b), headers: b.headers }; this.deleteWithPOST && (c.data = this.format.write(a)); d.priv = OpenLayers.Request[e](c);
    return d
  }, handleDelete: function (a, b) { this.handleResponse(a, b) }, handleResponse: function (a, b) { var c = a.priv; b.callback && (200 <= c.status && 300 > c.status ? ("delete" != a.requestType && (a.features = this.parseFeatures(c)), a.code = OpenLayers.Protocol.Response.SUCCESS) : a.code = OpenLayers.Protocol.Response.FAILURE, b.callback.call(b.scope, a)) }, parseFeatures: function (a) { var b = a.responseXML; b && b.documentElement || (b = a.responseText); return !b || 0 >= b.length ? null : this.format.read(b) }, commit: function (a, b) {
    function c(a) {
      for (var b =
        a.features ? a.features.length : 0, c = Array(b), e = 0; e < b; ++e)c[e] = a.features[e].fid; r.insertIds = c; d.apply(this, [a])
    } function d(a) { this.callUserCallback(a, b); q = q && a.success(); f++; f >= p && b.callback && (r.code = q ? OpenLayers.Protocol.Response.SUCCESS : OpenLayers.Protocol.Response.FAILURE, b.callback.apply(b.scope, [r])) } b = OpenLayers.Util.applyDefaults(b, this.options); var e = [], f = 0, g = {}; g[OpenLayers.State.INSERT] = []; g[OpenLayers.State.UPDATE] = []; g[OpenLayers.State.DELETE] = []; for (var h, k, l = [], m = 0, n = a.length; m < n; ++m)if (h =
      a[m], k = g[h.state]) k.push(h), l.push(h); var p = (0 < g[OpenLayers.State.INSERT].length ? 1 : 0) + g[OpenLayers.State.UPDATE].length + g[OpenLayers.State.DELETE].length, q = !0, r = new OpenLayers.Protocol.Response({ reqFeatures: l }); h = g[OpenLayers.State.INSERT]; 0 < h.length && e.push(this.create(h, OpenLayers.Util.applyDefaults({ callback: c, scope: this }, b.create))); h = g[OpenLayers.State.UPDATE]; for (m = h.length - 1; 0 <= m; --m)e.push(this.update(h[m], OpenLayers.Util.applyDefaults({ callback: d, scope: this }, b.update))); h = g[OpenLayers.State.DELETE];
    for (m = h.length - 1; 0 <= m; --m)e.push(this["delete"](h[m], OpenLayers.Util.applyDefaults({ callback: d, scope: this }, b["delete"]))); return e
  }, abort: function (a) { a && a.priv.abort() }, callUserCallback: function (a, b) { var c = b[a.requestType]; c && c.callback && c.callback.call(c.scope, a) }, CLASS_NAME: "OpenLayers.Protocol.HTTP"
}); OpenLayers.Strategy.Cluster = OpenLayers.Class(OpenLayers.Strategy, {
  distance: 20, threshold: null, features: null, clusters: null, clustering: !1, resolution: null, activate: function () { var a = OpenLayers.Strategy.prototype.activate.call(this); if (a) this.layer.events.on({ beforefeaturesadded: this.cacheFeatures, featuresremoved: this.clearCache, moveend: this.cluster, scope: this }); return a }, deactivate: function () {
    var a = OpenLayers.Strategy.prototype.deactivate.call(this); a && (this.clearCache(), this.layer.events.un({
      beforefeaturesadded: this.cacheFeatures,
      featuresremoved: this.clearCache, moveend: this.cluster, scope: this
    })); return a
  }, cacheFeatures: function (a) { var b = !0; this.clustering || (this.clearCache(), this.features = a.features, this.cluster(), b = !1); return b }, clearCache: function () { this.clustering || (this.features = null) }, cluster: function (a) {
    if ((!a || a.zoomChanged) && this.features && (a = this.layer.map.getResolution(), a != this.resolution || !this.clustersExist())) {
    this.resolution = a; a = []; for (var b, c, d, e = 0; e < this.features.length; ++e)if (b = this.features[e], b.geometry) {
      c =
      !1; for (var f = a.length - 1; 0 <= f; --f)if (d = a[f], this.shouldCluster(d, b)) { this.addToCluster(d, b); c = !0; break } c || a.push(this.createCluster(this.features[e]))
    } this.clustering = !0; this.layer.removeAllFeatures(); this.clustering = !1; if (0 < a.length) { if (1 < this.threshold) for (b = a.slice(), a = [], e = 0, d = b.length; e < d; ++e)c = b[e], c.attributes.count < this.threshold ? Array.prototype.push.apply(a, c.cluster) : a.push(c); this.clustering = !0; this.layer.addFeatures(a); this.clustering = !1 } this.clusters = a
    }
  }, clustersExist: function () {
    var a =
      !1; if (this.clusters && 0 < this.clusters.length && this.clusters.length == this.layer.features.length) for (var a = !0, b = 0; b < this.clusters.length; ++b)if (this.clusters[b] != this.layer.features[b]) { a = !1; break } return a
  }, shouldCluster: function (a, b) { var c = a.geometry.getBounds().getCenterLonLat(), d = b.geometry.getBounds().getCenterLonLat(); return Math.sqrt(Math.pow(c.lon - d.lon, 2) + Math.pow(c.lat - d.lat, 2)) / this.resolution <= this.distance }, addToCluster: function (a, b) { a.cluster.push(b); a.attributes.count += 1 }, createCluster: function (a) {
    var b =
      a.geometry.getBounds().getCenterLonLat(), b = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(b.lon, b.lat), { count: 1 }); b.cluster = [a]; return b
  }, CLASS_NAME: "OpenLayers.Strategy.Cluster"
}); OpenLayers.Strategy.Filter = OpenLayers.Class(OpenLayers.Strategy, {
  filter: null, cache: null, caching: !1, activate: function () { var a = OpenLayers.Strategy.prototype.activate.apply(this, arguments); a && (this.cache = [], this.layer.events.on({ beforefeaturesadded: this.handleAdd, beforefeaturesremoved: this.handleRemove, scope: this })); return a }, deactivate: function () {
  this.cache = null; this.layer && this.layer.events && this.layer.events.un({ beforefeaturesadded: this.handleAdd, beforefeaturesremoved: this.handleRemove, scope: this });
    return OpenLayers.Strategy.prototype.deactivate.apply(this, arguments)
  }, handleAdd: function (a) { if (!this.caching && this.filter) { var b = a.features; a.features = []; for (var c, d = 0, e = b.length; d < e; ++d)c = b[d], this.filter.evaluate(c) ? a.features.push(c) : this.cache.push(c) } }, handleRemove: function (a) { this.caching || (this.cache = []) }, setFilter: function (a) {
  this.filter = a; a = this.cache; this.cache = []; this.handleAdd({ features: this.layer.features }); 0 < this.cache.length && (this.caching = !0, this.layer.removeFeatures(this.cache.slice()),
    this.caching = !1); 0 < a.length && (a = { features: a }, this.handleAdd(a), 0 < a.features.length && (this.caching = !0, this.layer.addFeatures(a.features), this.caching = !1))
  }, CLASS_NAME: "OpenLayers.Strategy.Filter"
}); OpenLayers.Protocol.SOS = function (a) { a = OpenLayers.Util.applyDefaults(a, OpenLayers.Protocol.SOS.DEFAULTS); var b = OpenLayers.Protocol.SOS["v" + a.version.replace(/\./g, "_")]; if (!b) throw "Unsupported SOS version: " + a.version; return new b(a) }; OpenLayers.Protocol.SOS.DEFAULTS = { version: "1.0.0" }; OpenLayers.Format.WFSDescribeFeatureType = OpenLayers.Class(OpenLayers.Format.XML, {
  regExes: { trimSpace: /^\s*|\s*$/g }, namespaces: { xsd: "http://www.w3.org/2001/XMLSchema" }, readers: {
    xsd: {
      schema: function (a, b) {
        var c = [], d = {}, e, f; this.readChildNodes(a, { complexTypes: c, customTypes: d }); var g = a.attributes, h, k; e = 0; for (f = g.length; e < f; ++e)h = g[e], k = h.name, 0 === k.indexOf("xmlns") ? this.setNamespace(k.split(":")[1] || "", h.value) : b[k] = h.value; b.featureTypes = c; b.targetPrefix = this.namespaceAlias[b.targetNamespace]; e = 0; for (f =
          c.length; e < f; ++e)g = c[e], h = d[g.typeName], d[g.typeName] && (g.typeName = h.name)
      }, complexType: function (a, b) { var c = { typeName: a.getAttribute("name") }; this.readChildNodes(a, c); b.complexTypes.push(c) }, complexContent: function (a, b) { this.readChildNodes(a, b) }, extension: function (a, b) { this.readChildNodes(a, b) }, sequence: function (a, b) { var c = { elements: [] }; this.readChildNodes(a, c); b.properties = c.elements }, element: function (a, b) {
        var c; if (b.elements) {
          var d = {}; c = a.attributes; for (var e, f = 0, g = c.length; f < g; ++f)e = c[f], d[e.name] =
            e.value; c = d.type; c || (c = {}, this.readChildNodes(a, c), d.restriction = c, d.type = c.base); d.localType = (c.base || c).split(":").pop(); b.elements.push(d); this.readChildNodes(a, d)
        } b.complexTypes && (c = a.getAttribute("type"), d = c.split(":").pop(), b.customTypes[d] = { name: a.getAttribute("name"), type: c })
      }, annotation: function (a, b) { b.annotation = {}; this.readChildNodes(a, b.annotation) }, appinfo: function (a, b) { b.appinfo || (b.appinfo = []); b.appinfo.push(this.getChildValue(a)) }, documentation: function (a, b) {
      b.documentation || (b.documentation =
        []); var c = this.getChildValue(a); b.documentation.push({ lang: a.getAttribute("xml:lang"), textContent: c.replace(this.regExes.trimSpace, "") })
      }, simpleType: function (a, b) { this.readChildNodes(a, b) }, restriction: function (a, b) { b.base = a.getAttribute("base"); this.readRestriction(a, b) }
    }
  }, readRestriction: function (a, b) { for (var c = a.childNodes, d, e, f = 0, g = c.length; f < g; ++f)d = c[f], 1 == d.nodeType && (e = d.nodeName.split(":").pop(), d = d.getAttribute("value"), b[e] ? ("string" == typeof b[e] && (b[e] = [b[e]]), b[e].push(d)) : b[e] = d) }, read: function (a) {
  "string" ==
    typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); a && 9 == a.nodeType && (a = a.documentElement); var b = {}; if ("ExceptionReport" === a.nodeName.split(":").pop()) { var c = new OpenLayers.Format.OGCExceptionReport; b.error = c.read(a) } else this.readNode(a, b); return b
  }, CLASS_NAME: "OpenLayers.Format.WFSDescribeFeatureType"
}); OpenLayers.Format.GeoRSS = OpenLayers.Class(OpenLayers.Format.XML, {
  rssns: "http://backend.userland.com/rss2", featureNS: "http://mapserver.gis.umn.edu/mapserver", georssns: "http://www.georss.org/georss", geons: "http://www.w3.org/2003/01/geo/wgs84_pos#", featureTitle: "Untitled", featureDescription: "No Description", gmlParser: null, xy: !1, createGeometryFromItem: function (a) {
    var b = this.getElementsByTagNameNS(a, this.georssns, "point"), c = this.getElementsByTagNameNS(a, this.geons, "lat"), d = this.getElementsByTagNameNS(a,
      this.geons, "long"), e = this.getElementsByTagNameNS(a, this.georssns, "line"), f = this.getElementsByTagNameNS(a, this.georssns, "polygon"), g = this.getElementsByTagNameNS(a, this.georssns, "where"); a = this.getElementsByTagNameNS(a, this.georssns, "box"); if (0 < b.length || 0 < c.length && 0 < d.length) {
        0 < b.length ? (c = OpenLayers.String.trim(b[0].firstChild.nodeValue).split(/\s+/), 2 != c.length && (c = OpenLayers.String.trim(b[0].firstChild.nodeValue).split(/\s*,\s*/))) : c = [parseFloat(c[0].firstChild.nodeValue), parseFloat(d[0].firstChild.nodeValue)];
        var h = new OpenLayers.Geometry.Point(c[1], c[0])
      } else if (0 < e.length) { c = OpenLayers.String.trim(this.getChildValue(e[0])).split(/\s+/); d = []; e = 0; for (f = c.length; e < f; e += 2)b = new OpenLayers.Geometry.Point(c[e + 1], c[e]), d.push(b); h = new OpenLayers.Geometry.LineString(d) } else if (0 < f.length) { c = OpenLayers.String.trim(this.getChildValue(f[0])).split(/\s+/); d = []; e = 0; for (f = c.length; e < f; e += 2)b = new OpenLayers.Geometry.Point(c[e + 1], c[e]), d.push(b); h = new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing(d)]) } else 0 <
        g.length ? (this.gmlParser || (this.gmlParser = new OpenLayers.Format.GML({ xy: this.xy })), h = this.gmlParser.parseFeature(g[0]).geometry) : 0 < a.length && (c = OpenLayers.String.trim(a[0].firstChild.nodeValue).split(/\s+/), d = [], 3 < c.length && (b = new OpenLayers.Geometry.Point(c[1], c[0]), d.push(b), b = new OpenLayers.Geometry.Point(c[1], c[2]), d.push(b), b = new OpenLayers.Geometry.Point(c[3], c[2]), d.push(b), b = new OpenLayers.Geometry.Point(c[3], c[0]), d.push(b), b = new OpenLayers.Geometry.Point(c[1], c[0]), d.push(b)), h = new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing(d)]));
    h && (this.internalProjection && this.externalProjection) && h.transform(this.externalProjection, this.internalProjection); return h
  }, createFeatureFromItem: function (a) {
    var b = this.createGeometryFromItem(a), c = this._getChildValue(a, "*", "title", this.featureTitle), d = this._getChildValue(a, "*", "description", this._getChildValue(a, "*", "content", this._getChildValue(a, "*", "summary", this.featureDescription))), e = this._getChildValue(a, "*", "link"); if (!e) try { e = this.getElementsByTagNameNS(a, "*", "link")[0].getAttribute("href") } catch (f) {
      e =
      null
    } a = this._getChildValue(a, "*", "id", null); b = new OpenLayers.Feature.Vector(b, { title: c, description: d, link: e }); b.fid = a; return b
  }, _getChildValue: function (a, b, c, d) { return (a = this.getElementsByTagNameNS(a, b, c)) && a[0] && a[0].firstChild && a[0].firstChild.nodeValue ? this.getChildValue(a[0]) : void 0 == d ? "" : d }, read: function (a) {
  "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); var b = null, b = this.getElementsByTagNameNS(a, "*", "item"); 0 == b.length && (b = this.getElementsByTagNameNS(a, "*", "entry"));
    a = b.length; for (var c = Array(a), d = 0; d < a; d++)c[d] = this.createFeatureFromItem(b[d]); return c
  }, write: function (a) { var b; if (OpenLayers.Util.isArray(a)) { b = this.createElementNS(this.rssns, "rss"); for (var c = 0, d = a.length; c < d; c++)b.appendChild(this.createFeatureXML(a[c])) } else b = this.createFeatureXML(a); return OpenLayers.Format.XML.prototype.write.apply(this, [b]) }, createFeatureXML: function (a) {
    var b = this.buildGeometryNode(a.geometry), c = this.createElementNS(this.rssns, "item"), d = this.createElementNS(this.rssns, "title");
    d.appendChild(this.createTextNode(a.attributes.title ? a.attributes.title : "")); var e = this.createElementNS(this.rssns, "description"); e.appendChild(this.createTextNode(a.attributes.description ? a.attributes.description : "")); c.appendChild(d); c.appendChild(e); a.attributes.link && (d = this.createElementNS(this.rssns, "link"), d.appendChild(this.createTextNode(a.attributes.link)), c.appendChild(d)); for (var f in a.attributes) "link" != f && ("title" != f && "description" != f) && (d = this.createTextNode(a.attributes[f]), e = f, -1 !=
      f.search(":") && (e = f.split(":")[1]), e = this.createElementNS(this.featureNS, "feature:" + e), e.appendChild(d), c.appendChild(e)); c.appendChild(b); return c
  }, buildGeometryNode: function (a) {
  this.internalProjection && this.externalProjection && (a = a.clone(), a.transform(this.internalProjection, this.externalProjection)); var b; if ("OpenLayers.Geometry.Polygon" == a.CLASS_NAME) b = this.createElementNS(this.georssns, "georss:polygon"), b.appendChild(this.buildCoordinatesNode(a.components[0])); else if ("OpenLayers.Geometry.LineString" ==
    a.CLASS_NAME) b = this.createElementNS(this.georssns, "georss:line"), b.appendChild(this.buildCoordinatesNode(a)); else if ("OpenLayers.Geometry.Point" == a.CLASS_NAME) b = this.createElementNS(this.georssns, "georss:point"), b.appendChild(this.buildCoordinatesNode(a)); else throw "Couldn't parse " + a.CLASS_NAME; return b
  }, buildCoordinatesNode: function (a) { var b = null; a.components && (b = a.components); if (b) { a = b.length; for (var c = Array(a), d = 0; d < a; d++)c[d] = b[d].y + " " + b[d].x; b = c.join(" ") } else b = a.y + " " + a.x; return this.createTextNode(b) },
  CLASS_NAME: "OpenLayers.Format.GeoRSS"
}); OpenLayers.Format.WPSCapabilities = OpenLayers.Class(OpenLayers.Format.XML.VersionedOGC, { defaultVersion: "1.0.0", CLASS_NAME: "OpenLayers.Format.WPSCapabilities" }); OpenLayers.Format.WPSCapabilities.v1_0_0 = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { ows: "http://www.opengis.net/ows/1.1", wps: "http://www.opengis.net/wps/1.0.0", xlink: "http://www.w3.org/1999/xlink" }, regExes: { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g }, initialize: function (a) { OpenLayers.Format.XML.prototype.initialize.apply(this, [a]) }, read: function (a) {
  "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); a && 9 == a.nodeType && (a = a.documentElement);
    var b = {}; this.readNode(a, b); return b
  }, readers: {
    wps: {
      Capabilities: function (a, b) { this.readChildNodes(a, b) }, ProcessOfferings: function (a, b) { b.processOfferings = {}; this.readChildNodes(a, b.processOfferings) }, Process: function (a, b) { var c = { processVersion: this.getAttributeNS(a, this.namespaces.wps, "processVersion") }; this.readChildNodes(a, c); b[c.identifier] = c }, Languages: function (a, b) { b.languages = []; this.readChildNodes(a, b.languages) }, Default: function (a, b) { var c = { isDefault: !0 }; this.readChildNodes(a, c); b.push(c) },
      Supported: function (a, b) { var c = {}; this.readChildNodes(a, c); b.push(c) }
    }, ows: OpenLayers.Format.OWSCommon.v1_1_0.prototype.readers.ows
  }, CLASS_NAME: "OpenLayers.Format.WPSCapabilities.v1_0_0"
}); OpenLayers.Control.PinchZoom = OpenLayers.Class(OpenLayers.Control, {
  type: OpenLayers.Control.TYPE_TOOL, pinchOrigin: null, currentCenter: null, autoActivate: !0, preserveCenter: !1, initialize: function (a) { OpenLayers.Control.prototype.initialize.apply(this, arguments); this.handler = new OpenLayers.Handler.Pinch(this, { start: this.pinchStart, move: this.pinchMove, done: this.pinchDone }, this.handlerOptions) }, pinchStart: function (a, b) {
    var c = this.preserveCenter ? this.map.getPixelFromLonLat(this.map.getCenter()) : a.xy; this.currentCenter =
      this.pinchOrigin = c
  }, pinchMove: function (a, b) { var c = b.scale, d = this.map.layerContainerOriginPx, e = this.pinchOrigin, f = this.preserveCenter ? this.map.getPixelFromLonLat(this.map.getCenter()) : a.xy, g = Math.round(d.x + f.x - e.x + (c - 1) * (d.x - e.x)), d = Math.round(d.y + f.y - e.y + (c - 1) * (d.y - e.y)); this.map.applyTransform(g, d, c); this.currentCenter = f }, pinchDone: function (a, b, c) {
    this.map.applyTransform(); a = this.map.getZoomForResolution(this.map.getResolution() / c.scale, !0); if (a !== this.map.getZoom() || !this.currentCenter.equals(this.pinchOrigin)) {
      b =
      this.map.getResolutionForZoom(a); c = this.map.getLonLatFromPixel(this.pinchOrigin); var d = this.currentCenter, e = this.map.getSize(); c.lon += b * (e.w / 2 - d.x); c.lat -= b * (e.h / 2 - d.y); this.map.div.clientWidth = this.map.div.clientWidth; this.map.setCenter(c, a)
    }
  }, CLASS_NAME: "OpenLayers.Control.PinchZoom"
}); OpenLayers.Control.TouchNavigation = OpenLayers.Class(OpenLayers.Control, {
  dragPan: null, dragPanOptions: null, pinchZoom: null, pinchZoomOptions: null, clickHandlerOptions: null, documentDrag: !1, autoActivate: !0, initialize: function (a) { this.handlers = {}; OpenLayers.Control.prototype.initialize.apply(this, arguments) }, destroy: function () {
    this.deactivate(); this.dragPan && this.dragPan.destroy(); this.dragPan = null; this.pinchZoom && (this.pinchZoom.destroy(), delete this.pinchZoom); OpenLayers.Control.prototype.destroy.apply(this,
      arguments)
  }, activate: function () { return OpenLayers.Control.prototype.activate.apply(this, arguments) ? (this.dragPan.activate(), this.handlers.click.activate(), this.pinchZoom.activate(), !0) : !1 }, deactivate: function () { return OpenLayers.Control.prototype.deactivate.apply(this, arguments) ? (this.dragPan.deactivate(), this.handlers.click.deactivate(), this.pinchZoom.deactivate(), !0) : !1 }, draw: function () {
    var a = { click: this.defaultClick, dblclick: this.defaultDblClick }, b = OpenLayers.Util.extend({
      "double": !0, stopDouble: !0,
      pixelTolerance: 2
    }, this.clickHandlerOptions); this.handlers.click = new OpenLayers.Handler.Click(this, a, b); this.dragPan = new OpenLayers.Control.DragPan(OpenLayers.Util.extend({ map: this.map, documentDrag: this.documentDrag }, this.dragPanOptions)); this.dragPan.draw(); this.pinchZoom = new OpenLayers.Control.PinchZoom(OpenLayers.Util.extend({ map: this.map }, this.pinchZoomOptions))
  }, defaultClick: function (a) { a.lastTouches && 2 == a.lastTouches.length && this.map.zoomOut() }, defaultDblClick: function (a) {
    this.map.zoomTo(this.map.zoom +
      1, a.xy)
  }, CLASS_NAME: "OpenLayers.Control.TouchNavigation"
}); OpenLayers.Console.warn("OpenLayers.Rico is deprecated"); OpenLayers.Rico = OpenLayers.Rico || {};
OpenLayers.Rico.Color = OpenLayers.Class({
  initialize: function (a, b, c) { this.rgb = { r: a, g: b, b: c } }, setRed: function (a) { this.rgb.r = a }, setGreen: function (a) { this.rgb.g = a }, setBlue: function (a) { this.rgb.b = a }, setHue: function (a) { var b = this.asHSB(); b.h = a; this.rgb = OpenLayers.Rico.Color.HSBtoRGB(b.h, b.s, b.b) }, setSaturation: function (a) { var b = this.asHSB(); b.s = a; this.rgb = OpenLayers.Rico.Color.HSBtoRGB(b.h, b.s, b.b) }, setBrightness: function (a) { var b = this.asHSB(); b.b = a; this.rgb = OpenLayers.Rico.Color.HSBtoRGB(b.h, b.s, b.b) },
  darken: function (a) { var b = this.asHSB(); this.rgb = OpenLayers.Rico.Color.HSBtoRGB(b.h, b.s, Math.max(b.b - a, 0)) }, brighten: function (a) { var b = this.asHSB(); this.rgb = OpenLayers.Rico.Color.HSBtoRGB(b.h, b.s, Math.min(b.b + a, 1)) }, blend: function (a) { this.rgb.r = Math.floor((this.rgb.r + a.rgb.r) / 2); this.rgb.g = Math.floor((this.rgb.g + a.rgb.g) / 2); this.rgb.b = Math.floor((this.rgb.b + a.rgb.b) / 2) }, isBright: function () { this.asHSB(); return 0.5 < this.asHSB().b }, isDark: function () { return !this.isBright() }, asRGB: function () {
    return "rgb(" +
      this.rgb.r + "," + this.rgb.g + "," + this.rgb.b + ")"
  }, asHex: function () { return "#" + this.rgb.r.toColorPart() + this.rgb.g.toColorPart() + this.rgb.b.toColorPart() }, asHSB: function () { return OpenLayers.Rico.Color.RGBtoHSB(this.rgb.r, this.rgb.g, this.rgb.b) }, toString: function () { return this.asHex() }
});
OpenLayers.Rico.Color.createFromHex = function (a) { if (4 == a.length) { var b = a; a = "#"; for (var c = 1; 4 > c; c++)a += b.charAt(c) + b.charAt(c) } 0 == a.indexOf("#") && (a = a.substring(1)); b = a.substring(0, 2); c = a.substring(2, 4); a = a.substring(4, 6); return new OpenLayers.Rico.Color(parseInt(b, 16), parseInt(c, 16), parseInt(a, 16)) };
OpenLayers.Rico.Color.createColorFromBackground = function (a) {
  var b = OpenLayers.Element.getStyle(OpenLayers.Util.getElement(a), "backgroundColor"); return "transparent" == b && a.parentNode ? OpenLayers.Rico.Color.createColorFromBackground(a.parentNode) : null == b ? new OpenLayers.Rico.Color(255, 255, 255) : 0 == b.indexOf("rgb(") ? (a = b.substring(4, b.length - 1).split(","), new OpenLayers.Rico.Color(parseInt(a[0]), parseInt(a[1]), parseInt(a[2]))) : 0 == b.indexOf("#") ? OpenLayers.Rico.Color.createFromHex(b) : new OpenLayers.Rico.Color(255,
    255, 255)
};
OpenLayers.Rico.Color.HSBtoRGB = function (a, b, c) {
  var d = 0, e = 0, f = 0; if (0 == b) f = e = d = parseInt(255 * c + 0.5); else { a = 6 * (a - Math.floor(a)); var g = a - Math.floor(a), h = c * (1 - b), k = c * (1 - b * g); b = c * (1 - b * (1 - g)); switch (parseInt(a)) { case 0: d = 255 * c + 0.5; e = 255 * b + 0.5; f = 255 * h + 0.5; break; case 1: d = 255 * k + 0.5; e = 255 * c + 0.5; f = 255 * h + 0.5; break; case 2: d = 255 * h + 0.5; e = 255 * c + 0.5; f = 255 * b + 0.5; break; case 3: d = 255 * h + 0.5; e = 255 * k + 0.5; f = 255 * c + 0.5; break; case 4: d = 255 * b + 0.5; e = 255 * h + 0.5; f = 255 * c + 0.5; break; case 5: d = 255 * c + 0.5, e = 255 * h + 0.5, f = 255 * k + 0.5 } } return {
    r: parseInt(d), g: parseInt(e),
    b: parseInt(f)
  }
}; OpenLayers.Rico.Color.RGBtoHSB = function (a, b, c) { var d, e = a > b ? a : b; c > e && (e = c); var f = a < b ? a : b; c < f && (f = c); d = 0 != e ? (e - f) / e : 0; if (0 == d) a = 0; else { var g = (e - a) / (e - f), h = (e - b) / (e - f); c = (e - c) / (e - f); a = (a == e ? c - h : b == e ? 2 + g - c : 4 + h - g) / 6; 0 > a && (a += 1) } return { h: a, s: d, b: e / 255 } }; OpenLayers.Style2 = OpenLayers.Class({
  id: null, name: null, title: null, description: null, layerName: null, isDefault: !1, rules: null, initialize: function (a) { OpenLayers.Util.extend(this, a); this.id = OpenLayers.Util.createUniqueID(this.CLASS_NAME + "_") }, destroy: function () { for (var a = 0, b = this.rules.length; a < b; a++)this.rules[a].destroy(); delete this.rules }, clone: function () { var a = OpenLayers.Util.extend({}, this); if (this.rules) { a.rules = []; for (var b = 0, c = this.rules.length; b < c; ++b)a.rules.push(this.rules[b].clone()) } return new OpenLayers.Style2(a) },
  CLASS_NAME: "OpenLayers.Style2"
}); OpenLayers.Format.WFS = OpenLayers.Class(OpenLayers.Format.GML, {
  layer: null, wfsns: "http://www.opengis.net/wfs", ogcns: "http://www.opengis.net/ogc", initialize: function (a, b) { OpenLayers.Format.GML.prototype.initialize.apply(this, [a]); this.layer = b; this.layer.featureNS && (this.featureNS = this.layer.featureNS); this.layer.options.geometry_column && (this.geometryName = this.layer.options.geometry_column); this.layer.options.typename && (this.featureName = this.layer.options.typename) }, write: function (a) {
    var b = this.createElementNS(this.wfsns,
      "wfs:Transaction"); b.setAttribute("version", "1.0.0"); b.setAttribute("service", "WFS"); for (var c = 0; c < a.length; c++)switch (a[c].state) { case OpenLayers.State.INSERT: b.appendChild(this.insert(a[c])); break; case OpenLayers.State.UPDATE: b.appendChild(this.update(a[c])); break; case OpenLayers.State.DELETE: b.appendChild(this.remove(a[c])) }return OpenLayers.Format.XML.prototype.write.apply(this, [b])
  }, createFeatureXML: function (a) {
    var b = this.buildGeometryNode(a.geometry), c = this.createElementNS(this.featureNS, "feature:" +
      this.geometryName); c.appendChild(b); b = this.createElementNS(this.featureNS, "feature:" + this.featureName); b.appendChild(c); for (var d in a.attributes) { var c = this.createTextNode(a.attributes[d]), e = d; -1 != d.search(":") && (e = d.split(":")[1]); e = this.createElementNS(this.featureNS, "feature:" + e); e.appendChild(c); b.appendChild(e) } return b
  }, insert: function (a) { var b = this.createElementNS(this.wfsns, "wfs:Insert"); b.appendChild(this.createFeatureXML(a)); return b }, update: function (a) {
  a.fid || OpenLayers.Console.userError(OpenLayers.i18n("noFID"));
    var b = this.createElementNS(this.wfsns, "wfs:Update"); b.setAttribute("typeName", this.featurePrefix + ":" + this.featureName); b.setAttribute("xmlns:" + this.featurePrefix, this.featureNS); var c = this.createElementNS(this.wfsns, "wfs:Property"), d = this.createElementNS(this.wfsns, "wfs:Name"), e = this.createTextNode(this.geometryName); d.appendChild(e); c.appendChild(d); d = this.createElementNS(this.wfsns, "wfs:Value"); e = this.buildGeometryNode(a.geometry); a.layer && e.setAttribute("srsName", a.layer.projection.getCode());
    d.appendChild(e); c.appendChild(d); b.appendChild(c); for (var f in a.attributes) c = this.createElementNS(this.wfsns, "wfs:Property"), d = this.createElementNS(this.wfsns, "wfs:Name"), d.appendChild(this.createTextNode(f)), c.appendChild(d), d = this.createElementNS(this.wfsns, "wfs:Value"), d.appendChild(this.createTextNode(a.attributes[f])), c.appendChild(d), b.appendChild(c); c = this.createElementNS(this.ogcns, "ogc:Filter"); f = this.createElementNS(this.ogcns, "ogc:FeatureId"); f.setAttribute("fid", a.fid); c.appendChild(f);
    b.appendChild(c); return b
  }, remove: function (a) { if (!a.fid) return OpenLayers.Console.userError(OpenLayers.i18n("noFID")), !1; var b = this.createElementNS(this.wfsns, "wfs:Delete"); b.setAttribute("typeName", this.featurePrefix + ":" + this.featureName); b.setAttribute("xmlns:" + this.featurePrefix, this.featureNS); var c = this.createElementNS(this.ogcns, "ogc:Filter"), d = this.createElementNS(this.ogcns, "ogc:FeatureId"); d.setAttribute("fid", a.fid); c.appendChild(d); b.appendChild(c); return b }, destroy: function () {
  this.layer =
    null
  }, CLASS_NAME: "OpenLayers.Format.WFS"
}); OpenLayers.Format.SLD.v1_0_0_GeoServer = OpenLayers.Class(OpenLayers.Format.SLD.v1_0_0, {
  version: "1.0.0", profile: "GeoServer", readers: OpenLayers.Util.applyDefaults({
    sld: OpenLayers.Util.applyDefaults({
      Priority: function (a, b) { var c = this.readers.ogc._expression.call(this, a); c && (b.priority = c) }, VendorOption: function (a, b) { b.vendorOptions || (b.vendorOptions = {}); b.vendorOptions[a.getAttribute("name")] = this.getChildValue(a) }, TextSymbolizer: function (a, b) {
        OpenLayers.Format.SLD.v1_0_0.prototype.readers.sld.TextSymbolizer.apply(this,
          arguments); var c = this.multipleSymbolizers ? b.symbolizers[b.symbolizers.length - 1] : b.symbolizer.Text; void 0 === c.graphic && (c.graphic = !1)
      }
    }, OpenLayers.Format.SLD.v1_0_0.prototype.readers.sld)
  }, OpenLayers.Format.SLD.v1_0_0.prototype.readers), writers: OpenLayers.Util.applyDefaults({
    sld: OpenLayers.Util.applyDefaults({
      Priority: function (a) { return this.writers.sld._OGCExpression.call(this, "sld:Priority", a) }, VendorOption: function (a) {
        return this.createElementNSPlus("sld:VendorOption", {
          attributes: { name: a.name },
          value: a.value
        })
      }, TextSymbolizer: function (a) { var b = OpenLayers.Format.SLD.v1_0_0.prototype.writers.sld.TextSymbolizer.apply(this, arguments); !1 !== a.graphic && (a.externalGraphic || a.graphicName) && this.writeNode("Graphic", a, b); "priority" in a && this.writeNode("Priority", a.priority, b); return this.addVendorOptions(b, a) }, PointSymbolizer: function (a) { var b = OpenLayers.Format.SLD.v1_0_0.prototype.writers.sld.PointSymbolizer.apply(this, arguments); return this.addVendorOptions(b, a) }, LineSymbolizer: function (a) {
        var b =
          OpenLayers.Format.SLD.v1_0_0.prototype.writers.sld.LineSymbolizer.apply(this, arguments); return this.addVendorOptions(b, a)
      }, PolygonSymbolizer: function (a) { var b = OpenLayers.Format.SLD.v1_0_0.prototype.writers.sld.PolygonSymbolizer.apply(this, arguments); return this.addVendorOptions(b, a) }
    }, OpenLayers.Format.SLD.v1_0_0.prototype.writers.sld)
  }, OpenLayers.Format.SLD.v1_0_0.prototype.writers), addVendorOptions: function (a, b) {
    if (b.vendorOptions) for (var c in b.vendorOptions) this.writeNode("VendorOption", {
      name: c,
      value: b.vendorOptions[c]
    }, a); return a
  }, CLASS_NAME: "OpenLayers.Format.SLD.v1_0_0_GeoServer"
}); OpenLayers.Layer.Boxes = OpenLayers.Class(OpenLayers.Layer.Markers, {
  drawMarker: function (a) { var b = this.map.getLayerPxFromLonLat({ lon: a.bounds.left, lat: a.bounds.top }), c = this.map.getLayerPxFromLonLat({ lon: a.bounds.right, lat: a.bounds.bottom }); null == c || null == b ? a.display(!1) : (b = a.draw(b, { w: Math.max(1, c.x - b.x), h: Math.max(1, c.y - b.y) }), a.drawn || (this.div.appendChild(b), a.drawn = !0)) }, removeMarker: function (a) { OpenLayers.Util.removeItem(this.markers, a); null != a.div && a.div.parentNode == this.div && this.div.removeChild(a.div) },
  CLASS_NAME: "OpenLayers.Layer.Boxes"
}); OpenLayers.Format.WFSCapabilities.v1_0_0 = OpenLayers.Class(OpenLayers.Format.WFSCapabilities.v1, {
  readers: {
    wfs: OpenLayers.Util.applyDefaults({
      Service: function (a, b) { b.service = {}; this.readChildNodes(a, b.service) }, Fees: function (a, b) { var c = this.getChildValue(a); c && "none" != c.toLowerCase() && (b.fees = c) }, AccessConstraints: function (a, b) { var c = this.getChildValue(a); c && "none" != c.toLowerCase() && (b.accessConstraints = c) }, OnlineResource: function (a, b) {
        var c = this.getChildValue(a); c && "none" != c.toLowerCase() && (b.onlineResource =
          c)
      }, Keywords: function (a, b) { var c = this.getChildValue(a); c && "none" != c.toLowerCase() && (b.keywords = c.split(", ")) }, Capability: function (a, b) { b.capability = {}; this.readChildNodes(a, b.capability) }, Request: function (a, b) { b.request = {}; this.readChildNodes(a, b.request) }, GetFeature: function (a, b) { b.getfeature = { href: {}, formats: [] }; this.readChildNodes(a, b.getfeature) }, ResultFormat: function (a, b) { for (var c = a.childNodes, d, e = 0; e < c.length; e++)d = c[e], 1 == d.nodeType && b.formats.push(d.nodeName) }, DCPType: function (a, b) {
        this.readChildNodes(a,
          b)
      }, HTTP: function (a, b) { this.readChildNodes(a, b.href) }, Get: function (a, b) { b.get = a.getAttribute("onlineResource") }, Post: function (a, b) { b.post = a.getAttribute("onlineResource") }, SRS: function (a, b) { var c = this.getChildValue(a); c && (b.srs = c) }
    }, OpenLayers.Format.WFSCapabilities.v1.prototype.readers.wfs)
  }, CLASS_NAME: "OpenLayers.Format.WFSCapabilities.v1_0_0"
}); OpenLayers.Format.WMSCapabilities.v1_3 = OpenLayers.Class(OpenLayers.Format.WMSCapabilities.v1, {
  readers: {
    wms: OpenLayers.Util.applyDefaults({
      WMS_Capabilities: function (a, b) { this.readChildNodes(a, b) }, LayerLimit: function (a, b) { b.layerLimit = parseInt(this.getChildValue(a)) }, MaxWidth: function (a, b) { b.maxWidth = parseInt(this.getChildValue(a)) }, MaxHeight: function (a, b) { b.maxHeight = parseInt(this.getChildValue(a)) }, BoundingBox: function (a, b) {
        var c = OpenLayers.Format.WMSCapabilities.v1.prototype.readers.wms.BoundingBox.apply(this,
          [a, b]); c.srs = a.getAttribute("CRS"); b.bbox[c.srs] = c
      }, CRS: function (a, b) { this.readers.wms.SRS.apply(this, [a, b]) }, EX_GeographicBoundingBox: function (a, b) { b.llbbox = []; this.readChildNodes(a, b.llbbox) }, westBoundLongitude: function (a, b) { b[0] = this.getChildValue(a) }, eastBoundLongitude: function (a, b) { b[2] = this.getChildValue(a) }, southBoundLatitude: function (a, b) { b[1] = this.getChildValue(a) }, northBoundLatitude: function (a, b) { b[3] = this.getChildValue(a) }, MinScaleDenominator: function (a, b) { b.maxScale = parseFloat(this.getChildValue(a)).toPrecision(16) },
      MaxScaleDenominator: function (a, b) { b.minScale = parseFloat(this.getChildValue(a)).toPrecision(16) }, Dimension: function (a, b) { var c = { name: a.getAttribute("name").toLowerCase(), units: a.getAttribute("units"), unitsymbol: a.getAttribute("unitSymbol"), nearestVal: "1" === a.getAttribute("nearestValue"), multipleVal: "1" === a.getAttribute("multipleValues"), "default": a.getAttribute("default") || "", current: "1" === a.getAttribute("current"), values: this.getChildValue(a).split(",") }; b.dimensions[c.name] = c }, Keyword: function (a,
        b) { var c = { value: this.getChildValue(a), vocabulary: a.getAttribute("vocabulary") }; b.keywords && b.keywords.push(c) }
    }, OpenLayers.Format.WMSCapabilities.v1.prototype.readers.wms), sld: {
      UserDefinedSymbolization: function (a, b) { this.readers.wms.UserDefinedSymbolization.apply(this, [a, b]); b.userSymbols.inlineFeature = 1 == parseInt(a.getAttribute("InlineFeature")); b.userSymbols.remoteWCS = 1 == parseInt(a.getAttribute("RemoteWCS")) }, DescribeLayer: function (a, b) { this.readers.wms.DescribeLayer.apply(this, [a, b]) }, GetLegendGraphic: function (a,
        b) { this.readers.wms.GetLegendGraphic.apply(this, [a, b]) }
    }
  }, CLASS_NAME: "OpenLayers.Format.WMSCapabilities.v1_3"
}); OpenLayers.Layer.Zoomify = OpenLayers.Class(OpenLayers.Layer.Grid, {
  size: null, isBaseLayer: !0, standardTileSize: 256, tileOriginCorner: "tl", numberOfTiers: 0, tileCountUpToTier: null, tierSizeInTiles: null, tierImageSize: null, initialize: function (a, b, c, d) { this.initializeZoomify(c); OpenLayers.Layer.Grid.prototype.initialize.apply(this, [a, b, c, {}, d]) }, initializeZoomify: function (a) {
    var b = a.clone(); this.size = a.clone(); a = new OpenLayers.Size(Math.ceil(b.w / this.standardTileSize), Math.ceil(b.h / this.standardTileSize)); this.tierSizeInTiles =
      [a]; for (this.tierImageSize = [b]; b.w > this.standardTileSize || b.h > this.standardTileSize;)b = new OpenLayers.Size(Math.floor(b.w / 2), Math.floor(b.h / 2)), a = new OpenLayers.Size(Math.ceil(b.w / this.standardTileSize), Math.ceil(b.h / this.standardTileSize)), this.tierSizeInTiles.push(a), this.tierImageSize.push(b); this.tierSizeInTiles.reverse(); this.tierImageSize.reverse(); this.numberOfTiers = this.tierSizeInTiles.length; b = [1]; this.tileCountUpToTier = [0]; for (a = 1; a < this.numberOfTiers; a++)b.unshift(Math.pow(2, a)), this.tileCountUpToTier.push(this.tierSizeInTiles[a -
        1].w * this.tierSizeInTiles[a - 1].h + this.tileCountUpToTier[a - 1]); this.serverResolutions || (this.serverResolutions = b)
  }, destroy: function () { OpenLayers.Layer.Grid.prototype.destroy.apply(this, arguments); this.tileCountUpToTier.length = 0; this.tierSizeInTiles.length = 0; this.tierImageSize.length = 0 }, clone: function (a) { null == a && (a = new OpenLayers.Layer.Zoomify(this.name, this.url, this.size, this.options)); return a = OpenLayers.Layer.Grid.prototype.clone.apply(this, [a]) }, getURL: function (a) {
    a = this.adjustBounds(a); var b =
      this.getServerResolution(), c = Math.round((a.left - this.tileOrigin.lon) / (b * this.tileSize.w)); a = Math.round((this.tileOrigin.lat - a.top) / (b * this.tileSize.h)); b = this.getZoomForResolution(b); c = "TileGroup" + Math.floor((c + a * this.tierSizeInTiles[b].w + this.tileCountUpToTier[b]) / 256) + "/" + b + "-" + c + "-" + a + ".jpg"; b = this.url; OpenLayers.Util.isArray(b) && (b = this.selectUrl(c, b)); return b + c
  }, getImageSize: function () {
    if (0 < arguments.length) {
      var a = this.adjustBounds(arguments[0]), b = this.getServerResolution(), c = Math.round((a.left -
        this.tileOrigin.lon) / (b * this.tileSize.w)), a = Math.round((this.tileOrigin.lat - a.top) / (b * this.tileSize.h)), b = this.getZoomForResolution(b), d = this.standardTileSize, e = this.standardTileSize; c == this.tierSizeInTiles[b].w - 1 && (d = this.tierImageSize[b].w % this.standardTileSize); a == this.tierSizeInTiles[b].h - 1 && (e = this.tierImageSize[b].h % this.standardTileSize); return new OpenLayers.Size(d, e)
    } return this.tileSize
  }, setMap: function (a) {
    OpenLayers.Layer.Grid.prototype.setMap.apply(this, arguments); this.tileOrigin = new OpenLayers.LonLat(this.map.maxExtent.left,
      this.map.maxExtent.top)
  }, CLASS_NAME: "OpenLayers.Layer.Zoomify"
}); OpenLayers.Layer.MapServer = OpenLayers.Class(OpenLayers.Layer.Grid, {
  DEFAULT_PARAMS: { mode: "map", map_imagetype: "png" }, initialize: function (a, b, c, d) { OpenLayers.Layer.Grid.prototype.initialize.apply(this, arguments); this.params = OpenLayers.Util.applyDefaults(this.params, this.DEFAULT_PARAMS); if (null == d || null == d.isBaseLayer) this.isBaseLayer = "true" != this.params.transparent && !0 != this.params.transparent }, clone: function (a) {
  null == a && (a = new OpenLayers.Layer.MapServer(this.name, this.url, this.params, this.getOptions()));
    return a = OpenLayers.Layer.Grid.prototype.clone.apply(this, [a])
  }, getURL: function (a) { a = this.adjustBounds(a); a = [a.left, a.bottom, a.right, a.top]; var b = this.getImageSize(); return this.getFullRequestString({ mapext: a, imgext: a, map_size: [b.w, b.h], imgx: b.w / 2, imgy: b.h / 2, imgxy: [b.w, b.h] }) }, getFullRequestString: function (a, b) {
    var c = null == b ? this.url : b, d = OpenLayers.Util.extend({}, this.params), d = OpenLayers.Util.extend(d, a), e = OpenLayers.Util.getParameterString(d); OpenLayers.Util.isArray(c) && (c = this.selectUrl(e, c));
    var e = OpenLayers.Util.upperCaseObject(OpenLayers.Util.getParameters(c)), f; for (f in d) f.toUpperCase() in e && delete d[f]; e = OpenLayers.Util.getParameterString(d); d = c; e = e.replace(/,/g, "+"); "" != e && (f = c.charAt(c.length - 1), d = "&" == f || "?" == f ? d + e : -1 == c.indexOf("?") ? d + ("?" + e) : d + ("&" + e)); return d
  }, CLASS_NAME: "OpenLayers.Layer.MapServer"
}); OpenLayers.Renderer.VML = OpenLayers.Class(OpenLayers.Renderer.Elements, {
  xmlns: "urn:schemas-microsoft-com:vml", symbolCache: {}, offset: null, initialize: function (a) {
    if (this.supported()) {
      if (!document.namespaces.olv) { document.namespaces.add("olv", this.xmlns); for (var b = document.createStyleSheet(), c = "shape rect oval fill stroke imagedata group textbox".split(" "), d = 0, e = c.length; d < e; d++)b.addRule("olv\\:" + c[d], "behavior: url(#default#VML); position: absolute; display: inline-block;") } OpenLayers.Renderer.Elements.prototype.initialize.apply(this,
        arguments)
    }
  }, supported: function () { return !!document.namespaces }, setExtent: function (a, b) { var c = OpenLayers.Renderer.Elements.prototype.setExtent.apply(this, arguments), d = this.getResolution(), e = a.left / d | 0, d = a.top / d - this.size.h | 0; b || !this.offset ? (this.offset = { x: e, y: d }, d = e = 0) : (e -= this.offset.x, d -= this.offset.y); this.root.coordorigin = e - this.xOffset + " " + d; for (var e = [this.root, this.vectorRoot, this.textRoot], f = 0, g = e.length; f < g; ++f)d = e[f], d.coordsize = this.size.w + " " + this.size.h; this.root.style.flip = "y"; return c },
  setSize: function (a) { OpenLayers.Renderer.prototype.setSize.apply(this, arguments); for (var b = [this.rendererRoot, this.root, this.vectorRoot, this.textRoot], c = this.size.w + "px", d = this.size.h + "px", e, f = 0, g = b.length; f < g; ++f)e = b[f], e.style.width = c, e.style.height = d }, getNodeType: function (a, b) {
    var c = null; switch (a.CLASS_NAME) {
      case "OpenLayers.Geometry.Point": c = b.externalGraphic ? "olv:rect" : this.isComplexSymbol(b.graphicName) ? "olv:shape" : "olv:oval"; break; case "OpenLayers.Geometry.Rectangle": c = "olv:rect"; break; case "OpenLayers.Geometry.LineString": case "OpenLayers.Geometry.LinearRing": case "OpenLayers.Geometry.Polygon": case "OpenLayers.Geometry.Curve": c =
        "olv:shape"
    }return c
  }, setStyle: function (a, b, c, d) {
    b = b || a._style; c = c || a._options; var e = b.fillColor, f = b.title || b.graphicTitle; f && (a.title = f); if ("OpenLayers.Geometry.Point" === a._geometryClass) if (b.externalGraphic) {
    c.isFilled = !0; var e = b.graphicWidth || b.graphicHeight, f = b.graphicHeight || b.graphicWidth, e = e ? e : 2 * b.pointRadius, f = f ? f : 2 * b.pointRadius, g = this.getResolution(), h = void 0 != b.graphicXOffset ? b.graphicXOffset : -(0.5 * e), k = void 0 != b.graphicYOffset ? b.graphicYOffset : -(0.5 * f); a.style.left = ((d.x - this.featureDx) /
      g - this.offset.x + h | 0) + "px"; a.style.top = (d.y / g - this.offset.y - (k + f) | 0) + "px"; a.style.width = e + "px"; a.style.height = f + "px"; a.style.flip = "y"; e = "none"; c.isStroked = !1
    } else this.isComplexSymbol(b.graphicName) ? (f = this.importSymbol(b.graphicName), a.path = f.path, a.coordorigin = f.left + "," + f.bottom, f = f.size, a.coordsize = f + "," + f, this.drawCircle(a, d, b.pointRadius), a.style.flip = "y") : this.drawCircle(a, d, b.pointRadius); c.isFilled ? a.fillcolor = e : a.filled = "false"; d = a.getElementsByTagName("fill"); d = 0 == d.length ? null : d[0]; c.isFilled ?
      (d || (d = this.createNode("olv:fill", a.id + "_fill")), d.opacity = b.fillOpacity, "OpenLayers.Geometry.Point" === a._geometryClass && b.externalGraphic && (b.graphicOpacity && (d.opacity = b.graphicOpacity), d.src = b.externalGraphic, d.type = "frame", b.graphicWidth && b.graphicHeight || (d.aspect = "atmost")), d.parentNode != a && a.appendChild(d)) : d && a.removeChild(d); e = b.rotation; if (void 0 !== e || void 0 !== a._rotation) a._rotation = e, b.externalGraphic ? (this.graphicRotate(a, h, k, b), d.opacity = 0) : "OpenLayers.Geometry.Point" === a._geometryClass &&
        (a.style.rotation = e || 0); h = a.getElementsByTagName("stroke"); h = 0 == h.length ? null : h[0]; c.isStroked ? (h || (h = this.createNode("olv:stroke", a.id + "_stroke"), a.appendChild(h)), h.on = !0, h.color = b.strokeColor, h.weight = b.strokeWidth + "px", h.opacity = b.strokeOpacity, h.endcap = "butt" == b.strokeLinecap ? "flat" : b.strokeLinecap || "round", b.strokeDashstyle && (h.dashstyle = this.dashStyle(b))) : (a.stroked = !1, h && (h.on = !1)); "inherit" != b.cursor && null != b.cursor && (a.style.cursor = b.cursor); return a
  }, graphicRotate: function (a, b, c, d) {
    d =
    d || a._style; var e = d.rotation || 0, f, g; if (d.graphicWidth && d.graphicHeight) {
      g = Math.max(d.graphicWidth, d.graphicHeight); f = d.graphicWidth / d.graphicHeight; var h = Math.round(d.graphicWidth || g * f), k = Math.round(d.graphicHeight || g); a.style.width = h + "px"; a.style.height = k + "px"; var l = document.getElementById(a.id + "_image"); l || (l = this.createNode("olv:imagedata", a.id + "_image"), a.appendChild(l)); l.style.width = h + "px"; l.style.height = k + "px"; l.src = d.externalGraphic; l.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='', sizingMethod='scale')";
      l = e * Math.PI / 180; e = Math.sin(l); l = Math.cos(l); e = "progid:DXImageTransform.Microsoft.Matrix(M11=" + l + ",M12=" + -e + ",M21=" + e + ",M22=" + l + ",SizingMethod='auto expand')\n"; (l = d.graphicOpacity || d.fillOpacity) && 1 != l && (e += "progid:DXImageTransform.Microsoft.BasicImage(opacity=" + l + ")\n"); a.style.filter = e; e = new OpenLayers.Geometry.Point(-b, -c); h = (new OpenLayers.Bounds(0, 0, h, k)).toGeometry(); h.rotate(d.rotation, e); h = h.getBounds(); a.style.left = Math.round(parseInt(a.style.left) + h.left) + "px"; a.style.top = Math.round(parseInt(a.style.top) -
        h.bottom) + "px"
    } else { var m = new Image; m.onreadystatechange = OpenLayers.Function.bind(function () { if ("complete" == m.readyState || "interactive" == m.readyState) f = m.width / m.height, g = Math.max(2 * d.pointRadius, d.graphicWidth || 0, d.graphicHeight || 0), b *= f, d.graphicWidth = g * f, d.graphicHeight = g, this.graphicRotate(a, b, c, d) }, this); m.src = d.externalGraphic }
  }, postDraw: function (a) {
    a.style.visibility = "visible"; var b = a._style.fillColor, c = a._style.strokeColor; "none" == b && a.fillcolor != b && (a.fillcolor = b); "none" == c && a.strokecolor !=
      c && (a.strokecolor = c)
  }, setNodeDimension: function (a, b) { var c = b.getBounds(); if (c) { var d = this.getResolution(), c = new OpenLayers.Bounds((c.left - this.featureDx) / d - this.offset.x | 0, c.bottom / d - this.offset.y | 0, (c.right - this.featureDx) / d - this.offset.x | 0, c.top / d - this.offset.y | 0); a.style.left = c.left + "px"; a.style.top = c.top + "px"; a.style.width = c.getWidth() + "px"; a.style.height = c.getHeight() + "px"; a.coordorigin = c.left + " " + c.top; a.coordsize = c.getWidth() + " " + c.getHeight() } }, dashStyle: function (a) {
    a = a.strokeDashstyle; switch (a) {
      case "solid": case "dot": case "dash": case "dashdot": case "longdash": case "longdashdot": return a;
      default: return a = a.split(/[ ,]/), 2 == a.length ? 1 * a[0] >= 2 * a[1] ? "longdash" : 1 == a[0] || 1 == a[1] ? "dot" : "dash" : 4 == a.length ? 1 * a[0] >= 2 * a[1] ? "longdashdot" : "dashdot" : "solid"
    }
  }, createNode: function (a, b) { var c = document.createElement(a); b && (c.id = b); c.unselectable = "on"; c.onselectstart = OpenLayers.Function.False; return c }, nodeTypeCompare: function (a, b) { var c = b, d = c.indexOf(":"); -1 != d && (c = c.substr(d + 1)); var e = a.nodeName, d = e.indexOf(":"); -1 != d && (e = e.substr(d + 1)); return c == e }, createRenderRoot: function () {
    return this.nodeFactory(this.container.id +
      "_vmlRoot", "div")
  }, createRoot: function (a) { return this.nodeFactory(this.container.id + a, "olv:group") }, drawPoint: function (a, b) { return this.drawCircle(a, b, 1) }, drawCircle: function (a, b, c) { if (!isNaN(b.x) && !isNaN(b.y)) { var d = this.getResolution(); a.style.left = ((b.x - this.featureDx) / d - this.offset.x | 0) - c + "px"; a.style.top = (b.y / d - this.offset.y | 0) - c + "px"; b = 2 * c; a.style.width = b + "px"; a.style.height = b + "px"; return a } return !1 }, drawLineString: function (a, b) { return this.drawLine(a, b, !1) }, drawLinearRing: function (a, b) {
    return this.drawLine(a,
      b, !0)
  }, drawLine: function (a, b, c) { this.setNodeDimension(a, b); for (var d = this.getResolution(), e = b.components.length, f = Array(e), g, h, k = 0; k < e; k++)g = b.components[k], h = (g.x - this.featureDx) / d - this.offset.x | 0, g = g.y / d - this.offset.y | 0, f[k] = " " + h + "," + g + " l "; b = c ? " x e" : " e"; a.path = "m" + f.join("") + b; return a }, drawPolygon: function (a, b) {
    this.setNodeDimension(a, b); var c = this.getResolution(), d = [], e, f, g, h, k, l, m, n, p, q; e = 0; for (f = b.components.length; e < f; e++) {
      d.push("m"); g = b.components[e].components; h = 0 === e; l = k = null; m = 0;
      for (n = g.length; m < n; m++)p = g[m], q = (p.x - this.featureDx) / c - this.offset.x | 0, p = p.y / c - this.offset.y | 0, q = " " + q + "," + p, d.push(q), 0 == m && d.push(" l"), h || (k ? k != q && (l ? l != q && (h = !0) : l = q) : k = q); d.push(h ? " x " : " ")
    } d.push("e"); a.path = d.join(""); return a
  }, drawRectangle: function (a, b) { var c = this.getResolution(); a.style.left = ((b.x - this.featureDx) / c - this.offset.x | 0) + "px"; a.style.top = (b.y / c - this.offset.y | 0) + "px"; a.style.width = (b.width / c | 0) + "px"; a.style.height = (b.height / c | 0) + "px"; return a }, drawText: function (a, b, c) {
    var d = this.nodeFactory(a +
      this.LABEL_ID_SUFFIX, "olv:rect"), e = this.nodeFactory(a + this.LABEL_ID_SUFFIX + "_textbox", "olv:textbox"), f = this.getResolution(); d.style.left = ((c.x - this.featureDx) / f - this.offset.x | 0) + "px"; d.style.top = (c.y / f - this.offset.y | 0) + "px"; d.style.flip = "y"; e.innerText = b.label; "inherit" != b.cursor && null != b.cursor && (e.style.cursor = b.cursor); b.fontColor && (e.style.color = b.fontColor); b.fontOpacity && (e.style.filter = "alpha(opacity=" + 100 * b.fontOpacity + ")"); b.fontFamily && (e.style.fontFamily = b.fontFamily); b.fontSize && (e.style.fontSize =
        b.fontSize); b.fontWeight && (e.style.fontWeight = b.fontWeight); b.fontStyle && (e.style.fontStyle = b.fontStyle); !0 === b.labelSelect && (d._featureId = a, e._featureId = a, e._geometry = c, e._geometryClass = c.CLASS_NAME); e.style.whiteSpace = "nowrap"; e.inset = "1px,0px,0px,0px"; d.parentNode || (d.appendChild(e), this.textRoot.appendChild(d)); b = b.labelAlign || "cm"; 1 == b.length && (b += "m"); a = e.clientWidth * OpenLayers.Renderer.VML.LABEL_SHIFT[b.substr(0, 1)]; e = e.clientHeight * OpenLayers.Renderer.VML.LABEL_SHIFT[b.substr(1, 1)]; d.style.left =
          parseInt(d.style.left) - a - 1 + "px"; d.style.top = parseInt(d.style.top) + e + "px"
  }, moveRoot: function (a) { var b = this.map.getLayer(a.container.id); b instanceof OpenLayers.Layer.Vector.RootContainer && (b = this.map.getLayer(this.container.id)); b && b.renderer.clear(); OpenLayers.Renderer.Elements.prototype.moveRoot.apply(this, arguments); b && b.redraw() }, importSymbol: function (a) {
    var b = this.container.id + "-" + a, c = this.symbolCache[b]; if (c) return c; c = OpenLayers.Renderer.symbol[a]; if (!c) throw Error(a + " is not a valid symbol name");
    a = new OpenLayers.Bounds(Number.MAX_VALUE, Number.MAX_VALUE, 0, 0); for (var d = ["m"], e = 0; e < c.length; e += 2) { var f = c[e], g = c[e + 1]; a.left = Math.min(a.left, f); a.bottom = Math.min(a.bottom, g); a.right = Math.max(a.right, f); a.top = Math.max(a.top, g); d.push(f); d.push(g); 0 == e && d.push("l") } d.push("x e"); c = d.join(" "); d = (a.getWidth() - a.getHeight()) / 2; 0 < d ? (a.bottom -= d, a.top += d) : (a.left += d, a.right -= d); c = { path: c, size: a.getWidth(), left: a.left, bottom: a.bottom }; return this.symbolCache[b] = c
  }, CLASS_NAME: "OpenLayers.Renderer.VML"
});
OpenLayers.Renderer.VML.LABEL_SHIFT = { l: 0, c: 0.5, r: 1, t: 0, m: 0.5, b: 1 }; OpenLayers.Control.CacheRead = OpenLayers.Class(OpenLayers.Control, {
  fetchEvent: "tileloadstart", layers: null, autoActivate: !0, setMap: function (a) { OpenLayers.Control.prototype.setMap.apply(this, arguments); var b, c = this.layers || a.layers; for (b = c.length - 1; 0 <= b; --b)this.addLayer({ layer: c[b] }); if (!this.layers) a.events.on({ addlayer: this.addLayer, removeLayer: this.removeLayer, scope: this }) }, addLayer: function (a) { a.layer.events.register(this.fetchEvent, this, this.fetch) }, removeLayer: function (a) {
    a.layer.events.unregister(this.fetchEvent,
      this, this.fetch)
  }, fetch: function (a) { if (this.active && window.localStorage && a.tile instanceof OpenLayers.Tile.Image) { var b = a.tile, c = b.url; !b.layer.crossOriginKeyword && (OpenLayers.ProxyHost && 0 === c.indexOf(OpenLayers.ProxyHost)) && (c = OpenLayers.Control.CacheWrite.urlMap[c]); if (c = window.localStorage.getItem("olCache_" + c)) b.url = c, "tileerror" === a.type && b.setImgSrc(c) } }, destroy: function () {
    if (this.layers || this.map) { var a, b = this.layers || this.map.layers; for (a = b.length - 1; 0 <= a; --a)this.removeLayer({ layer: b[a] }) } this.map &&
      this.map.events.un({ addlayer: this.addLayer, removeLayer: this.removeLayer, scope: this }); OpenLayers.Control.prototype.destroy.apply(this, arguments)
  }, CLASS_NAME: "OpenLayers.Control.CacheRead"
}); OpenLayers.Protocol.WFS.v1_0_0 = OpenLayers.Class(OpenLayers.Protocol.WFS.v1, { version: "1.0.0", CLASS_NAME: "OpenLayers.Protocol.WFS.v1_0_0" }); OpenLayers.Format.WMSGetFeatureInfo = OpenLayers.Class(OpenLayers.Format.XML, {
  layerIdentifier: "_layer", featureIdentifier: "_feature", regExes: { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g }, gmlFormat: null, read: function (a) { "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); var b = a.documentElement; if (b) { var c = this["read_" + b.nodeName]; a = c ? c.call(this, b) : (new OpenLayers.Format.GML(this.options ? this.options : {})).read(a) } return a }, read_msGMLOutput: function (a) {
    var b =
      []; if (a = this.getSiblingNodesByTagCriteria(a, this.layerIdentifier)) for (var c = 0, d = a.length; c < d; ++c) { var e = a[c], f = e.nodeName; e.prefix && (f = f.split(":")[1]); f = f.replace(this.layerIdentifier, ""); if (e = this.getSiblingNodesByTagCriteria(e, this.featureIdentifier)) for (var g = 0; g < e.length; g++) { var h = e[g], k = this.parseGeometry(h), h = this.parseAttributes(h), h = new OpenLayers.Feature.Vector(k.geometry, h, null); h.bounds = k.bounds; h.type = f; b.push(h) } } return b
  }, read_FeatureInfoResponse: function (a) {
    var b = []; a = this.getElementsByTagNameNS(a,
      "*", "FIELDS"); for (var c = 0, d = a.length; c < d; c++) { var e = a[c], f = {}, g, h = e.attributes.length; if (0 < h) for (g = 0; g < h; g++) { var k = e.attributes[g]; f[k.nodeName] = k.nodeValue } else for (e = e.childNodes, g = 0, h = e.length; g < h; ++g)k = e[g], 3 != k.nodeType && (f[k.getAttribute("name")] = k.getAttribute("value")); b.push(new OpenLayers.Feature.Vector(null, f, null)) } return b
  }, getSiblingNodesByTagCriteria: function (a, b) {
    var c = [], d, e, f, g; if (a && a.hasChildNodes()) {
      d = a.childNodes; f = d.length; for (var h = 0; h < f; h++) {
        for (g = d[h]; g && 1 != g.nodeType;)g =
          g.nextSibling, h++; e = g ? g.nodeName : ""; 0 < e.length && -1 < e.indexOf(b) ? c.push(g) : (e = this.getSiblingNodesByTagCriteria(g, b), 0 < e.length && (0 == c.length ? c = e : c.push(e)))
      }
    } return c
  }, parseAttributes: function (a) { var b = {}; if (1 == a.nodeType) { a = a.childNodes; for (var c = a.length, d = 0; d < c; ++d) { var e = a[d]; if (1 == e.nodeType) { var f = e.childNodes, e = e.prefix ? e.nodeName.split(":")[1] : e.nodeName; 0 == f.length ? b[e] = null : 1 == f.length && (f = f[0], 3 == f.nodeType || 4 == f.nodeType) && (f = f.nodeValue.replace(this.regExes.trimSpace, ""), b[e] = f) } } } return b },
  parseGeometry: function (a) { this.gmlFormat || (this.gmlFormat = new OpenLayers.Format.GML); a = this.gmlFormat.parseFeature(a); var b, c = null; a && (b = a.geometry && a.geometry.clone(), c = a.bounds && a.bounds.clone(), a.destroy()); return { geometry: b, bounds: c } }, CLASS_NAME: "OpenLayers.Format.WMSGetFeatureInfo"
}); OpenLayers.Control.WMTSGetFeatureInfo = OpenLayers.Class(OpenLayers.Control, {
  hover: !1, requestEncoding: "KVP", drillDown: !1, maxFeatures: 10, clickCallback: "click", layers: null, queryVisible: !0, infoFormat: "text/html", vendorParams: {}, format: null, formatOptions: null, handler: null, hoverRequest: null, pending: 0, initialize: function (a) {
    a = a || {}; a.handlerOptions = a.handlerOptions || {}; OpenLayers.Control.prototype.initialize.apply(this, [a]); this.format || (this.format = new OpenLayers.Format.WMSGetFeatureInfo(a.formatOptions));
    !0 === this.drillDown && (this.hover = !1); this.hover ? this.handler = new OpenLayers.Handler.Hover(this, { move: this.cancelHover, pause: this.getInfoForHover }, OpenLayers.Util.extend(this.handlerOptions.hover || {}, { delay: 250 })) : (a = {}, a[this.clickCallback] = this.getInfoForClick, this.handler = new OpenLayers.Handler.Click(this, a, this.handlerOptions.click || {}))
  }, getInfoForClick: function (a) { this.request(a.xy, {}) }, getInfoForHover: function (a) { this.request(a.xy, { hover: !0 }) }, cancelHover: function () {
  this.hoverRequest && (--this.pending,
    0 >= this.pending && (OpenLayers.Element.removeClass(this.map.viewPortDiv, "olCursorWait"), this.pending = 0), this.hoverRequest.abort(), this.hoverRequest = null)
  }, findLayers: function () { for (var a = this.layers || this.map.layers, b = [], c, d = a.length - 1; 0 <= d && (c = a[d], !(c instanceof OpenLayers.Layer.WMTS) || (c.requestEncoding !== this.requestEncoding || this.queryVisible && !c.getVisibility()) || (b.push(c), this.drillDown && !this.hover)); --d); return b }, buildRequestOptions: function (a, b) {
    var c = this.map.getLonLatFromPixel(b), d = a.getURL(new OpenLayers.Bounds(c.lon,
      c.lat, c.lon, c.lat)), d = OpenLayers.Util.getParameters(d), c = a.getTileInfo(c); OpenLayers.Util.extend(d, { service: "WMTS", version: a.version, request: "GetFeatureInfo", infoFormat: this.infoFormat, i: c.i, j: c.j }); OpenLayers.Util.applyDefaults(d, this.vendorParams); return { url: OpenLayers.Util.isArray(a.url) ? a.url[0] : a.url, params: OpenLayers.Util.upperCaseObject(d), callback: function (c) { this.handleResponse(b, c, a) }, scope: this }
  }, request: function (a, b) {
    b = b || {}; var c = this.findLayers(); if (0 < c.length) {
      for (var d, e, f = 0, g = c.length; f <
        g; f++)e = c[f], d = this.events.triggerEvent("beforegetfeatureinfo", { xy: a, layer: e }), !1 !== d && (++this.pending, d = this.buildRequestOptions(e, a), d = OpenLayers.Request.GET(d), !0 === b.hover && (this.hoverRequest = d)); 0 < this.pending && OpenLayers.Element.addClass(this.map.viewPortDiv, "olCursorWait")
    }
  }, handleResponse: function (a, b, c) {
    --this.pending; 0 >= this.pending && (OpenLayers.Element.removeClass(this.map.viewPortDiv, "olCursorWait"), this.pending = 0); if (b.status && (200 > b.status || 300 <= b.status)) this.events.triggerEvent("exception",
      { xy: a, request: b, layer: c }); else { var d = b.responseXML; d && d.documentElement || (d = b.responseText); var e, f; try { e = this.format.read(d) } catch (g) { f = !0, this.events.triggerEvent("exception", { xy: a, request: b, error: g, layer: c }) } f || this.events.triggerEvent("getfeatureinfo", { text: b.responseText, features: e, request: b, xy: a, layer: c }) }
  }, CLASS_NAME: "OpenLayers.Control.WMTSGetFeatureInfo"
}); OpenLayers.Protocol.CSW.v2_0_2 = OpenLayers.Class(OpenLayers.Protocol, {
  formatOptions: null, initialize: function (a) { OpenLayers.Protocol.prototype.initialize.apply(this, [a]); a.format || (this.format = new OpenLayers.Format.CSWGetRecords.v2_0_2(OpenLayers.Util.extend({}, this.formatOptions))) }, destroy: function () { this.options && !this.options.format && this.format.destroy(); this.format = null; OpenLayers.Protocol.prototype.destroy.apply(this) }, read: function (a) {
    a = OpenLayers.Util.extend({}, a); OpenLayers.Util.applyDefaults(a,
      this.options || {}); var b = new OpenLayers.Protocol.Response({ requestType: "read" }), c = this.format.write(a.params || a); b.priv = OpenLayers.Request.POST({ url: a.url, callback: this.createCallback(this.handleRead, b, a), params: a.params, headers: a.headers, data: c }); return b
  }, handleRead: function (a, b) { if (b.callback) { var c = a.priv; 200 <= c.status && 300 > c.status ? (a.data = this.parseData(c), a.code = OpenLayers.Protocol.Response.SUCCESS) : a.code = OpenLayers.Protocol.Response.FAILURE; b.callback.call(b.scope, a) } }, parseData: function (a) {
    var b =
      a.responseXML; b && b.documentElement || (b = a.responseText); return !b || 0 >= b.length ? null : this.format.read(b)
  }, CLASS_NAME: "OpenLayers.Protocol.CSW.v2_0_2"
}); OpenLayers.Format.WCSCapabilities.v1_1_0 = OpenLayers.Class(OpenLayers.Format.WCSCapabilities.v1, {
  namespaces: { wcs: "http://www.opengis.net/wcs/1.1", xlink: "http://www.w3.org/1999/xlink", xsi: "http://www.w3.org/2001/XMLSchema-instance", ows: "http://www.opengis.net/ows/1.1" }, errorProperty: "operationsMetadata", readers: {
    wcs: OpenLayers.Util.applyDefaults({
      Capabilities: function (a, b) { this.readChildNodes(a, b) }, Contents: function (a, b) { b.contentMetadata = []; this.readChildNodes(a, b.contentMetadata) }, CoverageSummary: function (a,
        b) { var c = {}; this.readChildNodes(a, c); b.push(c) }, Identifier: function (a, b) { b.identifier = this.getChildValue(a) }, Title: function (a, b) { b.title = this.getChildValue(a) }, Abstract: function (a, b) { b["abstract"] = this.getChildValue(a) }, SupportedCRS: function (a, b) { var c = this.getChildValue(a); c && (b.supportedCRS || (b.supportedCRS = []), b.supportedCRS.push(c)) }, SupportedFormat: function (a, b) { var c = this.getChildValue(a); c && (b.supportedFormat || (b.supportedFormat = []), b.supportedFormat.push(c)) }
    }, OpenLayers.Format.WCSCapabilities.v1.prototype.readers.wcs),
    ows: OpenLayers.Format.OWSCommon.v1_1_0.prototype.readers.ows
  }, CLASS_NAME: "OpenLayers.Format.WCSCapabilities.v1_1_0"
}); OpenLayers.Control.Graticule = OpenLayers.Class(OpenLayers.Control, {
  autoActivate: !0, intervals: [45, 30, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.01, 0.005, 0.002, 0.001], displayInLayerSwitcher: !0, visible: !0, numPoints: 50, targetSize: 200, layerName: null, labelled: !0, labelFormat: "dm", lineSymbolizer: { strokeColor: "#333", strokeWidth: 1, strokeOpacity: 0.5 }, labelSymbolizer: {}, gratLayer: null, initialize: function (a) {
    a = a || {}; a.layerName = a.layerName || OpenLayers.i18n("Graticule"); OpenLayers.Control.prototype.initialize.apply(this, [a]);
    this.labelSymbolizer.stroke = !1; this.labelSymbolizer.fill = !1; this.labelSymbolizer.label = "${label}"; this.labelSymbolizer.labelAlign = "${labelAlign}"; this.labelSymbolizer.labelXOffset = "${xOffset}"; this.labelSymbolizer.labelYOffset = "${yOffset}"
  }, destroy: function () { this.deactivate(); OpenLayers.Control.prototype.destroy.apply(this, arguments); this.gratLayer && (this.gratLayer.destroy(), this.gratLayer = null) }, draw: function () {
    OpenLayers.Control.prototype.draw.apply(this, arguments); if (!this.gratLayer) {
      var a = new OpenLayers.Style({},
        { rules: [new OpenLayers.Rule({ symbolizer: { Point: this.labelSymbolizer, Line: this.lineSymbolizer } })] }); this.gratLayer = new OpenLayers.Layer.Vector(this.layerName, { styleMap: new OpenLayers.StyleMap({ "default": a }), visibility: this.visible, displayInLayerSwitcher: this.displayInLayerSwitcher })
    } return this.div
  }, activate: function () { return OpenLayers.Control.prototype.activate.apply(this, arguments) ? (this.map.addLayer(this.gratLayer), this.map.events.register("moveend", this, this.update), this.update(), !0) : !1 }, deactivate: function () {
    return OpenLayers.Control.prototype.deactivate.apply(this,
      arguments) ? (this.map.events.unregister("moveend", this, this.update), this.map.removeLayer(this.gratLayer), !0) : !1
  }, update: function () {
    var a = this.map.getExtent(); if (a) {
      this.gratLayer.destroyFeatures(); var b = new OpenLayers.Projection("EPSG:4326"), c = this.map.getProjectionObject(), d = this.map.getResolution(); c.proj && "longlat" == c.proj.projName && (this.numPoints = 1); var e = this.map.getCenter(), f = new OpenLayers.Pixel(e.lon, e.lat); OpenLayers.Projection.transform(f, c, b); for (var e = this.targetSize * d, e = e * e, g, d = 0; d < this.intervals.length; ++d) {
        g =
        this.intervals[d]; var h = g / 2, k = f.offset({ x: -h, y: -h }), h = f.offset({ x: h, y: h }); OpenLayers.Projection.transform(k, b, c); OpenLayers.Projection.transform(h, b, c); if ((k.x - h.x) * (k.x - h.x) + (k.y - h.y) * (k.y - h.y) <= e) break
      } f.x = Math.floor(f.x / g) * g; f.y = Math.floor(f.y / g) * g; var d = 0, e = [f.clone()], h = f.clone(), l; do h = h.offset({ x: 0, y: g }), l = OpenLayers.Projection.transform(h.clone(), b, c), e.unshift(h); while (a.containsPixel(l) && 1E3 > ++d); h = f.clone(); do h = h.offset({ x: 0, y: -g }), l = OpenLayers.Projection.transform(h.clone(), b, c), e.push(h);
      while (a.containsPixel(l) && 1E3 > ++d); d = 0; k = [f.clone()]; h = f.clone(); do h = h.offset({ x: -g, y: 0 }), l = OpenLayers.Projection.transform(h.clone(), b, c), k.unshift(h); while (a.containsPixel(l) && 1E3 > ++d); h = f.clone(); do h = h.offset({ x: g, y: 0 }), l = OpenLayers.Projection.transform(h.clone(), b, c), k.push(h); while (a.containsPixel(l) && 1E3 > ++d); g = []; for (d = 0; d < k.length; ++d) {
        l = k[d].x; for (var f = [], m = null, n = Math.min(e[0].y, 90), h = Math.max(e[e.length - 1].y, -90), p = (n - h) / this.numPoints, n = h, h = 0; h <= this.numPoints; ++h) {
          var q = new OpenLayers.Geometry.Point(l,
            n); q.transform(b, c); f.push(q); n += p; q.y >= a.bottom && !m && (m = q)
        } this.labelled && (m = new OpenLayers.Geometry.Point(m.x, a.bottom), l = { value: l, label: this.labelled ? OpenLayers.Util.getFormattedLonLat(l, "lon", this.labelFormat) : "", labelAlign: "cb", xOffset: 0, yOffset: 2 }, this.gratLayer.addFeatures(new OpenLayers.Feature.Vector(m, l))); f = new OpenLayers.Geometry.LineString(f); g.push(new OpenLayers.Feature.Vector(f))
      } for (h = 0; h < e.length; ++h)if (n = e[h].y, !(-90 > n || 90 < n)) {
        f = []; d = k[0].x; p = (k[k.length - 1].x - d) / this.numPoints;
        l = d; m = null; for (d = 0; d <= this.numPoints; ++d)q = new OpenLayers.Geometry.Point(l, n), q.transform(b, c), f.push(q), l += p, q.x < a.right && (m = q); this.labelled && (m = new OpenLayers.Geometry.Point(a.right, m.y), l = { value: n, label: this.labelled ? OpenLayers.Util.getFormattedLonLat(n, "lat", this.labelFormat) : "", labelAlign: "rb", xOffset: -2, yOffset: 2 }, this.gratLayer.addFeatures(new OpenLayers.Feature.Vector(m, l))); f = new OpenLayers.Geometry.LineString(f); g.push(new OpenLayers.Feature.Vector(f))
      } this.gratLayer.addFeatures(g)
    }
  }, CLASS_NAME: "OpenLayers.Control.Graticule"
}); OpenLayers.Console.warn("OpenLayers.Rico is deprecated"); OpenLayers.Rico = OpenLayers.Rico || {};
OpenLayers.Rico.Corner = {
  round: function (a, b) { a = OpenLayers.Util.getElement(a); this._setOptions(b); var c = this.options.color; "fromElement" == this.options.color && (c = this._background(a)); var d = this.options.bgColor; "fromParent" == this.options.bgColor && (d = this._background(a.offsetParent)); this._roundCornersImpl(a, c, d) }, changeColor: function (a, b) { a.style.backgroundColor = b; for (var c = a.parentNode.getElementsByTagName("span"), d = 0; d < c.length; d++)c[d].style.backgroundColor = b }, changeOpacity: function (a, b) {
    var c = "alpha(opacity=" +
      100 * b + ")"; a.style.opacity = b; a.style.filter = c; for (var d = a.parentNode.getElementsByTagName("span"), e = 0; e < d.length; e++)d[e].style.opacity = b, d[e].style.filter = c
  }, reRound: function (a, b) { var c = a.parentNode.childNodes[2]; a.parentNode.removeChild(a.parentNode.childNodes[0]); a.parentNode.removeChild(c); this.round(a.parentNode, b) }, _roundCornersImpl: function (a, b, c) {
    this.options.border && this._renderBorder(a, c); this._isTopRounded() && this._roundTopCorners(a, b, c); this._isBottomRounded() && this._roundBottomCorners(a,
      b, c)
  }, _renderBorder: function (a, b) { var c = "1px solid " + this._borderColor(b); a.innerHTML = "<div " + ("style='border-left: " + c + ";" + ("border-right: " + c) + "'") + ">" + a.innerHTML + "</div>" }, _roundTopCorners: function (a, b, c) { for (var d = this._createCorner(c), e = 0; e < this.options.numSlices; e++)d.appendChild(this._createCornerSlice(b, c, e, "top")); a.style.paddingTop = 0; a.insertBefore(d, a.firstChild) }, _roundBottomCorners: function (a, b, c) {
    for (var d = this._createCorner(c), e = this.options.numSlices - 1; 0 <= e; e--)d.appendChild(this._createCornerSlice(b,
      c, e, "bottom")); a.style.paddingBottom = 0; a.appendChild(d)
  }, _createCorner: function (a) { var b = document.createElement("div"); b.style.backgroundColor = this._isTransparent() ? "transparent" : a; return b }, _createCornerSlice: function (a, b, c, d) {
    var e = document.createElement("span"), f = e.style; f.backgroundColor = a; f.display = "block"; f.height = "1px"; f.overflow = "hidden"; f.fontSize = "1px"; a = this._borderColor(a, b); this.options.border && 0 == c ? (f.borderTopStyle = "solid", f.borderTopWidth = "1px", f.borderLeftWidth = "0px", f.borderRightWidth =
      "0px", f.borderBottomWidth = "0px", f.height = "0px", f.borderColor = a) : a && (f.borderColor = a, f.borderStyle = "solid", f.borderWidth = "0px 1px"); this.options.compact || c != this.options.numSlices - 1 || (f.height = "2px"); this._setMargin(e, c, d); this._setBorder(e, c, d); return e
  }, _setOptions: function (a) {
  this.options = { corners: "all", color: "fromElement", bgColor: "fromParent", blend: !0, border: !1, compact: !1 }; OpenLayers.Util.extend(this.options, a || {}); this.options.numSlices = this.options.compact ? 2 : 4; this._isTransparent() && (this.options.blend =
    !1)
  }, _whichSideTop: function () { return this._hasString(this.options.corners, "all", "top") || 0 <= this.options.corners.indexOf("tl") && 0 <= this.options.corners.indexOf("tr") ? "" : 0 <= this.options.corners.indexOf("tl") ? "left" : 0 <= this.options.corners.indexOf("tr") ? "right" : "" }, _whichSideBottom: function () {
    return this._hasString(this.options.corners, "all", "bottom") || 0 <= this.options.corners.indexOf("bl") && 0 <= this.options.corners.indexOf("br") ? "" : 0 <= this.options.corners.indexOf("bl") ? "left" : 0 <= this.options.corners.indexOf("br") ?
      "right" : ""
  }, _borderColor: function (a, b) { return "transparent" == a ? b : this.options.border ? this.options.border : this.options.blend ? this._blend(b, a) : "" }, _setMargin: function (a, b, c) { b = this._marginSize(b); c = "top" == c ? this._whichSideTop() : this._whichSideBottom(); "left" == c ? (a.style.marginLeft = b + "px", a.style.marginRight = "0px") : "right" == c ? (a.style.marginRight = b + "px", a.style.marginLeft = "0px") : (a.style.marginLeft = b + "px", a.style.marginRight = b + "px") }, _setBorder: function (a, b, c) {
    b = this._borderSize(b); c = "top" == c ? this._whichSideTop() :
      this._whichSideBottom(); "left" == c ? (a.style.borderLeftWidth = b + "px", a.style.borderRightWidth = "0px") : "right" == c ? (a.style.borderRightWidth = b + "px", a.style.borderLeftWidth = "0px") : (a.style.borderLeftWidth = b + "px", a.style.borderRightWidth = b + "px"); !1 != this.options.border && (a.style.borderLeftWidth = b + "px", a.style.borderRightWidth = b + "px")
  }, _marginSize: function (a) {
    if (this._isTransparent()) return 0; var b = [5, 3, 2, 1], c = [3, 2, 1, 0], d = [2, 1], e = [1, 0]; return this.options.compact && this.options.blend ? e[a] : this.options.compact ?
      d[a] : this.options.blend ? c[a] : b[a]
  }, _borderSize: function (a) { var b = [5, 3, 2, 1], c = [2, 1, 1, 1], d = [1, 0], e = [0, 2, 0, 0]; return this.options.compact && (this.options.blend || this._isTransparent()) ? 1 : this.options.compact ? d[a] : this.options.blend ? c[a] : this.options.border ? e[a] : this._isTransparent() ? b[a] : 0 }, _hasString: function (a) { for (var b = 1; b < arguments.length; b++)if (0 <= a.indexOf(arguments[b])) return !0; return !1 }, _blend: function (a, b) {
    var c = OpenLayers.Rico.Color.createFromHex(a); c.blend(OpenLayers.Rico.Color.createFromHex(b));
    return c
  }, _background: function (a) { try { return OpenLayers.Rico.Color.createColorFromBackground(a).asHex() } catch (b) { return "#ffffff" } }, _isTransparent: function () { return "transparent" == this.options.color }, _isTopRounded: function () { return this._hasString(this.options.corners, "all", "top", "tl", "tr") }, _isBottomRounded: function () { return this._hasString(this.options.corners, "all", "bottom", "bl", "br") }, _hasSingleTextChild: function (a) { return 1 == a.childNodes.length && 3 == a.childNodes[0].nodeType }
}; OpenLayers.Control.NavigationHistory = OpenLayers.Class(OpenLayers.Control, {
  type: OpenLayers.Control.TYPE_TOGGLE, previous: null, previousOptions: null, next: null, nextOptions: null, limit: 50, autoActivate: !0, clearOnDeactivate: !1, registry: null, nextStack: null, previousStack: null, listeners: null, restoring: !1, initialize: function (a) {
    OpenLayers.Control.prototype.initialize.apply(this, [a]); this.registry = OpenLayers.Util.extend({ moveend: this.getState }, this.registry); a = {
      trigger: OpenLayers.Function.bind(this.previousTrigger,
        this), displayClass: this.displayClass + " " + this.displayClass + "Previous"
    }; OpenLayers.Util.extend(a, this.previousOptions); this.previous = new OpenLayers.Control.Button(a); a = { trigger: OpenLayers.Function.bind(this.nextTrigger, this), displayClass: this.displayClass + " " + this.displayClass + "Next" }; OpenLayers.Util.extend(a, this.nextOptions); this.next = new OpenLayers.Control.Button(a); this.clear()
  }, onPreviousChange: function (a, b) { a && !this.previous.active ? this.previous.activate() : !a && this.previous.active && this.previous.deactivate() },
  onNextChange: function (a, b) { a && !this.next.active ? this.next.activate() : !a && this.next.active && this.next.deactivate() }, destroy: function () { OpenLayers.Control.prototype.destroy.apply(this); this.previous.destroy(); this.next.destroy(); this.deactivate(); for (var a in this) this[a] = null }, setMap: function (a) { this.map = a; this.next.setMap(a); this.previous.setMap(a) }, draw: function () { OpenLayers.Control.prototype.draw.apply(this, arguments); this.next.draw(); this.previous.draw() }, previousTrigger: function () {
    var a = this.previousStack.shift(),
    b = this.previousStack.shift(); void 0 != b ? (this.nextStack.unshift(a), this.previousStack.unshift(b), this.restoring = !0, this.restore(b), this.restoring = !1, this.onNextChange(this.nextStack[0], this.nextStack.length), this.onPreviousChange(this.previousStack[1], this.previousStack.length - 1)) : this.previousStack.unshift(a); return b
  }, nextTrigger: function () {
    var a = this.nextStack.shift(); void 0 != a && (this.previousStack.unshift(a), this.restoring = !0, this.restore(a), this.restoring = !1, this.onNextChange(this.nextStack[0],
      this.nextStack.length), this.onPreviousChange(this.previousStack[1], this.previousStack.length - 1)); return a
  }, clear: function () { this.previousStack = []; this.previous.deactivate(); this.nextStack = []; this.next.deactivate() }, getState: function () { return { center: this.map.getCenter(), resolution: this.map.getResolution(), projection: this.map.getProjectionObject(), units: this.map.getProjectionObject().getUnits() || this.map.units || this.map.baseLayer.units } }, restore: function (a) {
    var b, c; if (this.map.getProjectionObject() ==
      a.projection) c = this.map.getZoomForResolution(a.resolution), b = a.center; else { b = a.center.clone(); b.transform(a.projection, this.map.getProjectionObject()); c = a.units; var d = this.map.getProjectionObject().getUnits() || this.map.units || this.map.baseLayer.units; c = this.map.getZoomForResolution((c && d ? OpenLayers.INCHES_PER_UNIT[c] / OpenLayers.INCHES_PER_UNIT[d] : 1) * a.resolution) } this.map.setCenter(b, c)
  }, setListeners: function () {
  this.listeners = {}; for (var a in this.registry) this.listeners[a] = OpenLayers.Function.bind(function () {
    if (!this.restoring) {
      var b =
        this.registry[a].apply(this, arguments); this.previousStack.unshift(b); if (1 < this.previousStack.length) this.onPreviousChange(this.previousStack[1], this.previousStack.length - 1); this.previousStack.length > this.limit + 1 && this.previousStack.pop(); 0 < this.nextStack.length && (this.nextStack = [], this.onNextChange(null, 0))
    } return !0
  }, this)
  }, activate: function () {
    var a = !1; if (this.map && OpenLayers.Control.prototype.activate.apply(this)) {
    null == this.listeners && this.setListeners(); for (var b in this.listeners) this.map.events.register(b,
      this, this.listeners[b]); a = !0; 0 == this.previousStack.length && this.initStack()
    } return a
  }, initStack: function () { this.map.getCenter() && this.listeners.moveend() }, deactivate: function () { var a = !1; if (this.map && OpenLayers.Control.prototype.deactivate.apply(this)) { for (var b in this.listeners) this.map.events.unregister(b, this, this.listeners[b]); this.clearOnDeactivate && this.clear(); a = !0 } return a }, CLASS_NAME: "OpenLayers.Control.NavigationHistory"
}); OpenLayers.Layer.UTFGrid = OpenLayers.Class(OpenLayers.Layer.XYZ, {
  isBaseLayer: !1, projection: new OpenLayers.Projection("EPSG:900913"), useJSONP: !1, tileClass: OpenLayers.Tile.UTFGrid, initialize: function (a) { OpenLayers.Layer.Grid.prototype.initialize.apply(this, [a.name, a.url, {}, a]); this.tileOptions = OpenLayers.Util.extend({ utfgridResolution: this.utfgridResolution }, this.tileOptions) }, createBackBuffer: function () { }, clone: function (a) {
  null == a && (a = new OpenLayers.Layer.UTFGrid(this.getOptions())); return a = OpenLayers.Layer.Grid.prototype.clone.apply(this,
    [a])
  }, getFeatureInfo: function (a) { var b = null; (a = this.getTileData(a)) && a.tile && (b = a.tile.getFeatureInfo(a.i, a.j)); return b }, getFeatureId: function (a) { var b = null; a = this.getTileData(a); a.tile && (b = a.tile.getFeatureId(a.i, a.j)); return b }, CLASS_NAME: "OpenLayers.Layer.UTFGrid"
}); OpenLayers.TileManager = OpenLayers.Class({
  cacheSize: 256, tilesPerFrame: 2, frameDelay: 16, moveDelay: 100, zoomDelay: 200, maps: null, tileQueueId: null, tileQueue: null, tileCache: null, tileCacheIndex: null, initialize: function (a) { OpenLayers.Util.extend(this, a); this.maps = []; this.tileQueueId = {}; this.tileQueue = {}; this.tileCache = {}; this.tileCacheIndex = [] }, addMap: function (a) {
    if (!this._destroyed && OpenLayers.Layer.Grid) {
      this.maps.push(a); this.tileQueue[a.id] = []; for (var b = 0, c = a.layers.length; b < c; ++b)this.addLayer({ layer: a.layers[b] });
      a.events.on({ move: this.move, zoomend: this.zoomEnd, changelayer: this.changeLayer, addlayer: this.addLayer, preremovelayer: this.removeLayer, scope: this })
    }
  }, removeMap: function (a) {
    if (!this._destroyed && OpenLayers.Layer.Grid) {
      window.clearTimeout(this.tileQueueId[a.id]); if (a.layers) for (var b = 0, c = a.layers.length; b < c; ++b)this.removeLayer({ layer: a.layers[b] }); a.events && a.events.un({ move: this.move, zoomend: this.zoomEnd, changelayer: this.changeLayer, addlayer: this.addLayer, preremovelayer: this.removeLayer, scope: this });
      delete this.tileQueue[a.id]; delete this.tileQueueId[a.id]; OpenLayers.Util.removeItem(this.maps, a)
    }
  }, move: function (a) { this.updateTimeout(a.object, this.moveDelay, !0) }, zoomEnd: function (a) { this.updateTimeout(a.object, this.zoomDelay) }, changeLayer: function (a) { "visibility" !== a.property && "params" !== a.property || this.updateTimeout(a.object, 0) }, addLayer: function (a) {
    a = a.layer; if (a instanceof OpenLayers.Layer.Grid) {
      a.events.on({ addtile: this.addTile, retile: this.clearTileQueue, scope: this }); var b, c, d; for (b = a.grid.length -
        1; 0 <= b; --b)for (c = a.grid[b].length - 1; 0 <= c; --c)d = a.grid[b][c], this.addTile({ tile: d }), d.url && !d.imgDiv && this.manageTileCache({ object: d })
    }
  }, removeLayer: function (a) { a = a.layer; if (a instanceof OpenLayers.Layer.Grid && (this.clearTileQueue({ object: a }), a.events && a.events.un({ addtile: this.addTile, retile: this.clearTileQueue, scope: this }), a.grid)) { var b, c, d; for (b = a.grid.length - 1; 0 <= b; --b)for (c = a.grid[b].length - 1; 0 <= c; --c)d = a.grid[b][c], this.unloadTile({ object: d }) } }, updateTimeout: function (a, b, c) {
    window.clearTimeout(this.tileQueueId[a.id]);
    var d = this.tileQueue[a.id]; if (!c || d.length) this.tileQueueId[a.id] = window.setTimeout(OpenLayers.Function.bind(function () { this.drawTilesFromQueue(a); d.length && this.updateTimeout(a, this.frameDelay) }, this), b)
  }, addTile: function (a) { if (a.tile instanceof OpenLayers.Tile.Image) a.tile.events.on({ beforedraw: this.queueTileDraw, beforeload: this.manageTileCache, loadend: this.addToCache, unload: this.unloadTile, scope: this }); else this.removeLayer({ layer: a.tile.layer }) }, unloadTile: function (a) {
    a = a.object; a.events.un({
      beforedraw: this.queueTileDraw,
      beforeload: this.manageTileCache, loadend: this.addToCache, unload: this.unloadTile, scope: this
    }); OpenLayers.Util.removeItem(this.tileQueue[a.layer.map.id], a)
  }, queueTileDraw: function (a) { a = a.object; var b = !1, c = a.layer, d = c.getURL(a.bounds), e = this.tileCache[d]; e && "olTileImage" !== e.className && (delete this.tileCache[d], OpenLayers.Util.removeItem(this.tileCacheIndex, d), e = null); !c.url || !c.async && e || (b = this.tileQueue[c.map.id], ~OpenLayers.Util.indexOf(b, a) || b.push(a), b = !0); return !b }, drawTilesFromQueue: function (a) {
    var b =
      this.tileQueue[a.id], c = this.tilesPerFrame; for (a = a.zoomTween && a.zoomTween.playing; !a && b.length && c;)b.shift().draw(!0), --c
  }, manageTileCache: function (a) { a = a.object; var b = this.tileCache[a.url]; b && (b.parentNode && OpenLayers.Element.hasClass(b.parentNode, "olBackBuffer") && (b.parentNode.removeChild(b), b.id = null), b.parentNode || (b.style.visibility = "hidden", b.style.opacity = 0, a.setImage(b), OpenLayers.Util.removeItem(this.tileCacheIndex, a.url), this.tileCacheIndex.push(a.url))) }, addToCache: function (a) {
    a = a.object;
    this.tileCache[a.url] || OpenLayers.Element.hasClass(a.imgDiv, "olImageLoadError") || (this.tileCacheIndex.length >= this.cacheSize && (delete this.tileCache[this.tileCacheIndex[0]], this.tileCacheIndex.shift()), this.tileCache[a.url] = a.imgDiv, this.tileCacheIndex.push(a.url))
  }, clearTileQueue: function (a) { a = a.object; for (var b = this.tileQueue[a.map.id], c = b.length - 1; 0 <= c; --c)b[c].layer === a && b.splice(c, 1) }, destroy: function () {
    for (var a = this.maps.length - 1; 0 <= a; --a)this.removeMap(this.maps[a]); this.tileCacheIndex = this.tileCache =
      this.tileQueueId = this.tileQueue = this.maps = null; this._destroyed = !0
  }
}); OpenLayers.Layer.ArcGISCache = OpenLayers.Class(OpenLayers.Layer.XYZ, {
  url: null, tileOrigin: null, tileSize: new OpenLayers.Size(256, 256), useArcGISServer: !0, type: "png", useScales: !1, overrideDPI: !1, initialize: function (a, b, c) {
    OpenLayers.Layer.XYZ.prototype.initialize.apply(this, arguments); this.resolutions && (this.serverResolutions = this.resolutions, this.maxExtent = this.getMaxExtentForResolution(this.resolutions[0])); if (this.layerInfo) {
      var d = this.layerInfo, e = new OpenLayers.Bounds(d.fullExtent.xmin, d.fullExtent.ymin,
        d.fullExtent.xmax, d.fullExtent.ymax); this.projection = "EPSG:" + d.spatialReference.wkid; this.sphericalMercator = 102100 == d.spatialReference.wkid; this.units = "esriFeet" == d.units ? "ft" : "m"; if (d.tileInfo) {
        this.tileSize = new OpenLayers.Size(d.tileInfo.width || d.tileInfo.cols, d.tileInfo.height || d.tileInfo.rows); this.tileOrigin = new OpenLayers.LonLat(d.tileInfo.origin.x, d.tileInfo.origin.y); var f = new OpenLayers.Geometry.Point(e.left, e.top), e = new OpenLayers.Geometry.Point(e.right, e.bottom); this.useScales ? this.scales =
          [] : this.resolutions = []; this.lods = []; for (var g in d.tileInfo.lods) if (d.tileInfo.lods.hasOwnProperty(g)) { var h = d.tileInfo.lods[g]; this.useScales ? this.scales.push(h.scale) : this.resolutions.push(h.resolution); var k = this.getContainingTileCoords(f, h.resolution); h.startTileCol = k.x; h.startTileRow = k.y; k = this.getContainingTileCoords(e, h.resolution); h.endTileCol = k.x; h.endTileRow = k.y; this.lods.push(h) } this.maxExtent = this.calculateMaxExtentWithLOD(this.lods[0]); this.serverResolutions = this.resolutions; this.overrideDPI &&
            d.tileInfo.dpi && (OpenLayers.DOTS_PER_INCH = d.tileInfo.dpi)
        }
    }
  }, getContainingTileCoords: function (a, b) { return new OpenLayers.Pixel(Math.max(Math.floor((a.x - this.tileOrigin.lon) / (this.tileSize.w * b)), 0), Math.max(Math.floor((this.tileOrigin.lat - a.y) / (this.tileSize.h * b)), 0)) }, calculateMaxExtentWithLOD: function (a) {
    var b = this.tileOrigin.lon + a.startTileCol * this.tileSize.w * a.resolution, c = this.tileOrigin.lat - a.startTileRow * this.tileSize.h * a.resolution; return new OpenLayers.Bounds(b, c - (a.endTileRow - a.startTileRow +
      1) * this.tileSize.h * a.resolution, b + (a.endTileCol - a.startTileCol + 1) * this.tileSize.w * a.resolution, c)
  }, calculateMaxExtentWithExtent: function (a, b) { var c = new OpenLayers.Geometry.Point(a.left, a.top), d = new OpenLayers.Geometry.Point(a.right, a.bottom), c = this.getContainingTileCoords(c, b), d = this.getContainingTileCoords(d, b); return this.calculateMaxExtentWithLOD({ resolution: b, startTileCol: c.x, startTileRow: c.y, endTileCol: d.x, endTileRow: d.y }) }, getUpperLeftTileCoord: function (a) {
    var b = new OpenLayers.Geometry.Point(this.maxExtent.left,
      this.maxExtent.top); return this.getContainingTileCoords(b, a)
  }, getLowerRightTileCoord: function (a) { var b = new OpenLayers.Geometry.Point(this.maxExtent.right, this.maxExtent.bottom); return this.getContainingTileCoords(b, a) }, getMaxExtentForResolution: function (a) {
    var b = this.getUpperLeftTileCoord(a), c = this.getLowerRightTileCoord(a), d = this.tileOrigin.lon + b.x * this.tileSize.w * a, e = this.tileOrigin.lat - b.y * this.tileSize.h * a; return new OpenLayers.Bounds(d, e - (c.y - b.y + 1) * this.tileSize.h * a, d + (c.x - b.x + 1) * this.tileSize.w *
      a, e)
  }, clone: function (a) { null == a && (a = new OpenLayers.Layer.ArcGISCache(this.name, this.url, this.options)); return OpenLayers.Layer.XYZ.prototype.clone.apply(this, [a]) }, initGriddedTiles: function (a) { delete this._tileOrigin; OpenLayers.Layer.XYZ.prototype.initGriddedTiles.apply(this, arguments) }, getMaxExtent: function () { var a = this.map.getResolution(); return this.maxExtent = this.getMaxExtentForResolution(a) }, getTileOrigin: function () {
    if (!this._tileOrigin) {
      var a = this.getMaxExtent(); this._tileOrigin = new OpenLayers.LonLat(a.left,
        a.bottom)
    } return this._tileOrigin
  }, getURL: function (a) {
    var b = this.getResolution(), c = this.tileOrigin.lon + b * this.tileSize.w / 2, d = this.tileOrigin.lat - b * this.tileSize.h / 2; a = a.getCenterLonLat(); c = Math.round(Math.abs((a.lon - c) / (b * this.tileSize.w))); d = Math.round(Math.abs((d - a.lat) / (b * this.tileSize.h))); a = this.map.getZoom(); if (this.lods) { if (b = this.lods[this.map.getZoom()], c < b.startTileCol || c > b.endTileCol || d < b.startTileRow || d > b.endTileRow) return null } else {
      var e = this.getUpperLeftTileCoord(b), b = this.getLowerRightTileCoord(b);
      if (c < e.x || c >= b.x || d < e.y || d >= b.y) return null
    } b = this.url; e = "" + c + d + a; OpenLayers.Util.isArray(b) && (b = this.selectUrl(e, b)); this.useArcGISServer ? b += "/tile/${z}/${y}/${x}" : (c = "C" + OpenLayers.Number.zeroPad(c, 8, 16), d = "R" + OpenLayers.Number.zeroPad(d, 8, 16), a = "L" + OpenLayers.Number.zeroPad(a, 2, 10), b = b + "/${z}/${y}/${x}." + this.type); b = OpenLayers.String.format(b, { x: c, y: d, z: a }); return OpenLayers.Util.urlAppend(b, OpenLayers.Util.getParameterString(this.params))
  }, CLASS_NAME: "OpenLayers.Layer.ArcGISCache"
}); OpenLayers.Control.WMSGetFeatureInfo = OpenLayers.Class(OpenLayers.Control, {
  hover: !1, drillDown: !1, maxFeatures: 10, clickCallback: "click", output: "features", layers: null, queryVisible: !1, url: null, layerUrls: null, infoFormat: "text/html", vendorParams: {}, format: null, formatOptions: null, handler: null, hoverRequest: null, initialize: function (a) {
    a = a || {}; a.handlerOptions = a.handlerOptions || {}; OpenLayers.Control.prototype.initialize.apply(this, [a]); this.format || (this.format = new OpenLayers.Format.WMSGetFeatureInfo(a.formatOptions));
    !0 === this.drillDown && (this.hover = !1); this.hover ? this.handler = new OpenLayers.Handler.Hover(this, { move: this.cancelHover, pause: this.getInfoForHover }, OpenLayers.Util.extend(this.handlerOptions.hover || {}, { delay: 250 })) : (a = {}, a[this.clickCallback] = this.getInfoForClick, this.handler = new OpenLayers.Handler.Click(this, a, this.handlerOptions.click || {}))
  }, getInfoForClick: function (a) {
    this.events.triggerEvent("beforegetfeatureinfo", { xy: a.xy }); OpenLayers.Element.addClass(this.map.viewPortDiv, "olCursorWait"); this.request(a.xy,
      {})
  }, getInfoForHover: function (a) { this.events.triggerEvent("beforegetfeatureinfo", { xy: a.xy }); this.request(a.xy, { hover: !0 }) }, cancelHover: function () { this.hoverRequest && (this.hoverRequest.abort(), this.hoverRequest = null) }, findLayers: function () {
    for (var a = this.layers || this.map.layers, b = [], c, d, e = a.length - 1; 0 <= e; --e)c = a[e], c instanceof OpenLayers.Layer.WMS && (!this.queryVisible || c.getVisibility()) && (d = OpenLayers.Util.isArray(c.url) ? c.url[0] : c.url, !1 !== this.drillDown || this.url || (this.url = d), (!0 === this.drillDown ||
      this.urlMatches(d)) && b.push(c)); return b
  }, urlMatches: function (a) { var b = OpenLayers.Util.isEquivalentUrl(this.url, a); if (!b && this.layerUrls) for (var c = 0, d = this.layerUrls.length; c < d; ++c)if (OpenLayers.Util.isEquivalentUrl(this.layerUrls[c], a)) { b = !0; break } return b }, buildWMSOptions: function (a, b, c, d) {
    for (var e = [], f = [], g = 0, h = b.length; g < h; g++)null != b[g].params.LAYERS && (e = e.concat(b[g].params.LAYERS), f = f.concat(this.getStyleNames(b[g]))); b = b[0]; g = this.map.getProjection(); (h = b.projection) && h.equals(this.map.getProjectionObject()) &&
      (g = h.getCode()); d = OpenLayers.Util.extend({ service: "WMS", version: b.params.VERSION, request: "GetFeatureInfo", exceptions: b.params.EXCEPTIONS, bbox: this.map.getExtent().toBBOX(null, b.reverseAxisOrder()), feature_count: this.maxFeatures, height: this.map.getSize().h, width: this.map.getSize().w, format: d, info_format: b.params.INFO_FORMAT || this.infoFormat }, 1.3 <= parseFloat(b.params.VERSION) ? { crs: g, i: parseInt(c.x), j: parseInt(c.y) } : { srs: g, x: parseInt(c.x), y: parseInt(c.y) }); 0 != e.length && (d = OpenLayers.Util.extend({
        layers: e,
        query_layers: e, styles: f
      }, d)); OpenLayers.Util.applyDefaults(d, this.vendorParams); return { url: a, params: OpenLayers.Util.upperCaseObject(d), callback: function (b) { this.handleResponse(c, b, a) }, scope: this }
  }, getStyleNames: function (a) { return a.params.STYLES ? a.params.STYLES : OpenLayers.Util.isArray(a.params.LAYERS) ? Array(a.params.LAYERS.length) : a.params.LAYERS.replace(/[^,]/g, "") }, request: function (a, b) {
    var c = this.findLayers(); if (0 == c.length) this.events.triggerEvent("nogetfeatureinfo"), OpenLayers.Element.removeClass(this.map.viewPortDiv,
      "olCursorWait"); else if (b = b || {}, !1 === this.drillDown) { var c = this.buildWMSOptions(this.url, c, a, c[0].params.FORMAT), d = OpenLayers.Request.GET(c); !0 === b.hover && (this.hoverRequest = d) } else { this._numRequests = this._requestCount = 0; this.features = []; for (var d = {}, e, f = 0, g = c.length; f < g; f++) { var h = c[f]; e = OpenLayers.Util.isArray(h.url) ? h.url[0] : h.url; e in d ? d[e].push(h) : (this._numRequests++ , d[e] = [h]) } for (e in d) c = d[e], c = this.buildWMSOptions(e, c, a, c[0].params.FORMAT), OpenLayers.Request.GET(c) }
  }, triggerGetFeatureInfo: function (a,
    b, c) { this.events.triggerEvent("getfeatureinfo", { text: a.responseText, features: c, request: a, xy: b }); OpenLayers.Element.removeClass(this.map.viewPortDiv, "olCursorWait") }, handleResponse: function (a, b, c) {
      var d = b.responseXML; d && d.documentElement || (d = b.responseText); d = this.format.read(d); !1 === this.drillDown ? this.triggerGetFeatureInfo(b, a, d) : (this._requestCount++ , this._features = "object" === this.output ? (this._features || []).concat({ url: c, features: d }) : (this._features || []).concat(d), this._requestCount === this._numRequests &&
        (this.triggerGetFeatureInfo(b, a, this._features.concat()), delete this._features, delete this._requestCount, delete this._numRequests))
    }, CLASS_NAME: "OpenLayers.Control.WMSGetFeatureInfo"
}); OpenLayers.Format.WMSCapabilities.v1_3_0 = OpenLayers.Class(OpenLayers.Format.WMSCapabilities.v1_3, { version: "1.3.0", CLASS_NAME: "OpenLayers.Format.WMSCapabilities.v1_3_0" }); OpenLayers.Format.SOSGetFeatureOfInterest = OpenLayers.Class(OpenLayers.Format.XML, {
  VERSION: "1.0.0", namespaces: { sos: "http://www.opengis.net/sos/1.0", gml: "http://www.opengis.net/gml", sa: "http://www.opengis.net/sampling/1.0", xsi: "http://www.w3.org/2001/XMLSchema-instance" }, schemaLocation: "http://www.opengis.net/sos/1.0 http://schemas.opengis.net/sos/1.0.0/sosAll.xsd", defaultPrefix: "sos", regExes: { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g }, read: function (a) {
  "string" ==
    typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); a && 9 == a.nodeType && (a = a.documentElement); var b = { features: [] }; this.readNode(a, b); a = []; for (var c = 0, d = b.features.length; c < d; c++) { var e = b.features[c]; this.internalProjection && (this.externalProjection && e.components[0]) && e.components[0].transform(this.externalProjection, this.internalProjection); e = new OpenLayers.Feature.Vector(e.components[0], e.attributes); a.push(e) } return a
  }, readers: {
    sa: {
      SamplingPoint: function (a, b) {
        if (!b.attributes) {
          var c =
            { attributes: {} }; b.features.push(c); b = c
        } b.attributes.id = this.getAttributeNS(a, this.namespaces.gml, "id"); this.readChildNodes(a, b)
      }, position: function (a, b) { this.readChildNodes(a, b) }
    }, gml: OpenLayers.Util.applyDefaults({
      FeatureCollection: function (a, b) { this.readChildNodes(a, b) }, featureMember: function (a, b) { var c = { attributes: {} }; b.features.push(c); this.readChildNodes(a, c) }, name: function (a, b) { b.attributes.name = this.getChildValue(a) }, pos: function (a, b) {
      this.externalProjection || (this.externalProjection = new OpenLayers.Projection(a.getAttribute("srsName")));
        OpenLayers.Format.GML.v3.prototype.readers.gml.pos.apply(this, [a, b])
      }
    }, OpenLayers.Format.GML.v3.prototype.readers.gml)
  }, writers: { sos: { GetFeatureOfInterest: function (a) { for (var b = this.createElementNSPlus("GetFeatureOfInterest", { attributes: { version: this.VERSION, service: "SOS", "xsi:schemaLocation": this.schemaLocation } }), c = 0, d = a.fois.length; c < d; c++)this.writeNode("FeatureOfInterestId", { foi: a.fois[c] }, b); return b }, FeatureOfInterestId: function (a) { return this.createElementNSPlus("FeatureOfInterestId", { value: a.foi }) } } },
  CLASS_NAME: "OpenLayers.Format.SOSGetFeatureOfInterest"
}); OpenLayers.Format.SOSGetObservation = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { ows: "http://www.opengis.net/ows", gml: "http://www.opengis.net/gml", sos: "http://www.opengis.net/sos/1.0", ogc: "http://www.opengis.net/ogc", om: "http://www.opengis.net/om/1.0", sa: "http://www.opengis.net/sampling/1.0", xlink: "http://www.w3.org/1999/xlink", xsi: "http://www.w3.org/2001/XMLSchema-instance" }, regExes: { trimSpace: /^\s*|\s*$/g, removeSpace: /\s*/g, splitSpace: /\s+/, trimComma: /\s*,\s*/g }, VERSION: "1.0.0", schemaLocation: "http://www.opengis.net/sos/1.0 http://schemas.opengis.net/sos/1.0.0/sosGetObservation.xsd",
  defaultPrefix: "sos", read: function (a) { "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); a && 9 == a.nodeType && (a = a.documentElement); var b = { measurements: [], observations: [] }; this.readNode(a, b); return b }, write: function (a) {
    a = this.writeNode("sos:GetObservation", a); a.setAttribute("xmlns:om", this.namespaces.om); a.setAttribute("xmlns:ogc", this.namespaces.ogc); this.setAttributeNS(a, this.namespaces.xsi, "xsi:schemaLocation", this.schemaLocation); return OpenLayers.Format.XML.prototype.write.apply(this,
      [a])
  }, readers: {
    om: {
      ObservationCollection: function (a, b) { b.id = this.getAttributeNS(a, this.namespaces.gml, "id"); this.readChildNodes(a, b) }, member: function (a, b) { this.readChildNodes(a, b) }, Measurement: function (a, b) { var c = {}; b.measurements.push(c); this.readChildNodes(a, c) }, Observation: function (a, b) { var c = {}; b.observations.push(c); this.readChildNodes(a, c) }, samplingTime: function (a, b) { var c = {}; b.samplingTime = c; this.readChildNodes(a, c) }, observedProperty: function (a, b) {
      b.observedProperty = this.getAttributeNS(a, this.namespaces.xlink,
        "href"); this.readChildNodes(a, b)
      }, procedure: function (a, b) { b.procedure = this.getAttributeNS(a, this.namespaces.xlink, "href"); this.readChildNodes(a, b) }, featureOfInterest: function (a, b) { var c = { features: [] }; b.fois = []; b.fois.push(c); this.readChildNodes(a, c); for (var d = [], e = 0, f = c.features.length; e < f; e++) { var g = c.features[e]; d.push(new OpenLayers.Feature.Vector(g.components[0], g.attributes)) } c.features = d }, result: function (a, b) {
        var c = {}; b.result = c; "" !== this.getChildValue(a) ? (c.value = this.getChildValue(a), c.uom =
          a.getAttribute("uom")) : this.readChildNodes(a, c)
      }
    }, sa: OpenLayers.Format.SOSGetFeatureOfInterest.prototype.readers.sa, gml: OpenLayers.Util.applyDefaults({ TimeInstant: function (a, b) { var c = {}; b.timeInstant = c; this.readChildNodes(a, c) }, timePosition: function (a, b) { b.timePosition = this.getChildValue(a) } }, OpenLayers.Format.SOSGetFeatureOfInterest.prototype.readers.gml)
  }, writers: {
    sos: {
      GetObservation: function (a) {
        var b = this.createElementNSPlus("GetObservation", { attributes: { version: this.VERSION, service: "SOS" } }); this.writeNode("offering",
          a, b); a.eventTime && this.writeNode("eventTime", a, b); for (var c in a.procedures) this.writeNode("procedure", a.procedures[c], b); for (var d in a.observedProperties) this.writeNode("observedProperty", a.observedProperties[d], b); a.foi && this.writeNode("featureOfInterest", a.foi, b); this.writeNode("responseFormat", a, b); a.resultModel && this.writeNode("resultModel", a, b); a.responseMode && this.writeNode("responseMode", a, b); return b
      }, featureOfInterest: function (a) {
        var b = this.createElementNSPlus("featureOfInterest"); this.writeNode("ObjectID",
          a.objectId, b); return b
      }, ObjectID: function (a) { return this.createElementNSPlus("ObjectID", { value: a }) }, responseFormat: function (a) { return this.createElementNSPlus("responseFormat", { value: a.responseFormat }) }, procedure: function (a) { return this.createElementNSPlus("procedure", { value: a }) }, offering: function (a) { return this.createElementNSPlus("offering", { value: a.offering }) }, observedProperty: function (a) { return this.createElementNSPlus("observedProperty", { value: a }) }, eventTime: function (a) {
        var b = this.createElementNSPlus("eventTime");
        "latest" === a.eventTime && this.writeNode("ogc:TM_Equals", a, b); return b
      }, resultModel: function (a) { return this.createElementNSPlus("resultModel", { value: a.resultModel }) }, responseMode: function (a) { return this.createElementNSPlus("responseMode", { value: a.responseMode }) }
    }, ogc: {
      TM_Equals: function (a) { var b = this.createElementNSPlus("ogc:TM_Equals"); this.writeNode("ogc:PropertyName", { property: "urn:ogc:data:time:iso8601" }, b); "latest" === a.eventTime && this.writeNode("gml:TimeInstant", { value: "latest" }, b); return b }, PropertyName: function (a) {
        return this.createElementNSPlus("ogc:PropertyName",
          { value: a.property })
      }
    }, gml: { TimeInstant: function (a) { var b = this.createElementNSPlus("gml:TimeInstant"); this.writeNode("gml:timePosition", a, b); return b }, timePosition: function (a) { return this.createElementNSPlus("gml:timePosition", { value: a.value }) } }
  }, CLASS_NAME: "OpenLayers.Format.SOSGetObservation"
}); OpenLayers.Control.UTFGrid = OpenLayers.Class(OpenLayers.Control, {
  autoActivate: !0, layers: null, defaultHandlerOptions: { delay: 300, pixelTolerance: 4, stopMove: !1, single: !0, "double": !1, stopSingle: !1, stopDouble: !1 }, handlerMode: "click", setHandler: function (a) { this.handlerMode = a; this.resetHandler() }, resetHandler: function () {
  this.handler && (this.handler.deactivate(), this.handler.destroy(), this.handler = null); "hover" == this.handlerMode ? this.handler = new OpenLayers.Handler.Hover(this, { pause: this.handleEvent, move: this.reset },
    this.handlerOptions) : "click" == this.handlerMode ? this.handler = new OpenLayers.Handler.Click(this, { click: this.handleEvent }, this.handlerOptions) : "move" == this.handlerMode && (this.handler = new OpenLayers.Handler.Hover(this, { pause: this.handleEvent, move: this.handleEvent }, this.handlerOptions)); return this.handler ? !0 : !1
  }, initialize: function (a) { a = a || {}; a.handlerOptions = a.handlerOptions || this.defaultHandlerOptions; OpenLayers.Control.prototype.initialize.apply(this, [a]); this.resetHandler() }, handleEvent: function (a) {
    if (null ==
      a) this.reset(); else { var b = this.map.getLonLatFromPixel(a.xy); if (b) { var c = this.findLayers(); if (0 < c.length) { for (var d = {}, e, f, g = 0, h = c.length; g < h; g++)e = c[g], f = OpenLayers.Util.indexOf(this.map.layers, e), d[f] = e.getFeatureInfo(b); this.callback(d, b, a.xy) } } }
  }, callback: function (a) { }, reset: function (a) { this.callback(null) }, findLayers: function () { for (var a = this.layers || this.map.layers, b = [], c, d = a.length - 1; 0 <= d; --d)c = a[d], c instanceof OpenLayers.Layer.UTFGrid && b.push(c); return b }, CLASS_NAME: "OpenLayers.Control.UTFGrid"
}); OpenLayers.Format.CQL = function () {
  function a(a) {
    function b() {
      var a = e.pop(); switch (a.type) {
        case "LOGICAL": var c = b(), g = b(); return new OpenLayers.Filter.Logical({ filters: [g, c], type: f[a.text.toUpperCase()] }); case "NOT": return a = b(), new OpenLayers.Filter.Logical({ filters: [a], type: OpenLayers.Filter.Logical.NOT }); case "BETWEEN": return e.pop(), g = b(), a = b(), c = b(), new OpenLayers.Filter.Comparison({ property: c, lowerBoundary: a, upperBoundary: g, type: OpenLayers.Filter.Comparison.BETWEEN }); case "COMPARISON": return g =
          b(), c = b(), new OpenLayers.Filter.Comparison({ property: c, value: g, type: d[a.text.toUpperCase()] }); case "IS_NULL": return c = b(), new OpenLayers.Filter.Comparison({ property: c, type: d[a.text.toUpperCase()] }); case "VALUE": return (c = a.text.match(/^'(.*)'$/)) ? c[1].replace(/''/g, "'") : Number(a.text); case "SPATIAL": switch (a.text.toUpperCase()) {
            case "BBOX": var a = b(), c = b(), g = b(), h = b(), k = b(); return new OpenLayers.Filter.Spatial({
              type: OpenLayers.Filter.Spatial.BBOX, property: k, value: OpenLayers.Bounds.fromArray([h, g, c,
                a])
            }); case "INTERSECTS": return g = b(), c = b(), new OpenLayers.Filter.Spatial({ type: OpenLayers.Filter.Spatial.INTERSECTS, property: c, value: g }); case "WITHIN": return g = b(), c = b(), new OpenLayers.Filter.Spatial({ type: OpenLayers.Filter.Spatial.WITHIN, property: c, value: g }); case "CONTAINS": return g = b(), c = b(), new OpenLayers.Filter.Spatial({ type: OpenLayers.Filter.Spatial.CONTAINS, property: c, value: g }); case "DWITHIN": return a = b(), g = b(), c = b(), new OpenLayers.Filter.Spatial({
              type: OpenLayers.Filter.Spatial.DWITHIN, value: g,
              property: c, distance: Number(a)
            })
          }case "GEOMETRY": return OpenLayers.Geometry.fromWKT(a.text); default: return a.text
      }
    } for (var c = [], e = []; a.length;) {
      var g = a.shift(); switch (g.type) {
        case "PROPERTY": case "GEOMETRY": case "VALUE": e.push(g); break; case "COMPARISON": case "BETWEEN": case "IS_NULL": case "LOGICAL": for (var k = h[g.type]; 0 < c.length && h[c[c.length - 1].type] <= k;)e.push(c.pop()); c.push(g); break; case "SPATIAL": case "NOT": case "LPAREN": c.push(g); break; case "RPAREN": for (; 0 < c.length && "LPAREN" != c[c.length - 1].type;)e.push(c.pop());
          c.pop(); 0 < c.length && "SPATIAL" == c[c.length - 1].type && e.push(c.pop()); case "COMMA": case "END": break; default: throw Error("Unknown token type " + g.type);
      }
    } for (; 0 < c.length;)e.push(c.pop()); a = b(); if (0 < e.length) { a = "Remaining tokens after building AST: \n"; for (c = e.length - 1; 0 <= c; c--)a += e[c].type + ": " + e[c].text + "\n"; throw Error(a); } return a
  } var b = {
    PROPERTY: /^[_a-zA-Z]\w*/, COMPARISON: /^(=|<>|<=|<|>=|>|LIKE)/i, IS_NULL: /^IS NULL/i, COMMA: /^,/, LOGICAL: /^(AND|OR)/i, VALUE: /^('([^']|'')*'|\d+(\.\d*)?|\.\d+)/, LPAREN: /^\(/,
    RPAREN: /^\)/, SPATIAL: /^(BBOX|INTERSECTS|DWITHIN|WITHIN|CONTAINS)/i, NOT: /^NOT/i, BETWEEN: /^BETWEEN/i, GEOMETRY: function (a) { var b = /^(POINT|LINESTRING|POLYGON|MULTIPOINT|MULTILINESTRING|MULTIPOLYGON|GEOMETRYCOLLECTION)/.exec(a); if (b) { var c = a.length, b = a.indexOf("(", b[0].length); if (-1 < b) for (var d = 1; b < c && 0 < d;)switch (b++ , a.charAt(b)) { case "(": d++; break; case ")": d-- }return [a.substr(0, b + 1)] } }, END: /^$/
  }, c = {
    LPAREN: ["GEOMETRY", "SPATIAL", "PROPERTY", "VALUE", "LPAREN"], RPAREN: ["NOT", "LOGICAL", "END", "RPAREN"], PROPERTY: ["COMPARISON",
      "BETWEEN", "COMMA", "IS_NULL"], BETWEEN: ["VALUE"], IS_NULL: ["END"], COMPARISON: ["VALUE"], COMMA: ["GEOMETRY", "VALUE", "PROPERTY"], VALUE: ["LOGICAL", "COMMA", "RPAREN", "END"], SPATIAL: ["LPAREN"], LOGICAL: ["NOT", "VALUE", "SPATIAL", "PROPERTY", "LPAREN"], NOT: ["PROPERTY", "LPAREN"], GEOMETRY: ["COMMA", "RPAREN"]
  }, d = {
    "=": OpenLayers.Filter.Comparison.EQUAL_TO, "<>": OpenLayers.Filter.Comparison.NOT_EQUAL_TO, "<": OpenLayers.Filter.Comparison.LESS_THAN, "<=": OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO, ">": OpenLayers.Filter.Comparison.GREATER_THAN,
    ">=": OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO, LIKE: OpenLayers.Filter.Comparison.LIKE, BETWEEN: OpenLayers.Filter.Comparison.BETWEEN, "IS NULL": OpenLayers.Filter.Comparison.IS_NULL
  }, e = {}, f = { AND: OpenLayers.Filter.Logical.AND, OR: OpenLayers.Filter.Logical.OR }, g = {}, h = { RPAREN: 3, LOGICAL: 2, COMPARISON: 1 }, k; for (k in d) d.hasOwnProperty(k) && (e[d[k]] = k); for (k in f) f.hasOwnProperty(k) && (g[f[k]] = k); return OpenLayers.Class(OpenLayers.Format, {
    read: function (d) {
      var e = d; d = []; var f, g = ["NOT", "GEOMETRY", "SPATIAL",
        "PROPERTY", "LPAREN"]; do { a: { f = g; for (var h = void 0, g = void 0, k = f.length, h = 0; h < k; h++) { var g = f[h], s = b[g] instanceof RegExp ? b[g].exec(e) : (0, b[g])(e); if (s) { f = s[0]; e = e.substr(f.length).replace(/^\s*/, ""); f = { type: g, text: f, remainder: e }; break a } } d = "ERROR: In parsing: [" + e + "], expected one of: "; for (h = 0; h < k; h++)g = f[h], d += "\n    " + g + ": " + b[g]; throw Error(d); } e = f.remainder; g = c[f.type]; if ("END" != f.type && !g) throw Error("No follows list for " + f.type); d.push(f) } while ("END" != f.type); d = a(d); this.keepData && (this.data = d);
      return d
    }, write: function (a) {
      if (a instanceof OpenLayers.Geometry) return a.toString(); switch (a.CLASS_NAME) {
        case "OpenLayers.Filter.Spatial": switch (a.type) {
          case OpenLayers.Filter.Spatial.BBOX: return "BBOX(" + a.property + "," + a.value.toBBOX() + ")"; case OpenLayers.Filter.Spatial.DWITHIN: return "DWITHIN(" + a.property + ", " + this.write(a.value) + ", " + a.distance + ")"; case OpenLayers.Filter.Spatial.WITHIN: return "WITHIN(" + a.property + ", " + this.write(a.value) + ")"; case OpenLayers.Filter.Spatial.INTERSECTS: return "INTERSECTS(" +
            a.property + ", " + this.write(a.value) + ")"; case OpenLayers.Filter.Spatial.CONTAINS: return "CONTAINS(" + a.property + ", " + this.write(a.value) + ")"; default: throw Error("Unknown spatial filter type: " + a.type);
        }case "OpenLayers.Filter.Logical": if (a.type == OpenLayers.Filter.Logical.NOT) return "NOT (" + this.write(a.filters[0]) + ")"; for (var b = "(", c = !0, d = 0; d < a.filters.length; d++)c ? c = !1 : b += ") " + g[a.type] + " (", b += this.write(a.filters[d]); return b + ")"; case "OpenLayers.Filter.Comparison": return a.type == OpenLayers.Filter.Comparison.BETWEEN ?
          a.property + " BETWEEN " + this.write(a.lowerBoundary) + " AND " + this.write(a.upperBoundary) : null !== a.value ? a.property + " " + e[a.type] + " " + this.write(a.value) : a.property + " " + e[a.type]; case void 0: if ("string" === typeof a) return "'" + a.replace(/'/g, "''") + "'"; if ("number" === typeof a) return String(a); default: throw Error("Can't encode: " + a.CLASS_NAME + " " + a);
      }
    }, CLASS_NAME: "OpenLayers.Format.CQL"
  })
}(); OpenLayers.Control.Split = OpenLayers.Class(OpenLayers.Control, {
  layer: null, source: null, sourceOptions: null, tolerance: null, edge: !0, deferDelete: !1, mutual: !0, targetFilter: null, sourceFilter: null, handler: null, initialize: function (a) { OpenLayers.Control.prototype.initialize.apply(this, [a]); this.options = a || {}; this.options.source && this.setSource(this.options.source) }, setSource: function (a) {
    this.active ? (this.deactivate(), this.handler && (this.handler.destroy(), delete this.handler), this.source = a, this.activate()) : this.source =
      a
  }, activate: function () { var a = OpenLayers.Control.prototype.activate.call(this); if (a) if (!this.source) this.handler || (this.handler = new OpenLayers.Handler.Path(this, { done: function (a) { this.onSketchComplete({ feature: new OpenLayers.Feature.Vector(a) }) } }, { layerOptions: this.sourceOptions })), this.handler.activate(); else if (this.source.events) this.source.events.on({ sketchcomplete: this.onSketchComplete, afterfeaturemodified: this.afterFeatureModified, scope: this }); return a }, deactivate: function () {
    var a = OpenLayers.Control.prototype.deactivate.call(this);
    a && this.source && this.source.events && this.source.events.un({ sketchcomplete: this.onSketchComplete, afterfeaturemodified: this.afterFeatureModified, scope: this }); return a
  }, onSketchComplete: function (a) { this.feature = null; return !this.considerSplit(a.feature) }, afterFeatureModified: function (a) { a.modified && "function" === typeof a.feature.geometry.split && (this.feature = a.feature, this.considerSplit(a.feature)) }, removeByGeometry: function (a, b) { for (var c = 0, d = a.length; c < d; ++c)if (a[c].geometry === b) { a.splice(c, 1); break } },
  isEligible: function (a) { return a.geometry ? a.state !== OpenLayers.State.DELETE && "function" === typeof a.geometry.split && this.feature !== a && (!this.targetFilter || this.targetFilter.evaluate(a.attributes)) : !1 }, considerSplit: function (a) {
    var b = !1, c = !1; if (!this.sourceFilter || this.sourceFilter.evaluate(a.attributes)) {
      for (var d = this.layer && this.layer.features || [], e, f, g = [], h = [], k = this.layer === this.source && this.mutual, l = { edge: this.edge, tolerance: this.tolerance, mutual: k }, m = [a.geometry], n, p, q, r = 0, s = d.length; r < s; ++r)if (n =
        d[r], this.isEligible(n)) {
          p = [n.geometry]; for (var t = 0; t < m.length; ++t) { q = m[t]; for (var u = 0; u < p.length; ++u)if (e = p[u], q.getBounds().intersectsBounds(e.getBounds()) && (e = q.split(e, l))) f = this.events.triggerEvent("beforesplit", { source: a, target: n }), !1 !== f && (k && (f = e[0], 1 < f.length && (f.unshift(t, 1), Array.prototype.splice.apply(m, f), t += f.length - 3), e = e[1]), 1 < e.length && (e.unshift(u, 1), Array.prototype.splice.apply(p, e), u += e.length - 3)) } p && 1 < p.length && (this.geomsToFeatures(n, p), this.events.triggerEvent("split", {
            original: n,
            features: p
          }), Array.prototype.push.apply(g, p), h.push(n), c = !0)
      } m && 1 < m.length && (this.geomsToFeatures(a, m), this.events.triggerEvent("split", { original: a, features: m }), Array.prototype.push.apply(g, m), h.push(a), b = !0); if (b || c) {
        if (this.deferDelete) { d = []; r = 0; for (s = h.length; r < s; ++r)c = h[r], c.state === OpenLayers.State.INSERT ? d.push(c) : (c.state = OpenLayers.State.DELETE, this.layer.drawFeature(c)); this.layer.destroyFeatures(d, { silent: !0 }); r = 0; for (s = g.length; r < s; ++r)g[r].state = OpenLayers.State.INSERT } else this.layer.destroyFeatures(h,
          { silent: !0 }); this.layer.addFeatures(g, { silent: !0 }); this.events.triggerEvent("aftersplit", { source: a, features: g })
      }
    } return b
  }, geomsToFeatures: function (a, b) { var c = a.clone(); delete c.geometry; for (var d, e = 0, f = b.length; e < f; ++e)d = c.clone(), d.geometry = b[e], d.state = OpenLayers.State.INSERT, b[e] = d }, destroy: function () { this.active && this.deactivate(); OpenLayers.Control.prototype.destroy.call(this) }, CLASS_NAME: "OpenLayers.Control.Split"
}); OpenLayers.Layer.WMTS = OpenLayers.Class(OpenLayers.Layer.Grid, {
  isBaseLayer: !0, version: "1.0.0", requestEncoding: "KVP", url: null, layer: null, matrixSet: null, style: null, format: "image/jpeg", tileOrigin: null, tileFullExtent: null, formatSuffix: null, matrixIds: null, dimensions: null, params: null, zoomOffset: 0, serverResolutions: null, formatSuffixMap: { "image/png": "png", "image/png8": "png", "image/png24": "png", "image/png32": "png", png: "png", "image/jpeg": "jpg", "image/jpg": "jpg", jpeg: "jpg", jpg: "jpg" }, matrix: null, initialize: function (a) {
    var b =
      { url: !0, layer: !0, style: !0, matrixSet: !0 }, c; for (c in b) if (!(c in a)) throw Error("Missing property '" + c + "' in layer configuration."); a.params = OpenLayers.Util.upperCaseObject(a.params); OpenLayers.Layer.Grid.prototype.initialize.apply(this, [a.name, a.url, a.params, a]); this.formatSuffix || (this.formatSuffix = this.formatSuffixMap[this.format] || this.format.split("/").pop()); if (this.matrixIds && (a = this.matrixIds.length) && "string" === typeof this.matrixIds[0]) for (b = this.matrixIds, this.matrixIds = Array(a), c = 0; c < a; ++c)this.matrixIds[c] =
        { identifier: b[c] }
  }, setMap: function () { OpenLayers.Layer.Grid.prototype.setMap.apply(this, arguments) }, updateMatrixProperties: function () {
    if (this.matrix = this.getMatrix()) this.matrix.topLeftCorner && (this.tileOrigin = this.matrix.topLeftCorner), this.matrix.tileWidth && this.matrix.tileHeight && (this.tileSize = new OpenLayers.Size(this.matrix.tileWidth, this.matrix.tileHeight)), this.tileOrigin || (this.tileOrigin = new OpenLayers.LonLat(this.maxExtent.left, this.maxExtent.top)), this.tileFullExtent || (this.tileFullExtent =
      this.maxExtent)
  }, moveTo: function (a, b, c) { !b && this.matrix || this.updateMatrixProperties(); return OpenLayers.Layer.Grid.prototype.moveTo.apply(this, arguments) }, clone: function (a) { null == a && (a = new OpenLayers.Layer.WMTS(this.options)); return a = OpenLayers.Layer.Grid.prototype.clone.apply(this, [a]) }, getIdentifier: function () { return this.getServerZoom() }, getMatrix: function () {
    var a; if (this.matrixIds && 0 !== this.matrixIds.length) if ("scaleDenominator" in this.matrixIds[0]) for (var b = OpenLayers.METERS_PER_INCH * OpenLayers.INCHES_PER_UNIT[this.units] *
      this.getServerResolution() / 2.8E-4, c = Number.POSITIVE_INFINITY, d, e = 0, f = this.matrixIds.length; e < f; ++e)d = Math.abs(1 - this.matrixIds[e].scaleDenominator / b), d < c && (c = d, a = this.matrixIds[e]); else a = this.matrixIds[this.getIdentifier()]; else a = { identifier: this.getIdentifier() }; return a
  }, getTileInfo: function (a) {
    var b = this.getServerResolution(), c = (a.lon - this.tileOrigin.lon) / (b * this.tileSize.w); a = (this.tileOrigin.lat - a.lat) / (b * this.tileSize.h); var b = Math.floor(c), d = Math.floor(a); return {
      col: b, row: d, i: Math.floor((c -
        b) * this.tileSize.w), j: Math.floor((a - d) * this.tileSize.h)
    }
  }, getURL: function (a) {
    a = this.adjustBounds(a); var b = ""; if (!this.tileFullExtent || this.tileFullExtent.intersectsBounds(a)) {
      a = a.getCenterLonLat(); var c = this.getTileInfo(a); a = this.dimensions; var d, b = OpenLayers.Util.isArray(this.url) ? this.selectUrl([this.version, this.style, this.matrixSet, this.matrix.identifier, c.row, c.col].join(), this.url) : this.url; if ("REST" === this.requestEncoding.toUpperCase()) if (d = this.params, -1 !== b.indexOf("{")) {
        b = b.replace(/\{/g,
          "${"); c = { style: this.style, Style: this.style, TileMatrixSet: this.matrixSet, TileMatrix: this.matrix.identifier, TileRow: c.row, TileCol: c.col }; if (a) { var e, f; for (f = a.length - 1; 0 <= f; --f)e = a[f], c[e] = d[e.toUpperCase()] } b = OpenLayers.String.format(b, c)
      } else { e = this.version + "/" + this.layer + "/" + this.style + "/"; if (a) for (f = 0; f < a.length; f++)d[a[f]] && (e = e + d[a[f]] + "/"); e = e + this.matrixSet + "/" + this.matrix.identifier + "/" + c.row + "/" + c.col + "." + this.formatSuffix; b.match(/\/$/) || (b += "/"); b += e } else "KVP" === this.requestEncoding.toUpperCase() &&
        (d = { SERVICE: "WMTS", REQUEST: "GetTile", VERSION: this.version, LAYER: this.layer, STYLE: this.style, TILEMATRIXSET: this.matrixSet, TILEMATRIX: this.matrix.identifier, TILEROW: c.row, TILECOL: c.col, FORMAT: this.format }, b = OpenLayers.Layer.Grid.prototype.getFullRequestString.apply(this, [d]))
    } return b
  }, mergeNewParams: function (a) { if ("KVP" === this.requestEncoding.toUpperCase()) return OpenLayers.Layer.Grid.prototype.mergeNewParams.apply(this, [OpenLayers.Util.upperCaseObject(a)]) }, CLASS_NAME: "OpenLayers.Layer.WMTS"
}); OpenLayers.Protocol.SOS.v1_0_0 = OpenLayers.Class(OpenLayers.Protocol, {
  fois: null, formatOptions: null, initialize: function (a) { OpenLayers.Protocol.prototype.initialize.apply(this, [a]); a.format || (this.format = new OpenLayers.Format.SOSGetFeatureOfInterest(this.formatOptions)) }, destroy: function () { this.options && !this.options.format && this.format.destroy(); this.format = null; OpenLayers.Protocol.prototype.destroy.apply(this) }, read: function (a) {
    a = OpenLayers.Util.extend({}, a); OpenLayers.Util.applyDefaults(a, this.options ||
      {}); var b = new OpenLayers.Protocol.Response({ requestType: "read" }), c = this.format, c = OpenLayers.Format.XML.prototype.write.apply(c, [c.writeNode("sos:GetFeatureOfInterest", { fois: this.fois })]); b.priv = OpenLayers.Request.POST({ url: a.url, callback: this.createCallback(this.handleRead, b, a), data: c }); return b
  }, handleRead: function (a, b) {
    if (b.callback) {
      var c = a.priv; 200 <= c.status && 300 > c.status ? (a.features = this.parseFeatures(c), a.code = OpenLayers.Protocol.Response.SUCCESS) : a.code = OpenLayers.Protocol.Response.FAILURE;
      b.callback.call(b.scope, a)
    }
  }, parseFeatures: function (a) { var b = a.responseXML; b && b.documentElement || (b = a.responseText); return !b || 0 >= b.length ? null : this.format.read(b) }, CLASS_NAME: "OpenLayers.Protocol.SOS.v1_0_0"
}); OpenLayers.Layer.KaMapCache = OpenLayers.Class(OpenLayers.Layer.KaMap, {
  IMAGE_EXTENSIONS: { jpeg: "jpg", gif: "gif", png: "png", png8: "png", png24: "png", dithered: "png" }, DEFAULT_FORMAT: "jpeg", initialize: function (a, b, c, d) { OpenLayers.Layer.KaMap.prototype.initialize.apply(this, arguments); this.extension = this.IMAGE_EXTENSIONS[this.params.i.toLowerCase() || this.DEFAULT_FORMAT] }, getURL: function (a) {
    a = this.adjustBounds(a); var b = this.map.getResolution(), c = Math.round(1E4 * this.map.getScale()) / 1E4, d = Math.round(a.left / b); a =
      -Math.round(a.top / b); var b = Math.floor(d / this.tileSize.w / this.params.metaTileSize.w) * this.tileSize.w * this.params.metaTileSize.w, e = Math.floor(a / this.tileSize.h / this.params.metaTileSize.h) * this.tileSize.h * this.params.metaTileSize.h, c = ["/", this.params.map, "/", c, "/", this.params.g.replace(/\s/g, "_"), "/def/t", e, "/l", b, "/t", a, "l", d, ".", this.extension], d = this.url; OpenLayers.Util.isArray(d) && (d = this.selectUrl(c.join(""), d)); return d + c.join("")
  }, CLASS_NAME: "OpenLayers.Layer.KaMapCache"
}); OpenLayers.Protocol.WFS.v1_1_0 = OpenLayers.Class(OpenLayers.Protocol.WFS.v1, { version: "1.1.0", initialize: function (a) { OpenLayers.Protocol.WFS.v1.prototype.initialize.apply(this, arguments); this.outputFormat && !this.readFormat && ("gml2" == this.outputFormat.toLowerCase() ? this.readFormat = new OpenLayers.Format.GML.v2({ featureType: this.featureType, featureNS: this.featureNS, geometryName: this.geometryName }) : "json" == this.outputFormat.toLowerCase() && (this.readFormat = new OpenLayers.Format.GeoJSON)) }, CLASS_NAME: "OpenLayers.Protocol.WFS.v1_1_0" }); OpenLayers.Format.WMSCapabilities.v1_1_1 = OpenLayers.Class(OpenLayers.Format.WMSCapabilities.v1_1, { version: "1.1.1", readers: { wms: OpenLayers.Util.applyDefaults({ SRS: function (a, b) { b.srs[this.getChildValue(a)] = !0 } }, OpenLayers.Format.WMSCapabilities.v1_1.prototype.readers.wms) }, CLASS_NAME: "OpenLayers.Format.WMSCapabilities.v1_1_1" }); OpenLayers.Format.WMSCapabilities.v1_1_1_WMSC = OpenLayers.Class(OpenLayers.Format.WMSCapabilities.v1_1_1, {
  version: "1.1.1", profile: "WMSC", readers: {
    wms: OpenLayers.Util.applyDefaults({
      VendorSpecificCapabilities: function (a, b) { b.vendorSpecific = { tileSets: [] }; this.readChildNodes(a, b.vendorSpecific) }, TileSet: function (a, b) { var c = { srs: {}, bbox: {}, resolutions: [] }; this.readChildNodes(a, c); b.tileSets.push(c) }, Resolutions: function (a, b) { for (var c = this.getChildValue(a).split(" "), d = 0, e = c.length; d < e; d++)"" != c[d] && b.resolutions.push(parseFloat(c[d])) },
      Width: function (a, b) { b.width = parseInt(this.getChildValue(a)) }, Height: function (a, b) { b.height = parseInt(this.getChildValue(a)) }, Layers: function (a, b) { b.layers = this.getChildValue(a) }, Styles: function (a, b) { b.styles = this.getChildValue(a) }
    }, OpenLayers.Format.WMSCapabilities.v1_1_1.prototype.readers.wms)
  }, CLASS_NAME: "OpenLayers.Format.WMSCapabilities.v1_1_1_WMSC"
}); OpenLayers.Control.LayerSwitcher = OpenLayers.Class(OpenLayers.Control, {
  layerStates: null, layersDiv: null, baseLayersDiv: null, baseLayers: null, dataLbl: null, dataLayersDiv: null, dataLayers: null, minimizeDiv: null, maximizeDiv: null, ascending: !0, initialize: function (a) { OpenLayers.Control.prototype.initialize.apply(this, arguments); this.layerStates = [] }, destroy: function () {
    this.clearLayersArray("base"); this.clearLayersArray("data"); this.map.events.un({
      buttonclick: this.onButtonClick, addlayer: this.redraw, changelayer: this.redraw,
      removelayer: this.redraw, changebaselayer: this.redraw, scope: this
    }); this.events.unregister("buttonclick", this, this.onButtonClick); OpenLayers.Control.prototype.destroy.apply(this, arguments)
  }, setMap: function (a) {
    OpenLayers.Control.prototype.setMap.apply(this, arguments); this.map.events.on({ addlayer: this.redraw, changelayer: this.redraw, removelayer: this.redraw, changebaselayer: this.redraw, scope: this }); this.outsideViewport ? (this.events.attachToElement(this.div), this.events.register("buttonclick", this, this.onButtonClick)) :
      this.map.events.register("buttonclick", this, this.onButtonClick)
  }, draw: function () { OpenLayers.Control.prototype.draw.apply(this); this.loadContents(); this.outsideViewport || this.minimizeControl(); this.redraw(); return this.div }, onButtonClick: function (a) {
    a = a.buttonElement; a === this.minimizeDiv ? this.minimizeControl() : a === this.maximizeDiv ? this.maximizeControl() : a._layerSwitcher === this.id && (a["for"] && (a = document.getElementById(a["for"])), a.disabled || ("radio" == a.type ? (a.checked = !0, this.map.setBaseLayer(this.map.getLayer(a._layer))) :
      (a.checked = !a.checked, this.updateMap())))
  }, clearLayersArray: function (a) { this[a + "LayersDiv"].innerHTML = ""; this[a + "Layers"] = [] }, checkRedraw: function () { if (!this.layerStates.length || this.map.layers.length != this.layerStates.length) return !0; for (var a = 0, b = this.layerStates.length; a < b; a++) { var c = this.layerStates[a], d = this.map.layers[a]; if (c.name != d.name || c.inRange != d.inRange || c.id != d.id || c.visibility != d.visibility) return !0 } return !1 }, redraw: function () {
    if (!this.checkRedraw()) return this.div; this.clearLayersArray("base");
    this.clearLayersArray("data"); var a = !1, b = !1, c = this.map.layers.length; this.layerStates = Array(c); for (var d = 0; d < c; d++) { var e = this.map.layers[d]; this.layerStates[d] = { name: e.name, visibility: e.visibility, inRange: e.inRange, id: e.id } } var f = this.map.layers.slice(); this.ascending || f.reverse(); d = 0; for (c = f.length; d < c; d++) {
      var e = f[d], g = e.isBaseLayer; if (e.displayInLayerSwitcher) {
        g ? b = !0 : a = !0; var h = g ? e == this.map.baseLayer : e.getVisibility(), k = document.createElement("input"), l = OpenLayers.Util.createUniqueID(this.id +
          "_input_"); k.id = l; k.name = g ? this.id + "_baseLayers" : e.name; k.type = g ? "radio" : "checkbox"; k.value = e.name; k.checked = h; k.defaultChecked = h; k.className = "olButton"; k._layer = e.id; k._layerSwitcher = this.id; g || e.inRange || (k.disabled = !0); h = document.createElement("label"); h["for"] = k.id; OpenLayers.Element.addClass(h, "labelSpan olButton"); h._layer = e.id; h._layerSwitcher = this.id; g || e.inRange || (h.style.color = "gray"); h.innerHTML = e.name; h.style.verticalAlign = g ? "bottom" : "baseline"; l = document.createElement("br"); (g ? this.baseLayers :
            this.dataLayers).push({ layer: e, inputElem: k, labelSpan: h }); e = g ? this.baseLayersDiv : this.dataLayersDiv; e.appendChild(k); e.appendChild(h); e.appendChild(l)
      }
    } this.dataLbl.style.display = a ? "" : "none"; this.baseLbl.style.display = b ? "" : "none"; return this.div
  }, updateMap: function () { for (var a = 0, b = this.baseLayers.length; a < b; a++) { var c = this.baseLayers[a]; c.inputElem.checked && this.map.setBaseLayer(c.layer, !1) } a = 0; for (b = this.dataLayers.length; a < b; a++)c = this.dataLayers[a], c.layer.setVisibility(c.inputElem.checked) }, maximizeControl: function (a) {
    this.div.style.width =
    ""; this.div.style.height = ""; this.showControls(!1); null != a && OpenLayers.Event.stop(a)
  }, minimizeControl: function (a) { this.div.style.width = "0px"; this.div.style.height = "0px"; this.showControls(!0); null != a && OpenLayers.Event.stop(a) }, showControls: function (a) { this.maximizeDiv.style.display = a ? "" : "none"; this.minimizeDiv.style.display = a ? "none" : ""; this.layersDiv.style.display = a ? "none" : "" }, loadContents: function () {
  this.layersDiv = document.createElement("div"); this.layersDiv.id = this.id + "_layersDiv"; OpenLayers.Element.addClass(this.layersDiv,
    "layersDiv"); this.baseLbl = document.createElement("div"); this.baseLbl.innerHTML = OpenLayers.i18n("Base Layer"); OpenLayers.Element.addClass(this.baseLbl, "baseLbl"); this.baseLayersDiv = document.createElement("div"); OpenLayers.Element.addClass(this.baseLayersDiv, "baseLayersDiv"); this.dataLbl = document.createElement("div"); this.dataLbl.innerHTML = OpenLayers.i18n("Overlays"); OpenLayers.Element.addClass(this.dataLbl, "dataLbl"); this.dataLayersDiv = document.createElement("div"); OpenLayers.Element.addClass(this.dataLayersDiv,
      "dataLayersDiv"); this.ascending ? (this.layersDiv.appendChild(this.baseLbl), this.layersDiv.appendChild(this.baseLayersDiv), this.layersDiv.appendChild(this.dataLbl), this.layersDiv.appendChild(this.dataLayersDiv)) : (this.layersDiv.appendChild(this.dataLbl), this.layersDiv.appendChild(this.dataLayersDiv), this.layersDiv.appendChild(this.baseLbl), this.layersDiv.appendChild(this.baseLayersDiv)); this.div.appendChild(this.layersDiv); var a = OpenLayers.Util.getImageLocation("layer-switcher-maximize.png"); this.maximizeDiv =
        OpenLayers.Util.createAlphaImageDiv("OpenLayers_Control_MaximizeDiv", null, null, a, "absolute"); OpenLayers.Element.addClass(this.maximizeDiv, "maximizeDiv olButton"); this.maximizeDiv.style.display = "none"; this.div.appendChild(this.maximizeDiv); a = OpenLayers.Util.getImageLocation("layer-switcher-minimize.png"); this.minimizeDiv = OpenLayers.Util.createAlphaImageDiv("OpenLayers_Control_MinimizeDiv", null, null, a, "absolute"); OpenLayers.Element.addClass(this.minimizeDiv, "minimizeDiv olButton"); this.minimizeDiv.style.display =
          "none"; this.div.appendChild(this.minimizeDiv)
  }, CLASS_NAME: "OpenLayers.Control.LayerSwitcher"
}); OpenLayers.Format.Atom = OpenLayers.Class(OpenLayers.Format.XML, {
  namespaces: { atom: "http://www.w3.org/2005/Atom", georss: "http://www.georss.org/georss" }, feedTitle: "untitled", defaultEntryTitle: "untitled", gmlParser: null, xy: !1, read: function (a) { "string" == typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); return this.parseFeatures(a) }, write: function (a) {
    var b; if (OpenLayers.Util.isArray(a)) {
      b = this.createElementNSPlus("atom:feed"); b.appendChild(this.createElementNSPlus("atom:title", { value: this.feedTitle }));
      for (var c = 0, d = a.length; c < d; c++)b.appendChild(this.buildEntryNode(a[c]))
    } else b = this.buildEntryNode(a); return OpenLayers.Format.XML.prototype.write.apply(this, [b])
  }, buildContentNode: function (a) {
    var b = this.createElementNSPlus("atom:content", { attributes: { type: a.type || null } }); if (a.src) b.setAttribute("src", a.src); else if ("text" == a.type || null == a.type) b.appendChild(this.createTextNode(a.value)); else if ("html" == a.type) { if ("string" != typeof a.value) throw "HTML content must be in form of an escaped string"; b.appendChild(this.createTextNode(a.value)) } else "xhtml" ==
      a.type ? b.appendChild(a.value) : "xhtml" == a.type || a.type.match(/(\+|\/)xml$/) ? b.appendChild(a.value) : b.appendChild(this.createTextNode(a.value)); return b
  }, buildEntryNode: function (a) {
    var b = a.attributes, c = b.atom || {}, d = this.createElementNSPlus("atom:entry"); if (c.authors) for (var e = OpenLayers.Util.isArray(c.authors) ? c.authors : [c.authors], f = 0, g = e.length; f < g; f++)d.appendChild(this.buildPersonConstructNode("author", e[f])); if (c.categories) for (var e = OpenLayers.Util.isArray(c.categories) ? c.categories : [c.categories],
      h, f = 0, g = e.length; f < g; f++)h = e[f], d.appendChild(this.createElementNSPlus("atom:category", { attributes: { term: h.term, scheme: h.scheme || null, label: h.label || null } })); c.content && d.appendChild(this.buildContentNode(c.content)); if (c.contributors) for (e = OpenLayers.Util.isArray(c.contributors) ? c.contributors : [c.contributors], f = 0, g = e.length; f < g; f++)d.appendChild(this.buildPersonConstructNode("contributor", e[f])); a.fid && d.appendChild(this.createElementNSPlus("atom:id", { value: a.fid })); if (c.links) for (e = OpenLayers.Util.isArray(c.links) ?
        c.links : [c.links], f = 0, g = e.length; f < g; f++)h = e[f], d.appendChild(this.createElementNSPlus("atom:link", { attributes: { href: h.href, rel: h.rel || null, type: h.type || null, hreflang: h.hreflang || null, title: h.title || null, length: h.length || null } })); c.published && d.appendChild(this.createElementNSPlus("atom:published", { value: c.published })); c.rights && d.appendChild(this.createElementNSPlus("atom:rights", { value: c.rights })); (c.summary || b.description) && d.appendChild(this.createElementNSPlus("atom:summary", {
          value: c.summary ||
            b.description
        })); d.appendChild(this.createElementNSPlus("atom:title", { value: c.title || b.title || this.defaultEntryTitle })); c.updated && d.appendChild(this.createElementNSPlus("atom:updated", { value: c.updated })); a.geometry && (b = this.createElementNSPlus("georss:where"), b.appendChild(this.buildGeometryNode(a.geometry)), d.appendChild(b)); return d
  }, initGmlParser: function () {
  this.gmlParser = new OpenLayers.Format.GML.v3({
    xy: this.xy, featureNS: "http://example.com#feature", internalProjection: this.internalProjection,
    externalProjection: this.externalProjection
  })
  }, buildGeometryNode: function (a) { this.gmlParser || this.initGmlParser(); return this.gmlParser.writeNode("feature:_geometry", a).firstChild }, buildPersonConstructNode: function (a, b) { var c = ["uri", "email"], d = this.createElementNSPlus("atom:" + a); d.appendChild(this.createElementNSPlus("atom:name", { value: b.name })); for (var e = 0, f = c.length; e < f; e++)b[c[e]] && d.appendChild(this.createElementNSPlus("atom:" + c[e], { value: b[c[e]] })); return d }, getFirstChildValue: function (a, b, c,
    d) { return (a = this.getElementsByTagNameNS(a, b, c)) && 0 < a.length ? this.getChildValue(a[0], d) : d }, parseFeature: function (a) {
      var b = {}, c = null, d = null, e = null, f = this.namespaces.atom; this.parsePersonConstructs(a, "author", b); d = this.getElementsByTagNameNS(a, f, "category"); 0 < d.length && (b.categories = []); for (var g = 0, h = d.length; g < h; g++) { c = {}; c.term = d[g].getAttribute("term"); if (e = d[g].getAttribute("scheme")) c.scheme = e; if (e = d[g].getAttribute("label")) c.label = e; b.categories.push(c) } d = this.getElementsByTagNameNS(a, f, "content");
      if (0 < d.length) { c = {}; if (e = d[0].getAttribute("type")) c.type = e; (e = d[0].getAttribute("src")) ? c.src = e : ("text" == c.type || "html" == c.type || null == c.type ? c.value = this.getFirstChildValue(a, f, "content", null) : "xhtml" == c.type || c.type.match(/(\+|\/)xml$/) ? c.value = this.getChildEl(d[0]) : c.value = this.getFirstChildValue(a, f, "content", null), b.content = c) } this.parsePersonConstructs(a, "contributor", b); b.id = this.getFirstChildValue(a, f, "id", null); d = this.getElementsByTagNameNS(a, f, "link"); 0 < d.length && (b.links = Array(d.length));
      for (var k = ["rel", "type", "hreflang", "title", "length"], g = 0, h = d.length; g < h; g++) { c = {}; c.href = d[g].getAttribute("href"); for (var l = 0, m = k.length; l < m; l++)(e = d[g].getAttribute(k[l])) && (c[k[l]] = e); b.links[g] = c } if (c = this.getFirstChildValue(a, f, "published", null)) b.published = c; if (c = this.getFirstChildValue(a, f, "rights", null)) b.rights = c; if (c = this.getFirstChildValue(a, f, "summary", null)) b.summary = c; b.title = this.getFirstChildValue(a, f, "title", null); b.updated = this.getFirstChildValue(a, f, "updated", null); c = {
        title: b.title,
        description: b.summary, atom: b
      }; a = this.parseLocations(a)[0]; a = new OpenLayers.Feature.Vector(a, c); a.fid = b.id; return a
    }, parseFeatures: function (a) { var b = [], c = this.getElementsByTagNameNS(a, this.namespaces.atom, "entry"); 0 == c.length && (c = [a]); a = 0; for (var d = c.length; a < d; a++)b.push(this.parseFeature(c[a])); return b }, parseLocations: function (a) {
      var b = this.namespaces.georss, c = { components: [] }, d = this.getElementsByTagNameNS(a, b, "where"); if (d && 0 < d.length) {
      this.gmlParser || this.initGmlParser(); for (var e = 0, f = d.length; e <
        f; e++)this.gmlParser.readChildNodes(d[e], c)
      } c = c.components; if ((d = this.getElementsByTagNameNS(a, b, "point")) && 0 < d.length) for (e = 0, f = d.length; e < f; e++) { var g = OpenLayers.String.trim(d[e].firstChild.nodeValue).split(/\s+/); 2 != g.length && (g = OpenLayers.String.trim(d[e].firstChild.nodeValue).split(/\s*,\s*/)); c.push(new OpenLayers.Geometry.Point(g[1], g[0])) } var h = this.getElementsByTagNameNS(a, b, "line"); if (h && 0 < h.length) for (var k, e = 0, f = h.length; e < f; e++) {
        d = OpenLayers.String.trim(h[e].firstChild.nodeValue).split(/\s+/);
        k = []; for (var l = 0, m = d.length; l < m; l += 2)g = new OpenLayers.Geometry.Point(d[l + 1], d[l]), k.push(g); c.push(new OpenLayers.Geometry.LineString(k))
      } if ((a = this.getElementsByTagNameNS(a, b, "polygon")) && 0 < a.length) for (e = 0, f = a.length; e < f; e++) { d = OpenLayers.String.trim(a[e].firstChild.nodeValue).split(/\s+/); k = []; l = 0; for (m = d.length; l < m; l += 2)g = new OpenLayers.Geometry.Point(d[l + 1], d[l]), k.push(g); c.push(new OpenLayers.Geometry.Polygon([new OpenLayers.Geometry.LinearRing(k)])) } if (this.internalProjection && this.externalProjection) for (e =
        0, f = c.length; e < f; e++)c[e] && c[e].transform(this.externalProjection, this.internalProjection); return c
    }, parsePersonConstructs: function (a, b, c) { var d = [], e = this.namespaces.atom; a = this.getElementsByTagNameNS(a, e, b); for (var f = ["uri", "email"], g = 0, h = a.length; g < h; g++) { var k = {}; k.name = this.getFirstChildValue(a[g], e, "name", null); for (var l = 0, m = f.length; l < m; l++) { var n = this.getFirstChildValue(a[g], e, f[l], null); n && (k[f[l]] = n) } d.push(k) } 0 < d.length && (c[b + "s"] = d) }, CLASS_NAME: "OpenLayers.Format.Atom"
}); OpenLayers.Control.KeyboardDefaults = OpenLayers.Class(OpenLayers.Control, {
  autoActivate: !0, slideFactor: 75, observeElement: null, draw: function () { this.handler = new OpenLayers.Handler.Keyboard(this, { keydown: this.defaultKeyPress }, { observeElement: this.observeElement || document }) }, defaultKeyPress: function (a) {
    var b, c = !0; b = OpenLayers.Event.element(a); if (!b || "INPUT" != b.tagName && "TEXTAREA" != b.tagName && "SELECT" != b.tagName) {
      switch (a.keyCode) {
        case OpenLayers.Event.KEY_LEFT: this.map.pan(-this.slideFactor, 0); break; case OpenLayers.Event.KEY_RIGHT: this.map.pan(this.slideFactor,
          0); break; case OpenLayers.Event.KEY_UP: this.map.pan(0, -this.slideFactor); break; case OpenLayers.Event.KEY_DOWN: this.map.pan(0, this.slideFactor); break; case 33: b = this.map.getSize(); this.map.pan(0, -0.75 * b.h); break; case 34: b = this.map.getSize(); this.map.pan(0, 0.75 * b.h); break; case 35: b = this.map.getSize(); this.map.pan(0.75 * b.w, 0); break; case 36: b = this.map.getSize(); this.map.pan(-0.75 * b.w, 0); break; case 43: case 61: case 187: case 107: this.map.zoomIn(); break; case 45: case 109: case 189: case 95: this.map.zoomOut();
          break; default: c = !1
      }c && OpenLayers.Event.stop(a)
    }
  }, CLASS_NAME: "OpenLayers.Control.KeyboardDefaults"
}); OpenLayers.Format.WMTSCapabilities.v1_0_0 = OpenLayers.Class(OpenLayers.Format.OWSCommon.v1_1_0, {
  version: "1.0.0", namespaces: { ows: "http://www.opengis.net/ows/1.1", wmts: "http://www.opengis.net/wmts/1.0", xlink: "http://www.w3.org/1999/xlink" }, yx: null, defaultPrefix: "wmts", initialize: function (a) { OpenLayers.Format.XML.prototype.initialize.apply(this, [a]); this.options = a; a = OpenLayers.Util.extend({}, OpenLayers.Format.WMTSCapabilities.prototype.yx); this.yx = OpenLayers.Util.extend(a, this.yx) }, read: function (a) {
  "string" ==
    typeof a && (a = OpenLayers.Format.XML.prototype.read.apply(this, [a])); a && 9 == a.nodeType && (a = a.documentElement); var b = {}; this.readNode(a, b); b.version = this.version; return b
  }, readers: {
    wmts: {
      Capabilities: function (a, b) { this.readChildNodes(a, b) }, Contents: function (a, b) { b.contents = {}; b.contents.layers = []; b.contents.tileMatrixSets = {}; this.readChildNodes(a, b.contents) }, Layer: function (a, b) { var c = { styles: [], formats: [], dimensions: [], tileMatrixSetLinks: [], layers: [] }; this.readChildNodes(a, c); b.layers.push(c) }, Style: function (a,
        b) { var c = {}; c.isDefault = "true" === a.getAttribute("isDefault"); this.readChildNodes(a, c); b.styles.push(c) }, Format: function (a, b) { b.formats.push(this.getChildValue(a)) }, TileMatrixSetLink: function (a, b) { var c = {}; this.readChildNodes(a, c); b.tileMatrixSetLinks.push(c) }, TileMatrixSet: function (a, b) { if (b.layers) { var c = { matrixIds: [] }; this.readChildNodes(a, c); b.tileMatrixSets[c.identifier] = c } else b.tileMatrixSet = this.getChildValue(a) }, TileMatrix: function (a, b) {
          var c = { supportedCRS: b.supportedCRS }; this.readChildNodes(a,
            c); b.matrixIds.push(c)
        }, ScaleDenominator: function (a, b) { b.scaleDenominator = parseFloat(this.getChildValue(a)) }, TopLeftCorner: function (a, b) { var c = this.getChildValue(a).split(" "), d; b.supportedCRS && (d = b.supportedCRS.replace(/urn:ogc:def:crs:(\w+):.+:(\w+)$/, "urn:ogc:def:crs:$1::$2"), d = !!this.yx[d]); b.topLeftCorner = d ? new OpenLayers.LonLat(c[1], c[0]) : new OpenLayers.LonLat(c[0], c[1]) }, TileWidth: function (a, b) { b.tileWidth = parseInt(this.getChildValue(a)) }, TileHeight: function (a, b) { b.tileHeight = parseInt(this.getChildValue(a)) },
      MatrixWidth: function (a, b) { b.matrixWidth = parseInt(this.getChildValue(a)) }, MatrixHeight: function (a, b) { b.matrixHeight = parseInt(this.getChildValue(a)) }, ResourceURL: function (a, b) { b.resourceUrl = b.resourceUrl || {}; var c = a.getAttribute("resourceType"); b.resourceUrls || (b.resourceUrls = []); c = b.resourceUrl[c] = { format: a.getAttribute("format"), template: a.getAttribute("template"), resourceType: c }; b.resourceUrls.push(c) }, WSDL: function (a, b) { b.wsdl = {}; b.wsdl.href = a.getAttribute("xlink:href") }, ServiceMetadataURL: function (a,
        b) { b.serviceMetadataUrl = {}; b.serviceMetadataUrl.href = a.getAttribute("xlink:href") }, LegendURL: function (a, b) { b.legend = {}; b.legend.href = a.getAttribute("xlink:href"); b.legend.format = a.getAttribute("format") }, Dimension: function (a, b) { var c = { values: [] }; this.readChildNodes(a, c); b.dimensions.push(c) }, Default: function (a, b) { b["default"] = this.getChildValue(a) }, Value: function (a, b) { b.values.push(this.getChildValue(a)) }
    }, ows: OpenLayers.Format.OWSCommon.v1_1_0.prototype.readers.ows
  }, CLASS_NAME: "OpenLayers.Format.WMTSCapabilities.v1_0_0"
});
