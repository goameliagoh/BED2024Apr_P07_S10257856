// Remember: This is a simplified example using an in-memory array. In a real-world scenario, you would use a database to store books data persistently.
const books = [
    { id: 1, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
    { id: 2, title: "Pride and Prejudice", author: "Jane Austen" },
];
  
class Book {  // <--- Format of making a class!
    constructor(id, title, author) {
      this.id = id; // <-- 'this.' means that the id would be an instance of THIS class it is in, aka Book!
      this.title = title;
      this.author = author;
    }
  
    //--------------------------------- WHAT IS STATIC ASYNC? -----------------------------------------------
    // STATIC = can call out the method directly w/o needed to make instance of the class.
    // STATIC EXAMPLE:
    // const result = mathClass.multiply(5,10) instead of const mathInstance = new mathClass(); then const result = mathInstance.multiply(5,10)

    // ASYNC = your code need not run in sequence + can use AWAIT code!
    // SYNC = code will run in sequence
    //-------------------------------------------------------------------------------------------------

    static async getAllBooks() { 
      // In this case for simplicity, is just return books; because your data info is found as an array called 'books' which you defined above, at the start.
      // But in reality, code for getAllBooks() wldnt be as simple as return books bc you would be dealing with a database and not just an array YOU defined.
      return books; 
    }
  
// -------------------------------- WHAT IS AN AWAIT PROMISE ? ----------------------------------
// Basically whenever you interact with external database, eg You want get info of all books.
// That is a promise. 

// Successful promise = you managed to get info of all books
// Unsuccessful promise = you failed to get info of all books 
// Not successful, not unsuccessful = still pending....
//-------------------------------------------------------------------------------------------------


// ----------------------------------- WHAT IS AWAIT? --------------------------------------------
// AWAIT = use with async + basically saying that your code after 'await' will not run until promise = successfull.
// In this case, 
// const book = books.find((book) => book.id === id);
// return book;
// Will not run until your promise of getting all books = successful

// Since it only works with promise, 
// ONLY USE IT WITH CODES THAT INTERACTS WITH EXTERNAL DATABASE LIKE getAllBooks, delete, update etc
// --------------------------------------------------------------------------------------------
    static async getBookById(id) {
      const books = await this.getAllBooks(); // Await the promise to get books
      // 'this.getAllBooks()' is like saying Book.getAllBooks() bc ''this.' basically means it is an instance of this current class it is in, aka Book!
      const book = books.find((book) => book.id === id);
      return book;
    }
  
    static async createBook(newBookData) {
      const books = await this.getAllBooks(); // Await the promise to get books
      const newBook = new Book( // Book constructor
        books.length + 1,     // id
        newBookData.title,    // title
        newBookData.author    // author
      );
      // Replace this with your actual logic to create a book in the data source (e.g., database)
      books.push(newBook); // Assuming in-memory array (for simplicity)
      return newBook;
    }
  
    static async updateBook(id, newBookData) {
      const books = await this.getAllBooks(); // Await the promise to get books
      const existingBookIndex = books.findIndex((book) => book.id === id);
      if (existingBookIndex === -1) {
        return null; // Indicate book not found
      }
  
      // When have 2 of . . . aka in this case, it is just saying that
      // newBookData's info will add on to what books[existingBookIndex] have. 
      // BUT if both newBookData and books[existingBookIndex] have the same info, then the second . . . aka newBookData will override the first . . . aka books[existingBookIndex]
      // FOR EXAMPLEEE:
      // const object1 = { name: "Alice", age: 30 };
      //const object2 = { city: "New York", age: 25 };
      //const mergedObject = { ...object1, ...object2 };
      //OUTPUT:
      // {
      //    "name": "Alice",
      //    "age": 25, // Overwritten by age from object2
      //    "city": "New York"
      // }

      const updatedBook = {
        ...books[existingBookIndex],
        ...newBookData,
      };
  
      // ON TOP = overwriting part to get new data
      // BELOW = the replacing of old data with new data
      books[existingBookIndex] = updatedBook;

      return updatedBook;
    }
  
    static async deleteBook(id) {
      const books = await this.getAllBooks(); // Await the promise to get books
      const bookIndex = books.findIndex((book) => book.id === id);
      if (bookIndex === -1) {
        return false; // Indicate book not found
      }
  
      // Replace this with your actual logic to delete the book from the data source (e.g., database)
      books.splice(bookIndex, 1);
      return true;
    }
}
  
module.exports = Book; // This whole thing is a class. so just import the whole class. So that can use this Book class in other files
  