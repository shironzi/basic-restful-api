const express = require("express");

const bookController = require("../controller/bookController");

const router = express.Router();

router.get("/", bookController.getBooks);

router.get("/create-book", bookController.getCreateBook)

router.post("/create-book", bookController.postCreateBook);

module.exports = router;
