const db = require('../config/db');
class Book{
    constructor(id, title, author, describes, img_link, genre_id){
        this.id = id;
        this.title = title;
        this.author = author;
        this.post_date = new Date(Date.now());
        this.describes = describes;
        this.img_link = img_link;
        this.genre_id = genre_id;
    }

    static async getAllBooks(){
        let sql = `SELECT * FROM book WHERE active=1;`;
        const [result, _] = await db.execute(sql);
        return result;
    }
    static async getBooksByIds(bookIds) {
        const sql = `SELECT * FROM book WHERE id IN (${bookIds}) and active=1;`;
        const [result, _] = await db.execute(sql);
        return result;
    }

    static async getFavBooks(userId){
        const sql = `SELECT * FROM book where id IN (SELECT book_id FROM fav_book WHERE user_id = ?) and active=1`;
        const [result, _] = await db.execute(sql, [userId]);
        return result;
    }
    
    static async getRecentViewBooks(user_id){
        const sql = `SELECT * FROM book INNER JOIN history_view ON book.id = history_view.book_id where user_id = ? ORDER BY view_time DESC`
        const [result, _] = await db.execute(sql, [user_id]);
        return result;
    }

    async insertBook() {
        let sql = `INSERT INTO book (id, title, author, post_date, describes, img_link, genre_id) 
                   VALUES (?, ?, ?, ?, ?, ?, ?);`;
        const values = [this.id, this.title, this.author, this.post_date, this.describes, this.img_link, this.genre_id];
        const [result, _] = await db.execute(sql, values);
        return result;
    }

    static async deleteBook(id){
        let sql = `UPDATE book SET active=0 WHERE id IN (?)`;
        const [result, _] = await db.execute(sql, id);
        return result;
    }
    static async createNewId(){
        let result = true;
        let i = 1;
        while(result){
            let sql = `SELECT id FROM book WHERE id = ${i}`;
            const [id, _] = await db.execute(sql);
            if (id.length <= 0){
                result = false;
                break;
            }
            i = i + 1;
        }
        return i;
    }
}

module.exports = Book;