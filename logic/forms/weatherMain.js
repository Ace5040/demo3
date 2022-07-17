import API from '../../api/index.js';
import MainForm from './MainForm.js';

class weatherMain extends MainForm{
  constructor(form, Vue, popups) {
    super(form, Vue, popups);
    let products = {};
    let arrayProducts = [];


    let cardHub = form.getComponentByName('EPCSProductionCardHubMain').component;

    API.getProducts().then(allProducts => {

      allProducts.data.forEach(itemProduct => {
        arrayProducts.push(itemProduct);
        products[itemProduct.prid] = [];
        products[itemProduct.prid].push(itemProduct);
      });
      cardHub.setProps({
        cards: arrayProducts
      });
    });


    Vue.$bus.$on('getComponent', (e) => {
      Vue.$parent.getComponent({nameForm: e.nameForm});
    });

    Vue.$bus.$on('getWeatherService', (e) => {
      if(e.id) {
        Vue.$parent.getComponent({nameForm: 'weatherOpenCard', e, product: products[e.id]});
      }
    });

    Vue.$bus.$on('addNewOrder', (e) => {
      Vue.$parent.getComponent({nameForm: 'weatherOrder', product: e});
    });


  }
}

export { weatherMain as default };
