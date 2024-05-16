const Book = require('../models/book');
const fetch = require('node-fetch');

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
    /*
    Request format: 
    {
        "ids" : []
    }
    */
    let id = req.body.id
    result = await Book.deleteBook(id);
    if (result){
        res.send(true);
    }
    else{
        res.send(false);
    }
}

exports.getBookById = async (req, res, next) => {
    /*
    Request format: 
    {
        "ids" : []
    }
    */
    let ids = req.body.ids;
    result = await Book.getBooksByIds(ids);
    if (result){
        res.send(result);
    }
    else{
        res.send(false);
    }
}

exports.getFavBooks = async (req, res, next) => {
    /*
    Request format: 
    {
        "user_id" : number
    }
    */
    let user_id = req.body.user_id;
    result = await Book.getFavBooks(user_id);
    if (result){
        res.send(result);
    }
    else{
        res.send(false);
    }
}

exports.getRecentViewBooks = async (req, res, next) => {
    /*
    Request format: 
    {
        "user_id" : number
    }
    */
    let user_id = req.body.user_id;
    result = await Book.getRecentViewBooks(user_id)
    if (result){
        res.send(result);
    }
    else{
        res.send(false);
    }
}



exports.imgSearch = async (req, res, next) => {
    const bodyData = req.body;
    try {
        const response = await fetch('http://127.0.0.1:5000/queryimg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            // Xử lý phản hồi từ server Flask nếu cần
            let result = await Book.getBooksByIds(responseData.ids);
            // Xử lý phản hồi từ server Flask nếu cần
            res.json(result);
        } else {
            // Xử lý lỗi nếu có
            console.error('Server response not ok:', response.statusText);
            res.status(response.status).send('Server Error');
        }
    } catch (error) {
        console.error('Error:', error);
        // Xử lý lỗi nếu có
        res.status(500).send('Internal Server Error')
    }
};

exports.textSearch = async (req, res, next) => {
    const bodyData = req.body;
    try {
        const response = await fetch('http://127.0.0.1:5000/querytext', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            let result = await Book.getBooksByIds(responseData.ids);
            // Xử lý phản hồi từ server Flask nếu cần
            res.json(result);
        } else {
            // Xử lý lỗi nếu có
            console.error('Server response not ok:', response.statusText);
            res.status(response.status).send('Server Error');
        }
    } catch (error) {
        console.error('Error:', error);
        // Xử lý lỗi nếu có
        res.status(500).send('Internal Server Error')
    }
};

exports.textSearch2 = async (req, res, next) => {
    const bodyData = req.body;
    try {
        const response = await fetch('http://127.0.0.1:5000/querytext2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyData),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            // Xử lý phản hồi từ server Flask nếu cần
            res.json(responseData);
        } else {
            // Xử lý lỗi nếu có
            console.error('Server response not ok:', response.statusText);
            res.status(response.status).send('Server Error');
        }
    } catch (error) {
        console.error('Error:', error);
        // Xử lý lỗi nếu có
        res.status(500).send('Internal Server Error')
    }
};
