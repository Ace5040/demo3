import Component from './Component.js';
import { Tile } from 'ol/layer';
import { View, Map } from 'ol';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import 'proj4';
import 'ol/proj/proj4';

class EPCSMap extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = 'EPCSMap';
        this.map = null;
        this.baseLayer = null;
        this.col = dataComponent.col;
        this.props = {
            data: {
                mapId: 'map01',
                allLayers: [],
                layerToSend: {}
            }
        };
        this.validateView = ['center', 'zoom'];
        this.validateProps = ['mapId'];
        this._setPropsBeforeCreate(dataComponent);
    }

    _setPropsBeforeCreate(dataComponent) {
        const strProps = dataComponent.props;
        this.validateProps.forEach((prop) => {
            if (strProps[prop]) this.props.data[prop] = strProps[prop];
        });
    }

    getComponentName() {
        return this.nameTemplate
    }


    getProps() {
        return this.props.data
    }

    getInstance() {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.map));
        });
    }

    getMap() {
        return this.map;
    }

    deleteLayer() {
        let layers = this.map.getAllLayers();
        let iterator = 0;
        if(layers.length > 1) {
            layers.forEach(layer => {
                if(iterator) {
                    this.map.removeLayer(layer);
                }
                iterator++;
            });
        }
    }

    setNewView(viewsParameters) {
        Object.keys(viewsParameters).forEach(key => {
            if(this.validateView.includes(key)) viewsParameters[key];
        });
        this.map.setView(new View(viewsParameters));
        this.map.updateSize();
    }

    init(){
        this.map = new Map({
            target: this.props.data.mapId,
            layers: [],
            controls: []
        });

        this.map.setView(new View( {
            center: fromLonLat([80.2, 71.2]),
            zoom: 5,
            minZoom: 5,
            maxZoom: 16
        }));

        this.baseLayer = new Tile({
            source: new OSM({
                crossOrigin: "Anonymous"
            })
        });
        this.map.addLayer(this.baseLayer);
    }

}

export { EPCSMap as default };
