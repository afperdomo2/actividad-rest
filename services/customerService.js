const Boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class customerService {
  constructor() {}

  async create(data) {
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    delete newCustomer.user.dataValues.password;
    return newCustomer;
  }

  async find() {
    return await models.Customer.findAll({
      include: ['user'],
    });
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id, {
      include: ['orders'],
    });
    if (!customer) {
      throw Boom.notFound('⚠️Customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.c(id);
    return await customer.update(changes);
  }

  async delete(id) {
    const customer = await this.findOne(id);
    return await customer.destroy();
  }
}

module.exports = customerService;
