const mongoose = require("mongoose");

const Author = require("../model/authorSchema");
const Book = require("../model/bookSchema");

class AuthorController {
  async createAnAuthor(req, res) {
    try {
      const newAuthor = await new Author(req.body);
      const savedAuthor = await newAuthor.save();
      res.status(200).json(savedAuthor);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllAuthor(req, res) {
    try {
      const allAuthors = await Author.find();
      res.status(200).json(allAuthors);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateAuthor(req, res) {
    try {
      const author = await Author.findById(req.body._id);
      if (author) {
        await author.updateOne({ $set: req.body });
        res.status(200).json(author);
      }
      res.status(404).json("not an author yet");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteAuthor(req, res) {
    try {
      await Book.updateMany(
        { author: req.body._id },
        { isAble: false, author: null }
      );
      await Author.findByIdAndDelete(req.body._id);
      res.status(200).json("delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new AuthorController();
