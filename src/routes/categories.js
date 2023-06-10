const express = require("express");

const CategoriesController = require("../controller/categories.js");

const router = express.Router();

// CREATE - POST
router.post("/", CategoriesController.createNewCategory);

// READ - GET
router.get("/", CategoriesController.getAllCategories);
router.get("/:idCategory", CategoriesController.getCategory);
router.get("/events/:id", CategoriesController.getCategoriesByEvent);

// UPDATE - PATCH
router.patch("/:idCategory", CategoriesController.updateCategory);
router.patch("/start_time/:id", CategoriesController.updateStartTime);
router.patch("/end_time/:id", CategoriesController.updateEndTime);
router.patch("/run/:id/:status", CategoriesController.updateRun);
router.patch("/race_today/:id/:status", CategoriesController.updateRaceToday);

// DELETE - DELETE
router.delete("/:idCategory", CategoriesController.deleteCategory);

module.exports = router;
