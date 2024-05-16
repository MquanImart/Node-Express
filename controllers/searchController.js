const Search = require('../models/search');
exports.getDataSearch = async (req, res, next) => {
    let result = await Search.getDataSearchSql();
    res.send(result);
}
exports.searchAdvanced = async (req, res, next) => {
    let {text, genre_name, author, sort_name, direction} = req.body;
    let result = [];

    if (text == null){result = await Search.searchAdvancedSql(genre_name, author, sort_name, direction);
    }
    else{
        let bodyData = {
            text: text,
            n: 50
        }
        try {
            const response = await fetch('http://127.0.0.1:5000/querytext', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });

            if (response.ok) {
                const responseData = await response.json();
                result = await Search.getBooksAvendcedSearch(responseData.ids, genre_name, author, sort_name, direction);
                // Xử lý phản hồi từ server Flask nếu cần
            } else {
                // Xử lý lỗi nếu có
                console.error('Server response not ok:', response.statusText);
                res.status(response.status).send('Server Error');
            }
        } catch (error) {
            console.error('Error:', error);
            // Xử lý lỗi nếu có
            res.status(500).send('Internal Server Error')
        }
    }
    res.json(result);
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