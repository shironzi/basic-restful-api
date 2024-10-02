const Book = require("../models/Book");

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();
    res.status(200).render("book", {
      pageTitle: "Books",
      path: "view/books",
      books: books,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getCreateBook = async (req, res, next) => {
  try {
    res.status(200).render("createBook", {
      pageTitle: "Create Book",
      path: "views/books",
    });

    // const book = await Book.create({})
  } catch (err) {
    console.error("Unexpected happen: ", err);
    next(err);
  }
};

exports.postCreateBook = async (req, res, next) => {
  try {
    const title = req.body.title;
    const author = req.body.author;
    const description = req.body.description;
    const published_date = req.body.published_date;

    const book = await Book.create({
      title: title,
      author: author,
      description: description,
      published_date: published_date,
    });
    console.log("Book Successfully added!");
    res.redirect('/');
  } catch (err) {
    console.error("Unexpected error when adding: ", err);
  }
};
