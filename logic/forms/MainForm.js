class MainForm {
  constructor(form, Vue, popups) {
    this.form = form;
    this.$Vue = Vue;
    this.popups = popups;
    this.meta = this.form.getMetaData().meta;
    this.joystickStatus = {
      leftMenu: false,
      rightMenu: false,
    };

    this.setMenuButtonIsActive();

    Vue.$bus.$on("openSection", (e) => this.openSection(e));
    Vue.$bus.$on("joystickRightButton", (e) => this.joystickRightButtonPressed(e));
    Vue.$bus.$on("joystickLeftButton", (e) => this.joystickLeftButtonPressed(e));
    // Vue.$bus.$on("openNotification", (e) => this.joystickLeftButtonPressed(e));
    Vue.$bus.$on("openNotification", (e) => this.openNotification(e));
  }

  // joystickRightButtonPressed(e) {
  //   let myRigthMenu = this.form.getComponentByName('RightPopupMenu').component;
  //   this.joystickStatus.rightMenu = !this.joystickStatus.rightMenu
  //   myRigthMenu.setIsOpen(this.joystickStatus.rightMenu)
  // }

  joystickLeftButtonPressed(e) {
    let myLeftMenu = this.form.getComponentByName('EPCSPopupMenu').component;
    this.joystickStatus.leftMenu = !this.joystickStatus.leftMenu;
    myLeftMenu.setIsOpen(this.joystickStatus.leftMenu);
  }




  openSection(e) {
    if (e.formName !== this.form.getFormName()) {
      let sectionName = e.formName;
      this.$Vue.$bus.$emit("openFileSection", {nameForm: sectionName, meta: e});
    }
  }


  setMenuButtonIsActive() {
    if (this.meta && this.meta.title) {
      let buttonText = this.meta.title;
      let myPopupMenu = this.form.getComponentByName('EPCSPopupMenu').component;
      myPopupMenu.setActiveMenuButton(buttonText);
    }
  }
}

export { MainForm as default };
