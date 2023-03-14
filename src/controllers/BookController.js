const mongoose = require("mongoose");
const Book = require("../model/bookSchema");
const Genre = require("../model/genreSchema");
const Author = require("../model/authorSchema");

class BookController {
  async createOne(req, res) {
    try {
      const newBook = new Book(req.body);
      const savedBook = await newBook.save();
      if (req.body.author) {
        const author = await Author.findById(req.body.author);
        if (author && !author.books.includes(newBook._id)) {
          await author.updateOne({ $push: { books: savedBook._id } });
        } else {
          res.status(401).json("chưa có author hoặc đã có sách trong database");
        }
      }
      if (newBook.genres) {
        newBook.genres.map(async (genreId) => {
          const genre = await Genre.findById(genreId);
          if (genre && !genre.books.includes(newBook._id)) {
            await genre.updateOne({
              $push: { books: newBook._id },
            });
          } else {
            res
              .status(401)
              .json("chưa có genre hoặc đã có sách trong database");
          }
        });
      }
      res.status(200).json(savedBook);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllBook(req, res) {
    try {
      const allBooks = await Book.find();
      res.status(200).json(allBooks);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getABookById(req, res) {
    try {
      const book = await Book.findById(req.params.id);
      if (book) {
        res.status(200).json(book);
      }
      res.status(404).json("not found the book");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getBooksLimit(req, res) {
    try {
      const perPage = req.query.perPage || 5;
      const page = req.query.page || 1;
      await Book.find()
        .sort({ createdAt: -1 })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec((err, books) => {
          if (err) res.status(404).json("falure");
          res.status(200).json(books);
        });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateABook(req, res) {
    try {
      const book = await Book.findById(req.body._id);
      if (book) {
        await book.updateOne({ $set: req.body });
        const savedBook = await book.save();
        res.status(200).json(savedBook);
      }
      res.status(404).json("not found");
    } catch (error) {
      res.status.json(error);
    }
  }

  async deleteABook(req, res) {
    try {
      await Author.updateMany(
        { books: req.body._id },
        { $pull: { books: req.body._id } }
      );
      await Genre.updateMany(
        { books: req.body._id },
        { $pull: { books: req.body._id } }
      );
      await Book.findByIdAndDelete(req.body._id);
      res.status(200).json("delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getListFavouriteBooks(req, res) {
    try {
      const perPage = req.query.perPage || 5;
      const page = req.query.page || 1;
      await Book.find()
        .skip(perPage * page - perPage)
        .sort({ priorityPoints: -1 })
        .limit(perPage)

        .exec((err, books) => {
          if (err) res.status(404).json("falure");
          res.status(200).json(books);
        });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new BookController();
