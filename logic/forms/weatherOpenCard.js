import API from '../../api/index.js';
import MainForm from './MainForm.js';

class weatherOpenCard extends MainForm {
  constructor(form, Vue, popups) {
    super(form, Vue, popups);
    let productInfo = form.getMetaData().product[0];

    const DetailedCard = form.getComponentByName('EPCSCardProductionDetailedActive').component;
    const PhotoProductGallery = form.getComponentByName('EPCSGalleryProductCard').component;

    PhotoProductGallery.setProps({
      photos: productInfo.image.images
    });

    API.getParamProduct(form.getMetaData().e.id).then(result => {

      DetailedCard.setProps({
        productInfo,
        parametrs: result.data
      });
    });

    Vue.$bus.$on('backToProductList', () => {
      Vue.$parent.getComponent({nameForm: 'weatherMain'});
    });

    Vue.$bus.$on('orderProduct', (e) => {
      console.log(e);
      Vue.$parent.getComponent({nameForm: e.nameForm, product: e.product, disabled: false});
    });


  }

  _openWeatherLayerAdditional(idLayerOpen) {
    console.log(idLayerOpen);
  }
}

export { weatherOpenCard as default };
