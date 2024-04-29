const express = require("express")
const loginControllers = require('../controllers/loginController');
const router = express.Router();

router.route("/").post(loginControllers.checkUser);
router.route("/sendcode/").post(loginControllers.sendCode);
router.route("/changepass/").post(loginControllers.openchangePassword);
router.route("/submitchangepass/").post(loginControllers.changePassword);
module.exports = router;