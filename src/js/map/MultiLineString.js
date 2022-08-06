import "ol/ol.css";
import { transform } from "ol/proj";
import Draw from "ol/interaction/Draw";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { getDistanceFromLatLonInKm } from "./tools";
import config from "../../config/config";


class MultiLineString {

    constructor(Vue) {
        this.$Vue = Vue;

        this.raster = new TileLayer({
            source: new OSM(),
        });
        this.source = new VectorSource({ wrapX: false });
        this.vector = new VectorLayer({
            source: this.source,
        });

        this.current = [];

        this.draw = new Draw({
            source: this.source,
            type: "MultiLineString",
            stopClick: true,
            condition: (e) => {
                const coordinate = transform(e.coordinate, "EPSG:3857", "EPSG:4326");
                if (!this.chechPath(coordinate)) {
                    return false;
                }
                this.current.push(coordinate);
                return true;
            }
        });

        this.draw.on("drawend", function (e) {
            let points = e.feature.values_.geometry.flatCoordinates;
            points = e.feature.getGeometry().getCoordinates();

            const returnPoints = points[0].map(coords => {
                return transform(coords, "EPSG:3857", "EPSG:4326");
            });

            this.current = [];

            Vue.$bus.$emit("drawEnd", returnPoints);
        });

    }

    getMarker() {
        return this.draw;
    }

    getCurrentValue() {
        return this.current;
    }

    chechPath(coordinate) {
        //проверка слишком долгий путь
        if (!this.current.length) {
            return true;
        }

        if (!config.maxDistancePathKm) {
            return true;
        }

        const lastCoordinate = this.current[this.current.length - 1];
        const distance = getDistanceFromLatLonInKm(lastCoordinate[1], lastCoordinate[0], coordinate[1], coordinate[0]);

        if (distance > config.maxDistancePathKm) {
            return false;
        }
        return true;
    }
}

export default MultiLineString;