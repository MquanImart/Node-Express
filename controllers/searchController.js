const Search = require('../models/search');
exports.getDataSearch = async (req, res, next) => {
    let result = await Search.getDataSearchSql();
    res.send(result);
}
exports.searchAdvanced = async (req, res, next) => {
    let { genre_name, author, sort_name, direction} = req.body;
    let result = await Search.searchAdvancedSql(genre_name, author, sort_name, direction);
    res.send(result);
}
exports.getDataGenre = async (req, res, next) => {
    let result = await Search.getGenreSql();
    res.send(result);
}
exports.searchGenre = async (req, res, next) => {
    let { genre_name} = req.body;
    let result = await Search.searchGenreSql(genre_name);
    res.send(result);
}