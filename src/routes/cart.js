const express = require("express");
const router = express.Router();

const cartController = require("../controllers/CartController");

router.get("/:id", cartController.getCart);
router.get("/", cartController.getCart);
router.post("/:idUser/addtocart", cartController.addToCart);
router.post("/:idUser/changequantity", cartController.changeQuantity);
router.post("/create", cartController.createCart);

module.exports = router;