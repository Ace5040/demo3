import { isEqualFormInputValues, getFullName, isEmptyValue, notify } from "../../js/tools/tools";
import api from "../../api";
import WorksController from "../components/WorksController";
import FileUploadController from "../components/FileUploadController";
import config from "../../config/config";
import RouteController from "../components/RouteController";
import PeriodController from "../components/PeriodController";


class ApplicationFloatDetailForm {

  constructor(form, Vue) {
    this.form = form;
    this.$Vue = Vue;
    this.lastNameBtnMarker = "";
    this.disableActions = false;

    this.cargoTypeSelector = this.form.getComponentByName("cargoTypeId").component;
    this.hazardClassSelector = this.form.getComponentByName("hazardClassId").component;
    this.shipSelector = this.form.getComponentByName("shipId").component;
    this.flagSelector = this.form.getComponentByName("ship.flagId").component;
    this.shipTypeSelector = this.form.getComponentByName("ship.shipTypeId").component;
    this.iceClassSelector = this.form.getComponentByName("ship.iceClass").component;
    this.applicantStatusSelector = this.form.getComponentByName("applicantStatus").component;
    this.applicantSelector = this.form.getComponentByName("applicantId").component;
    this.footer = this.form.getComponentByName("footer").component;
    this.tabs = this.form.getComponentByName("ApplicationFloatDetailTabs").component;

    this.worksController = new WorksController(this.form.getComponentByName("works"), this.$Vue);
    this.fileUploadController = new FileUploadController(this.form, this.$Vue);
    this.routeController = new RouteController({
      component: this.form.getComponentByName("route"),
      componentMap: this.form.getComponentByName("routeMap"),
      buttonActivateMap: this.form.getComponentByName("activateRouteMapButton"),
      buttonClear: this.form.getComponentByName("clearRouteButton")
    },
      this.$Vue);

    this.periodController = new PeriodController(
      this.form.getComponentByName("etaNsr").component,
      this.form.getComponentByName("etdNsr").component,
      Vue);

    this.bindData();

    this.$Vue.store.dispatch(this.getDictStoreName("loadCargoTypes"));
    this.$Vue.store.dispatch(this.getDictStoreName("loadHazardClasses"));
    this.$Vue.store.dispatch(this.getDictStoreName("loadAvailableShips"));
    this.$Vue.store.dispatch(this.getDictStoreName("loadCountries"));
    this.$Vue.store.dispatch(this.getDictStoreName("loadShipTypes"));
    this.$Vue.store.dispatch(this.getDictStoreName("loadIceClasses"));
    this.$Vue.store.dispatch(this.getDictStoreName("loadUserCompanies"));
    this.$Vue.store.dispatch(this.getDictStoreName("loadWorkTypes"));

    const { id, copyId, specimen } = this.form.metaData;
    if (id) {
      this.$Vue.store.dispatch(this.getStoreName("loadApplicationFloat"), id);
    }
    else if (copyId) {
      this.$Vue.store.dispatch(this.getStoreName("loadCopiedApplicationFloat"), copyId);
    }
    else {
      this.$Vue.store.dispatch(this.getStoreName("loadEmptyApplicationFloat"), specimen);
    }

    if (this.form.metaData.disabled) {
      this.setDisabled();
    }

    Vue.$bus.$on("applicantStatusChange", (e) => this.onApplicantStatusChange(e));
    Vue.$bus.$on("selectShip", (e) => this.onSelectShip(e));
    Vue.$bus.$on("selectCompany", (e) => this.onSelectCompany(e));
    Vue.$bus.$on("saveApplicationFloat", () => this.saveAndClose(false));
    Vue.$bus.$on("saveApplicationFloatDraft", () => this.saveAndClose(true));
    Vue.$bus.$on("backFromApplicantFloatDetail", () => this.back());

    Vue.$bus.$on("saveChanges", () => this.saveAndClose(null));
    Vue.$bus.$on("getAsyncShips", () => this.getAsyncShips());
  }

  getSelectorDataSource({ dictionaryName, idField = "id", nameField = "name", addEmpty = true }) {

    const dictionary = this.$Vue.store.getters[this.getDictStoreName(dictionaryName)];
    const items = dictionary.map((item) => {
      return {
        id: item[idField],
        name: item[nameField],
      }
    });

    if (addEmpty) {
      items.unshift({
        id: null,
        name: "",
      });
    }

    return items;
  }

  // getShipSelectorDataSource() {
  //   const dictionary = this.$Vue.store.getters["dictionariesStore/availableShips"];
  //   const items = dictionary.map((item) => {
  //     return {
  //       id: item.id,
  //       name: item.name + " IMO: " + item.imo,
  //       imo: item.imo
  //     }
  //   });

  //   items.unshift({
  //     id: null,
  //     name: "",
  //     imo: null
  //   });

  //   return items;
  // }

  bindData() {
    this.unsubscribe = this.$Vue.store.subscribe((action) => {

      if (action.type === this.getDictStoreName("setCargoTypes")) {
        this.cargoTypeSelector.setSource(this.getSelectorDataSource({ dictionaryName: "cargoTypes" }));
      }

      if (action.type === this.getDictStoreName("setHazardClasses")) {
        this.hazardClassSelector.setSource(this.getSelectorDataSource({ dictionaryName: "hazardClasses" }));
      }

      if (action.type === this.getDictStoreName("setAvailableShips")) {
        // const items = this.getShipSelectorDataSource();
        // console.log("items", items);
        // this.shipSelector.setDataSource(items);
        this.$Vue.$bus.$emit("putAsyncShip", action.payload);
      }

      if (action.type === this.getDictStoreName("setCountries")) {
        this.flagSelector.setSource(this.getSelectorDataSource({
          dictionaryName: "countries",
          idField: "isoCountryCode",
        }));
      }

      if (action.type === this.getDictStoreName("setShipTypes")) {
        this.shipTypeSelector.setSource(this.getSelectorDataSource({ dictionaryName: "shipTypes" }));
      }

      if (action.type === this.getDictStoreName("setIceClasses")) {
        this.iceClassSelector.setSource(this.getSelectorDataSource({
          dictionaryName: "iceClasses",
          idField: "iceClass",
          nameField: "iceClass",
        }));
      }

      if (action.type === this.getDictStoreName("setCompanies")) {
        this.applicantSelector.setSource(this.getSelectorDataSource({
          dictionaryName: "companies",
          addEmpty: false,
        }));
      }

      if (action.type === this.getDictStoreName("setWorkTypes")) {
        this.worksController.setSource(this.getSelectorDataSource({
          dictionaryName: "workTypes",
          addEmpty: true,
        }));
      }

      //set Data

      if (action.type === this.getStoreName("setApplicationFloat")) {
        const applicationFloat = this.$Vue.store.getters[this.getStoreName("applicationFloat")];
        console.log("applicationFloat", applicationFloat);

        if (!applicationFloat) {
          this.handleLoadingError();
          return;
        }

        if (applicationFloat.statusId !== config.statuses.Draft) {
          //если не Черновик
          this.footer.getProps().middleLabel = "";
        }

        for (const field of Object.keys(applicationFloat)) {
          const component = this.form.getComponentByName(field);
          if (component) {
            component.component.setValue(applicationFloat[field]);
          }
        }
      }

      if (action.type === this.getStoreName("setApplicationFloatApplicant")) {
        const applicationFloat = this.$Vue.store.getters[this.getStoreName("applicationFloat")];
        let applicant = applicationFloat.applicant;
        //console.log("applicant", applicant);

        if (!applicant) {
          applicant = this.$Vue.store.getters[this.getStoreName("emptyApplicant")];
        }

        const applicantStatus = this.applicantStatusSelector.getValue();
        this.setApplicantMode(applicantStatus, applicant.type);

        const applicantSelectorValue = this.applicantSelector.getValue();
        if (applicant.id && !applicantSelectorValue) {
          this.applicantSelector.getSource().push({
            id: applicant.id,
            name: applicant.name,
          });
          this.applicantSelector.setValue(applicant.id);
        }

        for (const field of Object.keys(applicant)) {
          if (field === "directorName") {
            const director = getFullName(applicant.directorSurname, applicant.directorName, applicant.directorPatronymic);
            this.form.getComponentByName(`applicant.director`).component.setValue(director);
            continue;
          }
          if (field === "directorSurname" || field === "directorPatronymic") {
            continue;
          }

          if (field === "responsibleName") {
            const responsible = getFullName(applicant.responsibleSurname, applicant.responsibleName, applicant.responsiblePatronymic);
            this.form.getComponentByName(`applicant.responsible`).component.setValue(responsible);
            continue;
          }
          if (field === "responsibleSurname" || field === "responsiblePatronymic") {
            continue;
          }

          const component = this.form.getComponentByName(`applicant.${field}`);
          if (component) {
            component.component.setValue(applicant[field]);
          }
        }
      }

      if (action.type === this.getStoreName("setApplicationFloatShip")) {
        const applicationFloat = this.$Vue.store.getters[this.getStoreName("applicationFloat")];
        let ship = applicationFloat.ship;
        //console.log("ship", ship);

        if (!ship) {
          ship = this.$Vue.store.getters[this.getStoreName("emptyShip")];
        }

        const shipSelectorValue = this.shipSelector.getValue();
        if (ship.id && !shipSelectorValue) {
          const shipsSource = this.$Vue.store.getters[this.getDictStoreName("availableShips")];
          shipsSource.push(ship);
          this.$Vue.$bus.$emit("putAsyncShip", shipsSource);
          this.shipSelector.setValue(ship.id);
        }

        for (const field of Object.keys(ship)) {
          const component = this.form.getComponentByName(`ship.${field}`);
          if (component) {
            component.component.setValue(ship[field]);
          }
        }
      }

      if (action.type === this.getStoreName("setApplicationFloatWorks")) {
        const applicationFloat = this.$Vue.store.getters[this.getStoreName("applicationFloat")];
        this.worksController.setValue(applicationFloat.works);
      }

      if (action.type === this.getStoreName("setApplicationFloatTrack")) {
        const applicationFloat = this.$Vue.store.getters[this.getStoreName("applicationFloat")];
        const points = applicationFloat.track && applicationFloat.track.trackPoints ?
          applicationFloat.track.trackPoints
            .map((p) => p.cposition.coordinates)
          : [];

        this.routeController.setValue(points);
      }
    })
  }

  onApplicantStatusChange(e) {
    const applicantStatus = e.value;

    const applicationFloat = this.$Vue.store.getters[this.getStoreName("applicationFloat")];
    const applicant = applicationFloat.applicant;
    const applicantType = applicant ? applicant.type : 0;

    this.setApplicantMode(applicantStatus, applicantType);

    //TODO автоматическая подстановка организации

    // const companies = this.$Vue.store.getters["applicationFloatStore/companies"];


    // if (companies.length === 1) {
    //   this.companiesSelector.getProps().disabled = true;
    //   this.companiesSelector.setValue(companies[0].id);
    // }
  }

  setApplicantMode(applicantStatus, applicantType) {

    const setDirectorMode = (applicantStatus, applicantType) => {
      const director = this.form.getComponentByName("applicant.director").component;

      switch (applicantStatus) {
        case 0: {
          //Судовладелец
          if (applicantType === 0) {
            //Юр. лицо
            director.hidden = false;
            director.props.placeholder = "Укажите ФИО руководителя";
            director.props.label = "ФИО руководителя заявителя";
          }
          else {
            //Физ. лицо
            director.hidden = true;
          }
          break;
        }
        case 1: {
          //Представитель судовладельца
          director.hidden = false;
          director.props.placeholder = "Укажите ФИО руководителя (подписанта)";
          director.props.label = "ФИО руководителя (подписанта)";
          break;
        }
        case 2: {
          //Капитан судна
          director.hidden = false;
          director.props.placeholder = "Укажите ФИО руководителя";
          director.props.label = "ФИО руководителя заявителя";
          break;
        }
      }
    }

    const setNameMode = (applicantType) => {
      const name = this.applicantSelector;

      if (applicantType === 1) {
        //Физ. лицо
        name.props.label = "Заявитель";
        name.props.placeholder = "Укажите заявителя";
      }
      else {
        name.props.label = "Полное наименование организации";
        name.props.placeholder = "Укажите полное наименование организации";
      }
    }

    const setPhoneMode = (applicantType) => {
      const phone = this.form.getComponentByName("applicant.telephone").component;

      if (applicantType === 1) {
        //Физ. лицо
        phone.props.label = "Телефон";
      }
      else {
        phone.props.label = "Телефон организации";
      }
    }

    const setEmailMode = (applicantType) => {
      const email = this.form.getComponentByName("applicant.email").component;

      if (applicantType === 1) {
        //Физ. лицо
        email.props.label = "Электронная почта";
      }
      else {
        email.props.label = "Электронная почта организации";
      }
    }

    const setResponsbileNameMode = (applicantStatus, applicantType) => {
      const responsibleName = this.form.getComponentByName("applicant.responsible").component;

      switch (applicantStatus) {
        case 0: {
          //Судовладелец
          if (applicantType === 1) {
            //Физ. лицо
            responsibleName.props.label = "ФИО заявителя";
            responsibleName.props.placeholder = "Укажите ФИО заявителя";
          }
          else {
            responsibleName.props.label = "ФИО ответственного лица";
            responsibleName.props.placeholder = "Укажите ФИО ответственного лица";
          }
          break;
        }
        case 2: {
          //Капитан судна
          responsibleName.props.label = "ФИО заявителя";
          responsibleName.props.placeholder = "Укажите ФИО заявителя";
          break;
        }
      }
    }

    setDirectorMode(applicantStatus, applicantType);
    setPhoneMode(applicantType);
    setEmailMode(applicantType);
    setNameMode(applicantType);
    setResponsbileNameMode(applicantStatus, applicantType);

    const responsiblePhone = this.form.getComponentByName("applicant.responsibleTelephone").component;
    const responsibleEmail = this.form.getComponentByName("applicant.responsibleEmail").component;
    const fax = this.form.getComponentByName("applicant.fax").component;

    if (applicantType === 1) {
      //Физ. лицо
      responsiblePhone.hidden = true;
      responsibleEmail.hidden = true;
      fax.hidden = true;
    }
    else {
      responsiblePhone.hidden = false;
      responsibleEmail.hidden = false;
      fax.hidden = false;
    }


    const responsibleName = this.form.getComponentByName("applicant.responsible").component;
    const responsiblePost = this.form.getComponentByName("applicant.responsiblePost").component;
    const responsibleSignature = this.form.getComponentByName("applicant.responsibleSignature").component;
    const shipOwner = this.form.getComponentByName("shipOwnerName").component;
    const shipOwnerEmptySpace = this.form.getComponentByName("emptySpace3").component;


    switch (applicantStatus) {
      case 0: {
        //Судовладелец
        responsibleName.hidden = false;
        shipOwner.hidden = true;
        shipOwnerEmptySpace.hidden = true;
        if (applicantType === 1) {
          //Физ. лицо
          responsiblePost.hidden = true;
          responsibleSignature.hidden = true;
        }
        else {
          responsiblePost.hidden = false;
          responsibleSignature.hidden = false;
        }
        break;
      }
      case 1: {
        //Представитель судовладельца
        responsibleName.hidden = true;
        responsiblePost.hidden = true;
        responsibleSignature.hidden = true;
        shipOwner.hidden = false;
        shipOwnerEmptySpace.hidden = false;
        break;
      }
      case 2: {
        //Капитан судна
        responsibleName.hidden = false; //ФИО заявителя
        responsiblePost.hidden = true;
        responsibleSignature.hidden = true;
        shipOwner.hidden = true;
        shipOwnerEmptySpace.hidden = true;
        break;
      }
    }
  }

  onSelectShip(e) {
    const shipId = e.value;

    const ships = this.$Vue.store.getters[this.getDictStoreName("availableShips")];
    const ship = ships.find((item) => item.id === shipId);
    this.$Vue.store.commit(this.getStoreName("setApplicationFloatShip"), ship);
  }

  onSelectCompany(e) {
    const companyId = e.value;
    if (companyId === undefined) {
      return;
    }

    const companies = this.$Vue.store.getters[this.getDictStoreName("companies")];
    const company = companies.find((item) => item.id === companyId);
    this.$Vue.store.commit(this.getStoreName("setApplicationFloatApplicant"), company);
  }

  setDisabled() {
    this.form.setDisabled();

    this.worksController.setDisabled(true);
    this.routeController.setDisabled(true);

    this.footer.getProps().rightLabel = "";
    this.footer.getProps().middleLabel = "";
  }

  validate(applicationFloat) {

    const emptyRequiredComponents = this.form.components
      .filter((component) => component.props && component.props.labelRequired)
      .map((component) => this.form.getComponentByName(component.componentName).component)
      .filter((component) =>
        !component.props.disabled
        && isEmptyValue(component.props.value)
        && component.nameTemplate !== "EPCSUploadBlock"
      );

    // Если не все обязательные поля заполнены
    if (emptyRequiredComponents.length > 0) {
      for (const component of emptyRequiredComponents) {
        component.setNotValid();
      }
    }

    const emptyRequiredFiles = this.form.components
      .filter((component) => component.props && component.props.labelRequired)
      .map((component) => this.form.getComponentByName(component.componentName).component)
      .filter((component) =>
        !component.props.disabled
        && component.nameTemplate === "EPCSUploadBlock"
        && !component.props.uploadedFiles.length
      );

    // Если не все обязательные документы
    if (emptyRequiredFiles.length > 0) {
      for (const component of emptyRequiredFiles) {
        component.setNotValid();
      }
    }

    if (applicationFloat.etaNsr
      && applicationFloat.etdNsr
      && applicationFloat.etaNsr > applicationFloat.etdNsr) {

      const component = this.form.getComponentByName("etaNsr").component;
      component.setNotValid("Дата начала больше даты окончания");
    }

    // Если не все обязательные поля заполнены, то выдаем ошибку
    if (emptyRequiredComponents.length > 0) {
      notify("Обязательные данные не заполнены. Вы можете сохранить черновик и вернуться к его заполнению позже");
      this.scrollToComponent(emptyRequiredComponents[0]);
      return false;
    }

    // Если не все обязательные документы, то выдаем ошибку
    if (emptyRequiredFiles.length > 0) {
      notify("Обязательные документы не загружены. Вы можете сохранить черновик и вернуться к его заполнению позже");
      this.scrollToComponent(emptyRequiredFiles[0]);
      return false;
    }

    // if (applicationFloat.etaNsr
    //   && applicationFloat.etdNsr
    //   && applicationFloat.etaNsr > applicationFloat.etdNsr) {

    //   notify("Дата начала плавания не должна быть позже даты окончания плавания");
    //   this.scrollToComponent(component);
    //   return false;
    // }

    return true;
  }

  scrollToComponent(component) {
    if (component.nameTemplate === "EPCSUploadBlock") {
      this.tabs.setSelectedIndex(1);
    }
    else {
      this.tabs.setSelectedIndex(0);
    }
    component.scrollIntoView();
  }

  getChanges(isDraft) {
    let applicationFloatHasChanges = false;

    const initialApplicationFloat = this.$Vue.store.getters[this.getStoreName("applicationFloat")];
    const applicationFloat = JSON.parse(JSON.stringify(initialApplicationFloat));

    delete applicationFloat.ship;
    delete applicationFloat.applicant;
    delete applicationFloat.works;
    delete applicationFloat.track;

    const { id } = this.form.metaData;
    if (!id) {
      delete applicationFloat.id;
    }

    for (const field of Object.keys(applicationFloat)) {
      const component = this.form.getComponentByName(field);
      if (component) {
        const value = component.component.getValue(field);
        const oldValue = applicationFloat[field];


        if (!isEqualFormInputValues(value, oldValue)) {
          applicationFloatHasChanges = true;
          applicationFloat[field] = value;
        }
      }
    }

    let isSend = false;

    if (!isDraft
      && applicationFloat.statusId === config.statuses.Draft) { //Черновик

      applicationFloat.statusId = config.statuses.New; //Новое
      isSend = true;
      applicationFloatHasChanges = true;
    }

    const isCopy = this.form.metaData.copyId;
    const isSpecimen = this.form.metaData.specimen && Object.keys(this.form.metaData.specimen).length;
    applicationFloatHasChanges = applicationFloatHasChanges || isCopy || isSpecimen;

    const worksChanges = this.worksController.getChanges();
    worksChanges.hasChanges = worksChanges.hasChanges || (isCopy && worksChanges.works.length);

    this.routeController.acceptEdit();
    const routeChanges = this.routeController.getChanges();

    //TODO файлы

    return {
      hasChanges: applicationFloatHasChanges || worksChanges.hasChanges || routeChanges.hasChanges,
      applicationFloatHasChanges,
      applicationFloat,
      worksHasChanges: worksChanges.hasChanges,
      works: worksChanges.data,
      trackPoints: routeChanges.data,
      trackHasChanges: routeChanges.hasChanges,
      isSend,
      isCreate: !applicationFloat.id,
    }
  }

  async saveAndClose(isDraft) {

    if (this.disableActions) {
      return; //защита от повторного клика, пока прошлый не обработан
    }

    if (isDraft === null) {
      const applicationFloat = this.$Vue.store.getters[this.getStoreName("applicationFloat")];
      isDraft = applicationFloat.statusId === config.statuses.Draft;
    }

    const changes = this.getChanges(isDraft);

    if (!changes.hasChanges) {
      notify("Нет изменений.", "success");
      return;
    }

    if (!isDraft) {
      //нажали Отправить на рассмотрение
      if (!this.validate(changes.applicationFloat)) {
        return;
      }
    }

    try {
      this.disableActions = true;
      await this._saveApplicationFloatAndGoToBack(changes);
    }
    finally {
      this.disableActions = false;
    }
  }

  async _saveApplicationFloatAndGoToBack({ applicationFloatHasChanges, applicationFloat, worksHasChanges, works,
    trackHasChanges, trackPoints, isCreate, isSend }) {

    let newApplicationFloatId;
    let success = true;

    if (trackHasChanges) {

      let points = trackPoints
        .map((p) => {
          return {
            cposition: {
              type: "Point",
              coordinates: p,
            },
          }
        });

      points = points.map((p, index) => {
        if (index === 0) {
          return p;
        }
        return {
          ...p,
          pposition: points[index - 1].cposition,
        }
      });

      const result = await api.updateTrackPoints(applicationFloat.trackId, points);

      if (!result) {
        success = false;
      }

      if (!applicationFloat.trackId
        && result.tid) {
        applicationFloat.trackId = result.tid;
        applicationFloatHasChanges = true;
      }
    }

    if (applicationFloatHasChanges) {

      const result = await api.updateApplicationFloat(applicationFloat);

      if (!result) {
        this.showError();
        return;
      }

      newApplicationFloatId = Number(result.id);
    }

    if (worksHasChanges) {
      const result = await api.updateWorks(applicationFloat.id || newApplicationFloatId, works);

      if (!result) {
        success = false;
      }
    }

    if (success) {
      let currentId;
      if (isCreate) {
        currentId = newApplicationFloatId;
      } else if (isSend) {
        currentId = applicationFloat.id;
      }

      this.$Vue.$bus.$emit("getComponent", {
        nameForm: "MainForm",
        nameInnerForm: "ApplicationFloatListForm",
        title: "Заявления",
        currentId,
      });

    }
    else {
      this.showError();
    }
  }

  showError() {
    notify("Не удалось сохранить изменения.");
  }

  handleLoadingError() {
    this.setDisabled(true);
    notify("Не удалось загрузить данные");
  }

  notify(message, type = "error") {
    notify({ message, width: 400, shading: true }, type, 2500);
  }

  async back() {
    //при выходе из формы
    if (this.disableActions) {
      return; //защита от повторного клика, пока прошлый не обработан
    }

    const { hasChanges } = this.getChanges(true);

    if (hasChanges) {
      this.$Vue.$bus.$emit("saveChangesPopup");
    }
    else {
      this.$Vue.$bus.$emit("back");
    }
  }

  getAsyncShips() {
    this.$Vue.store.dispatch(this.getDictStoreName("loadAvailableShips")).then(() => {
      const availableShips = this.$Vue.store.getters[this.getDictStoreName("availableShips")];
      this.$Vue.$bus.$emit("putAsyncShip", availableShips);
    });
  }

  getStoreName(name) {
    return `applicationFloatStore/${name}`;
  }

  getDictStoreName(name) {
    return `dictionariesStore/${name}`;
  }

  destroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.routeController.destroy();
  }
}

export default ApplicationFloatDetailForm;
