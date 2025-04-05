//CRUD for Lending data handling
const Lending = require("../model/LendingModel");
const Book = require("../model/BookModel");
const Member = require("../model/MemberModel");
const FINE = process.env.FINE_PER_DAY;

async function getAllLendings() {
    return Lending.find();
}

async function addLending(lending) {

    // Check if the member is available
    const member = await Member.findOne({ memberId: lending.member });
    if (!member) {
        throw new Error("Member not found");
    }

    // Check if the book is available
    const book = await Book.findOne({ bookId: lending.book });
    if (!book) {
        throw new Error("Book not found");
    }
    if (book.availableQty <= 0) {
        throw new Error("Book is not available");
    }

    //Creating the lending data and updating the book data
    book.availableQty -= 1;
    await book.save();
    const lendingData = new Lending(lending);

    return lendingData.save();
}

async function deleteLending(lendingId) {

    //Updating the book data
    const lending = await Lending.findOne({ lendingId: lendingId });
    const book = await Book.findOne({ bookId: lending.book });
    book.availableQty += 1;
    await book.save();

    return Lending.findOneAndDelete({ lendingId: lendingId });
}

async function handOverLending(lendingId) {

    // Function to calculate overdue days
    function getOverdueDays(returnDate) {
        const today = new Date();
        const returnDateObj = new Date(returnDate);
        const overdueDays = Math.floor((today - returnDateObj) / (1000 * 3600 * 24));
        return overdueDays > 0 ? overdueDays : 0;
    }

    //function to Calculate fine amount
    function calculateFineAmount(overdueDays) {
        const fineAmount = overdueDays * FINE;
        return fineAmount;
    }

    const lending = await Lending.findOne({ lendingId: lendingId });

    //Updating the book data
    const book = await Book.findOne({ bookId: lending.book });
    book.availableQty += 1;
    await book.save();

    return Lending.findOneAndUpdate({ lendingId: lendingId }, { isActiveLending: false, overDueDays: getOverdueDays(lending.returnDate), fineAmount: calculateFineAmount(getOverdueDays(lending.returnDate)) }, { new: true });
}

module.exports = { getAllLendings, addLending, deleteLending, handOverLending }