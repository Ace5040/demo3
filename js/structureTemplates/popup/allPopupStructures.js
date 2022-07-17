import newDispPopup from './disps/newDispPopup.js';
import deletePopup from './disps/deletePopup.js';
import filterPopup from './disps/filterPopup.js';
import shipFilterPopup from './ships/shipFilterPopup.js';
import deleteShipPopup from './ships/deleteShipPopup.js';
import changeDataPopup from './disps/changeDataPopup.js';
import saveOrderPopup from './saveOrderPopup.js';
import errorSavedOrderPopup from './errorSavedOrderPopup.js';
import repeatNewOrderPopup from './repeatNewOrderPopup.js';
import backToNotEmptyFormOrderPopup from './backToNotEmptyFormOrderPopup.js';

const allPopupStructures = {
    filterPopup,
    deletePopup,
    newDispPopup,
    shipFilterPopup,
    deleteShipPopup,
    changeDataPopup,
    saveOrderPopup,
    errorSavedOrderPopup,
    repeatNewOrderPopup,
    backToNotEmptyFormOrderPopup
};

export { allPopupStructures as default };
