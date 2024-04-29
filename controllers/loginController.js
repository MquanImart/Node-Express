const Account = require('../models/account');
let otp = ""
exports.checkUser = async (req, res, next) => {
    let { username, password} = req.body;
    let acc = new Account(username, password);

    const result = await acc.check();
    if (result){
        res.send(true);
    }
    else{
        res.send(false);
    }
}
exports.createNewAccount = async (req, res, next) => {
    res.send("Tao Tai Khoan");
}
exports.sendCode = async (req, res, next) => {
    let {username} = req.body;
    result = await Account.sendCode(username);
    if (result){
        res.send(true);
    }
    else{
        res.send(false);
    }
    
}
exports.openchangePassword = async (req, res, next) => {
    let {username, userotp} = req.body;
    if (userotp === global.otp){
        global.username = username;
        res.send(true);
    }
    else{
        res.send(false);
    }
}
exports.changePassword = async (req, res, next) => {
    let {password, enterpass} = req.body;
    if (password === enterpass){
        Account.ChangePassword(password);
        res.send(true);
    }
    else{
        res.send(false);
    }
}
exports.changeInfoAccount = async (req, res, next) => {
    res.send("Thay Doi Thong Tin");
}