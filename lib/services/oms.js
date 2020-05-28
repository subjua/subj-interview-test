const config = require('config');
const axios = require('axios');

module.exports = {
  order: {
    getById: async id => {
      return axios.request({
        method: 'GET',
        url: `https://${config.get('oms.host')}/order`,
        params: {id}
      });
    },
    create: async order => {
      return axios.request({
        method: 'POST',
        url: `https://${config.get('oms.host')}/order`,
        data: order
      });
    },
    update: async order => {
      return axios.request({
        method: 'PUT',
        url: `https://${config.get('oms.host')}/order`,
        data: order
      });
    },
    delete: async id => {
      return axios.request({
        method: 'DELETE',
        url: `https://${config.get('oms.host')}/order`,
        params: {id}
      });
    },
  },
  invoice: {
    create: async invoice => {
      return axios.request({
        method: 'POST',
        url: `https://${config.get('oms.host')}/invoice`,
        data: invoice
      });
    },
    update: async invoice => {
      return axios.request({
        method: 'PUT',
        url: `https://${config.get('oms.host')}/invoice`,
        data: invoice
      });
    },
    delete: async id => {
      return axios.request({
        method: 'DELETE',
        url: `https://${config.get('oms.host')}/invoice`,
        params: {id}
      });
    },
  }
};
