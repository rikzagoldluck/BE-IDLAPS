const express = require("express");

const RidersController = require("../controller/riders.js");

const router = express.Router();

// CREATE - POST
router.post("/", RidersController.createNewRider);

// READ - GET
router.get("/", RidersController.getRiders);
router.get("/:idRider", RidersController.getRider);

// UPDATE - PATCH
router.patch("/:idRider", RidersController.updateRider);

// DELETE - DELETE
router.delete("/:idRider", RidersController.deleteRider);

module.exports = router;
