const express = require("express")
const userController = require('../controllers/userController');
const router = express.Router();

router.route("/getName/:id").get(userController.getNameEmail);
router.route("/info/:id").get(userController.getInfo);
router.route("/getusername/:id").get(userController.getUsername);
router.route("/getgenre/:id").get(userController.getGenreById);
module.exports = router;