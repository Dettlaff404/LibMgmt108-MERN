const express = require("express");
const router = express.Router();
const staffService = require("../service/StaffService");
const authToken = require("../middleware/authToken");

const staffURL = "/staff";

//Get All Staff Members
router.get(staffURL, authToken, async (req, res) => {
    try {
        const allStaff = await staffService.getAllStaffMembers();

        const filterstaffMembers = allStaff.map((member) => ({
            staffId: member.staffId,
            firstName: member.firstName,
            lastName: member.lastName,
            email: member.email,
            joinDate: member.joinDate,
            lastUpdateDate: member.lastUpdateDate,
            lastUpdateTime: member.lastUpdateTime,
            phone : member.phone,
            role : member.role
        }));

        console.log("Get All Staff ", filterstaffMembers);
        res.json(filterstaffMembers);
    } catch (error) {
        res.status(500).json({ error: "Error fetching staff members" });
    }
});

//Create Staff Member
router.post(staffURL, authToken, async (req, res) => {
    try {
        const createdStaffMember = await staffService.addStaffMember(req.body);

        const filteredstaffMember = {
            staffId: createdStaffMember.staffId,
            firstName: createdStaffMember.firstName,
            lastName: createdStaffMember.lastName,
            email: createdStaffMember.email,
            joinDate: createdStaffMember.joinDate,
            lastUpdateDate: createdStaffMember.lastUpdateDate,
            lastUpdateTime: createdStaffMember.lastUpdateTime,
            phone : createdStaffMember.phone,
            role : createdStaffMember.role
        };

        return res.status(201).json(filteredstaffMember);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Delete Staff Member
router.delete(`${staffURL}/:id`, authToken, async (req, res) => {
    try {
        const delStaff = await staffService.deleteStaffMember(req.params.id);
        if (!delStaff) {
            return res.status(404).send("Staff member not found for deletion");
        }
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

//Update Staff Member
router.patch(`${staffURL}/:id`, authToken, async (req, res) => {
    try {
        const updatedStaffMember = await staffService.updateStaffMember(req.params.id, req.body);
        if (!updatedStaffMember) {
            return res.status(404).send("Staff member not found for update");
        }
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router; 