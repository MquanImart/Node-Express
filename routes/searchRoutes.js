const express = require("express")
const searchController = require('../controllers/searchController');
const router = express.Router();

router.route("/").get(searchController.getDataSearch).post(searchController.searchAdvanced);
router.route("/genre/").get(searchController.getDataGenre).post(searchController.searchGenre);
module.exports = router;