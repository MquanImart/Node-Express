const FeedBack = require('../models/feedback');
const fetch = require('node-fetch');
exports.addComment = async (req, res, next) => {
    let {user_id, book_id, content, star} = req.body;
    let sentiment
    try {
        const response = await fetch('http://127.0.0.1:5000/sentimentStatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"text" : content}),
        });

        if (response.ok) {
            const responseData = await response.json();
            // console.log(responseData);
            sentiment = parseInt(responseData.result);
            console.log(sentiment)

        } else {
            console.error('Server response not ok:', response.statusText);
            sentiment = 2;
        }
    } catch (error) {
        console.error('Error:', error);
        sentiment = 2;
    }

    result = await FeedBack.addCommentSql(user_id, book_id, content, star, sentiment);
    if (result){
        res.send(result);
    }
    else{
        res.send(false)
    }
}