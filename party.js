//jshint esversion:7
const party = (function () {
  function t() {
    return Math.random();
  }
  function e(e, n) {
    return r(e, n, t());
  }
  function r(t, e, r) {
    return (1 - r) * t + r * e;
  }
  function n(t, r) {
    return t * e(1 - r / 2, 1 + r / 2);
  }
  function i(t, r) {
    return t + e(-r / 2, r / 2);
  }
  function o(t) {
    if (!(t instanceof v))
      throw new TypeError(
        "Invalid transform supplied to lighting calculation."
      );
    return Math.abs(Math.cos(t.rotation.x) * Math.cos(t.rotation.y));
  }
  function a(t, e, r) {
    return t && null != t[e] ? t[e] : r;
  }
  function s(t, e, r) {
    t && null == t[e] && (t[e] = r);
  }
  function h(t, e) {
    for (var r in e) e.hasOwnProperty(r) && s(t, r, e[r]);
  }
  function l(e) {
    if (
      ["number", "string", "bigint", "boolean", "undefined"].includes(typeof e)
    )
      return e;
    if ("function" == typeof e) return e();
    if (Array.isArray(e)) return e[Math.floor(t() * e.length)];
    throw new Error("Invalid randomized value");
  }
  function c(e, r, s) {
    let h = l(a(r, "count", 1)),
      c = l(a(r, "spread", 0)),
      f = l(a(r, "angle", 0));
    for (let m = 0; m < h; m++) {
      let h = i(f, c) * S,
        m = l(a(r, "velocity", 0)),
        u = l(a(r, "angularVelocity", 0)),
        y = l(a(r, "size", 8));
      p({
        shape: l(a(r, "shape", "rectangle")),
        acceleration: new v(new x(0, a(r, "gravity", !0) * d.gravityPixels)),
        velocity: new v(
          new x(Math.sin(h), Math.cos(h)).scale(m),
          x.generate(() => l(u))
        ),
        transform: new v(
          new x(
            (e.left || 0) +
              n((e.width || 0) / 2, 2 * a(r, "randomizePosition", !0)) +
              (s ? window.scrollX : 0),
            (e.top || 0) +
              n((e.height || 0) / 2, 2 * a(r, "randomizePosition", !0)) +
              (s ? window.scrollY : 0)
          ),
          x.generate(() => Math.PI * a(r, "randomizeRotation", !0) * t()),
          x.one.scale(y)
        ),
        color: l(a(r, "color", () => g.fromHsl(360 * t(), 100, 70).toString())),
        lighting: a(r, "lighting", !0),
        lifetime: 0,
        draw: function (t) {
          t.fillStyle = this.lighting
            ? new g(0, 0, 0)
                .mix(g.fromHex(this.color), 0.25 + 0.75 * o(this.transform))
                .toString()
            : this.color;
          const e = 0.2;
          let r = this.lifetime > e ? 1 : this.lifetime / e,
            n = B[this.shape];
          if (!n) throw Error(`Unknown shape '${this.shape}'.`);
          let i = new v(
            this.transform.position,
            this.transform.rotation,
            this.transform.scale.scale(r)
          );
          n.withTransform(i).draw(t);
        },
        update: function (t) {
          (this.velocity = this.velocity.applyDelta(this.acceleration, t)),
            (this.transform = this.transform.applyDelta(this.velocity, t)),
            (this.lifetime += t);
        },
      });
    }
  }
  function p(t) {
    for (; N.length >= d.maxParticles; ) N.shift();
    N.push(t);
  }
  function f(t) {
    N.forEach((e) => e.update(t));
    let e = Math.max(document.documentElement.offsetHeight, window.innerHeight);
    N = N.filter((t) => t.transform.position.y <= e);
  }
  function m() {
    (F.canvas.width = window.innerWidth),
      (F.canvas.height = window.innerHeight),
      F.clearRect(0, 0, F.canvas.width, F.canvas.height),
      N.forEach((t) => t.draw(F));
  }
  function u(t) {
    let e = (t - P) / 1e3;
    N.length > 0 && (f(e), m()), (P = t), window.requestAnimationFrame(u);
  }
  const d = { maxParticles: 1e3, gravityPixels: 800 },
    y = {
      typeCheckFailed: "The supplied parameter must be of type '{0}'.",
      abstractMethodNotImplemented:
        "The type is required to implement the '{0}' method.",
      invalidPathNode: "Invalid node '{0}' detected in SVG path.",
      malformedPathNode: "Malformed node '{0}' detected in SVG path.",
    };
  class w {
    constructor(t) {
      (this.index = 0), (this.items = t);
    }
    first() {
      return this.reset(), this.next();
    }
    next() {
      return this.items[this.index++];
    }
    hasNext() {
      return this.index < this.items.length;
    }
    reset() {
      this.index = 0;
    }
    each(t) {
      for (let e = this.first(); this.hasNext(); e = this.next()) t(e);
    }
  }
  class g {
    constructor(t, e, r) {
      (this.r = t), (this.g = e), (this.b = r);
    }
    mix(t, e) {
      if (!(t instanceof g))
        throw new TypeError(y.typeCheckFailed.format("Color"));
      return (
        null == e && (e = 0.5),
        new g(r(this.r, t.r, e), r(this.g, t.g, e), r(this.b, t.b, e))
      );
    }
    toString() {
      function t(t) {
        return Math.round(255 * t)
          .toString(16)
          .padStart(2, "0");
      }
      return `#${t(this.r)}${t(this.g)}${t(this.b)}`;
    }
    static fromHex(t) {
      return (
        t.startsWith("#") && (t = t.substring(1)),
        new g(
          parseInt(t.substring(0, 2), 16) / 255,
          parseInt(t.substring(2, 4), 16) / 255,
          parseInt(t.substring(4, 6), 16) / 255
        )
      );
    }
    static fromHsl(t, e, r) {
      let n, i, o;
      if (((t /= 360), (e /= 100), (r /= 100), 0 === e)) n = i = o = r;
      else {
        const a = (t, e, r) => (
            r < 0 && (r += 1),
            r > 1 && (r -= 1),
            r < 1 / 6
              ? t + 6 * (e - t) * r
              : r < 0.5
              ? e
              : r < 2 / 3
              ? t + (e - t) * (2 / 3 - r) * 6
              : t
          ),
          s = r < 0.5 ? r * (1 + e) : r + e - r * e,
          h = 2 * r - s;
        (n = a(h, s, t + 1 / 3)), (i = a(h, s, t)), (o = a(h, s, t - 1 / 3));
      }
      return new g(n, i, o);
    }
  }
  class x {
    constructor(t, e, r) {
      (this.x = t || 0), (this.y = e || 0), (this.z = r || 0);
    }
    add(t) {
      if (!(t instanceof x))
        throw new TypeError(y.typeCheckFailed.format("Vector"));
      return new x(this.x + t.x, this.y + t.y, this.z + t.z);
    }
    scale(t) {
      if ("number" == typeof t)
        return new x(this.x * t, this.y * t, this.z * t);
      if (t instanceof x)
        return new x(this.x * t.x, this.y * t.y, this.z * t.z);
      throw new TypeError(y.typeCheckFailed.format("Number/Vector"));
    }
    static get zero() {
      return new x();
    }
    static get one() {
      return new x(1, 1, 1);
    }
    static generate(t) {
      if ("function" != typeof t)
        throw new TypeError(y.typeCheckFailed.format("Function"));
      return new x(t(), t(), t());
    }
  }
  class v {
    constructor(t, e, r) {
      (this.position = t || x.zero),
        (this.rotation = e || x.zero),
        (this.scale = r || x.zero);
    }
    applyDelta(t, e) {
      if (!(t instanceof v))
        throw new TypeError(y.typeCheckFailed.format("Transform"));
      if ("number" != typeof e)
        throw new TypeError(y.typeCheckFailed.format("Number"));
      return new v(
        this.position.add(t.position.scale(e)),
        this.rotation.add(t.rotation.scale(e)),
        this.scale.add(t.scale.scale(e))
      );
    }
    apply(t) {
      if (!(t instanceof x))
        throw new TypeError(y.typeCheckFailed.format("Vector"));
      let e = t.x * this.scale.x,
        r = t.y * this.scale.y;
      return new x(
        this.position.x +
          (e * Math.cos(this.rotation.z) - r * Math.sin(this.rotation.z)) *
            Math.cos(this.rotation.y),
        this.position.y +
          (e * Math.sin(this.rotation.z) + r * Math.cos(this.rotation.z)) *
            Math.cos(this.rotation.x)
      );
    }
  }
  class C {
    constructor(t, e, r, n) {
      (this.xmin = t), (this.ymin = e), (this.xmax = r), (this.ymax = n);
    }
    static fromVertices(t) {
      let e = new C(1 / 0, 1 / 0, 0, 0);
      for (let r = 0; r < t.length; r++) {
        let n = t[r];
        (e.xmin = Math.min(n.x, e.xmin)),
          (e.ymin = Math.min(n.y, e.ymin)),
          (e.xmax = Math.max(n.x, e.xmax)),
          (e.ymax = Math.max(n.y, e.ymax));
      }
      return e;
    }
  }
  class b {
    constructor(t, e, r, n, i) {
      (this.xmin = t),
        (this.ymin = e),
        (this.width = i ? r : Math.max(r, n)),
        (this.height = i ? n : Math.max(r, n));
    }
    transformX(t) {
      return (t - this.xmin - this.width / 2) / this.width;
    }
    transformY(t) {
      return (t - this.ymin - this.height / 2) / this.height;
    }
    transformPoint(t) {
      return new x(this.transformX(t.x), this.transformY(t.y));
    }
    static fromBounds(t) {
      return new b(t.xmin, t.ymin, t.xmax - t.xmin, t.ymax - t.ymin);
    }
  }
  class E {
    withTransform(t) {
      if (!(t instanceof v))
        throw new TypeError(y.typeCheckFailed.format("Transform"));
      return (this.transform = t), this;
    }
    getBounds() {
      throw new Error(y.abstractMethodNotImplemented.format("getBounds()"));
    }
    normalize(t) {
      throw new Error(
        y.abstractMethodNotImplemented.format("normalize(viewBox)")
      );
    }
    draw(t) {
      throw new Error(y.abstractMethodNotImplemented.format("draw(context)"));
    }
  }
  class z extends E {
    constructor(t) {
      if ((super(), !Array.isArray(t)))
        throw new TypeError(y.typeCheckFailed.format("Array"));
      this.points = t;
    }
    getBounds() {
      return C.fromVertices(this.points);
    }
    normalize(t) {
      if (((t = t || b.fromBounds(this.getBounds())), !(t instanceof b)))
        throw new TypeError(y.typeCheckFailed.format("ViewBox"));
      this.points = this.points.map((e) => t.transformPoint(e));
    }
    draw(t) {
      if (!(t instanceof CanvasRenderingContext2D))
        throw new TypeError(
          y.typeCheckFailed.format("CanvasRenderingContext2D")
        );
      t.beginPath();
      for (let e = 0; e < this.points.length; e++) {
        let r = this.transform
          ? this.transform.apply(this.points[e])
          : this.points[e];
        (0 == e ? t.moveTo : t.lineTo).apply(t, [
          r.x - window.scrollX,
          r.y - window.scrollY,
        ]);
      }
      t.closePath(), t.fill();
    }
  }
  class M extends E {
    constructor(t) {
      super(), (this.nodes = []);
      let e = new x(),
        r = new w(t);
      for (; r.hasNext(); ) {
        let n = r.next();
        "string" != typeof n &&
          ((n = t
            .slice(0, r.index)
            .reverse()
            .find((t) => "string" == typeof t)),
          "m" == n.toLowerCase() && (n = n.toLowerCase() == n ? "l" : "L"),
          r.index--);
        let i,
          o,
          a = n.toLowerCase() == n,
          s = a ? new x(e.x, e.y) : new x();
        switch (n.toLowerCase()) {
          case "m":
            (i = "move"),
              (o = [s.x + r.next(), s.y + r.next()]),
              (e.x = o[0]),
              (e.y = o[1]);
            break;
          case "l":
            (i = "line"),
              (o = [s.x + r.next(), s.y + r.next()]),
              (e.x = o[0]),
              (e.y = o[1]);
            break;
          case "h":
            (i = "line"), (o = [s.x + r.next(), e.y]), (e.x = o[0]);
            break;
          case "v":
            (i = "line"), (o = [e.x, s.y + r.next()]), (e.y = o[1]);
            break;
          case "z":
            i = "line";
            let t = this.nodes
              .find((t) => "move" == t.type)
              .getResultingCursor();
            (o = [t.x, t.y]), (e.x = t.x), (e.y = t.y);
            break;
          case "c":
            (i = "bezier"), (o = []);
            for (let t = 0; t < 3; t++)
              o.push(s.x + r.next()), o.push(s.y + r.next());
            (e.x = o[o.length - 2]), (e.y = o[o.length - 1]);
            break;
          case "s":
            i = "bezier";
            let a = this.nodes[this.nodes.length - 1];
            if ("bezier" != a.type)
              throw new Error(y.malformedPathNode.format(n));
            let h = e.x + (a.args[4] - a.args[2]),
              l = e.y + (a.args[5] - a.args[3]);
            o = [h, l];
            for (let t = 0; t < 2; t++)
              o.push(s.x + r.next()), o.push(s.y + r.next());
            (e.x = o[o.length - 2]), (e.y = o[o.length - 1]);
        }
        this.nodes.push(new T(i, o));
      }
      this.nodes.length > 50 &&
        console.warn(
          "Complex shape registered, high usage may impact framerate."
        );
    }
    getBounds() {
      return C.fromVertices(this.nodes.map((t) => t.getResultingCursor()));
    }
    normalize(t) {
      if (((t = t || b.fromBounds(this.getBounds())), !(t instanceof b)))
        throw new TypeError(y.typeCheckFailed.format("ViewBox"));
      let e = new w(this.nodes);
      for (; e.hasNext(); ) {
        let r = e.next();
        for (let e = 0; e < r.args.length; e += 2)
          (r.args[e] = t.transformX(r.args[e])),
            (r.args[e + 1] = t.transformY(r.args[e + 1]));
      }
    }
    draw(t) {
      if (!(t instanceof CanvasRenderingContext2D))
        throw new TypeError(
          y.typeCheckFailed.format("CanvasRenderingContext2D")
        );
      t.beginPath(),
        new w(this.nodes).each((e) => e.run(t, this.transform)),
        t.fill();
    }
  }
  class T {
    constructor(t, e) {
      (this.type = t), (this.args = e);
    }
    getResultingCursor() {
      return new x(
        this.args[this.args.length - 2],
        this.args[this.args.length - 1]
      );
    }
    run(t, e) {
      let r;
      switch (this.type) {
        case "move":
          r = t.moveTo;
          break;
        case "line":
          r = t.lineTo;
          break;
        case "bezier":
          r = t.bezierCurveTo;
      }
      let n = [];
      for (let t = 0; t < this.args.length; t += 2) {
        let r = new x(this.args[t], this.args[t + 1]);
        e && (r = e.apply(r)),
          n.push(r.x - window.scrollX),
          n.push(r.y - window.scrollY);
      }
      r.apply(t, n);
    }
  }
  const k = document.createElement("canvas");
  (k.id = "party-js-canvas"),
    (k.style = "position: fixed; left: 0; top: 0; pointer-events: none;");
  const F = k.getContext("2d");
  document.body
    ? document.body.appendChild(k)
    : window.addEventListener("load", () => document.body.appendChild(k));
  var N = [];
  const B = {
      square: new z([
        new x(-0.5, 0.5),
        new x(0.5, 0.5),
        new x(0.5, -0.5),
        new x(-0.5, -0.5),
      ]),
      rectangle: new z([
        new x(-0.3, 1),
        new x(0.3, 1),
        new x(0.3, -1),
        new x(-0.3, -1),
      ]),
    },
    S = Math.PI / 180;
  String.prototype.format = function () {
    var t = this;
    for (var e in arguments)
      t = t.replace(new RegExp("\\{" + e + "\\}", "g"), arguments[e]);
    return t;
  };
  var P = 0;
  return (
    window.requestAnimationFrame(u),
    {
      area: function (t, e, r) {
        c(t, e, null == r || r);
      },
      element: function (t, e) {
        (e = e || {}),
          h(e, {
            shape: party.array(["square", "rectangle"]),
            count: party.variation(40, 0.5),
            spread: party.constant(80),
            size: party.variation(10, 0.8),
            velocity: party.variation(-300, 1),
            angularVelocity: party.minmax(1, 6),
          }),
          this.area(t.getBoundingClientRect(), e);
      },
      position: function (t, e, r) {
        (r = r || {}),
          h(r, {
            shape: party.array(["square", "rectangle"]),
            count: party.variation(40, 0.5),
            spread: party.constant(80),
            size: party.variation(10, 0.8),
            velocity: party.variation(-300, 1),
            angularVelocity: party.minmax(1, 6),
          }),
          this.area({ left: t, top: e }, r);
      },
      cursor: function (t) {
        let e = window.event;
        if (null == e.clientX || null == e.clientY)
          return console.error(
            "Calling 'party.cursor()' with no current mouse event is not allowed."
          );
        this.position(e.clientX, e.clientY, t);
      },
      screen: function (t) {
        (t = t || {}),
          h(t, {
            shape: party.array(["square", "rectangle"]),
            count: party.variation((window.innerWidth / 1980) * 500, 0.5),
            size: party.variation(10, 0.8),
            velocity: party.variation(-100, 2),
            angularVelocity: party.minmax(1, 6),
          }),
          this.area(
            { width: window.innerWidth, height: -window.innerHeight },
            t
          );
      },
      registerShape: function (t, e) {
        if (Array.isArray(e)) B[t] = new z(e);
        else if ("string" == typeof e) {
          let n = new DOMParser(),
            i = n.parseFromString(e, "application/xml"),
            o = i.getElementsByTagName("parsererror")[0];
          if (o) throw new Error("Invalid SVG shape.");
          var r;
          let a = i.getElementsByTagName("svg")[0];
          a &&
            a.hasAttribute("viewBox") &&
            (r = b.fromBounds(
              a
                .getAttribute("viewBox")
                .split(" ")
                .map((t) => parseFloat(t))
            ));
          let s,
            h = i.getElementsByTagName("polygon")[0],
            l = i.getElementsByTagName("path")[0];
          if (h) {
            let t = h.getAttribute("points"),
              e = /(-?\d*\.\d+|-?\d+)/g,
              r = t.match(e),
              n = [];
            for (let t = 0; t < r.length; t += 2)
              n.push(new x(parseFloat(r[t]), parseFloat(r[t + 1])));
            s = new z(n);
          } else if (l) {
            let t = l.getAttribute("d"),
              e = /([A-Za-z]|-?\d*\.\d+|-?\d+)/g,
              r = t.match(e),
              n = [];
            for (let t = 0; t < r.length; t++) {
              let e = r[t],
                i = parseFloat(e);
              n.push(isNaN(i) ? e : i);
            }
            s = new M(n);
          }
          if (!s) throw new Error("No shape was determined from the SVG.");
          s.normalize(r), (B[t] = s);
        }
      },
      constant: function (t) {
        return t;
      },
      variation: function (t, e, r) {
        if ("number" != typeof t || "number" != typeof e)
          throw new TypeError(y.typeCheckFailed.format("Number"));
        return () => (r ? i : n)(t, e);
      },
      minmax: function (t, r) {
        if ("number" != typeof t || "number" != typeof r)
          throw new TypeError(y.typeCheckFailed.format("Number"));
        return () => e(t, r);
      },
      array: function (t) {
        if (!Array.isArray(t))
          throw new TypeError(y.typeCheckFailed.format("Array"));
        return t;
      },
      linearGradient: function () {
        if (!arguments || 0 == arguments.length) throw new Error();
        if (1 == arguments.length) return arguments[0];
        var t = [...arguments].map((t) => g.fromHex(t));
        return () => {
          let r = e(0, t.length - 1),
            n = Math.floor(r),
            i = r % 1;
          return t[n].mix(t[n + 1], i).toString();
        };
      },
    }
  );
})();
party.registerShape(
  "circle",
  '<path d="M0,1 C0.551915024494,1 1,0.551915024494 1,0 C1,-0.551915024494 0.551915024494,-1 0,-1 C-0.551915024494,-1 -1,-0.551915024494 -1,0 C-1,0.551915024494 -0.551915024494,1 0,1 Z"/>'
),
  party.registerShape(
    "ellipse",
    '<path d="M0,0.5 C0.5,0.5 1,0.4 1,0 C1,-0.4 0.5,-0.5 0,-0.5 C-0.5,-0.5 -1,-0.4 -1,0 C-1,0.4 -0.5,0.5 0,0.5Z"/>'
  ),
  party.registerShape(
    "rounded-square",
    '<path d="M-0.5,1 L0.5,1 C0.75,1 1,0.75 1,0.5 L1,-0.5 C1,-0.75 0.75,-1 0.5,-1 L-0.5,-1 C-0.75,-1 -1,-0.75 -1,-0.5 L-1,0.5 C-1,0.75 -0.75,1 -0.5,1 Z"/>'
  ),
  party.registerShape(
    "rounded-rectangle",
    '<path d="M-0.6,0.5 L0.6,0.5 C0.8,0.5 1,0.3 1,0.1 L1,-0.1 C1,-0.3 0.8,-0.5 0.6,-0.5 L-0.6,-0.5 C-0.8,-0.5 -1,-0.3 -1,-0.1 L-1,0.1 C-1,0.3 -0.8,0.5 -0.6,0.5 Z"/>'
  ),
  party.registerShape(
    "star",
    '<polygon points="512,197.816 325.961,185.585 255.898,9.569 185.835,185.585 0,197.816 142.534,318.842 95.762,502.431 255.898,401.21 416.035,502.431 369.263,318.842"/>'
  );
