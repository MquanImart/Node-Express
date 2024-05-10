const db = require('../config/db');
class User{
    static async getNameEmail(id) {
        let sql = `SELECT name, email FROM info_user WHERE id = ${id};`;
        const [result, _] = await db.execute(sql);
        return result;
    }
    static async getInfo(id){
        let sql = `SELECT * FROM info_user WHERE id = ${id};`;
        let [result, _] = await db.execute(sql);
        result[0].dob = result[0].dob.toLocaleString();
        result[0].dob = result[0].dob.split(",")[0];
        return result;
    }
    static async updateInfoSql(name, email, sdt, dob, gender, id){
        let sql = `UPDATE info_user 
        set name = '${name}', email = '${email}', 
        phone = '${sdt}', gender = ${gender}, dob = '${dob}'
        WHERE id = ${id};`;
        try{
            await db.execute(sql);
        }
        catch{
            return false;
        }
        return true;
    }
}

module.exports = User;