const express = require("express");
const path = require("path");

const { getConnection } = require("./config/database");
const bookRoute = require("./routes/bookRoutes");
const sequelize = require("./config/database"); // Ensure correct path
const Book = require("./models/Book");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, "views")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

app.use(bookRoute);

const connectAndSync = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
  } catch (err) {
    console.err("Unable to connect to the database: ", err);
  }
};

connectAndSync();
app.use((error, req, res, next) => {
  console.error("Unexpected error: ", error);
  res.status(500).json({ error: "An unexpected error occurred." });
});

app.listen(PORT, () => {
  // console.log(`Server running on port ${PORT}`);
});
