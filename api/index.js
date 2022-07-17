import axios from 'axios';
import { v4 } from 'uuid';
import moment from 'moment';
import Vue from 'vue';

// const publicEntry = Vue.prototype.store.getters['dispStore/getGmiloUrl'];
const publicationURLGeo = process.env.GEO || "http://10.20.30.102:3000";

var API = {
  publicEntry: () => {
    console.log('Vue.prototype.store', Vue.prototype.store.getters['dispStore/getGmiloUrl']);
    return Vue.prototype.store.getters['dispStore/getGmiloUrl']
  },
  getParamProduct(id) {
    return axios.get(`${this.publicEntry()}/product-params`, {
      params: {
        filter: {
          "include": ["pidFk"],
          "where": {
            "prid_fk": id
          }
        }
      }
    }).then(function (response) {
      return response;
    });
  },
  getProducts() {
    return axios.get(`${this.publicEntry()}/products`, {
      params: {
        filter: {
          "where": {
            "ptype": 0
          }
        }
      }
    }).then(function (response) {
      return response;
    });
  },

  getOrdersProducts() {
    return axios.get(`${this.publicEntry()}/prod-orders`, {
      params: {
        filter: {
          "order": ['docdata DESC'],
          "include": ["prid"],
          "where": {
            "ptype": 0
          }
        }
      }
    }).then(function (response) {
      return response;
    });
  },

  getOrderProduct(uuid) {
    return axios.get(`${this.publicEntry()}/prod-orders/${uuid}/product`, {}).then(function (response) {
      return response;
    });
  },

  getGeoZones() {
    return axios.get(`${publicationURLGeo}/geozones`, {}).then(function (response) {
      return response;
    });
  },

  saveGeoZone(formData) {
      return axios.post(`${publicationURLGeo}/geozones`, {
        "geometry": JSON.stringify({features: [formData.featurePolygon]}),
        "name": formData.geozoneName,
        "nameEn": formData.geozoneName
      }).then(function (geometry) {
        return geometry.data
      })
  },

  createOrder(formData) {
    console.log('formData create order: ', formData);
    console.log('moment(formData.timestep).format("HH"): ', formData.timestep);
    formData.paramlist.status = "Создан";
    return axios.post(`${this.publicEntry()}/prod-orders`, {
      "po_uuid": v4(),
      "prid_fk": formData.prid_fk,
      "docnum": 0,
      "docdata": moment().format('YYYY-MM-DD HH:mm:ss'),
      "delmark": false,
      "author_userid": 1,
      "orderfrom": moment(formData.dateFrom).format('YYYY-MM-DD HH:mm:ss'),
      "orderto": moment(formData.dateTo).format('YYYY-MM-DD HH:mm:ss'),
      "dataformat": formData.dataformat,
      "renewal": formData.renewal,
      "attr": formData.attr,
      "timestep": formData.timestep,
      "beforehand": formData.beforehand,
      "note": "empty",
      "paramlist": formData.paramlist,
      "ptype": 0
    }).then(function (response) {
      return response;
    });
  }

};

export { API as default };
