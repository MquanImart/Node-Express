const express = require("express")
const detailController = require('../controllers/detailController');
const router = express.Router();

router.route("/").post(detailController.getBookById);
router.route("/comment/:id").get(detailController.getCommentById);
module.exports = router;