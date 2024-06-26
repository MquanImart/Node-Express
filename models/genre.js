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
    static async getGenreIds(name_genre){
        let sql = `SELECT id FROM genre WHERE genre_name = '${name_genre}'`;
        console.log(sql);
        const [result, _] = await db.execute(sql);
        return result[0].id;
    }
    static async addGenre(id, listgenre){
        const selectedIds = [];
        const deletedIds = [];
        for (const genre in listgenre) {
          if (listgenre[genre]) {
            selectedIds.push(parseInt(genre, 10));
          }
          else {
            deletedIds.push(parseInt(genre, 10));
          }
        }
        for (let i = 0; i < selectedIds.length; i++){
            try {
                let checksql = `SELECT * FROM fav_genre WHERE id_user = ${id} and id_genre = ${selectedIds[i]};`;
                const [check, __] = await db.execute(checksql);
                if (check.length <= 0){
                    let sql = `INSERT INTO fav_genre(id_user, id_genre) values(${id}, ${selectedIds[i]});`;
                    const [result, _] = await db.execute(sql);
                }
            } catch (error) {
                return false;
            }
        }

        for (let i = 0; i < deletedIds.length; i++){
            try {
                let checksql = `SELECT * FROM fav_genre WHERE id_user = ${id} and id_genre = ${deletedIds[i]};`
                const [check, __] = await db.execute(checksql);
                if (check.length > 0){
                    let sql = `DELETE FROM fav_genre WHERE id_user = ${id} and id_genre = ${deletedIds[i]};`;
                    await db.execute(sql);
                }
            } catch (error) {
                return false;
            }
        }

        return true;
    }
    static async getGenreById(id_user){
        let sql = `SELECT id_genre FROM fav_genre WHERE id_user = ${id_user};`;
        const [list_id, _] = await db.execute(sql);
        const result = {};
        list_id.forEach(row => {
            result[row.id_genre] = true;
        });
        return result;
    }
}
module.exports = Genre;