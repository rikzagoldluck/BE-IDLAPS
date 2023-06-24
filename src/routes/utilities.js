const express = require("express");

const UtilitiesController = require("../controller/utilities.js");

const router = express.Router();

router.get("/:key", UtilitiesController.getUtility);
router.patch("/:key", UtilitiesController.updateUtility);

module.exports = router;
