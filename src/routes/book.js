const express = require("express");
const router = express.Router();

const bookController = require("../controllers/BookController");

router.post("/pagination/", bookController.getBooksLimit);
router.post("/", bookController.createOne);
router.get("/:id", bookController.getABookById);
router.get("/", bookController.getAllBook);
router.post("/listfavourite/", bookController.getListFavouriteBooks);
router.put("/", bookController.updateABook);
router.delete("/", bookController.deleteABook);

module.exports = router;
