const Boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');

class ProductService {
  constructor() {}

  async create(data) {
    return await models.Product.create(data);
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, offset, price, price_min, price_max } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }
    if (price) {
      options.where.price = price;
    }
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }
    return await models.Product.findAll(options);
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if (!product) {
      throw Boom.notFound('⚠️Product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    return await product.update(changes);
  }

  async delete(id) {
    const product = await this.findOne(id);
    return await product.destroy();
  }
}

module.exports = ProductService;
