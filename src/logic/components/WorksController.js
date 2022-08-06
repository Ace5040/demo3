import worksStructure from "../../js/structureTemplates/lines/worksLine";
import AbstractListController from "../../js/form/AbstractListController";
import { hasChangesInArray } from "../../js/tools/tools";

class WorksController extends AbstractListController {

    constructor(component, Vue) {

        super(component, 1000, worksStructure, Vue);

        this.workTypeSelectorSource = [];

        Vue.$bus.$on("addWork", (e) => this.addLine(e));
        Vue.$bus.$on("deleteWork", (e) => this.deleteLine(e.rowNumber));
    }

    getValue() {
        const result = [];

        for (let rowNumber = 1; rowNumber <= this.getRowCount(); rowNumber++) {
            const {
                workTypeSelector,
                workTypeDescription,
            } = this.getRowComponents(rowNumber);

            const workTypeId = workTypeSelector.getValue();
            const description = workTypeDescription.getValue();

            if (workTypeId) {
                result.push({
                    workTypeId,
                    description,
                });
            }
        }

        return result;
    }

    getChanges() {
        const works = this.getValue();

        const hasChanges = hasChangesInArray(this.value, works);
        return { hasChanges, data: works };
    }

    addLine(e) {
        super.addLine(e);

        const rowNumber = e ? (e.rowNumber + 1) : this.getRowCount();
        this._refreshSource(rowNumber);
    }

    setValue(value) {
        this.value = value || [];
        this.clear();

        let rowNumber = 1;
        for (let lineData of this.value) {
            this.addLine();

            const {
                workTypeSelector,
                workTypeDescription,
            } = this.getRowComponents(rowNumber);

            if (value) {
                workTypeSelector.setValue(lineData.workTypeId);
                workTypeDescription.setValue(lineData.description);
            }

            rowNumber++;
        }

        if (this.value.length === 0) {
            this.addLine();
        }

        this.setFirstRowDeleteDisabled();
    }

    setSource(source) {
        this.workTypeSelectorSource = source;
        for (let rowNumber = 1; rowNumber <= this.getRowCount(); rowNumber++) {
            this._refreshSource(rowNumber);
        }
    }

    _refreshSource(rowNumber) {
        const {
            workTypeSelector,
        } = this.getRowComponents(rowNumber);

        workTypeSelector.setSource(this.workTypeSelectorSource);
    }
}

export default WorksController;


