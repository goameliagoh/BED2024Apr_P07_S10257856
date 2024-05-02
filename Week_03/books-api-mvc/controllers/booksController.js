// This file is used together with book.js
// Book.js is like instructions on what to do for each of the methods
// Then this booksController.js is the one interacting with external database while also referring to book.js for instructions on what to do for each method


// That is why need import this, so that the booksController can refer to book.js for instructions on what to do for each method
const Book = require("../models/book"); 

// In code below, hv 2 getAllBooks but 1 is representing a variable, 1 is representing a method found in book class
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks(); // Here need use Book.getAllBooks() and not this.getAllBooks() bc this class is booksController, not books.
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving books");
  }
};

const getBookById = async (req, res) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await Book.getBookById(bookId);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving book");
  }
};

const createBook = async (req, res) => {
  const newBook = req.body;
  try {
    const createdBook = await Book.createBook(newBook); // This method returns newBook, which is now createdBook
    res.status(201).json(createdBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating book");
  }
};

const updateBook = async (req, res) => {
  const bookId = parseInt(req.params.id);
  const newBookData = req.body;

  try {
    const updatedBook = await Book.updateBook(bookId, newBookData);
    if (!updatedBook) {
      return res.status(404).send("Book not found");
    }
    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating book");
  }
};

const deleteBook = async (req, res) => {
  const bookId = parseInt(req.params.id);

  try {
    const success = await Book.deleteBook(bookId);
    if (!success) {
      return res.status(404).send("Book not found");
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting book");
  }
};

// Export all the methods.. this aint a class so export the methods 1 by 1
module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBook,
  deleteBook,
};

