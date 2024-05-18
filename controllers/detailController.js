const Detail = require('../models/detail');
const History = require('../models/history');
const Book = require('../models/book');
exports.getBookById = async (req, res, next) => {
    let {user_id, book_id} = req.body;
    result = await Detail.getBooksByIds(book_id);
    if (result){
        await History.postNew(user_id, book_id);
        await Book.increaseView(book_id);
        res.send(result);
    }
    else{
        res.send(false)
    }
}
exports.getCommentById = async (req, res, next) => {
    let id = req.params.id;
    result = await Detail.getCommentById(id);
    if (result){
        res.send(result);
    }
    else{
        res.send(false)
    }
}