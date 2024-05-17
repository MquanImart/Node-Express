const db = require('../config/db');
class Book{
    constructor(id, title, author, describes, img_link, genre_id){
        this.id = id;
        this.title = title;
        this.author = author;

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${day}`;
        this.post_date = formattedDate;

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
        let result = [];
        for (let i = 0; i < bookIds.length; i++) {
            const book = await this.getBooksById(bookIds[i]);
            console.log(book)
            if (book[0])
                result.push(book[0]);
        }
        return result;
    }
    
    static async getBooksById(bookid){
        const sql = `SELECT * FROM book WHERE id = ${bookid} and active=1;`;
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
    async updateBook() {
        let sql = `UPDATE book set title = '${this.title}', author = '${this.author}', 
        post_date = '${this.post_date}', describes = '${this.describes}', 
        img_link='${this.img_link}', genre_id=${this.genre_id} 
        WHERE id = ${this.id}`;
        console.log(sql);
        try{
            const [result, _] = await db.execute(sql);
        }catch{
            return false;
        }
        return true;
    }

    static async deleteBook(id){
        let check = `SELECT active FROM book WHERE id = ${id}`;
        const [resultcheck, __] = await db.execute(check);

        let sql = `UPDATE book SET active=0 WHERE id = ${id}`;
        if (resultcheck[0].active == 0){
            sql = `UPDATE book SET active=1 WHERE id = ${id}`;
        }
        const [result, _] = await db.execute(sql);
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