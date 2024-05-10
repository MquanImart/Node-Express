const express = require("express")
const bookController = require('../controllers/bookController');
const router = express.Router();

router.route("/getBook/").get(bookController.getBook);
router.route("/getBookById/:id").get(bookController.getBookById);
router.route("/addBook/").post(bookController.addBook);
router.route("/deleteBook/").get(bookController.deleteBook)

module.exports = router;