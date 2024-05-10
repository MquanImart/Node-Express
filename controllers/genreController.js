const Genre = require('../models/genre');
exports.getGenre = async (req, res, next) => {
    let listgenre = await Genre.getAllGenre();
    res.send(listgenre);
}
exports.addGenre = async (req, res, next) => {
    let id = req.params.id;
    let {listgenre} = req.body;
    result = await Genre.addGenre(id, listgenre);
    if (result){
        res.send(true);
    }
    else{
        res.send(false);
    }
}

exports.getFavGenreIds = async (req, res, next) => {
    let user_id = req.body.user_id;
    result = await Genre.getFavGenreIds(user_id)
    if (result){
        res.send(result);
    }
    else{
        res.send(false);
    }
}