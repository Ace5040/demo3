
import { View, Feature } from "ol";
import { fromLonLat } from "ol/proj";
import { containsXY } from "ol/extent";
import { Point, MultiLineString } from "ol/geom";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Icon, Style, Stroke } from "ol/style";

import { Tile as TileLayer } from "ol/layer";
import TileWMS from "ol/source/TileWMS";

class RouteMapWrapper {

    constructor(epcsMap) {
        this.layer = null;
        this.map = null;
        this.feature = null;
        this.initParameters = false;

        const oldInit = epcsMap.init;
        epcsMap.init = () => {

            oldInit.bind(epcsMap)();
            setTimeout(() => {
                this.afterInit(epcsMap);
            });
        }
    }

    afterInit(epcsMap) {

        if (this.map) {
            return;
        }

        this.map = epcsMap.map;
        this._addIceLayer();

        if (this.initParameters && this.layer) {

            this.map.addLayer(this.layer);

            if (this.initParameters.ensureVisibleCoordinates) {
                this.ensureVisible(this.initParameters.ensureVisibleCoordinates);
            }

            if (this.initParameters.fit && this.feature) {
                this.fit();
            }
            this.initParameters = null;
        }
    }

    _addIceLayer() {
        const { TileWMSURL = "http://51.250.101.170:8600/geoserver/cmi/wms?", TileWMSURLVersion = "1.1.0" } = process.env;

        const newLayer = new TileLayer({
            source: new TileWMS({
                url: TileWMSURL,
                params: {
                    "LAYERS": "cmi:ice_types",
                    "VERSION": TileWMSURLVersion,
                    "TRANSPARENT": true,
                    "TILED": true,
                },
                serverType: "geoserver",
                transition: 0,
            }),
            opacity: 0.4,
        });

        this.map.addLayer(newLayer);
    }

    getMap() {
        return this.map;
    }

    clear() {
        if (this.map && this.layer) {
            this.map.removeLayer(this.layer);
        }
    }

    addMultiLineString(coords) {

        const flatPoints = coords.map(point => {
            return fromLonLat(point);
        })

        this.feature = new Feature({
            geometry: new MultiLineString([flatPoints], {}),
        });

        this.feature.getGeometry().setCoordinates([flatPoints]);

        const source = new VectorSource({
            features: [this.feature],
        });

        this.layer = new VectorLayer({
            source: source,
            style: new Style({
                stroke: new Stroke({
                    color: "#000",
                    width: 1.6,
                })
            },
            )
        });

        if (this.map) {
            this.map.addLayer(this.layer);
        }
        else {
            this.initParameters = {};
            //выполнится в init()
        }
    }

    addPoint(coords) {

        const feature = new Feature({
            geometry: new Point(fromLonLat(coords)),
        });

        feature.setStyle(new Style({
            image: new Icon({
                src: require("../../assets/pointClick.svg"),
            }),
        }));

        this.layer = new VectorLayer({
            source: new VectorSource({
                features: [feature],
            }),
            zIndex: 5
        });

        if (this.map) {
            this.map.addLayer(this.layer);
        }
    }

    fit() {

        if (!this.map) {
            if (this.initParameters) {
                this.initParameters.fit = true;
                //выполнится в init()
            }
            return;
        }

        this.map.getView().fit(this.feature.getGeometry(), { padding: [8, 8, 8, 8] });
    }

    ensureVisible(lonLatCoords) {

        if (!this.map) {
            if (this.initParameters) {
                this.initParameters.ensureVisibleCoordinates = lonLatCoords;
                //выполнится в init()
            }
            return;
        }

        //если точки не помещаются на текущей карте 
        //- попробовать поправить центрирование
        const coords = lonLatCoords.map((coord) => fromLonLat(coord));
        let extent = this.map.getView().calculateExtent(this.map.getSize());

        let notVisiblePoints = coords
            .filter((coord) => !containsXY(extent, coord[0], coord[1]));

        if (notVisiblePoints.length === 0) {
            return;
        }

        //смещение центра   

        const maxX = Math.max(...notVisiblePoints.map((coord) => coord[0]));
        const minX = Math.min(...notVisiblePoints.map((coord) => coord[0]));
        const maxY = Math.max(...notVisiblePoints.map((coord) => coord[1]));
        const minY = Math.min(...notVisiblePoints.map((coord) => coord[1]));

        const calcShift = (from, to, boarderFrom, boarderTo) => {

            let shift = 0;

            if (to > boarderTo || from < boarderFrom) {
                if (to - from <= boarderTo - boarderFrom) {
                    shift = to > boarderTo ? (to - boarderTo) : (from - boarderFrom);
                }
            }

            return shift;
        }

        const padding = 100000;
        let shiftX = calcShift(minX, maxX, extent[0] + padding, extent[1] - padding);
        let shiftY = calcShift(minY, maxY, extent[2] + padding, extent[3] - padding);

        if (shiftX || shiftY) {

            const currentCenterPoint = this.map.getView().values_.center;

            this.map.setView(new View({
                ...this.map.getView().values_,
                center: [currentCenterPoint[0] + shiftX, currentCenterPoint[1] + shiftY],
            }));

            this.map.updateSize();
        }
    }
}

export default RouteMapWrapper;
