const express = require("express")
const genreController = require('../controllers/genreController');
const router = express.Router();

router.route("/getgenre").get(genreController.getGenre);
router.route("/add/:id").post(genreController.addGenre);
module.exports = router;