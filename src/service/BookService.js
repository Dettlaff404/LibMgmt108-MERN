//CRUD for Book data handling
const Book = require("../model/BookModel");

async function getAllBooks() {
    return Book.find();
}

async function addBook(book) {
    const bookData = new Book(book);
    return bookData.save();
}

async function deleteBook(bookId) {
    return Book.findByIdAndDelete(bookId);
}

async function updateBook(bookId, book) {
    return Book.findOneAndUpdate({ bookId: bookId }, book,{ new: true });
}

module.exports = { getAllBooks, addBook, deleteBook, updateBook }