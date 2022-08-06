import Component from "./Component";


class FormTemplate extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "FormTemplate";
        this.componentName = dataComponent.componentName;

        this.props = {
            ...dataComponent.props
        };
    }

    getComponentName() {
        return this.nameTemplate;
    }

    load(data) {
        this.props = data;
    }
}

export default FormTemplate;