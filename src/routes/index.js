const bookRouter = require("./book");
const authRouter = require("./auth");
const userRouter = require("./user");
const authorRouter = require("./author");
const genreRouter = require("./genre");

function route(app) {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/book", bookRouter);
  app.use("/author", authorRouter);
  app.use("/genre", genreRouter);
}

module.exports = route;
