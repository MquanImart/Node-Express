const db = require('../config/db');
class Book{
    constructor(title, author, describes, img_link, genre_id){
        thid.title = title;
        this.author = author;
        this.post_date = new Date();
        this.describes = describes;
        this.img_link = img_link;
        this.genre_id = genre_id;
    }

    static async getAllBooks(){
        let sql = `SELECT * FROM book;`;
        const [result, _] = await db.execute(sql);
        return result;
    }
}

module.exports = Book;