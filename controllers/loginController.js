const Account = require('../models/account');
exports.checkUser = async (req, res, next) => {
    const acc = new Account("admin", "1");
    if (acc.check()){
        res.send("Thanh Cong");
    }
    else{
        res.send("That Bai");
    }
}
exports.createNewAccount = async (req, res, next) => {
    res.send("Tao Tai Khoan");
}
exports.changePassword = async (req, res, next) => {
    res.send("Doi Mat khau");
}
exports.changeInfoAccount = async (req, res, next) => {
    res.send("Thay Doi Thong Tin");
}
exports.getAllAccount = async (req, res, next) => {
    res.send("Lay Tat Ca Tai Khoan");
}