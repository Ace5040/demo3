import Components from "../../js/components/componentsList";
import { hasChangesInArray } from "../../js/tools/tools";


class AbstractListController {

    constructor(component, minId, structureTemplate, Vue) {
        this.component = component.component;
        this.components = component.components;
        this.parentId = component.id;
        this.value = [];
        this.currentId = minId;
        this.disabled = component.component.props.disabled;
        this.structureTemplate = structureTemplate;
        this.$Vue = Vue;
    }

    getRowCount() {
        return this.components.length;
    }

    getChanges() {
        const value = this.getValue();

        const hasChanges = hasChangesInArray(this.value, value);
        return { hasChanges, value };
    }

    getValue() {
        const result = [];

        for (let rowNumber = 1; rowNumber <= this.getRowCount(); rowNumber++) {
            const rowValue = this._getRowValue(rowNumber);
            if (rowValue && Object.keys(rowValue).length) {
                result.push(rowValue);
            }
        }

        return result;
    }

    _getRowValue(rowNumber) {
        const result = {};

        const addValueToResult = (component, iterationNumber) => {
            if (iterationNumber > 100) {
                return;
            }

            if (!component) {
                return;
            }

            if (component.component && component.component.nameTemplate !== "EPCSDirection") {
                const value = component.component.getValue();
                if (value) {
                    result[component.component.name] = value;
                }
            }

            for (const child of component.components) {
                addValueToResult(child, iterationNumber + 1);
            }
        }

        addValueToResult(this.components[rowNumber - 1], 1);
        return result;
    }

    setValue(value) {
        this.value = value || [];
        this.clear();

        let rowNumber = 1;
        for (let lineData of this.value) {
            this.addLine();

            const components = this.getRowComponents(rowNumber);

            for (const field in components) {
                components[field].setValue(lineData[field]);
            }

            rowNumber++;
        }

        if (this.value.length === 0) {
            this.addLine();
        }

        this.setFirstRowDeleteDisabled();
    }

    getRowComponents(rowNumber) {
        const result = {};

        const addComponentToResult = (component, iterationNumber) => {

            if (iterationNumber > 100) {
                return;
            }

            if (!component) {
                return;
            }

            if (component.component && component.component.nameTemplate !== "EPCSDirection") {
                result[component.component.name] = component.component;
            }

            for (const child of component.components) {
                addComponentToResult(child, iterationNumber + 1);
            }
        }

        addComponentToResult(this.components[rowNumber - 1], 1);
        return result;
    }

    setDisabled(value) {
        this.disabled = value;

        for (let rowNumber = 1; rowNumber <= this.getRowCount(); rowNumber++) {

            const components = this.getRowComponents(rowNumber);
            for (let component of Object.values(components)) {
                component.setDisabled(value);
            }
        }

        if (!this.disabled) {
            this.setFirstRowDeleteDisabled();
        }
    }

    setFirstRowDeleteDisabled() {
        const isFirstRowsDisabled = this.disabled || this.getRowCount() === 1;

        const deleteButton = this.getRowComponents(1).deleteButton;
        if (deleteButton) {
            deleteButton.setDisabled(isFirstRowsDisabled);
        }
    }

    clear() {
        this.components.splice(0, this.components.length);
    }

    addLine(e) {
        const rowNumber = e ? e.rowNumber : this.components.length + 1;

        const componentForVue = this.generateComponentForView();
        this.components.splice(rowNumber, 0, componentForVue);

        this.setDisabled(this.disabled);

        this._recalcRowNumbers();
        this.setFirstRowDeleteDisabled();
    }

    generateComponentForView() {
        const event = this.component.props.event;

        const structure = JSON.parse(JSON.stringify(this.structureTemplate));
        const instances = {};
        for (let component of structure) {
            component.id += this.currentId;
            if (component.parentId) {
                component.parentId += this.currentId;
            }

            if (!component.props.event
                && component.component !== "EPCSDirection") {
                component.props.event = event;
            }

            let { parentId, id, priority, componentName, component: npmComponent } = component;

            if (Components[npmComponent]) {
                instances[componentName] = {
                    component: new Components[npmComponent](component),
                    parentId,
                    id,
                    priority,
                    components: [],
                }
            }
        }
        this.currentId += structure.length;

        const flatTemplate = Object.values(instances);

        const componentsForVue = flatTemplate.reduce(
            (r, component) => (
                !component.parentId
                    ? r.push(component)
                    : flatTemplate.some((x) => {
                        if (x.id === component.parentId) {
                            x.components.push(component), true;
                        } else {
                            false;
                        }
                    }),
                r
            ),
            []
        );

        return componentsForVue[0];
    }

    deleteLine(rowNumber) {
        if (rowNumber === 1 && this.components.length === 1) {
            //единственную строку нельзя удалить
            return;
        }

        this.components.splice(rowNumber - 1, 1);
        this._recalcRowNumbers();

        this.setFirstRowDeleteDisabled();

        const event = this.component.props.event;
        if (event) {
            this.$Vue.$bus.$emit(event);
        }
    }

    _recalcRowNumbers() {
        for (let rowNumber = 1; rowNumber <= this.getRowCount(); rowNumber++) {

            const components = this.getRowComponents(rowNumber);
            for (let component of Object.values(components)) {
                component.props.rowNumber = rowNumber;
            }
        }
    }
}

export default AbstractListController;