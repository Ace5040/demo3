import Component from "./Component"

import { Tile as TileLayer } from "ol/layer"
import { Map, View } from "ol";
import { OSM } from "ol/source";
import { fromLonLat } from "ol/proj";


class EPCSMap extends Component {

  constructor(dataComponent) {
    super(dataComponent)
    this.nameTemplate = "EPCSMap";
    this.map = null;
    this.baseLayer = null;
    this.col = dataComponent.col;

    this.props = {
      mapId: "map01",
      ...dataComponent.props,
    }
  }

  getComponentName() {
    return this.nameTemplate;
  }

  getProps() {
    return this.props;
  }

  init() {
    this.map = new Map({
      target: this.props.mapId,
      layers: [],
      controls: []
    });

    this.map.setView(new View({
      center: fromLonLat([67.35, 74.68]),
      zoom: 3,
      minZoom: 2,
      maxZoom: 18
    }));

    this.baseLayer = new TileLayer({
      source: new OSM({
        crossOrigin: "Anonymous"
      })
    });

    this.map.addLayer(this.baseLayer);
  }
}

export default EPCSMap;
