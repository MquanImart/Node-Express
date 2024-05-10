const db = require('../config/db');
global.otp = ""
class Account {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    async check(){
        let sql = `SELECT * FROM accounts WHERE username = '${this.username}' and pass = '${this.password}';`;
        const [account, _] = await db.execute(sql);
        if (account.length > 0){
            return true;
        }
        return false;
    }
    static async getIdUser(username){
      let sql = `SELECT id FROM accounts WHERE username = '${username}';`;
      const [result, _] = await db.execute(sql);
      if (result.length > 0){
        return result;
      }
      return null;
      }
      static async getUsername(id){
        let sql = `SELECT username FROM accounts WHERE id = ${id};`;
        const [result, _] = await db.execute(sql);
        if (result.length > 0){
          return result;
        }
        return null;
    }
    static async sendCode(username_change){
        let sql = `SELECT email FROM info_user WHERE id = (SELECT id FROM accounts WHERE username = '${username_change}');`;
        console.log(sql);
        const [result, _] = await db.execute(sql);
        if (result.length <= 0){
            return false;
        }
        let email = result[0].email

        const nodemailer = require('nodemailer');

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'phanquanmyhiep@gmail.com',
              pass: 'zslpzhsgmoufafip' // Sử dụng mật khẩu ứng dụng nếu bạn đã bật xác minh 2 bước
            }
          });

        global.otp = Math.floor(10000 + Math.random() * 90000).toString();

        let mailOptions = {
            from: 'phanquanmyhiep@gmail.com', // Thay thế bằng địa chỉ email của bạn
            to: email, // Thay thế bằng địa chỉ email người nhận
            subject: 'Mã xác nhận của FINDBOOK', // Tiêu đề email
            text: global.otp, // Nội dung email dạng text
            html: '<b>' + global.otp + '</b>' // Nội dung email dạng HTML
          };
          
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
          });
        return true;
    }
    static async ChangePassword(password){
        let sql = `UPDATE accounts SET pass = '${password}' WHERE username = '${global.username}';`;
        const [result, _] = await db.execute(sql);
    }
    static async getnewID(){{
        let i = 1;
        let dk = true;
        while(dk){
          let sql = `SELECT id FROM accounts WHERE id = ${i}`;
          const [result, _] = await db.execute(sql);
          if (result.length <= 0){
            break;
          }
          i = i + 1;
        }
        return i;
    }}
    static async createAccount(username, password, role_id, name, email, phone, gender, dob){
      let id = await this.getnewID();
      let sql = `INSERT INTO accounts(id, username, pass, role_id, active) values(${id}, '${username}', '${password}',${role_id}, ${1});`;
      const [result, _] = await db.execute(sql);
      sql = `INSERT INTO info_user(id, name, email, phone, gender, dob) values(${id}, '${name}', '${email}','${phone}', ${gender}, '${dob}');`;

      const [result1, __] = await db.execute(sql);
    }

}
module.exports = Account;