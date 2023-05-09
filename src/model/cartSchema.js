const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "book" },
        quantity: { type: Number, default: 1 },
        totalPrice: { type: Number },
      },
    ],
    totalPrice: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("cart", cartSchema);
