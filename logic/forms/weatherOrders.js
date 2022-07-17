import API from '../../api/index.js';
import moment from 'moment';
import MainForm from './MainForm.js';

class weatherMain extends MainForm {
  constructor(form, Vue, popups) {
    super(form, Vue, popups);

    this.DataGridOrders = form.getComponentByName('WeatherOrders').component;

    let allProducts = [];
    let allOrders = [];
    API.getOrdersProducts().then(res => {
      res.data.forEach(itemProd => {
        allProducts.push(API.getOrderProduct(itemProd.po_uuid).then(product => {
          itemProd.productLink = product.data;
          allOrders.push(itemProd);
        }));
      });

      Promise.all(allProducts).then(() => {
        let dataForDataGrid = [];

        this.DataGridOrders.setColumnNames({
          dateOrder: 'Дата заказа',
          orderProduct: 'Продукт',
          periodOrder: 'Период заказа',
          deepForecast: 'Глубина прогноза',
          regionInterest: 'Регион интереса',
          statusOrder: 'Статус заказа'
        });

        allOrders.forEach(itemOrder => {
          dataForDataGrid.push({
            "dateOrder": moment(itemOrder.docdata).format('DD.MM.YYYY HH:mm:ss'),
            "orderProduct": itemOrder.productLink.prname,
            "periodOrder": `${moment(itemOrder.orderfrom).format('DD.MM.YYYY')} - ${moment(itemOrder.orderto).format('DD.MM.YYYY')}`,
            "deepForecast": `${itemOrder.beforehand.hours} `,
            "regionInterest": itemOrder.paramlist.targetZone,
            "statusOrder": itemOrder.paramlist.status,
            "rowData": itemOrder
          });
        });
        this.formatingDataForTable(dataForDataGrid);

      });

    });


    Vue.$bus.$on('openWeatherOrder', (e) => {
      console.log('openWeatherOrder');
      Vue.$parent.getComponent({nameForm: 'weatherOrder', e, product: e.data.rowData, disabled: true});
    });

    Vue.$bus.$on('addNewOrder', (e) => {
      console.log('addNewOrder');
      Vue.$parent.getComponent({nameForm: 'weatherOrder', product: e});
    });






    Vue.$bus.$on('getComponent', (e) => {
      console.log(e);
      Vue.$parent.getComponent({nameForm: e.nameForm});
    });
  }

  formatingDataForTable(dataOrders) {
    console.log(dataOrders);
    this.DataGridOrders.setTableData(dataOrders);
  }

}

export { weatherMain as default };
