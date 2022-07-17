import EPCSPolygon from './EPCSPolygon.js';
import Feature from 'ol/Feature';
import { Style, Fill, Stroke } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { Vector } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import './shipTypes.js';
import 'ol/events/Event';

function fromLonLatArr(coords) {
  return coords.map(point => {
    return fromLonLat(point)
  })
}

class ProtectedZonePolygon extends EPCSPolygon {
  constructor(coordinates, options, state) {
    // super(coordinates, options)
    super([fromLonLatArr(coordinates)], options);
    this.className = 'ProtectedZonePolygon';
    this._LonLat = coordinates;
    this._coords = fromLonLatArr(coordinates);
    // this._name = this._getClearName(state.name);
    // this._nameLat = this._getClearName(state.name_lat);
    // this._id = state.id;
    this.polygonFeature = null;
    this.polygonStyle = null;
    this.vectorSource = null;
    this.vectorLayer = null;
    this.state = state;
    this._visible = true;
    this.targetMode = false;
    // this.eventShipUpdate = new BaseEvent(`protectedZonePolygonUpdate${this._id}`)
    this.afterUpdatePosition = false;

    return this._initPolygon()
  }

  getShipName() {
    return this._nameLat;
  }

  getImo() {
    return this._imo;
  }

  getMmsi() {
    return this._mmsi;
  }

  getEventId() {
    return this.eventShipUpdate.type;
  }

  getEvent() {
    return this.eventShipUpdate;
  }

  getClassName() {
    return this.className;
  }

  getPosition() {
    return this._coords;
  }

  setTargetMode(mode) {
    this.targetMode = mode;
  }

  getTargetMode() {
    return this.targetMode;
  }

  _initPolygon() {
    this._setInstanceFeatureAndStyle();
    this.vectorSource = this._setInstanceVectorSource();
    this.vectorLayer = this._setInstanceVectorLayer();
    this.setCoordinates([this._coords]);
    // console.log('this.coordinates', this.coordinates)
    // this.setCoordinates(this._LonLat)
  }

  _setInstanceFeature() {
    return new Feature({
      geometry: this,
    });
  }

  _setInstanceStyle() {
    return new Style({
      fill: new Fill({
        color: "rgba(137, 188, 233, 0.5)",
      }),
      stroke: new Stroke({
        color: "#325a8f",
        width: 1.6,
      })
    });
  }

  getState() {
    return this.state;
  }

  _setInstanceVectorSource() {
    console.log('this.polygonFeature', this.polygonFeature);
    return new VectorSource({
      features: [this.polygonFeature],
    });
  }

  _setInstanceVectorLayer() {
    return new Vector({
      source: this.vectorSource,
      zIndex: 5
    });
  }

  _setInstanceFeatureAndStyle() {
    this.polygonFeature = this._setInstanceFeature();
    this.polygonStyle = this._setInstanceStyle();
    console.log('this.polygonStyle', this.polygonStyle);
    console.log('this.polygonFeature', this.polygonFeature);
    this.polygonFeature.setStyle(this.polygonStyle);
  }

  getLayer() {
    return this.vectorLayer;
  }

  _getClearName(name) {
    if ((!name.includes('null') && !name.includes('NULL')) && name) {
      return String(name).toUpperCase();
    } else {
      return ''
    }
  }

  _getClearType(type) {
    if (type && (!type.includes('null') && !type.includes('NULL'))) {
      return String(type).toUpperCase();
    } else {
      return 'undefined'
    }
  }

  updateState(coords, {}, state) {
    this.setCoordinates(fromLonLat(coords));
    this._name = this._getClearName(state.name);
    this._nameLat = this._getClearName(state.name_lat);
    this._imo = state.imo;
    this._course = state.course;

    if (fromLonLat(coords)[0] === this._coords[0] && fromLonLat(coords)[1] === this._coords[1]) {
      this.setUpdatePosition(false);
    } else {
      this.setUpdatePosition(true);
    }

    this._coords = fromLonLat(coords);


    this.iconStyle = this._setInstanceStyle();
    this.iconFeature.setStyle(this.iconStyle);
    this.dispatchEvent(this.eventShipUpdate);
  }

  getId() {
    return this._id;
  }

  getFeature() {
    return this.iconFeature;
  }

  getVisible() {
    return this._visible;
  }

  setUpdatePosition(statePos) {
    this.afterUpdatePosition = statePos;
  }

  getUpdatePosition() {
    return this.afterUpdatePosition;
  }

  setVisible(visible) {
    this._visible = visible;
    this.vectorLayer.setVisible(visible);
  }
}

export { ProtectedZonePolygon as default };
