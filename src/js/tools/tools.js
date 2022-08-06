import { trim } from "lodash";
import moment from "moment";
import notifyDevextreme from "devextreme/ui/notify";

function hashId(string) {
    let hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
}

function isEmptyValue(value) {
    return value === undefined || value === null || value === "";
}

function isEqualFormInputValues(value, oldValue) {
    const formatValue = (value) => (isEmptyValue(value) ? "" : value);
    return formatValue(value) == formatValue(oldValue);
}

function getFullName(surname, name, patronymic) {
    const format = (name) => (name ? name + " " : "");
    return trim(`${format(surname)}${format(name)}${format(patronymic)}`) || null;
}

function getUniq(arrayOfObjects, field) {
    const arrayOfValues = arrayOfObjects.map((item) => item[field]);
    const uniqArray = [...new Set(arrayOfValues)];
    return uniqArray;
}

function formatDateForNotif(date) {
    if (moment().isSame(date, "day")) {
        const today = moment().calendar().split(",")[0].toLowerCase();
        return `${today} ${moment(date).format("HH:mm")}`;
    }

    if (moment().isSame(moment(date).add(1, "day"), "day")) {
        const yesterday = moment(date).calendar().split(",")[0].toLowerCase();
        return `${yesterday} ${moment(date).format("HH:mm")}`;
    }

    return moment(date).format("DD.MM.YYYY HH:mm");
}

function hasChanges(oldValue, newValue) {
    let hasChanges = false;

    for (let field in newValue) {
        if (!isEqualFormInputValues(oldValue[field], newValue[field])) {
            hasChanges = true;
            break;
        }
    }
    return hasChanges;
}

function hasChangesInArray(oldValue, newValue) {

    if (!oldValue) {
        return newValue.length > 0;
    }

    if (newValue.length !== oldValue.length) {
        return true;
    }

    let result = false;

    for (let i = 0; i < newValue.length; i++) {
        const oldLineValue = oldValue[i];
        const newLineValue = newValue[i];

        if (hasChanges(oldLineValue, newLineValue)) {
            result = true;
            break;
        }
    }

    return result;
}

function notify(message, type = "error") {
    notifyDevextreme({ message, width: 400, shading: true }, type, 2500);
}

export {
    hashId,
    isEqualFormInputValues,
    getFullName,
    getUniq,
    isEmptyValue,
    formatDateForNotif,
    hasChanges,
    hasChangesInArray,
    notify
};