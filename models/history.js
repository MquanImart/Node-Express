const db = require('../config/db');
class History{
    static async postNew(user_id, book_id) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}/${month}/${day}`;

        let sql_check = `SELECT * FROM history_view WHERE user_id = ${user_id} and book_id = ${book_id}`;
        let [check, _] = await db.execute(sql_check);
        let sql = ``;
        if (check.length>0){
            sql = `UPDATE history_view set view_time = '${formattedDate}' WHERE user_id = ${user_id} and book_id = ${book_id}`;
        }
        else{
            sql = `INSERT INTO history_view(user_id, book_id, view_time) values(${user_id}, ${book_id}, '${formattedDate}')`;
        }
        console.log(sql);
        try{
            await db.execute(sql);
        }catch{
            return false;
        }
        return true;
    }
}

module.exports = History;