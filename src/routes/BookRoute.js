//Handle book routes / reqs
const bookURL = "/books";
const express = require('express');
const router = express.Router();
const BookService = require('../service/BookService');

router.get(bookURL, async (req, res) => {
    try {
        const getAllBooks = await BookService.getAllBooks();
    console.log("Get All Books from the service layer......");
    } catch (error) {
        res.status(500).json({ error: "Error fetching books" });
    }
})

module.exports = router;