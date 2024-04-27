const express = require("express")
const loginControllers = require('../controllers/loginController');
const router = express.Router();

router.route("/").get(loginControllers.checkUser);

module.exports = router;