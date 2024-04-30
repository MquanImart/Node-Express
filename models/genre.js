const db = require('../config/db');
class Genre {
    constructor(id, genre) {
        this.id = id;
        this.genre = genre;
    }
    static async getAllGenre(){
        let sql = `SELECT * FROM genre;`;
        const [result, _] = await db.execute(sql);
        console.log(result);
        return result;
    }

}
module.exports = Genre;