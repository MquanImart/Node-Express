const Book = require('../models/book');
exports.getBook = async (req, res, next) => {
    try {
        const listbook = await Book.getAllBooks();
        res.send(listbook);
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Error fetching books");
    }
}

exports.addBook = async (req, res, next) => {
    try {
        console.log("Request Body:", req.body); // Print req.body for debugging
        
        const { title, author, describes, img_link, genre_id } = req.body;
        
        // Check if required parameters are undefined
        if (title === undefined || author === undefined || describes === undefined || img_link === undefined || genre_id === undefined) {
            return res.status(400).send("Missing required parameters");
        }

        // Convert genre_id to an integer
        const genreIdInt = parseInt(genre_id);

        // Create a new Book instance
        const newBook = new Book(title, author, describes, img_link, genreIdInt);

        // Call insertBook method to insert the new book into the database
        const result = await newBook.insertBook();

        res.status(201).send("Book added successfully");
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).send("Error adding book");
    }
}

exports.deleteBook = async (req, res, next) => {
    let id = req.query.id;
    result = await Book.deleteBook(id);
    if (result){
        res.send(true);
    }
    else{
        res.send(false);
    }
}

exports.getBookById = async (req, res, next) => {
    let id = req.params.id;
    result = await Book.getBooksByIds(id);
    if (result){
        res.send(result);
    }
    else{
        res.send(false)
    }
}
