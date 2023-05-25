const express = require("express");

const TeamsController = require("../controller/teams.js");

const router = express.Router();

// CREATE - POST
router.post("/", TeamsController.createNewTeam);

// READ - GET
router.get("/", TeamsController.getTeams);
router.get("/:idTeam", TeamsController.getTeam);

// UPDATE - PATCH
router.patch("/:idTeam", TeamsController.updateTeam);

// DELETE - DELETE
router.delete("/:idTeam", TeamsController.deleteTeam);

module.exports = router;
