const config = require('config');
const axios = require('axios');

module.exports = {
  product: {
    getById: async id => {
      return axios.request({
        method: 'GET',
        url: `https://${config.get('inventory.host')}/product`,
        params: {id}
      });
    },
    update: async product => {
      return axios.request({
        method: 'PUT',
        url: `https://${config.get('inventory.host')}/product`,
        data: product
      });
    },
  },
};
