const express = require("express");
const router = express.Router();

const genreController = require("../controllers/GenreController");
const middlewareController = require("../controllers/MiddlewareController");

router.post("/", genreController.createOne);
router.get("/", genreController.getAll);
router.get("/:id", genreController.getById);
router.put(
  "/:id",
  middlewareController.verifyTokenAndAdminAuth,
  genreController.update
);
router.delete("/:id", genreController.delete);

module.exports = router;
