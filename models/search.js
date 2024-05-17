const db = require('../config/db');
class Search {
    static async getDataSearchSql(){
        let sql_genre = `SELECT DISTINCT genre_name FROM genre;`;
        let sql_author = `SELECT DISTINCT author FROM book;`;
        const [result_genre, _] = await db.execute(sql_genre);
        const [result_author, __] = await db.execute(sql_author);
        const result = {
            'genre': result_genre,
            'author': result_author
        }
        return result;
    }
    static async searchAdvancedSql(genre_name, author, sort_name, direction){
        if (sort_name == null){
            sort_name = 'post_date';
            direction = 'DESC';
        }
        let sqlgenre = `SELECT id FROM genre WHERE genre_name = '${genre_name}';`
        const [genre, _] = await db.execute(sqlgenre);
        let sql = `SELECT book.* FROM book WHERE active = 1 ORDER BY ${sort_name} ${direction};`
        
        if (genre != '' && author != null){
            sql = `SELECT book.* FROM book WHERE (genre_id = '${genre[0].id}' and author = '${author}' and active = 1) ORDER BY ${sort_name} ${direction};`
        }
        else if (genre != ''){
            sql = `SELECT book.* FROM book WHERE (genre_id = '${genre[0].id}' and active = 1) ORDER BY ${sort_name} ${direction};`
        }
        else if (author != null){
            sql = `SELECT book.* FROM book WHERE (author = '${author}' and active = 1) ORDER BY ${sort_name} ${direction};`
        }
        console.log(sql);
        const [result, __] = await db.execute(sql);
        return result;
    }
    static async getGenreSql(){
        let sql_genre = `SELECT DISTINCT genre_name FROM genre;`;
        const [result_genre, _] = await db.execute(sql_genre);
        return result_genre;
    }
    static async searchGenreSql(genre_name){
        let sqlgenre = `SELECT id FROM genre WHERE genre_name = '${genre_name}';`
        const [genre, _] = await db.execute(sqlgenre);
        let sql = null;
        if (genre == ''){
            sql = `SELECT book.* FROM book WHERE active = 1 ORDER BY post_date DESC;`;
        }else{
            sql = `SELECT book.* FROM book WHERE (genre_id = '${genre[0].id}' and active = 1) ORDER BY post_date DESC;`;
        }
        const [result, __] = await db.execute(sql);
        return result;
    }
    static async getBooksAvendcedSearch(bookIds, genre_name, author, sort_name, direction) {
        if (sort_name == null){
            sort_name = 'post_date';
            direction = 'DESC';
        }
        let sqlgenre = `SELECT id FROM genre WHERE genre_name = '${genre_name}';`
        const [genre, _] = await db.execute(sqlgenre);
        
        let result = []
        for (let i = 0; i < bookIds.length; i++) {
            let sql = `SELECT book.* FROM book WHERE id = ${bookIds[i]} ORDER BY ${sort_name} ${direction};`
            if (genre != '' && author != null){
                sql = `SELECT book.* FROM book WHERE (genre_id = '${genre[0].id}' and author = '${author}' and id = ${bookIds[i]}) ORDER BY ${sort_name} ${direction};`
            }
            else if (genre != ''){
                sql = `SELECT book.* FROM book WHERE (genre_id = '${genre[0].id}' and id = ${bookIds[i]}) ORDER BY ${sort_name} ${direction};`
            }
            else if (author != null){
                sql = `SELECT book.* FROM book WHERE (author = '${author}' and id = ${bookIds[i]}) ORDER BY ${sort_name} ${direction};`
            }
            const [book, __] = await db.execute(sql);
            if (book[0])
                result.push(book[0]);
        }
        return result;

        
        return result;
    }
}

module.exports = Search;