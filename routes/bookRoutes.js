const express = require("express")
const bookController = require('../controllers/bookController');
const router = express.Router();

router.route("/getBook").get(bookController.getBook);

module.exports = router;