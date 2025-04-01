const express = require("express");
const router = express.Router();
const bookService = require("../service/BookService");
const authToken = require("../middleware/authToken");

const bookURL = "/books";

//Get All Books
router.get(bookURL, authToken, async (req, res) => {
    try {
        const allBooks = await bookService.getAllBooks();

        const filterBooks = allBooks.map((book) => ({
            bookId: book.bookId,
            bookName: book.bookName,
            author: book.author,
            edition: book.edition,
            publisher: book.publisher,
            isbn: book.isbn,
            price: book.price,
            totalQty: book.totalQty,
            availableQty: book.availableQty,
            lastUpdateDate: book.lastUpdateDate,
            lastUpdateTime: book.lastUpdateTime
        }));

        console.log("Get All Books ", filterBooks);
        res.json(filterBooks);
    } catch (error) {
        res.status(500).json({ error: "Error fetching books" });
    }
});

//Create Book
router.post(bookURL, authToken, async (req, res) => {
    try {
        await bookService.addBook(req.body);
        return res.status(201).send("Book added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Delete Book
router.delete(`${bookURL}/:id`, authToken, async (req, res) => {
    try {
        const delBook = await bookService.deleteBook(req.params.id);
        if (!delBook) {
            return res.status(404).send("Book not found for deletion");
        }
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Update Book
router.patch(`${bookURL}/:id`, authToken, async (req, res) => {
    try {
        const updatedBook = await bookService.updateBook(req.params.id, req.body);
        if (!updatedBook) {
            return res.status(404).send("Book not found for update");
        }
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router; 