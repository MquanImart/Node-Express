const db = require('../config/db');
class Account {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    async check(){
        let sql = `SELECT * FROM taikhoan WHERE username = ${this.username} and pass = ${this.password};`
        const [account, _] = await db.execute(sql);
        if (account != null){
            return true;
        }
        return false;
    }



}
module.exports = Account;