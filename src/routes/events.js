const express = require("express");

const EventsController = require("../controller/events.js");

const router = express.Router();

// CREATE - POST
router.post("/", EventsController.createNewEvent);

// READ - GET
router.get("/", EventsController.getEvents);
router.get("/:idEvent", EventsController.getEvent);

// UPDATE - PATCH
router.patch("/:idEvent", EventsController.updateEvent);

// DELETE - DELETE
router.delete("/:idEvent", EventsController.deleteEvent);

module.exports = router;
