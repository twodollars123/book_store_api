const mongoose = require("mongoose");

const Cart = require("../model/cartSchema");
const Book = require("../model/bookSchema");

class CartController {
  async getCart(req, res) {
    try {
      const cart = await Cart.find();
      if (!cart) {
        res.json("do not have a book yet!");
      }
      res.json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  async getCartById(req, res) {
    try {
      const cart = await Cart.findById(req.params.id);
      if (cart) {
        res.status(200).json(cart);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createCart(req, res) {
    try {
      const newCart = new Cart(req.body);
      const saveCart = await newCart.save();
      res.status(200).json(saveCart);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async addToCart(req, res) {
    try {
      const cart = await Cart.findOne({ user: req.params.idUser });
      if (!cart) {
        res.json("chua co cart");
      } else {
        // kieem tra san pham do co ton taij khong
        const book = await Book.findById(req.body.itemId);
        console.log("c", book);
        if (!book) {
          res.json("san pham khong ton tai");
        } else {
          //kiem tra san pham them da co trong items chua
          const existItem = cart.items.findIndex((item) =>
            item.itemId.equals(book._id)
          );
          if (existItem !== -1) {
            //da co thi tang so luong len 1 va tong tien tang
            cart.items[existItem].quantity++;
            // cart.items[existItem].totalPrice =
          } else {
            cart.items.push(req.body);
          }
        }
      }
      const save = await cart.save();
      res.json(save);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async changeQuantity(req, res) {
    try {
      const cart = await Cart.findOne({ user: req.params.idUser });
      if (!cart) {
        res.json("khong co gio hang");
      }
      const index = cart.items.findIndex((item) => item._id === req.body.id);
      if (!index) {
        res.json("khong co item");
      }
      if (req.body.quantity === 0) {
        cart.items = cart.items.filter((item) => item !== cart.items[index]);
        const save = await cart.save();
        res.json(save);
      } else {
        console.log("b");
        cart.items[index].quantity = req.body.quantity;
        const save = await cart.save();
        console.log("a", save);
        res.json(save);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new CartController();
