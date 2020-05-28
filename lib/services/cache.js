/*
* Implementation of cache IS OUT OF THE SCOPE of the test task
*/
const findOneMock = async () => {
  return {
    id: '1',
    phone: '380679991122',
    lastName: 'Sapp',
    firstName: 'Bob',
    balance: '666'
  }
};

const saveMock = async () => {
  return true;
};

const removeMock = async () => {
  return true;
};

module.exports = {
  findOne: findOneMock,
  save: saveMock,
  remove: removeMock,
};
