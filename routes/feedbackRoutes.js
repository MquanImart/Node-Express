const express = require("express")
const feebbackController = require('../controllers/feedbackController');
const router = express.Router();

router.route("/add/").post(feebbackController.addComment);

module.exports = router;