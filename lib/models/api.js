const axios = require('axios');
const config = require('config');

const delay = (ms) => new Promise(r => setTimeout(r, ms));

const api = axios.create();

const requestsQueue = [];
let concurrentRequests = 0;

api.interceptors.request.use(async axiosConfig => {
  requestsQueue.push(axiosConfig);

  while (concurrentRequests >= config.get('crm.fetchConcurrency')) {
    console.debug(`Crm concurrent request added to queue`, {queueLength: concurrentRequests});

    await delay(config.get('crm.waitForRetry'))
  }

  ++concurrentRequests;

  return requestsQueue.shift()
});

api.interceptors.response.use(response => {
  --concurrentRequests;

  return response
}, error => {
  --concurrentRequests;

  throw error
});

module.exports = api;
