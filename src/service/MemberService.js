//CRUD for Member data handling
const Member = require("../model/MemberModel");

async function getAllMembers() {
    return Member.find();
}

async function addMember(member) {
    const memberData = new Member(member);
    return memberData.save();
}

async function deleteMember(memberId) {
    return Member.findOneAndDelete({ memberId: memberId });
}

async function updateMember(memberId, member) {
    return Member.findOneAndUpdate({ memberId: memberId }, member, { new: true });
}

module.exports = { getAllMembers, addMember, deleteMember, updateMember }