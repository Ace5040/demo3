import { hashId } from "../tools/tools"

class Structure {
    constructor(structure, name) {
        this.name = name;
        this.config = structure.config;
        this.components = structure.components;
        this.footer = structure.footer;
        this.header = structure.header;
        this.idStruct = hashId(String(new Date()) + String(Math.floor(Math.random() * 1000)));
    }

    getStructure() {
        return this;
    }

    getStructComponents() {
        return this.components;
    }

    getFooter() {
        return this.footer;
    }

    getHeader() {
        return this.header;
    }

    getConfig() {
        return this.config;
    }

    getId() {
        return this.idStruct;
    }

}

export default Structure;