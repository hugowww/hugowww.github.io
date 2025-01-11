let regionData = [
  {
    name: "食物街",
    coord: [
      [121.37078965576228, 25.060305401503506],
      [121.37020820948226, 25.059826034955485],
      [121.37069165919824, 25.059364420951653],
      [121.36928050867597, 25.057914468220247],
      [121.36859453272764, 25.058003241329494],
      [121.36802615265616, 25.05776059467858],
      [121.36712458426693, 25.056949796287032],
      [121.36615115173073, 25.05822813291842],
      [121.37019514327375, 25.060867619139433],
      [121.37078965576228, 25.060305401503506],
    ],
    style: {
      fillColor: { r: 0, g: 0, b: 1 },
      fillOpacity: 0.05,
      stroke: true,
      strokeOpacity: 0.8,
      strokeColor: { r: 0, g: 0, b: 0 },
      strokeWidth: 2,
    },
  },
];

const calculateMean = (arr) => {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  return sum / arr.length;
};

for (let dt of regionData) {
  let coord = dt.coord;
  dt.mx = calculateMean(coord.map((d) => d[0]));
  dt.my = calculateMean(coord.map((d) => d[1]));
}
export { regionData };
