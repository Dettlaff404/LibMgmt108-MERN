const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const lendingSchema = new mongoose.Schema({
    lendingId: { type: String, default: uuidv4, required: true, unique: true },
    member: { type: String, required: true },
    book: { type: String, required: true },
    lendingDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
    returnDate: { type: String, required: true, default: ({ lendingDate }) => {
        const date = new Date(lendingDate);
        date.setDate(date.getDate() + 7);
        return date.toISOString().split("T")[0];
    } },
    isActiveLending: { type: Boolean, required: true },
    overDueDays: { type: Number, required: false },
    fineAmount: { type: Number, required: false }
});

module.exports = mongoose.model("Lending", lendingSchema);