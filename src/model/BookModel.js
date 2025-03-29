const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const bookSchema = new mongoose.Schema({
    bookId: { type: String, default: uuidv4, required: true, unique: true },
    bookName: { type: String, required: true },
    author: { type: String, required: true },
    edition: { type: String, required: true },
    publisher: { type: String, required: true },
    isbn: { type: String, required: true },
    price: { type: Number, required: true },
    totalQty: { type: Number, default: 0 },
    availableQty: { type: Number, default: 0 },
    lastUpdateDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
    lastUpdateTime: { type: String, default: () => new Date().toTimeString().split(" ")[0] }
});

module.exports = mongoose.model("Book", bookSchema);