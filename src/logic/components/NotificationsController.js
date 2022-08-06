import { io } from "socket.io-client";
import api from "../../api";
import config from "../../config/config";


class NotificationsController {
    constructor(notifications, Vue) {
        this.notifications = notifications;
        this.$Vue = Vue;

        this.bindData();

        this.$Vue.store.dispatch(this.getStoreName("loadList"));

        this.socket = io.connect(`${config.publicationURL}/notification`,
            {
                auth: {
                    user_id: 1, //TODO расшить userId
                },
            });

        this.socket.on("newNotification", (notification) => {
            Vue.store.dispatch(this.getStoreName("pushNotification"), notification);
        });

        Vue.$bus.$on("openNotification", (e) => this.openNotification(e));

        // setTimeout(() => {
        //     api.testCreateNotification();
        // }, 15000);
    }

    bindData() {
        this.unsubscribe = this.$Vue.store.subscribe((action) => {
            if (action.type === this.getStoreName("setList")) {
                this.notifications.setInputData(action.payload);
            }
        });
    }

    openNotification(e) {
        if (e.data.isNew) {
            e.data.isNew = false;
            api.markNotificationAsDone(e.data.id);
        }

        if (e.data.applicationId) {
            //открыть форму заявления
            this.$Vue.$bus.$emit("getComponent", { ...e.data, id: e.data.applicationId });
            return;
        }

        if (e.data.permitId) {
            //открыть список разрешений
            this.$Vue.$bus.$emit("loadList", {
                nameInnerForm: "PermitListForm",
                title: "Разрешения",
                currentId: e.data.permitId
            });
        }

        if (e.data.rejectId) {
            //открыть список отказов
            this.$Vue.$bus.$emit("loadList", {
                nameInnerForm: "RefusalListForm",
                title: "Отказы в выдаче разрешения",
                currentId: e.data.rejectId
            });
        }
    }

    getStoreName(name) {
        return `notificationsStore/${name}`;
    }

    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
        this.socket.disconnect();
    }
}

export default NotificationsController;