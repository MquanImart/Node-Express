const express = require("express")
const bookController = require('../controllers/bookController');
const router = express.Router();

router.route("/getBook/").get(bookController.getBook);
router.route("/getBookById/:id").get(bookController.getBookById);
router.route("/addBook/").post(bookController.addBook);
router.route("/deleteBook/").get(bookController.deleteBook)
router.route("/getFavBooks").get(bookController.getFavBooks)
router.route("/getRecentViewBooks").get(bookController.getRecentViewBooks)
router.route("/imgSearch").post(bookController.imgSearch)
router.route("/textSearch").post(bookController.textSearch)
router.route("/textSearch2").post(bookController.textSearch2)

module.exports = router;