const config = require('config');

const api = require('./api');
const cacheModel = require('../services/cache');

class User {
  constructor({ id, phone, lastName, firstName, balance }) {
      this.id = id;
      this.phone = phone;
      this.lastName = lastName;
      this.firstName = firstName;
      this.balance = balance;
  }

  async findById(id) {
    const cache = await cacheModel.findOne({
      where: {id},
    });

    if (cache) {
      return cache
    }

    const response = await api.request({
      method: 'GET',
      url: `https://${config.get('crm.host')}/user`,
      params: {id}
    });

    const user = await this.fromResponse(response.data);

    await cacheModel.save(user);

    return user;
  }

  static async create({phone, lastName, firstName, balance}) {
    const crmUser = {
      Phone: phone,
      Last_Name: lastName,
      First_Name: firstName,
      Current_Balance: balance,
    };

    const response = await api.request({
      method: 'POST',
      url: `https://${config.get('crm.host')}/user`,
      data: [crmUser],
    });

    return response && response.data
  }

  static async update({id, phone, lastName, firstName, balance}) {
    const crmUser = {
      id,
      ...phone && {Phone: phone},
      ...lastName && {Last_Name: lastName},
      ...firstName && {First_Name: firstName},
      ...balance && {Current_Balance: balance},
    };

    const response = await api.request({
      method: 'PUT',
      url: `https://${config.get('crm.host')}/user`,
      data: [crmUser],
    });

    return response && response.data
  }

  static async delete(id) {
    const response = await api.request({
      method: 'PUT',
      url: `https://${config.get('crm.host')}/user`,
      params: {id}
    });

    return response && response.data
  }

  static fromResponse(data) {
    console.debug('Crm User model response: ', {data});

    return new User({
      id: data.id,
      phone: data.Phone,
      lastName: data.Last_Name,
      firstName: data.First_Name,
      balance: data.Current_Balance,
    })
  }
}

module.exports = User;
