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
      editing: false,
      book: [],
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
    res.redirect("/");
  } catch (err) {
    console.error("Unexpected error when adding: ", err);
  }
};

exports.getEditBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(400);
    }

    res.status(200).render("createBook", {
      pageTitle: "Edit Book",
      path: "views/createBook",
      editing: true,
      book: book,
    });
  } catch (err) {
    console.error("Unexpected happen: ", err);
    next(err);
  }
};

exports.postEditBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const { title, author, description, published_date } = req.body;

    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.title = title;
    book.author = author;
    book.description = description;
    book.published_date = published_date;

    await book.save();

    return res.status(200).redirect("/");
  } catch (err) {
    console.error("An unexpected error occurred when editing: ", err);
    next(err);
  }
};

exports.postDeleteBook = async (req, res, next) => {
  try {
    const bookId = req.body.bookId;
    const book = await Book.destroy({ where: { id: bookId } });

    if(!book){
      return res.status(404).json({ message: 'Book not found' });
    }

    console.log(`Book with ID ${bookId} successfully deleted.`);

    return res.status(200).redirect('/')
  } catch (err) {
    console.log("An unexpected error occurred when deleting: ", err);
    next(err);
  }
};
