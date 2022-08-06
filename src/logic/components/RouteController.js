import CoordinatesController from "./CoordinatesController";
import RouteMapController from "./RouteMapController";
import { hasChangesInArray, hasChanges } from "../../js/tools/tools";

class RouteController {

    constructor({ component, componentMap, buttonActivateMap, buttonClear }, Vue) {

        this.coordinatesController = new CoordinatesController(component, Vue);
        this.mapController = new RouteMapController(componentMap, buttonActivateMap, Vue);
        this.buttonClear = buttonClear.component;
        this.buttonActivateMap = buttonActivateMap.component;
        this.value = [];
        this.$Vue = Vue;

        Vue.$bus.$on("clearRoute", () => this.clear());
        Vue.$bus.$on("mapCoordinatesChange", (e) => this.onMapCoordinatesChange(e));
        Vue.$bus.$on("coordinatesChange", (e) => this.onCoordinatesChange(e));
        Vue.$bus.$on("deleteRoute", () => this.clear(false));
    }

    setValue(value) {
        this.value = value || [];

        this.coordinatesController.setValue(this.value);
        this.mapController.setValue(this.value);
        this.mapController.fit();
    }

    acceptEdit() {
        this.mapController.acceptEdit();
    }

    getValue() {
        const result = this.coordinatesController.getValue();
        return result;
    }

    getChanges() {
        const newValue = this.getValue();

        return {
            data: newValue,
            hasChanges: hasChangesInArray(this.value, newValue)
        }
    }

    setDisabled(value) {
        this.coordinatesController.setDisabled(value);
        this.buttonClear.setDisabled(value);
        this.buttonActivateMap.setDisabled(value);
    }

    clear(askForDelete = true) {
        if (askForDelete && this._hasValue()) {
            this.$Vue.$bus.$emit("deleteRoutePopup");
        }
        else {
            this.mapController.clear();
            this.mapController.setValue([]);
            this.coordinatesController.setValue([]);
        }
    }

    _hasValue() {
        let value = this.coordinatesController.getValue();
        if (value && value.length) {
            return true;
        }

        value = this.mapController.getValue();
        return value && value.length;
    }

    onMapCoordinatesChange(coordinates) {
        this.coordinatesController.setValue(coordinates);
    }

    onCoordinatesChange(e) {
        const coordinates = this.coordinatesController.getValue();
        const oldCoordinates = this.mapController.getValue();

        if (hasChangesInArray(oldCoordinates, coordinates)) {
            this.mapController.setValue(coordinates);

            if (e) {
                //при изменении
                const rowNumber = e.rowNumber;
                this.mapController.ensureVisible([coordinates[rowNumber - 1]]);
            }
            else {
                //при удалении координаты               
                this.mapController.fit();
            }
        }
    }

    destroy() {
        this.mapController.destroy();
    }
}

export default RouteController;