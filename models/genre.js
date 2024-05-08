const db = require('../config/db');
class Genre {
    constructor(id, genre) {
        this.id = id;
        this.genre = genre;
    }
    static async getAllGenre(){
        let sql = `SELECT * FROM genre;`;
        const [result, _] = await db.execute(sql);
        return result;
    }

    static async getFavGenreIds(user_id){
        let sql = `SELECT id_genre FROM fav_genre WHERE id_user = ?`
        const [result, _] = await db.execute(sql, [user_id]);
        const genreIds = result.map(row => row.id_genre);
        return {"genre_ids" : genreIds};
    }

    static async addGenre(id, listgenre){
        const selectedIds = [];
        for (const genre in listgenre) {
          if (listgenre[genre]) {
            selectedIds.push(parseInt(genre, 10));
          }
        }

        for (let i = 0; i < selectedIds.length; i++){
            try {
                let sql = `INSERT INTO fav_genre(id_user, id_genre) values(${id}, ${selectedIds[i]});`;
                const [result, _] = await db.execute(sql);
            } catch (error) {
                return false;
            }
        }
        return true;
    }
}
module.exports = Genre;