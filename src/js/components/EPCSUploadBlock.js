import Component from "./Component";


class EPCSUploadBlock extends Component {
    constructor(dataComponent) {
        super(dataComponent);
        this.nameTemplate = "EPCSUploadBlock";
        this.props = {
            label: "",
            value: false,
            uploadedFiles: [],
            error: "",
            disabled: false,
            ...dataComponent.props
        };

        this.uploadedFilesObj = [];

        this.setDisabled(this.props.disabled);
    }

    getComponentName() {
        return this.nameTemplate;
    }

    setValue(value) {
        this.props.value = value;
    }

    setDisabled(disabled) {
        this.props.disabled = disabled;
        this.props.uploadBtn.type = disabled ? "disabled" : "main";
    }

    setError(error) {
        this.props.error = error;
    }

    addFile(file) {
        this.props.error = "";
        this.props.uploadedFiles.push(file.name);
        this.uploadedFilesObj.push(file);
    }

    deleteFile(idx) {
        this.props.error = ""
        this.props.uploadedFiles.splice(idx, 1);
        this.uploadedFilesObj.splice(idx, 1);
    }

    getFile(idx) {
        return this.uploadedFilesObj[idx];
    }

    showFile(idx) {
        const file = this.getFile(idx);
        this.props.dataPopup.pdfFile = URL.createObjectURL(file);
    }

    setNotValid(message = "Не заполнено") {
        this.setError(message);
    }
}

export default EPCSUploadBlock;