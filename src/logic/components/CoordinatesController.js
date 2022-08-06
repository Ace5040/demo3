import coordinatesStructure from "../../js/structureTemplates/lines/coordinatesLine";
import AbstractListController from "../../js/form/AbstractListController";


class CoordinatesController extends AbstractListController {

    constructor(component, Vue) {
        super(component, 1500, coordinatesStructure, Vue);

        Vue.$bus.$on("addCoordinate", (e) => this.addLine(e));
        Vue.$bus.$on("deleteCoordinate", (e) => this.deleteLine(e.rowNumber));

        this.addLine();
        this.addLine();
    }

    getValue() {
        const result = [];

        for (let rowNumber = 1; rowNumber <= this.getRowCount(); rowNumber++) {
            const coordinate = this._getLineValue(rowNumber);
            if (coordinate) {
                result.push(this._fromCustomFormat(coordinate));
            }
        }

        return result;
    }

    _getLineValue(rowNumber) {
        const {
            lat,
            latDirection,
            lon,
            lonDirection
        } = this.getRowComponents(rowNumber);

        const latValue = lat.getValue();
        const lonValue = lon.getValue();

        if ((latValue !== null && latValue !== undefined)
            && (lonValue !== null && lonValue !== undefined)) {

            return {
                lat: latValue,
                latDirection: latDirection.getValue(),
                lon: lonValue,
                lonDirection: lonDirection.getValue(),
            };
        }
    }

    setValue(value) {
        this.value = (value || []).map((coord) => this._toCustomFormat(coord));
        this.clear();

        let rowNumber = 1;
        for (const lineData of this.value) {
            this.addLine();
            this._setLineValue(rowNumber, lineData);
            rowNumber++;
        }

        if (this.value.length === 0) {
            this.addLine();
        }

        if (this.value.length <= 1) {
            this.addLine();
        }

        this.setFirstRowDeleteDisabled();
    }

    _setLineValue(rowNumber, value) {
        const {
            lat,
            latDirection,
            lon,
            lonDirection
        } = this.getRowComponents(rowNumber);

        if (value) {
            lat.setValue(value.lat);
            latDirection.setValue(value.latDirection);
            lon.setValue(value.lon);
            lonDirection.setValue(value.lonDirection);
        }
    }

    _toCustomFormat(coords) {
        let lat = Math.round(coords[1] * 100) / 100;
        let lon = Math.round(coords[0] * 100) / 100;

        if (lon > 180) {
            lon = lon - 360;
        }

        return {
            lat: Math.abs(lat),
            latDirection: lat > 0 ? "N" : "S",
            lon: Math.abs(lon),
            lonDirection: lon > 0 ? "E" : "W"
        }
    }

    _fromCustomFormat(coords) {

        let lon = coords.lonDirection === "E" ? coords.lon : - coords.lon

        if (coords.lonDirection === "W") {
            if (coords.lon > 90) {
                lon = 360 - coords.lon;
            }
        }

        return [lon, coords.latDirection === "N" ? coords.lat : -coords.lat];
    }
}

export default CoordinatesController;