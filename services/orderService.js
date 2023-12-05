const Boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async create(data) {
    return await models.Order.create(data);
  }

  async find() {
    return await models.Order.findAll({
      include: ['customer'],
    });
  }

  async findByUser(userId) {
    return await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
        'items',
      ],
    });
    if (!order) {
      throw Boom.notFound('⚠️Order not found');
    }
    return order;
  }

  async update(id, changes) {
    return { id };
  }

  async delete(id) {
    return { id };
  }

  async addItem(data) {
    return await models.OrderProduct.create(data);
  }
}

module.exports = OrderService;
