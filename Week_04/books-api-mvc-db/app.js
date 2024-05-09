const express = require("express");
const bookController = require("./controllers/bookController");
const sql = require("mssql");
const dbConfig = require("./dbConfig"); // ******* Different from ../dbConfig ===> './' is just to go to dbConfig, no moving ++ '../' is go back to ROOT DIRECTORY before gettng dbConfig
const bodyParser = require("body-parser"); // Import body-parser
const validateBook = require("./middlewares/validateBook");

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port

// Include body-parser middleware to handle JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // For form data handling


// Routes for GET requests (replace with appropriate routes for update and delete later)
app.get("/books", bookController.getAllBooks);
app.get("/books/:id", bookController.getBookById);
app.post("/books", validateBook, bookController.createBook); // POST for creating books (can handle JSON data)
app.put("/books/:id", bookController.updateBook); // PUT for updating books
app.delete("/books/:id", bookController.deleteBook); // DELETE for deleting books


app.listen(port, async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);
    console.log("Database connection established successfully");
  } catch (err) {
    console.error("Database connection error:", err);
    // Terminate the application with an error code (optional)
    process.exit(1); // Exit with code 1 indicating an error
  }

  console.log(`Server listening on port ${port}`);
});

// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  // Perform cleanup tasks (e.g., close database connections)
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});
