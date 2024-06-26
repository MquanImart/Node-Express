const db = require('../config/db');
class Propose {
    static async getPropose(id_user){
        let sql_genre = `SELECT id_genre FROM fav_genre WHERE id_user = ${id_user};`;
        const [genre, _] = await db.execute(sql_genre);
        let sql = `SELECT book.*, genre.genre_name FROM book JOIN genre ON book.genre_id = genre.id ORDER BY post_date DESC LIMIT 50;`

        if (genre.length > 0){
            sql = `SELECT book.*, genre.genre_name FROM book JOIN genre ON book.genre_id = genre.id WHERE (genre_id = ${genre[0].id_genre}`;
        }
        for(let i = 1; i < genre.length; i++){
            sql = sql + ` or genre_id = ${genre[i].id_genre}`
        }
        if (genre.length > 0){
            sql = sql + `) ORDER BY post_date DESC LIMIT 50;`
        }
        const [result, __] = await db.execute(sql);
        return result;
    }

    static async getHotSql(){  
        let sql = `SELECT book.*, genre.genre_name FROM book JOIN genre ON book.genre_id = genre.id WHERE active = 1 ORDER BY view DESC LIMIT 20;`
        const [result, __] = await db.execute(sql);
        return result;
    }

    static async getHistorySql(id_user){  
        let sql = `SELECT book.*, h_v.view_time FROM book JOIN (SELECT * FROM history_view WHERE user_id = ${id_user}) as h_v ON book.id = h_v.book_id WHERE active = 1 ORDER BY view_time DESC LIMIT 20;`
        const [result, __] = await db.execute(sql);
        console.log(sql);
        return result;
    }
    static async getLoveBookSql(id_user){  
        let sql = `SELECT book.* FROM book JOIN (SELECT * FROM fav_book WHERE user_id = ${id_user}) as favb ON book.id = favb.book_id WHERE active = 1 ORDER BY id ASC;`
        const [result, __] = await db.execute(sql);
        console.log(sql);
        return result;
    }
    static async deleteBookLove(id_user, id_book){  
        let sql = `DELETE FROM fav_book WHERE user_id = ${id_user} and book_id = ${id_book};`
        console.log(sql);
        try{
            await db.execute(sql);
        }catch{
            return false;
        }
        return true;
    }
    static async addBookLove(id_user, id_book){  
        let check = `SELECT * FROM fav_book WHERE user_id = ${id_user} and book_id = ${id_book};`
        let [result, _] = [];
        try{
            [result, _] = await db.execute(check);
        }catch{
            return false;
        }
        if (result.length>0){
            return true;
        }
        let sql = `INSERT INTO fav_book(user_id, book_id) values(${id_user}, ${id_book});`
        try{
            await db.execute(sql);
        }catch{
            return false;
        }
        return true;
    }
}
module.exports = Propose;