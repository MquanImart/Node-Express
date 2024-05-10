const express = require("express")
const NXBController = require('../controllers/NXBController');
const router = express.Router();

router.route("/:id").get(NXBController.getData);
router.route("/add/:id").post(NXBController.addBook);
router.route("/update/").post(NXBController.updateBook);
module.exports = router;