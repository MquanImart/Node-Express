const NXB = require('../models/NXB');
const Book = require('../models/book');
const Genre = require('../models/genre');
exports.getData = async (req, res, next) => {
    let id = req.params.id;
    let result = await NXB.getDataSql(id);
    res.send(result);
}
exports.addBook = async (req, res, next) => {
    let id_user = req.params.id;
    let {title,genre,author,describes,img_link} = req.body;

    let id_book = await Book.createNewId();
    let genre_id = await Genre.getGenreIds(genre);
    let newbook = new Book(id_book, title, author, describes, img_link, genre_id);
    try{
        newbook.insertBook();
        NXB.addNxb(id_user, id_book);
    }catch{
        res.send(false);
    }
    res.send(true); 
}