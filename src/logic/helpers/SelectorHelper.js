export default class SelectorHelper {

    static formatFilterSelectorPlainSource(array) {
        const hasEmpty = (array || []).some((item) => !item);

        let items = array
            .filter((item) => item)
            .sort(function (a, b) {
                if (a === b) {
                    return 0;
                }
                return a < b ? -1 : 1;
            })
            .map((item) => {
                return {
                    id: item,
                    name: item + "",
                }
            });

        if (hasEmpty) {
            items.unshift({
                id: "null",
                name: "<Не указан>",
            });
        }

        items.unshift({
            id: null,
            name: "Все",
        });

        return items;
    }

    static formatFilterSelectorSource({ dictionary, idField = "name", nameField = "name" }) {
        const items = (dictionary || []).map((item) => {
            return {
                id: item[idField],
                name: item[nameField],
            };
        });

        items.unshift({
            id: null,
            name: "Все",
        });

        return items;
    }

    static formatSelectorDataSource({ dictionary, idField = "id", nameField = "name", addEmpty = true }) {
        const items = (dictionary || []).map((item) => {
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
}