const express = require("express")
const NXBController = require('../controllers/NXBController');
const router = express.Router();

router.route("/:id").get(NXBController.getData);
router.route("/add/:id").post(NXBController.addBook);
module.exports = router;