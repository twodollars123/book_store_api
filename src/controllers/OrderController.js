const Order = require("../model/orderSchema");

class OrderController {
  async create(req, res) {
    // body {userID, items: [{itemId, quantity}], totalAmount, deliveryAddressId}
    try {
      const order = new Order(req.body);
      const saved = await order.save();
      res.status(200).json(saved);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new OrderController();
