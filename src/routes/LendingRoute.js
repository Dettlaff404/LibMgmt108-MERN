const express = require("express");
const router = express.Router();
const lendingService = require("../service/LendingService");
const authToken = require("../middleware/authToken");

const lendingURL = "/lendings";

//Get All Lendings
router.get(lendingURL, authToken, async (req, res) => {
    try {
        const allLendings = await lendingService.getAllLendings();

        const filterLendings = allLendings.map((lending) => ({
            lendingId: lending.lendingId,
            member: lending.member,
            book: lending.book,
            lendingDate: lending.lendingDate,
            returnDate: lending.returnDate,
            isActiveLending: lending.isActiveLending,
            overDueDays: lending.overDueDays,
            fineAmount: lending.fineAmount
        }));

        console.log("Get All Lendings ", filterLendings);
        res.json(filterLendings);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Lendings" });
    }
});

//Create Lending
router.post(lendingURL, authToken, async (req, res) => {
    try {
        const createdLending = await lendingService.addLending(req.body);

        const filterLending = {
            lendingId: createdLending.lendingId,
            member: createdLending.member,
            book: createdLending.book,
            lendingDate: createdLending.lendingDate,
            returnDate: createdLending.returnDate,
            isActiveLending: createdLending.isActiveLending,
            overDueDays: createdLending.overDueDays,
            fineAmount: createdLending.fineAmount
        };
        
        return res.status(201).json(filterLending);

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Delete Lending
router.delete(`${lendingURL}/:id`, authToken, async (req, res) => {
    try {
        const delLending = await lendingService.deleteLending(req.params.id);
        if (!delLending) {
            return res.status(404).send("Lending not found for deletion");
        }
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Update Lending
router.patch(`${lendingURL}/:id`, authToken, async (req, res) => {
    try {
        const handedOverLending = await lendingService.handOverLending(req.params.id);
        if (!handedOverLending) {
            return res.status(404).send("Lending not found for deletion");
        }
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router; 