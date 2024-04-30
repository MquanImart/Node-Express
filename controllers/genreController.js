const Genre = require('../models/genre');
exports.getGenre = async (req, res, next) => {
    let listgenre = await Genre.getAllGenre();
    res.send(listgenre);
}