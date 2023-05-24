const express = require("express");

const CategoriesController = require("../controller/categories.js");

const router = express.Router();

// CREATE - POST
router.post("/", CategoriesController.createNewCategory);

// READ - GET
router.get("/", CategoriesController.getAllCategories);
router.get("/:idCategory", CategoriesController.getCategory);

// UPDATE - PATCH
router.patch("/:idCategory", CategoriesController.updateCategory);

// DELETE - DELETE
router.delete("/:idCategory", CategoriesController.deleteCategory);

module.exports = router;
