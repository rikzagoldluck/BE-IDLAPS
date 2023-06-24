const express = require("express");

const BeaconsController = require("../controller/beacons.js");

const router = express.Router();

router.get("/", BeaconsController.getBeacons);
router.get("/events/:id", BeaconsController.getAvailableBeacons);
router.get(
  "/events/:id/:beaconRider",
  BeaconsController.getAvailableBeaconsAndChoosen
);

module.exports = router;
