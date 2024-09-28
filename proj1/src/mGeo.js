import geo from "geojs";
import * as d3 from "d3";
// let line_f = geo.registries.features.svg.line;
// let svg_lineFeature = (...args) => {
//   console.log("svg_lineFeature");
//   let m_this = line_f(...args);
//   return m_this;
// };
// // overwrite
// geo.registerFeature("svg", "line", svg_lineFeature);

// let util = geo.util;
// let timestamp = geo.timestamp;
// let line_f = geo.registries.features.svg.line;
// geo.registries.features.svg.line = (...args) => {
//   console.log("svg_lineFeature");
//   let m_this = line_f(...args);

//   let m_maxIdx = 0;
//   let m_buildTime = timestamp();

//   m_this._build = () => {
//     var data = m_this.data() || [],
//       s_style = m_this.style(),
//       m_renderer = m_this.renderer(),
//       pos_func = m_this.position(),
//       line,
//       i;

//     // s_update.call(m_this);
//     s_style.fill = function () {
//       return false;
//     };
//     s_style.stroke = () => {
//       return true;
//     };

//     data.forEach(function (item, idx) {
//       if (item.line.length === 0) return;

//       var m_style;
//       var ln = m_this.line()(item, idx);

//       var style = {},
//         key;
//       function wrapStyle(func) {
//         if (util.isFunction(func)) {
//           return function () {
//             return func(ln[0], 0, item, idx);
//           };
//         } else {
//           return func;
//         }
//       }
//       for (key in s_style) {
//         if (s_style.hasOwnProperty(key)) {
//           style[key] = wrapStyle(s_style[key]);
//         }
//       }

//       line = d3
//         .line()
//         .x(function (d) {
//           return m_this.featureGcsToDisplay(d).x;
//         })
//         .y(function (d) {
//           return m_this.featureGcsToDisplay(d).y;
//         })
//         .curve(
//           m_this.style.get("closed")(item, idx) && ln.length > 2
//             ? d3.curveLinearClosed
//             : d3.curveLinear
//         );

//       // console.log("_build data", data);
//       // console.log("_build line(item.line)", line(item.line));

//       m_style = {
//         data: [
//           ln.map(function (d, i) {
//             return pos_func(d, i, item, idx);
//           }),
//         ],
//         append: "path",
//         attributes: {
//           d: line(item.line),
//           onclick: "console.log(123)",
//         },
//         id: m_this._svgid() + idx,
//         classes: ["svgLineFeature", "svgSubLine-" + idx, "roi"],
//         visible: m_this.visible,
//         style: style,
//       };
//       m_renderer._removeFeature(m_this._svgid() + idx);
//       m_renderer._drawFeatures(m_style);

//       let m_style2 = {
//         data: [{ x: 0 }],
//         append: "text",
//         attributes: {
//           // d: line(item.line),
//           x: 100,
//           y: 100,
//           onclick: "console.log(123)",
//         },
//         id: m_this._svgid() + idx + "_0",
//         classes: ["svgLineFeature", "svgSubLine-" + idx, "roi"],
//         visible: m_this.visible,
//         style: style,
//       };
//       m_renderer._drawFeatures(m_style2);
//     });

//     // for (i = 0; i < data.length; i += 1) {
//     //   m_renderer._removeFeature(m_this._svgid() + i);
//     // }

//     // for (i = data.length; i < m_maxIdx; i += 1) {
//     //   m_renderer._removeFeature(m_this._svgid() + i);
//     // }
//     // m_maxIdx = data.length;
//     // m_buildTime.modified();
//     // m_this.updateTime().modified();
//     return m_this;
//   };

//   m_this._update = function () {
//     m_this._build();
//     //   console.log("_update", m_this.timestamp(), m_buildTime.timestamp());
//     // if (m_this.timestamp() >= m_buildTime.timestamp()) {
//     //   console.log("_update true");
//     //   m_this._build();
//     // }
//     return m_this;
//   };
//   return m_this;
// };

// // let svg_f = geo.registries.renderers.svg;
// // geo.registries.renderers.svg = (...args) => {
// //   console.log("svg_f");
// //   let m_this = svg_f(...args);

// //   let layer = m_this.layer();
// //   // unbind event
// //   let transform_f = m_this._setTransform;
// //   layer.geoOff(geo.event.pan, transform_f);

// //   m_this._setTransform = () => {};

// //   // m_this._setTransform = () => {
// //   //   console.log("_setTransform");

// //   //   let layer = m_this.layer();
// //   //   let map = layer.map();
// //   //   console.log("_setTransform map", map);

// //   //   let bounds = map.bounds();
// //   //   let width = bounds.width;
// //   //   let height = bounds.height;
// //   //   let m_diagonal = Math.pow(width * width + height * height, 0.5);
// //   //   console.log("_setTransform", width, height, m_diagonal);

// //   //   // left: -45.91318359375001,
// //   //   //  top: 25.799891182088306,
// //   //   //  right: 46.44052734375,
// //   //   //  bottom: -25.165173368663954,
// //   //   //  width: 10280768.07443168,
// //   //   //  height: 5870363.772301536 }
// //   //   // let map = layer.map(),
// //   //   //   upperLeft = map.gcsToDisplay(m_corners.upperLeft, null),
// //   //   //   lowerRight = map.gcsToDisplay(m_corners.lowerRight, null),
// //   //   //   center = map.gcsToDisplay(m_corners.center, null),
// //   //   //   dx,
// //   //   //   dy,
// //   //   //   scale,
// //   //   //   rotation,
// //   //   //   rx,
// //   //   //   ry;

// //   //   // scale =
// //   //   //   Math.sqrt(
// //   //   //     Math.pow(lowerRight.y - upperLeft.y, 2) +
// //   //   //       Math.pow(lowerRight.x - upperLeft.x, 2)
// //   //   //   ) / m_diagonal;
// //   //   // // calculate the translation
// //   //   // rotation = map.rotation();
// //   //   // rx = -m_this.width() / 2;
// //   //   // ry = -m_this.height() / 2;
// //   //   // dx = scale * rx + center.x;
// //   //   // dy = scale * ry + center.y;

// //   //   // console.log("_setTransform", dx, dy, rx, ry, rotation);

// //   //   // transform_f();
// //   // };

// //   return m_this;
// // };

// let svg_renderer_f = geo.registries.renderers.svg;
// geo.registries.renderers.svg = (arg) => {
//   let m_this = {};
//   Object.setPrototypeOf(m_this, svg_renderer_f.prototype);
//   const handler = {
//     getPrototypeOf(target) {
//       return svg_renderer_f.prototype;
//     },
//     set(target, property, value, receiver) {
//       if (property === "_setTransform") m_this[property] = () => {};
//       else m_this[property] = value;
//       return true;
//     },
//     get: function (target, property, receiver) {
//       return m_this[property];
//     },
//   };
//   let proxy = new Proxy({}, handler);
//   svg_renderer_f.call(proxy, arg);

//   console.log("this", m_this);
//   return m_this;
// };

export { geo };
