const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const lendingSchema = new mongoose.Schema({
    lendingId: { type: String, default: uuidv4, required: true, unique: true },
    member: { type: String, required: true },
    book: { type: String, required: true },
    lendingDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
    returnDate: { type: String, default: ({ lendingDate }) => {
        const date = new Date(lendingDate);
        date.setDate(date.getDate() + 7);
        return date.toISOString().split("T")[0];
    } },
    isActiveLending: { type: Boolean, default: true },
    overDueDays: { type: Number, default: 0 },
    fineAmount: { type: Number, default: 0 }
});

module.exports = mongoose.model("Lending", lendingSchema);