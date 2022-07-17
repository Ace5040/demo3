import API from '../../api/index.js';
import PolygonDraw from '../../js/static/objects/DrawPolygonTemplate.js';
import ProtectedZonePolygon from '../../js/static/objects/ProtectedZonePolygon.js';
import { fromLonLat } from 'ol/proj';
import { parseGeometry, getCenter } from '../../js/tools/tools.js';
import Marker from '../../js/static/objects/Marker.js';
import MainForm from './MainForm.js';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import 'moment';

class weatherMain extends MainForm {
  constructor(form, Vue, popups) {
    super(form, Vue, popups);

    this.$Vue = Vue;
    this.formaData = {};
    this.currentZones = null;
    this.allProducts = null;
    this.selectedRowListParametrs = [];
    this.globalCheckEmptyForm = true;

    this.metaData = form.getMetaData();

    this.InputProductList = form.getComponentByName('ProductItemName').component;
    this.OrderParamModels = form.getComponentByName('SelectOrderParamModels').component;
    this.ProductRegionDropDownText = form.getComponentByName('ProductItemRegionDropDownText').component;
    this.InputCoordsListButton = form.getComponentByName('InputCoordsListButton').component;
    this.InputPolygonDraw = form.getComponentByName('InputPolygonDraw').component;
    this.InputDeleteData = form.getComponentByName('InputDeleteData').component;
    this.coordsInputList = form.getComponentByName('EPCSCoordsInputList').component;
    this.ProductItemRenewalPeriod = form.getComponentByName('ProductItemRenewalPeriod').component;
    this.ProductItemBeforeHand = form.getComponentByName('ProductItemBeforeHand').component;
    this.ProductItemBeforeHandForecastDiscreteness = form.getComponentByName('ProductItemBeforeHandForecastDiscreteness').component;
    this.ProductItemBeforeHandFormatData = form.getComponentByName('ProductItemBeforeHandFormatData').component;
    this.RegionInterestingRadio = form.getComponentByName('RegionInterestingRadio').component;
    this.ProductItemRegionDropDownText = form.getComponentByName('ProductItemRegionDropDownText').component;
    this.CheckDownloadFile = form.getComponentByName('CheckDownloadFile').component;
    this.CheckMapLayer = form.getComponentByName('CheckMapLayer').component;
    this.EPCSFooterOrder = form.getComponentByName('EPCSFooterOrder').component;

    this.ProductDateFrom = form.getComponentByName('ProductDateFrom').component;
    this.ProductDateTo = form.getComponentByName('ProductDateTo').component;


    API.getGeoZones().then(res => {
      this.currentZones = res.data;
      this.ProductItemRegionDropDownText.addSearchObject(res.data);
    });

    this.InputCoordsListButton.setDisabled(true);
    this.InputPolygonDraw.setDisabled(true);

    this.MyMap = form.getComponentByName('OrderRegionMap').component;

    this.activePolygon = null;
    this.markerCoordsList = [];


    this.form = form;

    API.getProducts().then(products => {
      this.allProducts = products.data;
      this.InputProductList.addSearchObject(products.data);
      setTimeout(() => {
        // Здесь мы узнаём что у нас заказ был оформлен из карточки товара.
        if(this.metaData.product.id) {
          this.InputProductList.setValue(this.metaData.product.id);
        }
        if(this.metaData.disabled) {
          this.loadOrderByMetaData();
        }
        Vue.$nextTick(() => {
          if(this.metaData.disabled) {
            this.disabledFormComponents();
          }
        });
      }, 500);
    });

    Vue.$bus.$on('selectProductName', (sel) => {
      console.log('SELECT VALUE: ', sel);
      console.log('this.allProducts: ', this.allProducts);
      let productSelect = this.allProducts.find(item => item.prid === sel.value);
      let itemsRenewal = new Array(productSelect.renewal);

      this.setFormDataItem(productSelect.prid, 'prid_fk');

      let productsParameters = [];
      API.getParamProduct(productSelect.prid).then(productParams => {
        productParams.data.forEach(param => {
          productsParameters.push({
            Message: param.pidFk.pdesc,
            paramModelId: param.pidFk.pid,
          });
        });
        this.OrderParamModels.setTableData(productsParameters);
      });


      this.ProductItemRenewalPeriod.setItems(itemsRenewal);
      this.ProductItemRenewalPeriod.setValue(itemsRenewal[0]);

      let beforeHand = new Array(String(productSelect.beforehand.hours));

      this.ProductItemBeforeHand.setItems(beforeHand);
      this.ProductItemBeforeHand.setValue(beforeHand[0]);

      let forecastDiscreteness = new Array(String(productSelect.timestep.hours));
      this.ProductItemBeforeHandForecastDiscreteness.setItems(forecastDiscreteness);
      this.ProductItemBeforeHandForecastDiscreteness.setValue(forecastDiscreteness[0]);

      let beforeHandFormatData = new Array(productSelect.dataformat);
      this.ProductItemBeforeHandFormatData.setItems(beforeHandFormatData);
      this.ProductItemBeforeHandFormatData.setValue(beforeHandFormatData[0]);
    });

    Vue.$bus.$on('selectRenewal', (e) => {
      console.log('selectRenewal: ', e);
      this.setFormDataItem({hours: e.value}, 'renewal');
    });

    Vue.$bus.$on('selectBeforeHand', (e) => {
      console.log('selectBeforeHand: ', e);
      this.setFormDataItem(e.value + ' hour', 'beforehand');
    });

    Vue.$bus.$on('selectForecastDiscreteness', (e) => {
      this.setFormDataItem(e.value + ' hour', 'timestep');
    });

    Vue.$bus.$on('selectHandFormatData', (e) => {
      this.setFormDataItem({format: e.value}, 'dataformat');
    });

    Vue.$bus.$on('selectOrderParamModels', (e) => {
      this.selectedRowListParametrs = e.selectedRowKeys;
      this.setFormDataItem({parameters: e.selectedRowKeys}, 'attr');
    });

    Vue.$bus.$on('selectProductDateFrom', (e) => {
      this.ProductDateTo.setMinDate(e.value);
      console.log('DATE: ', e);
      this.setFormDataItem(e.value, 'dateFrom');
      console.log(this.getFormData());
    });

    Vue.$bus.$on('selectProductDateTo', (e) => {
      this.ProductDateFrom.setMaxDate(e.value);
      this.setFormDataItem(e.value, 'dateTo');
      console.log(this.getFormData());
    });

    Vue.$bus.$on('selectRegionName', (e) => {
      let typeInput = this.ProductItemRegionDropDownText.getType();
      if(typeInput === 'select') {
        this.switchButtonsGeometry();
        let itemSelect = this.currentZones.find(item => item.id === e.value);
        this.addZonePolygon(parseGeometry(itemSelect));
        this.setFormDataItem(itemSelect.id, 'geozoneId');
        this.setFormDataItem(itemSelect.id, 'paramlist', 'geozoneId');
        this.setFormDataItem(itemSelect.name, 'paramlist', 'targetZone');
      } else {
        this.setFormDataItem(e.value, 'geozoneName');
      }
    });

    Vue.$bus.$on('checkedMapLayer', (e) => {
      this.setFormDataItem(e.value, 'paramlist', 'layerMap');
    });

    Vue.$bus.$on('checkedSaveFile', (e) => {
      this.setFormDataItem(e.value, 'paramlist', 'saveFile');
    });

    Vue.$bus.$on('InputPolygonDrawEvent', (e) => this.inputPolygonDraw());
    Vue.$bus.$on('selectRegionInterestingRadio', (e) => this.radioSwitchRegions(e));
    Vue.$bus.$on('drawEnd', (e) => this.endCreateMapPolygon(e));
    Vue.$bus.$on('InputDeleteDataEvent', (e) => this.deleteActivePolygon(e));
    Vue.$bus.$on('inputCoordsListButton', (e) => this.inputCoordsListButtonClick(e));

    Vue.$bus.$on("deleteMapPoint", (data, id) => this.deleteItemToCoordsList(data, id));
    Vue.$bus.$on("addMapPoint", (data, id) => this.addItemToCoordsList(data, id));
    Vue.$bus.$on("inputLatEvent", (e) => this.saveInputLat(e));
    Vue.$bus.$on("inputLonEvent", (e) => this.saveInputLon(e));
    Vue.$bus.$on("inputLatDirectionEvent", (e) => this.saveInputLatDirection(e));
    Vue.$bus.$on("inputLonDirectionEvent", (e) => this.saveInputLonDirection(e));

    Vue.$bus.$on('getComponent', (e) => {
      Vue.$parent.getComponent({nameForm: e.nameForm});
    });

    Vue.$bus.$on('backToForm', (e) => {
      if(this.metaData.disabled) Vue.$parent.getComponent({nameForm: 'weatherOrders'});
      this.presenceCheck();
      if(this.globalCheckEmptyForm) {
        Vue.$parent.getComponent({nameForm: 'weatherOrders'});
      } else {
        this.$Vue.$bus.$emit("backToNotEmptyFormOrderPopup");
      }
    });

    Vue.$bus.$on('backToOrderFormDataOkPopup', (e) => {
      Vue.$parent.getComponent({nameForm: 'weatherOrders'});
    });

    Vue.$bus.$on('saveOrderFormDataPopup', (e) => {
      if(this.presenceCheck()) {
        let formData = this.getFormData();
        formData.paramlist['layerMap'] = formData.paramlist['layerMap'] || false;
        formData.paramlist['saveFile'] = formData.paramlist['saveFile'] || false;
        if(!formData.geozoneId && formData.featurePolygon && formData.geozoneName) {
          API.saveGeoZone(this.getFormData()).then(res => {
            if(res) this.setFormDataItem(res.id, 'paramlist', 'geozoneId');
            if(res) this.setFormDataItem(res.name, 'paramlist', 'targetZone');
            this.sendOrderBeforeGeoZone(this.getFormData());
            this.$Vue.$bus.$emit("repeatNewOrderPopup");
          }).catch(err => {});
        } else {
          this.sendOrderBeforeGeoZone(formData);
          this.$Vue.$bus.$emit("repeatNewOrderPopup");
        }
      } else {
        console.log('WOW ITS TRAP!');
        this.$Vue.$bus.$emit("errorSavedOrderPopup");
      }
    });

    Vue.$bus.$on('repeatOrderFormDataCancelPopup', (e) => {
      Vue.$parent.getComponent({nameForm: 'weatherOrder'});
    });

    Vue.$bus.$on('repeatOrderFormDataOkPopup', (e) => {
      Vue.$parent.getComponent({nameForm: 'weatherOrders'});
    });

  }

  presenceCheck() {
    let checkSuccessFormComplete = true;
    let checkValue = [
      this.InputProductList.getValue(),
      this.selectedRowListParametrs.length,
      this.ProductRegionDropDownText.getValue(),
      this.ProductItemRenewalPeriod.getValue(),
      this.ProductItemBeforeHand.getValue(),
      this.ProductItemBeforeHandForecastDiscreteness.getValue(),
      this.ProductItemBeforeHandFormatData.getValue(),
      this.ProductItemRegionDropDownText.getValue(),
      this.ProductDateFrom.getValue(),
      this.ProductDateTo.getValue(),
      this.CheckDownloadFile.getValue() || this.CheckMapLayer.getValue()
    ];

    checkValue.forEach(item => {
      if(!item) checkSuccessFormComplete = false;
      if(item) this.globalCheckEmptyForm = false;
    });

    console.log('DATA CHECK: ', checkValue);
    console.log('EMPTY FORM? : ', this.globalCheckEmptyForm);

    return checkSuccessFormComplete;
  }

  loadOrderByMetaData() {
    console.log('WOW ITS META DATA LOAD PRODUCT!', this.metaData);
    // Здесь мы узнаём что у нас заказ был оформлен из карточки товара.
    if(this.metaData.product.prid_fk) {
      this.InputProductList.setValue(Number(this.metaData.product.prid_fk));
    }

    if(this.metaData.product.paramlist.geozoneId) {
      this.ProductItemRegionDropDownText.setValue(this.metaData.product.paramlist.geozoneId);
    }

    if(this.metaData.product.attr.parameters) {
      let selectRowKeys = [];
      this.metaData.product.attr.parameters.forEach(paramKey => {
        selectRowKeys.push(paramKey);
      });
      this.OrderParamModels.setselectedRows(selectRowKeys);
    }

    if(this.metaData.product.orderfrom && this.metaData.product.orderto) {
      this.ProductDateFrom.setValue(this.metaData.product.orderfrom);
      this.ProductDateTo.setValue(this.metaData.product.orderto);
    }

    if(this.metaData.product.paramlist.layerMap) {
      this.CheckMapLayer.setValue(this.metaData.product.paramlist.layerMap);
    }

    if(this.metaData.product.paramlist.saveFile) {
      this.CheckDownloadFile.setValue(this.metaData.product.paramlist.saveFile);
    }
  }

  sendOrderBeforeGeoZone() {
    API.createOrder(this.getFormData()).then(result => {
      console.log('Проверка на заполнение ещё одного заказа или возврат к имеющимся!');
      console.log('res: ', result);
    });
  }

  switchButtonsGeometry() {
    this.ProductItemRenewalPeriod.setDisabled(false);
    this.ProductItemBeforeHand.setDisabled(false);
    this.ProductItemBeforeHandForecastDiscreteness.setDisabled(false);
    this.ProductItemBeforeHandFormatData.setDisabled(false);
  }

  disabledFormComponents() {
    this.InputProductList.setDisabled(true);
    this.ProductItemRenewalPeriod.setDisabled(true);
    this.ProductItemBeforeHand.setDisabled(true);
    this.ProductItemBeforeHandForecastDiscreteness.setDisabled(true);
    this.ProductItemBeforeHandFormatData.setDisabled(true);
    this.ProductItemRegionDropDownText.setDisabled(true);
    this.OrderParamModels.setDisabled(true);
    this.EPCSFooterOrder.deleteRightButton();
    this.CheckDownloadFile.setDisabled(true);
    this.CheckMapLayer.setDisabled(true);
    this.ProductDateFrom.setDisabled(true);
    this.ProductDateTo.setDisabled(true);
    this.RegionInterestingRadio.setDisabled(true);
  }

  setFormDataItem(value, itemName, subItem) {
    if(itemName === 'paramlist') {
      if(this.formaData[itemName]) {
        this.formaData.paramlist[subItem] = value;
      } else {
        this.formaData.paramlist = {};
        this.formaData.paramlist[subItem] = value;
      }
    } else {
      this.formaData[itemName] = value;
    }
  }

  getFormData() {
    return this.formaData;
  }

  inputPolygonDraw() {
    this.InputPolygonDraw.setPressed(true);
    this.coordsInputList.setVisible(false);

    this.markerCoordsList = [];
    this.coordsInputList.setInputList([
      {
        coords: [null, null],
        id: 0,
      },
    ]);

    let map = this.MyMap.getMap();
    this.polygonMarker = new PolygonDraw(this.$Vue);
    map.addInteraction(this.polygonMarker.getPolygon());
  }

  endCreateMapPolygon(e) {
    this.addZonePolygon(e, true);
    let map = this.MyMap.getMap();
    map.removeInteraction(this.polygonMarker.getPolygon());

    this.InputCoordsListButton.setDisabled(true);
    this.InputPolygonDraw.setDisabled(true);
    this.InputDeleteData.setDisabled(false);
  }

  radioSwitchRegions(e) {
    switch (e) {
      case 0: {
        this.MyMap.deleteLayer();
        this.ProductItemRegionDropDownText.setValue('');
        this.ProductRegionDropDownText.setType('text');
        this.ProductRegionDropDownText.setPlaceholder('Введите имя зоны');

        this.InputPolygonDraw.setPressed(false);
        this.InputCoordsListButton.setDisabled(false);
        this.InputPolygonDraw.setDisabled(false);
        break;
      }
      case 1: {
        this.ProductRegionDropDownText.setType('select');
        this.markerCoordsList = [];
        this.coordsInputList.setInputList([
          {
            coords: [null, null],
            id: 0,
          },
        ]);

        this.ProductRegionDropDownText.setType('select');
        this.ProductRegionDropDownText.setPlaceholder('Выберите зону из списка');

        this.MyMap.deleteLayer();

        this.coordsInputList.setVisible(false);
        this.InputCoordsListButton.setDisabled(true);
        this.InputPolygonDraw.setDisabled(true);
        this.InputDeleteData.setDisabled(true);

        break;
      }
    }
  }

  addZonePolygon(coords) {
    this.MyMap.deleteLayer();

    this.activePolygon = new ProtectedZonePolygon(coords, {}, {});
    this.MyMap.getInstance().then(map => {
      map.addLayer(this.activePolygon.getLayer());
      this.MyMap.setNewView(
        {
          zoom: 5,
          center: fromLonLat(getCenter(coords)),
          minZoom: 2,
          maxZoom: 18
        }
      );
    });

    let newFeature = new Feature({
      geometry: new Polygon([coords], {}),
    });
    newFeature.getGeometry().setCoordinates([coords]);
    let newJSON = new GeoJSON().writeFeatureObject(newFeature);

    this.setFormDataItem(newJSON, 'featurePolygon');
    this.setFormDataItem(0, 'geozoneId');
  }

  deleteActivePolygon(e) {
    if(this.activePolygon) {
      this.MyMap.getMap().removeLayer(this.activePolygon.getLayer());
      this.activePolygon = null;

      this.InputCoordsListButton.setDisabled(false);
      this.InputPolygonDraw.setDisabled(false);
      this.InputDeleteData.setDisabled(true);

      this.InputPolygonDraw.setPressed(false);
    }
  }

  inputCoordsListButtonClick(e) {
    this.coordsInputList.setVisible(true);
  }

  markersController() {
    this.MyMap.deleteLayer();

    let tempList = [];
    for (let i = 0; i < this.markerCoordsList.length; i++) {
      if (this.markerCoordsList[i][0] !== null && this.markerCoordsList[i][1] !== null && this.markerCoordsList[i].length === 2) {
        tempList.push(this.markerCoordsList[i]);
      }
    }

    if (tempList.length < 3) {
      this.addNewMarkerFromCoords(tempList);
    } else if (tempList.length >= 3) {
      this.MyMap.deleteLayer();
      this.addZonePolygon(tempList);
    }
  }

  saveInputLat(e) {
    let id = e.id;
    let lat = e.value;
    if (this.markerCoordsList[id]) {
      this.markerCoordsList[id][0] = lat;
    } else {
      this.markerCoordsList[id] = [null, null];
      this.markerCoordsList[id][0] = lat;
    }

    this.markersController();
  }

  saveInputLon(e) {
    let id = e.id;
    let lon = e.value;
    if (this.markerCoordsList[id]) {
      this.markerCoordsList[id][1] = lon;
    } else {
      this.markerCoordsList[id] = [null, null];
      this.markerCoordsList[id][1] = lon;
    }
    console.log('this.markerCoordsList', this.markerCoordsList);
    this.markersController();
  }

  addNewMarkerFromCoords(coords) {

    coords.forEach(itemCoord => {
      let MyMarker = new Marker(fromLonLat(itemCoord), {}, {}).getLayer();
      this.MyMap.getMap().addLayer(MyMarker);

      this.MyMap.setNewView(
        {
          zoom: 5,
          center: fromLonLat(itemCoord),
          minZoom: 2,
          maxZoom: 18
        }
      );
    });
  }

  addItemToCoordsList(data, id) {
    this.coordsInputList.addItem(id, [null, null]);
    this.markerCoordsList.splice(id + 1, 0, [null, null]);

    this.markersController();
  }

  deleteItemToCoordsList(data, id) {
    let tempArr = this.coordsInputList.getInputList();
    if (tempArr.length > 1) {
      tempArr.splice(id, 1);
      this.markerCoordsList.splice(id, 1);
      this.coordsInputList.setInputList(tempArr);
    } else if (tempArr.length === 1) {
      tempArr[0] = {coords: [null, null]};
    }

    tempArr = null;
    this.markersController();
  }

  saveInputLatDirection(e) {
    let direction = e.value;
    let id = e.id;
    let value = null;
    if (this.markerCoordsList[id] && this.markerCoordsList[id][0]) {
      value = this.markerCoordsList[id][0];
    }
    if (value) {
      switch (direction) {
        case 'N':
          switch (Math.sign(value)) {
            case 1:
              break
            case -1:
              value = -value;
              break
          }
          break
        case 'S':
          switch (Math.sign(value)) {
            case -1:
              value = -value;
              break
            case 1:
              value = -value;
              break
          }
          break
      }
    }
    if (value) {
      this.saveInputLat({id: id, value: value});
    }
  }

  saveInputLonDirection(e) {
    let direction = e.value;
    let id = e.id;
    let value = null;
    if (this.markerCoordsList[id] && this.markerCoordsList[id][1]) {
      value = this.markerCoordsList[id][1];
    }
    if (value) {
      switch (direction) {
        case 'W':
          switch (Math.sign(value)) {
            case 1:
              break
            case -1:
              value = -value;
              break
          }
          break
        case 'E':
          switch (Math.sign(value)) {
            case -1:
              value = -value;
              break
            case 1:
              value = -value;
              break
          }
          break
      }
    }
    if (value) {
      this.saveInputLon({id: id, value: value});
    }
  }
}

export { weatherMain as default };
