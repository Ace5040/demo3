
/** Отвечает за сохранение и восстановление настроек сессии */
class SessionStorageManager {
    constructor(Vue, name) {
        this.$Vue = Vue;
        this.name = name;
    }

    reestablishFilter(actionName) {
        try {
            const savedFilter = sessionStorage.getItem(this.name);

            let filterObject = null;
            if (!savedFilter) {
                return;
            }

            filterObject = JSON.parse(savedFilter);

            if (filterObject) {
                this.$Vue.store.dispatch(actionName, filterObject);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    saveFilter(filter) {
        try {
            let filterObject = null;
            if (filter) {
                const cutObject = (value) => {
                    for (const field in value) {
                        if (!value[field]) {
                            delete value[field];
                        }
                    }
                };

                let filterToSave = JSON.parse(JSON.stringify(filter));
                cutObject(filterToSave);

                if (Object.keys(filterToSave)) {
                    filterObject = JSON.stringify(filterToSave);
                }
            }

            if (filterObject) {
                sessionStorage.setItem(this.name, filterObject);
            }
            else {
                sessionStorage.removeItem(this.name);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
}

export default SessionStorageManager;