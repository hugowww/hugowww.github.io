<script setup>
import { geo } from "./mGeo";
import { ref, onMounted } from "vue";

let annotLayer = null;
onMounted(() => {
  var map = geo.map({
    node: "#map",
    autoshareRenderer: false,
  });
  map.createLayer("osm");

  annotLayer = map.createLayer("annotation", {
    // clickToEdit: true,
    renderer: "webgl",
    showLabels: false,
  });

  var lineData = [
    [
      { x: 20, y: 10 },
      { x: 25, y: 10 },
    ],
    [
      { x: 30, y: 10 },
      { x: 35, y: 12 },
      { x: 32, y: 15 },
    ],
    [
      { x: 30, y: 20 },
      { x: 35, y: 22 },
      { x: 32, y: 25 },
    ],
    [
      { x: 30, y: 30 },
      { x: 35, y: 32 },
      { x: 32, y: 35 },
      { x: 30, y: 30 },
    ],
    [
      { x: 20, y: 20 },
      { x: 22, y: 20 },
      { x: 24, y: 20 },
      { x: 26, y: 20 },
    ],
    [
      { x: 20, y: 30 },
      { x: 25, y: 32 },
      { x: 22, y: 35 },
      { x: 20, y: 35 },
    ],
  ];

let line_f = geo.registries.features.webgl.line;

  var pointFeature = annotLayer
    .createFeature("line")
    .data(lineData)
    .style({
      // use a function for determining if the line should be closed based
      // on where it is in our list of data.
      closed: function (item, itemIndex) {
        return itemIndex === 1 || itemIndex === 3 || itemIndex === 5;
      },
      strokeColor: (item, idx) => {
        console.log("item", item);
        return item.hover !== undefined ? "red" : "black";
      },
      strokeWidth: 2,
    })
    .geoOn(geo.event.feature.mouseover, function (evt) {
      console.log("mouseover", evt);
      evt.data[0].hover = true;

      this.modified();
      this.draw();
      if (!evt.data.hover) {
        evt.data.hover = true;
        this.modified();
        this.draw();
      }
    })
    .geoOn(geo.event.feature.mouseclick, function (evt) {
      evt.data.lon += 1;
      evt.data[1].hover = true;
      this.modified();
      this.draw();
      // this.modified();
      // this.draw();
      console.log("click", evt);
    })
    .draw();

  // annotLayer.geoOn(geo.event.feature.mouseClick, (evt) => {
  //   console.log("evt", evt);
  // });

  console.log("fea", pointFeature);

  // var annotation2 = annotLayer.createFeature("annotation", {
  //   position: { x: 10, y: 10 },
  //   text: "這是一個標註",
  //   style: {
  //     fill: "red",
  //     stroke: "black",
  //     "font-size": "12px",
  //   },
  // });
  // annotation2.on("click", function (event) {
  //   alert("您點擊了標註！");
  // });
  // let annotLayer2 = map.createLayer("annotation", {
  //   // clickToEdit: true,
  //   renderer: "svg",
  //   showLabels: false,
  // });

  annotLayer.geoOn(geo.event.feature.mouseclick, (evt) => {
    console.log("mouseclick", evt);
  });

  console.log("geo", geo);
});

function mode() {
  annotLayer.mode("line", undefined, { data: 123 });
}
</script>

<template>
  <div
    style="height: 600px; width: 100%; background-color: #abc"
    id="map"></div>
  <div
    class="btn btn-primary"
    style="position: fixed; top: 10px; left: 10px; z-index: 9999"
    @click="
      console.log('click');
      mode();
    ">
    mode
  </div>
  <div style="position: relative">
    <svg
      width="100"
      height="100"
      style="
        position: absolute;
        top: 0;
        left: 50pxp;
        pointer-events: all;
        visibility: hidden;
      ">
      <circle
        cx="50"
        cy="50"
        r="40"
        style="visibility: visible"
        fill="blue"
        onclick="alert('Blue circle clicked')" />
    </svg>

    <svg
      width="100"
      height="100"
      style="
        pointer-events: all;
        position: absolute;
        top: 0;
        left: 50px;
        visibility: hidden;
      ">
      <rect
        width="80"
        height="80"
        fill="red"
        style="visibility: visible"
        onclick="alert('Red rectangle clicked')" />
    </svg>
  </div>
</template>

<style>
canvas {
  border: 1px solid black;
}
svg {
  visibility: hidden;
}
.geojs-layer[renderer="svg"] {
  visibility: hidden !important;
}

svg path.roi:hover {
  stroke-width: 5px !important;
}
</style>
