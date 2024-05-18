const db = require('../config/db');
class Detail{
    static async getBooksByIds(bookIds) {
        const sql = `SELECT * FROM book WHERE id = ${bookIds};`;
        const [book, _] = await db.execute(sql);
        if (book == ''){
            return false;
        }
        const sqlgenre = `SELECT genre_name FROM genre WHERE id = ${book[0].genre_id}`;
        const [genre, __] = await db.execute(sqlgenre);
        const sqllike = `SELECT count(*) as numlike FROM fav_book WHERE book_id = ${bookIds}`;
        const [like, ___] = await db.execute(sqllike);
        const sqlrate = `SELECT avg(score) as numrate FROM rate WHERE book_id = ${bookIds}`;
        const [rate, ____] = await db.execute(sqlrate);
        const sqlcomment = `SELECT count(*) as numcomment FROM comments WHERE book_id = ${bookIds}`;
        const [comment, _____] = await db.execute(sqlcomment);

        let result = {
            id: book[0].id,
            imglink: book[0].img_link,
            postdate: book[0].post_date,
            title: book[0].title,
            genre_id: book[0].genre_id,
            genre: genre[0].genre_name,
            author: book[0].author,
            like: like[0].numlike,
            star: rate[0].numrate,
            commemt: comment[0].numcomment,
            describe: book[0].describes,
            view: book[0].view
        }
        return result;
    }
    static async getCommentById(bookid){
        const sql = `SELECT rate.score, info_user.name, R1.*
        FROM (SELECT * FROM comments WHERE book_id = ${bookid}) R1
        INNER JOIN info_user ON R1.user_id = info_user.id
        INNER JOIN rate ON R1.user_id = rate.user_id and R1.book_id = rate.book_id`;
        const [comment, _____] = await db.execute(sql);
        return comment;
    }
}

module.exports = Detail;