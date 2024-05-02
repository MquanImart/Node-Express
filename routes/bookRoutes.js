const express = require("express")
const bookController = require('../controllers/bookController');
const router = express.Router();

router.route("/getBook").get(bookController.getBook);
router.route("/addBook").post(bookController.addBook);


module.exports = router;