//CRUD for Staff data handling
const Staff = require("../model/StaffModel");

async function getAllStaffMembers() {
    return Staff.find();
}

async function addStaffMember(staff) {
    const staffData = new Staff(staff);
    return staffData.save();
}

async function deleteStaffMember(staffId) {
    return Staff.findOneAndDelete({ staffId: staffId });
}

async function updateStaffMember(staffId, staff) {
    return Staff.findOneAndUpdate({ staffId: staffId }, staff, { new: true });
}

module.exports = { getAllStaffMembers, addStaffMember, deleteStaffMember, updateStaffMember }