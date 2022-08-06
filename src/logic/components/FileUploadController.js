class FileUploadController {

    constructor(form, Vue) {
        this.activeUploadBlock = {};
        this.form = form;
        this.$Vue = Vue;

        Vue.$bus.$on("uploadFile", (e) => this.uploadFile(e));
        Vue.$bus.$on("deleteFile", (e) => this.deleteFile(e));
        Vue.$bus.$on("confirmDeleteFile", () => this.deleteFileReally());

        const uploadBlicksCount = Object.values(this.form.components)
            .filter((item) => item.component === "EPCSUploadBlock")
            .length;

        for (let i = 1; i <= uploadBlicksCount; i++) {
            Vue.$bus.$on(`openFile${i}`, (e) => this.openFile(e));
        }
    }

    uploadFile(e) {
        const component = this.form.getComponentByName(e.formName).component;
        const file = e.file.value[0];

        if (!file.name.endsWith(".pdf")) {
            component.setError("Неверный формат файла");
            return;
        }

        component.addFile(file);
        this.checkAlternativeDocuments(e.formName, true);
    }

    deleteFile(e) {
        this.activeUploadBlock = e;
        this.$Vue.$bus.$emit("confirmDeleteFilePopup");
    }

    deleteFileReally() {
        if (!this.activeUploadBlock) {
            return;
        }

        const component = this.form.getComponentByName(this.activeUploadBlock.formName).component;
        component.deleteFile(this.activeUploadBlock.idx);

        this.checkAlternativeDocuments(this.activeUploadBlock.formName, false);
    }

    checkAlternativeDocuments(formName, add) {
        const alternativeDocuments = ["file4", "file5"];
        if (alternativeDocuments.includes(formName)) {
            for (let docName of alternativeDocuments.filter((name) => name !== formName)) {
                const docComponent = this.form.getComponentByName(docName).component;
                docComponent.setDisabled(add);
            }
        }
    }

    openFile(e) {
        const component = this.form.getComponentByName(e.formName).component;
        component.showFile(e.idx);
    }
}

export default FileUploadController;

