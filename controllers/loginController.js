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
exports.Resgister = async (req, res, next) => {
    let {name, email, phone, dob, gender, username, password, enterpass, role_id} = req.body;
    if (password === enterpass){
        await Account.createAccount(username, password, role_id, name, email, phone, gender, dob);
        res.send(true);
    }
    else{
        res.send(false);
    }
}