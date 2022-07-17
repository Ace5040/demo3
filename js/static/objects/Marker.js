import EPCSPoint from '../EPCSPoint.js';
import Feature from 'ol/Feature';
import { Style, Icon } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import { Vector } from 'ol/layer';
import 'ol/source';
import 'ol/proj';
import { iconsTypes } from './shipTypes.js';

class Marker extends EPCSPoint {
    constructor(coordinates, options, state) {
        super(coordinates, options);

        this.className = 'Marker';
        this._LonLat = coordinates;
        this._coords = coordinates;

        this.iconFeature = null;
        this.iconStyle = null;
        this.vectorSource = null;
        this.vectorLayer = null;

        return this._initMarker()
    }

    getClassName() {
        return this.className;
    }

    getPosition() {
        return this._coords;
    }



    _initMarker() {
        this._setInstanceFeatureAndStyle();
        this.vectorSource = this._setInstanceVectorSource();
        this.vectorLayer = this._setInstanceVectorLayer();
    }

    _setInstanceFeature() {
        return new Feature({
            geometry: this,
        });
    }

    _setInstanceStyle() {


        return new Style({
            image: new Icon({
                src: iconsTypes['MARKER'],
            }),
        });
    }

    getState() {
        return this.state;
    }

    _setInstanceVectorSource() {

        return new VectorSource({
            features: [this.iconFeature],
        });
    }

    _setInstanceVectorLayer() {
        return new Vector({
            source: this.vectorSource,
            zIndex: 5
        });
    }

    _setInstanceFeatureAndStyle() {
        this.iconFeature = this._setInstanceFeature();
        this.iconStyle = this._setInstanceStyle();
        this.iconFeature.setStyle(this.iconStyle);
    }

    getLayer() {
        return this.vectorLayer;
    }

    _getClearName(name) {
        if((!name.includes('null') && !name.includes('NULL')) && name) {
            return String(name).toUpperCase();
        } else {
            return ''
        }
    }

    _getClearType(type) {
        if(type && (!type.includes('null') && !type.includes('NULL'))) {
            return String(type).toUpperCase();
        } else {
            return 'undefined'
        }
    }

    updateState(coords) {
        this.setCoordinates(coords);
        // Тут мы передаём все обновленные данные и вызывваем методы для их обновления.
        this._coords = coords;

        this.iconStyle = this._setInstanceStyle();
        this.iconFeature.setStyle(this.iconStyle);
    }

    getFeature() {
        return this.iconFeature;
    }
}

export { Marker as default };
