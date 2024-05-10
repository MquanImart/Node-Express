const User = require('../models/user');
const Account = require('../models/account');
const Genre = require('../models/genre');
const Propose = require('../models/propose');
exports.getNameEmail = async (req, res, next) => {
    let id = req.params.id;
    result = await User.getNameEmail(id);
    if (result){
        res.send(result);
    }
    else{
        res.send(false)
    }
}
exports.getInfo = async (req, res, next) => {
    let id = req.params.id;
    result = await User.getInfo(id);
    if (result){
        res.send(result);
    }
    else{
        res.send(false)
    }
}
exports.getUsername = async (req, res, next) => {
    let id = req.params.id;
    result = await Account.getUsername(id);
    if (result){
        res.send(result);
    }
    else{
        res.send(false)
    }
}
exports.getGenreById = async (req, res, next) => {
    let id = req.params.id;
    result = await Genre.getGenreById(id);
    if (result){
        res.send(result);
    }
    else{
        res.send(false)
    }
}