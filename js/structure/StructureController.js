import Structure from './Structure.js';
import StructurePopup from './StructurePopup.js';

class StructureController {
  constructor(structures) {
    this.allStructures = structures;
    this.allInstanceStructs = {};
    this.allPopupInstanceStructs = {};
    this.allStructuresNames = [];
    this.AllStructuresComponents = {};
    this.allPopupStructures = {};
    this.allPopupStructuresNames = [];
    this._buildStructures(this.allStructures);
    // this._buildPopupStructures(this.allPopupStructures);
    this._getAllComponentsFromStructures();
  }

  _buildStructures(structures) {
    Object.entries(structures).forEach((struct) => {
      let structureType = struct[1].structureType;
      if (structureType === "Form") {
        this.allInstanceStructs[struct[0]] = new Structure(struct[1], struct[0]);
        this.allStructuresNames.push(struct[0]);
      }
      if (structureType === "Popup") {
        this.allPopupInstanceStructs[struct[0]] = new StructurePopup(struct[1], struct[0]);
        this.allPopupStructuresNames.push(struct[0]);
      }
    });
  }

  //По факту не нужный метод, но для понимания картины пусть остаётся.
  getAllStructures() {
    return this.allInstanceStructs;
  }

  getAllPopupStructures() {
    return this.allPopupInstanceStructs;
  }

  getStructureByName(structName) {
    return this.allInstanceStructs[structName];
  }

  getPopupStructureByName(structName) {
    return this.allPopupInstanceStructs[structName];
  }
  

  getStructComponentsByStructureName(structName) {
    return this.allInstanceStructs[structName].getStructComponents();
  }

  _getAllComponentsFromStructures() {
    if (!this.AllStructuresComponents.length) {
      this.allStructuresNames.forEach((struct) => {
        this.AllStructuresComponents[struct] = this.allInstanceStructs[struct].getStructComponents();
      });
    }
    return this.AllStructuresComponents;
  }

  getStructurePopup() {
    return this.allPopupStructures;
  }
}

export { StructureController as default };
