const express = require("express");

const CategoriesController = require("../controller/categories.js");
const RidersController = require("../controller/riders.js");

const router = express.Router();

router.get("/", CategoriesController.getCategoriesRace);
router.get("/:id", RidersController.getRidersRunInCategory);
// router.post("/:idbeacon", RidersController.createRiderFinish);

module.exports = router;
