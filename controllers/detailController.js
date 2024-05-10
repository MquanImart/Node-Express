const Detail = require('../models/detail');
exports.getBookById = async (req, res, next) => {
    let id = req.params.id;
    result = await Detail.getBooksByIds(id);
    if (result){
        res.send(result);
    }
    else{
        res.send(false)
    }
}
exports.getCommentById = async (req, res, next) => {
    let id = req.params.id;
    result = await Detail.getCommentById(id);
    if (result){
        res.send(result);
    }
    else{
        res.send(false)
    }
}