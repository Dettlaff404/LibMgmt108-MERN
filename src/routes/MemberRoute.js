const express = require("express");
 const router = express.Router();
 const memberService = require("../service/MemberService");
 
 const memberURL = "/member";
 
 router.get(memberURL, async (req, res) => {
     try {
         const getAlMembers = await memberService.getAllMembers();
         console.log("Get All Members from service layer............");
         res.json(getAlMembers); 
     } catch (error) {
         res.status(500).json({ error: "Error fetching books" });
     }
 });
 
 module.exports = router; 