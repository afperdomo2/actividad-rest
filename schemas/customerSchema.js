const Joi = require('joi');

const { createUserSchema, updateUserSchema } = require('./userSchema');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string().max(30);
const phone = Joi.string().max(15);
const userId = Joi.number().integer();

const getCustomerSchema = Joi.object({
  id: id.required(),
});

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema,
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId,
});

module.exports = {
  getCustomerSchema,
  createCustomerSchema,
  updateCustomerSchema,
};
