const express = require("express");
const router = express.Router();
const bookService = require("../service/BookService");

const bookURL = "/books";

//Get All Books
router.get(bookURL, async (req, res) => {
    try {
        const allBooks = await bookService.getAllBooks();
        console.log("Get All Books ", allBooks);
        res.json(allBooks);
    } catch (error) {
        res.status(500).json({ error: "Error fetching books" });
    }
});

//Create Book
router.post(bookURL, async (req, res) => {
    try {
        await bookService.addBook(req.body);
        return res.status(201).send("Book added successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router; 