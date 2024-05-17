const db = require('../config/db');
class FeedBack{
    static async addCommentSql(user_id, book_id, content, star, sentiment) {
        let sql_check = `SELECT * FROM comments WHERE user_id = ${user_id} and book_id = ${book_id}`;
        let [result, _] = await db.execute(sql_check);

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${day}`;
        const post_date = formattedDate;

        let sql = `INSERT INTO comments(book_id, user_id, content, comment_date, sentiment) values(${book_id}, ${user_id}, '${content}', '${post_date}', '${sentiment}')`;
        let sql_rate = `INSERT INTO rate(book_id, user_id, score, rate_date) values(${book_id}, ${user_id}, '${star}', '${post_date}')`;
        if (result.length > 0){
            sql = `UPDATE comments set content = '${content}', comment_date = '${post_date}' 
                    WHERE user_id = ${user_id} and book_id = ${book_id}`;
            sql_rate = `UPDATE rate set score = '${star}', rate_date = '${post_date}' 
                    WHERE user_id = ${user_id} and book_id = ${book_id}`;
        }
        try{
            await db.execute(sql);
            await db.execute(sql_rate);
        }catch{
            return false;
        }
        return true;

    }
}

module.exports = FeedBack;