//------------------------------------- WHATS MVC ----------------------------------
// M ---> Model 
// V ---> View
// C ---> Controller
// MODEL updates the VIEW, user sees the VIEW, user uses the CONTROLLER, in which the CONTORLLER manipulates the MODEL
// MODEL = it interacts with database + manages/manipulate data etc
// VIEW = your main file eg APP.JS  ++ what user sees
// CONTROLLER = btwn model & view, handles user input + processes the HTTP requests 
//-----------------------------------------------------------------------------------------

// Import the modules needed
const express = require("express");
const bodyParser = require("body-parser");
const booksController = require("./controllers/booksController"); // Import controllers

// Initialize Express App
const app = express();

// Using Middleware [ use() ] !!
app.use(bodyParser.json()); // Parse incoming JSON data in request body
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

// Define individual routes for each controller function
app.get("/books", booksController.getAllBooks);
app.get("/books/:id", booksController.getBookById);
app.post("/books", booksController.createBook);
app.put("/books/:id", booksController.updateBook);
app.delete("/books/:id", booksController.deleteBook);

// Defining port + Starting server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// More importing....
const validateBook = require("./middlewares/validateBook");

// So that can use validateBook middleware before the controller function
app.post("/books", validateBook, booksController.createBook); // Add validateBook before createBook
app.put("/books/:id", validateBook, booksController.updateBook); // Add validateBook before updateBook






