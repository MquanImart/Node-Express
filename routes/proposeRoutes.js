const express = require("express")
const proposeController = require('../controllers/proposeController');
const router = express.Router();

router.route("/propose/:id_user").get(proposeController.getPropose);
router.route("/hot/").get(proposeController.getHot);
router.route("/history/:id_user").get(proposeController.getHistory);
module.exports = router;