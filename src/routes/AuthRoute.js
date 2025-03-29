const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("../model/UserModel");
const {addUser} = require("../service/UserService");

const authURL = "/auth";
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error("Missing required environment variables");
    process.exit(1);
}

//LogIn - SignIn
router.post(`${authURL}/signin`, async (req, res) => {
    const { email, password } = req.body;

    try {
        //find the user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        //compare the hash password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        //Token Generation
        const token = jwt.sign({ id: user.email }, jwtSecret, {
            expiresIn: "1h"
        });

        res.json({ token });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

})

//Register - SignUp
router.post(`${authURL}/signup`, async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
        return res.status(401).json({ error: "Missing required fields" });
    }

    try {
        //Create User
        const user = await addUser(req.body);

        //Token Generation
        const token = jwt.sign({ id: user.email }, jwtSecret, {
            expiresIn: "1h"
        });

        res.status(201).json({ message : "User registered successfully", token });
        
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;