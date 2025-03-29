const express = require("express");
const router = express.Router();
const bookService = require("../service/BookService");

const bookURL = "/books";

router.get(bookURL, async (req, res) => {
    try {
        const getAllBooks = await bookService.getAllBooks();
        console.log("Get All books from service layer............");
        res.json(getAllBooks); 
    } catch (error) {
        res.status(500).json({ error: "Error fetching books" });
    }
});

module.exports = router; 