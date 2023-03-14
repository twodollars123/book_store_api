const express = require("express");
const router = express.Router();

const genreController = require("../controllers/GenreController");

router.post("/", genreController.createOne);
router.get("/", genreController.getAll);
router.get("/:id", genreController.getById);
router.put("/:id", genreController.update);
router.delete("/:id", genreController.delete);

module.exports = router;
