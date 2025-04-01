const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const memberSchema = new mongoose.Schema({
    memberId: { type: String, default: uuidv4, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true,unique: true },
    membershipDate: { type: String, required: true }
});

module.exports = mongoose.model("Member", memberSchema);