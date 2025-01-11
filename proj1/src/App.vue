<template>
  <div id="container">
    <div id="map" style="background-color: black"></div>
    <div id="info"></div>
    <div id="info2">456</div>
    <div
      style="
        z-index: 999;
        position: absolute;
        top: 0;
        left: 0;
        width: 120px;
        height: 50px;
      "
      class="d-flex flex-column">
      <div class="btn btn-sm btn-primary" @click="EnterMode">draw</div>
      <div class="btn btn-sm btn-primary" @click="Clear">clear</div>
      <div class="btn btn-sm btn-primary" @click="To('home100')">home 100m</div>
      <div class="btn btn-sm btn-primary" @click="To('home200')">home 200m</div>
      <div class="btn btn-sm btn-primary" @click="To('home300')">home 300m</div>
      <div class="btn btn-sm btn-primary" @click="To('home1000')">
        home 1000m
      </div>
      <div class="btn btn-sm btn-primary" @click="To('home2000')">
        home 2000m
      </div>
    </div>
  </div>
</template>
<script setup>
import { geo } from "./mGeo";
import { ref, onMounted } from "vue";
import { displayCenter, data, distanceCircles } from "./data/data";
import { waitList } from "./data/waitList";
import { regionData } from "./data/regionData";

let map;
let annotLayer;
function plotLocations(data) {
  var pointLayer = map.createLayer("feature", { features: ["point"] });
  var pointFeature = pointLayer
    .createFeature("point")
    .data(data)
    .position(function (dt) {
      return {
        x: dt.x,
        y: dt.y,
      };
    })
    .style({
      radius: 3,
    })
    .draw();

  var textLayer = map.createLayer("feature", { features: ["text"] });
  var textFeature = textLayer
    .createFeature("text")
    .data(data)
    .position(function (dt) {
      return {
        x: dt.x,
        y: dt.y,
      };
    })
    .text(function (dt) {
      return dt.name;
    })
    .draw();
  textFeature
    .style({
      fontSize: "12px",
      fontFamily: "serif",
      textAlign: "left",
      textBaseline: "middle",
      color: "white",
      offset: { x: 6, y: 0 },
    })
    .draw();
}

function plotWaitLocations(data) {
  var pointLayer = map.createLayer("feature", { features: ["point"] });
  var pointFeature = pointLayer
    .createFeature("point")
    .data(data)
    .position(function (dt) {
      return {
        x: dt.x,
        y: dt.y,
      };
    })
    .style({
      fillColor: { r: 1, g: 0, b: 0 },
      radius: 3,
    })
    .draw();

  var textLayer = map.createLayer("feature", { features: ["text"] });
  var textFeature = textLayer
    .createFeature("text")
    .data(data)
    .position(function (dt) {
      return {
        x: dt.x,
        y: dt.y,
      };
    })
    .text(function (dt) {
      return dt.name;
    })
    .draw();
  textFeature
    .style({
      fontSize: "12px",
      fontFamily: "serif",
      textAlign: "left",
      textBaseline: "middle",
      color: "white",
      offset: { x: 6, y: 0 },
    })
    .draw();
}

function plotDistanceCircle(data) {
  var layer = map.createLayer("feature", { features: ["polygon"] });

  for (let dt of data) {
    var feature = layer
      .createFeature("polygon")
      .data([dt.coord])
      .position(function (d) {
        return { x: d[0], y: d[1] };
      })
      .style(dt.style)
      .draw();
  }
}

function plotRegion(data) {
  var layer = map.createLayer("feature");

  for (let dt of data) {
    var feature = layer
      .createFeature("polygon")
      .data([dt.coord])
      .position(function (d) {
        return { x: d[0], y: d[1] };
      })
      .style(dt.style)
      .draw();
  }

  var textLayer = map.createLayer("feature", { features: ["text"] });
  var textFeature = textLayer
    .createFeature("text")
    .data(data)
    .position(function (dt) {
      return {
        x: dt.mx,
        y: dt.my,
      };
    })
    .text(function (dt) {
      return dt.name;
    })
    .draw();
  textFeature
    .style({
      fontSize: "42px",
      fontFamily: "serif",
      color: "white",
    })
    .draw();
}

function To(key) {
  let dt = displayCenter[key];
  // map.center(c).zoom(c.zoom);
  map.transition({
    center: { x: dt.x, y: dt.y },
    zoom: dt.zoom,
    duration: 200,
  });
}

onMounted(() => {
  map = geo.map({
    node: "#map",
    autoshareRenderer: false,
    max: 20,
  });
  map.geoOn(geo.event.mousemove, function (evt) {
    $("#info").text(
      "x: " + evt.geo.x.toFixed(6) + ", y: " + evt.geo.y.toFixed(6)
    );
  });
  map.geoOn(geo.event.zoom, function (evt) {
    $("#info2").text("z: " + evt.zoomLevel.toFixed(6));
  });
  map.geoOn(geo.event.mouseclick, function (evt) {
    console.log({
      x: Number(evt.geo.x.toFixed(6)),
      y: Number(evt.geo.y.toFixed(6)),
      name: "",
    });
  });
  let osmLayer = map.createLayer("osm", {keepLower: false, animationDuration: 10000});
  osmLayer.opacity(0.3);
  console.log('osmLayer', osmLayer)

  // to home
  To("home200");

  // plot location
  plotLocations(data);

  // plot concentric circles
  plotDistanceCircle(distanceCircles);

  // plot wait list
  plotWaitLocations(waitList);

  // plot region
  plotRegion(regionData);

  //
  annotLayer = map.createLayer("annotation");
});

function EnterMode() {
  annotLayer.mode("polygon");
  annotLayer.geoOnce(geo.event.annotation.mode, () => {
    let coord = annotLayer.geojson().features[0].geometry.coordinates[0];
    console.log(coord);
  });
}
function Clear() {
  annotLayer.removeAllAnnotations();
}
</script>

<style>
#container {
  height: 100%;
  width: 100%;
  position: relative;
}

html,
body,
#map {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
#info {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.75);
  padding: 2px;
}
#info2 {
  position: absolute;
  top: 28px;
  right: 0;
  background: rgba(255, 255, 255, 0.75);
  padding: 2px;
}
</style>
