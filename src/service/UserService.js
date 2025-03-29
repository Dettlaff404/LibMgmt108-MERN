const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");

async function addUser(user) {
    try {

        const hashPassword = await bcrypt.hash(user.password, 10);

        const newUser = new User({
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashPassword,
            role: user.role
        });

        return newUser.save();

    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { addUser };