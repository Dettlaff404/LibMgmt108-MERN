const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const staffSchema = new mongoose.Schema({
    staffId: { type: String, default: uuidv4, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true,unique: true },
    joinDate: { type: String, required: true },
    lastUpdateDate: { type: String, default: () => new Date().toISOString().split("T")[0] },
    lastUpdateTime: { type: String, default: () => new Date().toTimeString().split(" ")[0] },
    phone: { type: String, required: true },
    role: { type: String, required: true }
});

module.exports = mongoose.model("Staff", staffSchema);