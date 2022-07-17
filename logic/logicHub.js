import 'moment';
import Popup from './components/Popup.js';
import 'devextreme/ui/notify';
import 'ol/geom/Point';
import 'ol/Feature';
import 'ol/style';
import 'ol/source/Vector';
import 'ol/layer';
import 'ol/source';
import 'ol/proj';
import '../js/static/objects/shipTypes.js';
import weatherMain from './forms/weatherMain.js';
import weatherOpenCard from './forms/weatherOpenCard.js';
import weatherMain$1 from './forms/weatherOrder.js';
import weatherMain$2 from './forms/weatherOrders.js';

var logicHub = {
    weatherMain: {weatherMain},
    weatherOpenCard: {weatherOpenCard},
    weatherOrder: {weatherOrder: weatherMain$1, Popup},
    weatherOrders: {weatherOrders: weatherMain$2}
};

export { logicHub as default };
