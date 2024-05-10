const Propose = require('../models/propose');
exports.getPropose = async (req, res, next) => {
    let id_user = req.params.id_user;
    let result = await Propose.getPropose(id_user);
    res.send(result);
}
exports.getHot = async (req, res, next) => {
    let result = await Propose.getHotSql();
    res.send(result);
}
exports.getHistory = async (req, res, next) => {
    let id_user = req.params.id_user;
    let result = await Propose.getHistorySql(id_user);
    res.send(result);
}
exports.getLoveBook = async (req, res, next) => {
    let id_user = req.params.id_user;
    let result = await Propose.getLoveBookSql(id_user);
    res.send(result);
}
exports.deleteBookLove = async (req, res, next) => {
    let {id_user, id_book} = req.body;
    let result = await Propose.deleteBookLove(id_user, id_book);
    res.send(result);
}