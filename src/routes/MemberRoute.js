const express = require("express");
const router = express.Router();
const memberService = require("../service/MemberService");
const authToken = require("../middleware/authToken");

const memberURL = "/members";

//Get All Members
router.get(memberURL, authToken, async (req, res) => {
    try {
        const allMembers = await memberService.getAllMembers();

        const filterMembers = allMembers.map((member) => ({
            memberId: member.memberId,
            name: member.name,
            email: member.email,
            membershipDate: member.membershipDate
        }));

        console.log("Get All Members ", filterMembers);
        res.json(filterMembers);
    } catch (error) {
        res.status(500).json({ error: "Error fetching members" });
    }
});

//Create Member
router.post(memberURL, authToken, async (req, res) => {
    try {
        const createdMember = await memberService.addMember(req.body);

        const filteredMember = {
            memberId: createdMember.memberId,
            name: createdMember.name,
            email: createdMember.email,
            membershipDate: createdMember.membershipDate
        }

        return res.status(201).json(filteredMember);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Delete Member
router.delete(`${memberURL}/:id`, authToken, async (req, res) => {
    try {
        const delMember = await memberService.deleteMember(req.params.id);
        if (!delMember) {
            return res.status(404).send("Member not found for deletion");
        }
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Update Book
router.patch(`${memberURL}/:id`, authToken, async (req, res) => {
    try {
        const updatedMember = await memberService.updateMember(req.params.id, req.body);
        if (!updatedMember) {
            return res.status(404).send("Member not found for update");
        }
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router; 