let displayCenter = {
  home300: {
    x: 121.366489,
    y: 25.057202,
    zoom: 17,
  },
  home1000: {
    x: 121.366489,
    y: 25.057202,
    zoom: 15.3,
  },
  home2000: {
    x: 121.366489,
    y: 25.057202,
    zoom: 14.3,
  },
};

let data = [
  {
    x: 121.3665,
    y: 25.0572,
    name: "住家",
  },
  {
    x: 121.3768,
    y: 25.0501,
    name: "達明機器人",
  },
  {
    x: 121.3698,
    y: 25.0604,
    name: "機場捷運A8",
  },
  {
    x: 121.367897,
    y: 25.0527839,
    name: "四季田蔬果行",
  },
  {
    x: 121.3655266,
    y: 25.0535164,
    name: "加水站",
  },
  {
    x: 121.3646434,
    y: 25.0569807,
    name: "加油站",
  },
  {
    x: 121.3656397,
    y: 25.0573112,
    name: "家樂福",
  },
  {
    x: 121.3656397,
    y: 25.0573112,
    name: "家樂福",
  },
  {
    x: 121.3724916,
    y: 25.0555232,
    name: "蝦皮復興店",
  },
  {
    x: 121.3643156,
    y: 25.0594501,
    name: "蝦皮文化店",
  },
  {
    x: 121.3676703,
    y: 25.0590166,
    name: "肯德基",
  },
  {
    x: 121.3662193,
    y: 25.0586697,
    name: "Sukiya",
  },
];

function generatePolygonPoints(center, n, radius) {
  const cx = center.x;
  const cy = center.y;
  const points = [];

  for (let i = 0; i < n; i++) {
    const angle = (i / n) * 2 * Math.PI; // 計算每個點的角度
    const x = cx + radius * Math.cos(angle); // 計算 x 坐標
    const y = cy + radius * Math.sin(angle); // 計算 y 坐標
    points.push([x, y]);
  }
  return points;
}

// x: 121.3665,
// y: 25.0572,
// x: 121.3768,
// y: 25.0501,
// 1250m
let dx = 121.3768 - 121.3665;
let dy = 25.0572 - 25.0501;
let d = Math.sqrt(dx * dx + dy * dy);
let mToXY = d / 1250;
let distanceCircles = [
  {
    style: {
      fillColor: { r: 1, g: 0, b: 0 },
      fillOpacity: 0.05,
      stroke: true,
      strokeOpacity: 0.8,
      strokeColor: { r: 0, g: 0, b: 0 },
      strokeWidth: 2,
    },
    coord: generatePolygonPoints({ x: 121.3665, y: 25.0572 }, 100, 300 * mToXY),
  },
  {
    style: {
      fillColor: { r: 0, g: 1, b: 0 },
      fillOpacity: 0.05,
      stroke: true,
      strokeOpacity: 0.8,
      strokeColor: { r: 0, g: 0, b: 0 },
      strokeWidth: 2,
    },
    coord: generatePolygonPoints(
      { x: 121.3665, y: 25.0572 },
      100,
      1000 * mToXY
    ),
  },
  {
    style: {
      fillColor: { r: 0, g: 0, b: 1 },
      fillOpacity: 0.05,
      stroke: true,
      strokeOpacity: 0.8,
      strokeColor: { r: 0, g: 0, b: 0 },
      strokeWidth: 2,
    },
    coord: generatePolygonPoints(
      { x: 121.3665, y: 25.0572 },
      100,
      2000 * mToXY
    ),
  },
];

export { displayCenter, data, distanceCircles };
