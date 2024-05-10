const db = require('../config/db');
class NXB{
    static async getDataSql(id){
        let sql = `SELECT book.* FROM book JOIN nxb ON book.id = nxb.book_id WHERE nxb.user_id = ${id}`;
        const [result, _] = await db.execute(sql);
        return result;
    }
    static async addNxb(user_id, book_id){
        let sql = `INSERT INTO nxb(user_id, book_id) values(${user_id}, ${book_id})`;
        const [result, _] = await db.execute(sql);
        return result;
    }
}

module.exports = NXB;