const express = require('express');
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

let books = [
    {id: 1, title: 'The Lord Of The Rings', author: 'J.R.R. Tolkien'},
    {id: 2, title: 'Pride and Prejudice', author: 'Jane Austen'},
];


// ----------------------------------------------- MIDDLEWARES -----------------------------------------------------------------

// <-- whenever have APP.USE(.....) , it means we r using MIDDLEWARE *****
//are middlewares since it is 'app.use(...)' ---> it will read + process the request/data sent by client +  put the req in req.body thus all data client send will be in req.body
// *************** When expecting client to send you data (almost always..), then will always need to write these code ********************
  app.use(express.json())   // <<------------ to parse incoming reqs that are of JSON data type
  app.use(bodyParser.urlencoded({ extended: true })); // <<------ to parse incoming data of URL data type (eg When HTML page uses forms)

//-------------------------------------------------------------------------------------------------------------------------------


// --------------------- GETTING ALL BOOKS ------------------------------
  app.get('/books', (req, res) => {
    res.json(books); //Send the array of books in JSON format as reponse
  });
//-----------===---------------------------------------------------------

  //-------------------- CREATING NEW BOOK --------------------------------
  app.post('/books', (req, res) => {
    const newBook = req.body; // Get the new book data from the request body
    newBook.id = books.length + 1; // Assign a unique ID
    books.push(newBook); // Add the new book to the array
    res.status(201).json(newBook); // Send created book with status code 201
   });
//-----------------------------------------------------------------------------

   // ------------- TO GET A SPECIFIC BOOK ---------------------------------
   app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
    const book = books.find(book => book.id === bookId);
  
    if (book) {
      res.json(book); // Send the book data if found
    } else {
      res.status(404).send('Book not found'); // Send error for non-existent book
    }
    });
  //--------------------------------------------------------------------------


  //--------------------- UPDATING BOOK ---------------------------------------
  app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
    const updatedBook = req.body; // Get updated book data from request body
  
    const bookIndex = books.findIndex(book => book.id === bookId);
  
    if (bookIndex !== -1) {
      updatedBook.id = bookId;
      books[bookIndex] = updatedBook; // Update book data in the array
      res.json(updatedBook); // Send updated book data
    } else {
      res.status(404).send('Book not found'); // Send error for non-existent book
    }
  });
//-------------------------------------------------------------------------------  


//---------------------------- DELETING BOOK ------------------------------------ 
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Get book ID from URL parameter
  
    const bookIndex = books.findIndex(book => book.id === bookId);
  
    if (bookIndex !== -1) {
      books.splice(bookIndex, 1); // A method to remove/replace book from the array. bookIndex = index of element to rmv + 1 = indicates that only 1 element shld be removed
      res.status(204).send(); // Send empty response with status code 204 (No Content)
    } else {
      res.status(404).send('Book not found'); // Send error for non-existent book
    }
  });
//-----------------------------------------------------------------------------------


//---------------------------- START SERVER ------------------------------------ 
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
//-----------------------------------------------------------------------------------





   










