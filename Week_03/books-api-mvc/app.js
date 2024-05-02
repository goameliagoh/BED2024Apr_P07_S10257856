//------------------------------------- WHATS MVC ----------------------------------
// M ---> Model 
// V ---> View
// C ---> Controller
// MODEL updates the VIEW, user sees the VIEW, user uses the CONTROLLER, in which the CONTORLLER manipulates the MODEL
// MODEL = it interacts with database + manages/manipulate data etc
// VIEW = your main file eg APP.JS  ++ what user sees
// CONTROLLER = btwn model & view, handles user input + processes the HTTP requests 

// ++ REFER TO WORD DOCS 4 NOTES on Node.js, Express, MVC relation !!!! 
//-----------------------------------------------------------------------------------------

// Import the modules needed
const express = require("express");
const bodyParser = require("body-parser");
const booksController = require("./controllers/booksController"); // Import controller so that can even interact with the database in the 1st place.

// Initialize Express App
const app = express();

// Using Middleware [ use() ] , MUST ALWAYS HAVE THIS IF YOURE ACCEPTING USER INPUT !!
// ---> recap: middleware will read the user input and put in req.body <------
app.use(bodyParser.json()); // Parse incoming JSON data in request body
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling

// Define individual routes for each controller function
app.get("/books", booksController.getAllBooks); // Eg if user sends GET request with /books, then booksController.getAllBooks function is called out.
app.get("/books/:id", booksController.getBookById);
app.post("/books", booksController.createBook);
app.put("/books/:id", booksController.updateBook);
app.delete("/books/:id", booksController.deleteBook);

// Defining port + Starting server
// ------------------------ EXPLAINING CODE BELOW --------------------------------------
// 'process.env' is like a secret book containing a list of things
// 'process.env.PORT' == you are searching for whether PORT exists in that secret book 
// if exists --> you just set the 'const port' as the 'PORT' value
// if dont exists --> you set 'const port' to its default aka 3000
//----------------------------------------------------------------------------------------
const port = process.env.PORT || 3000; 


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// More importing....
const validateBook = require("./middlewares/validateBook");

// So that can use validateBook middleware before the controller function
app.post("/books", validateBook, booksController.createBook); // Add validateBook before createBook
app.put("/books/:id", validateBook, booksController.updateBook); // Add validateBook before updateBook






