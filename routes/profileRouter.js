const express = require('express');
const passport = require('passport');
const OrderService = require('./../services/orderService');

const router = express.Router();
const service = new OrderService();

router.get(
  '/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { sub: userId } = req.user;
      const orders = await service.findByUser(userId);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
