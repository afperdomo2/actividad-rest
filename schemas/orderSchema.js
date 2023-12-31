const Joi = require('joi');

// Orden
const id = Joi.number().integer();
const customerId = Joi.number().integer();
const state = Joi.string().min(3);

// Productos
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  state: state.required(),
});

const updateOrderSchema = Joi.object({
  state,
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = {
  getOrderSchema,
  createOrderSchema,
  updateOrderSchema,
  addItemSchema,
};
