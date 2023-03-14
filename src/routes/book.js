const express = require("express");
const router = express.Router();

const bookController = require("../controllers/BookController");

router.post("/", bookController.createOne);
router.get("/", bookController.getAllBook);
router.get("/:id", bookController.getABookById);
router.post("/pagination/", bookController.getBooksLimit);
router.post("/listfavourite/", bookController.getListFavouriteBooks);
router.put("/", bookController.updateABook);
router.delete("/", bookController.deleteABook);

module.exports = router;
