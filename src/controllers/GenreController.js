const mongoose = require("mongoose");

const Genre = require("../model/genreSchema");
const Book = require("../model/bookSchema");

class GenreController {
  async createOne(req, res) {
    try {
      const newGenre = new Genre(req.body);
      const saveGenre = await newGenre.save();
      res.status(200).json(saveGenre);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAll(req, res) {
    try {
      const genres = await Genre.find();
      res.status(200).json(genres);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getById(req, res) {
    try {
      const genre = await Genre.findById(req.params.id);
      res.status(200).json(genre);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async update(req, res) {
    try {
      const genre = await Genre.findById(req.params.id);
      if (genre) {
        await genre.updateOne({ $set: req.body });
        res.status(200).json("update successfully");
      }
      res.status(404).json("not a genre yet");
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req, res) {
    try {
      await Book.updateMany(
        { genres: req.params.id },
        { $pull: { genres: req.params.id } }
      );
      await Genre.findByIdAndDelete(req.params.id);
      res.status(200).json("delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new GenreController();
