import JoystickController from "../components/JoystickController";
import NotificationsController from "../components/NotificationsController";


class MainForm {
    constructor(form, Vue) {
        this.form = form;
        this.$Vue = Vue;


        this.content = this.form.getComponentByName("content").component;

        this.navigation = this.form.getComponentByName("navigationPopupMenu").component;
        this.notifications = this.form.getComponentByName("notificationsPopupMenu").component;

        if (this.form.metaData.nameInnerForm) {
            this.content.load({ ...this.form.metaData, nameForm: this.form.metaData.nameInnerForm });
            this.navigation.setActiveMenuButton(this.form.metaData.title);
        }

        this.joystickController = new JoystickController(
            {
                joystick: this.form.getComponentByName("joystick").component,
                rightMenu: this.notifications,
                leftMenu: this.navigation,
            },
            Vue);

        this.notificationsController = new NotificationsController(this.notifications, Vue);

        Vue.$bus.$on("loadList", (e) => this.loadList(e));
    }

    loadList(e) {
        this.navigation.setActiveMenuButton(e.title);
        this.content.load({ ...e, nameForm: e.nameInnerForm });

        history.pushState({ ...e, nameForm: "MainForm" }, "MainForm", "");
    }

    destroy() {
        this.notificationsController.destroy();
    }
}

export default MainForm;
