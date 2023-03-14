const express = require("express");
const router = express.Router();

const authorController = require("../controllers/AuthorController");

router.post("/", authorController.createAnAuthor);
router.put("/", authorController.updateAuthor);
router.delete("/", authorController.deleteAuthor);
router.get("/", authorController.getAllAuthor);

module.exports = router;
