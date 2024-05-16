const FeedBack = require('../models/feedback');
exports.addComment = async (req, res, next) => {
    let {user_id, book_id, content, star} = req.body;
    result = await FeedBack.addCommentSql(user_id, book_id, content, star);
    if (result){
        res.send(result);
    }
    else{
        res.send(false)
    }
}