const db = require('../config/db');
class Book{
    constructor(title, author, describes, img_link, genre_id){
        this.title = title;
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

    async insertBook() {
        let sql = `INSERT INTO book (title, author, post_date, describes, img_link, genre_id) 
                   VALUES (?, ?, ?, ?, ?, ?);`;
        const values = [this.title, this.author, this.post_date, this.describes, this.img_link, this.genre_id];
        const [result, _] = await db.execute(sql, values);
        return result;
    }

    static async deleteBook(id){
        let sql = `UPDATE book SET active=0 WHERE id=?`;
        const [result, _] = await db.execute(sql, [id]);
        return result;
    }
}

module.exports = Book;