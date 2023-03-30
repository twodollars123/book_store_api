const Book = require("../model/bookSchema");

class SearchController {
  // search
  async searchBook(req, res) {
    try {
      const keySearch = req.query.q.trim();
      if (!keySearch) {
        return res.status(403).json("khong key search");
      }
      const books = await Book.find({ name: { $regex: keySearch } })
        .limit(req.query.perRequest)
        .sort({ priorityPoints: 1 });
      if (books && books.length > 0) {
        // handle logic sort pagination
        res.status(200).json(books);
      } else {
        res.status(404).json("khong có kêt quả");
      }
    } catch (error) {
      res.status(500).json("sai: ");
    }
  }
}

module.exports = new SearchController();
