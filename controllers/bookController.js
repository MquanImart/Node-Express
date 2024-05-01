const Book = require('../models/book');
exports.getBook = async (req, res, next) => {
    let listbook = await Book.getAllBooks();
    res.send(listbook);
}