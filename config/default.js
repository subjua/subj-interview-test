/*
 In test task all services point to the same mock server. DO NOT PAY ATTENTION to that.
*/
const MOCK_SERVER = 'b24b202e-cc1f-4520-acdf-9af7d1f7196f.mock.pstmn.io';

module.exports = {
  port: 3003,
  host: 'localhost',
  crm: {
    host: MOCK_SERVER,
  },
  oms: {
    host: MOCK_SERVER,
  },
  inventory: {
    host: MOCK_SERVER,
  }
};
