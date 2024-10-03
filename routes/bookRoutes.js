const express = require("express");

const bookController = require("../controller/bookController");

const router = express.Router();

router.get("/", bookController.getBooks);

router.get("/create", bookController.getCreateBook);
router.post("/create", bookController.postCreateBook);
router.get("/edit/:id", bookController.getEditBook);
router.post("/edit/:id", bookController.postEditBook);
router.post("/delete", bookController.postDeleteBook)

module.exports = router;
