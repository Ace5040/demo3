import 'ol/ol.css';
import { transform } from 'ol/proj';
import Draw from 'ol/interaction/Draw';
import 'ol/Map';
import 'ol/View';
import { OSM, Vector } from 'ol/source';
import { Tile, Vector as Vector$1 } from 'ol/layer';

// import * as ol from "ol";
class PolygonDraw {
  constructor(Vue) {
    this.$Vue = Vue;
    this.raster = new Tile({
      source: new OSM(),
    });
    this.source = new Vector({wrapX: false});
    this.vector = new Vector$1({
      source: this.source,
    });
    // this.map = map
    this.typeSelect = document.getElementById('type');
    this.draw = new Draw({
      source: this.source,
      type: "Polygon",
    });
    this.draw.on("drawend", function (e) {
      // console.log("Сработал this.draw.on(\"drawend\", function (e))")
      let points = e.feature.values_.geometry.flatCoordinates;
      points = e.feature.getGeometry().getCoordinates();
      // console.log("points draw",points)
      let returnPoints = points[0].map(coords => {
        return transform(coords,'EPSG:3857', 'EPSG:4326')
      });

      Vue.$bus.$emit("drawEnd", returnPoints);
    });
  }

  getPolygon() {
    return this.draw
  }

  drawEvent(e) {
    console.log('drawEvent(e)', e);
  }

}

export { PolygonDraw as default };
