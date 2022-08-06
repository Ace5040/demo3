import MultiLineString from "../../js/map/MultiLineString";
import RouteMapWrapper from "../../js/map/RouteMapWrapper";


class RouteMapController {

    constructor(component, buttonActivate, Vue) {
        this.map = new RouteMapWrapper(component.component);
        this.$Vue = Vue;
        this.marker = null;
        this.value = []; //координаты
        this.isEditing = false;
        this.activateButton = buttonActivate.component;

        Vue.$bus.$on("activateRouteMap", () => this.activateEdit());
        Vue.$bus.$on("drawEnd", (e) => this.deactivateEdit(e));

        this._keydownListener = (e) => this.handleKeydown(e);
        document.addEventListener("keydown", this._keydownListener);
    }

    clear() {
        if (this.isEditing) {
            this._removeInteraction();
        }
        this.map.clear();
    }

    activateEdit() {
        this.clear();
        this._addInteraction();
    }

    deactivateEdit(coordinates) {
        this._removeInteraction();

        this.$Vue.$bus.$emit("mapCoordinatesChange", coordinates);

        this.setValue(coordinates, false, false);
    }

    acceptEdit() {
        if (this.isEditing) {
            const coordinates = this.marker.getCurrentValue();
            if (coordinates && coordinates.length) {
                this.deactivateEdit(coordinates);
            }
        }
    }

    _addInteraction() {
        this.isEditing = true;
        this.marker = new MultiLineString(this.$Vue);
        const mapInstance = this.map.getMap();
        mapInstance.addInteraction(this.marker.getMarker());
        this._refreshActivateButton();
    }

    _removeInteraction() {
        const mapInstance = this.map.getMap();
        mapInstance.removeInteraction(this.marker.getMarker());
        this.isEditing = false;
        this._refreshActivateButton();
    }

    _refreshActivateButton() {
        this.activateButton.getProps().isPressed = this.isEditing;
    }

    handleKeydown(e) {
        if (e.key === "Escape") {
            if (this.isEditing) {
                //нажали ESC во время редактирования
                this._removeInteraction();
            }
        }
    }

    setValue(value) {
        this.clear();
        this.value = value;

        this.draw(value);
    }

    draw(coordinates) {
        if (!coordinates || !coordinates.length) {
            return;
        }

        if (coordinates.length === 1) {
            this.map.addPoint(coordinates[0]);
        }
        else {
            this.map.addMultiLineString(coordinates);
        }
    }

    fit() {
        this.map.fit();
    }

    ensureVisible(coordinates) {
        this.map.ensureVisible(coordinates);
    }

    getValue() {
        if (this.isEditing) {
            const coordinates = this.marker.getCurrentValue();
            if (coordinates && coordinates.length) {
                return coordinates;
            }
        }

        return this.value;
    }

    destroy() {
        document.removeEventListener("keydown", this._keydownListener);
    }
}

export default RouteMapController;