const express = require("express");
const app = express();
const PORT = 3700;
const bookRoutes = require("./routes/BookRoute");
const memberRoutes = require("./routes/MemberRoute");
const mongoose = require("mongoose");


app.use("/api/v1",memberRoutes);

//DB Integrate
mongoose.connect("mongodb://localhost:27017/bookLib109",{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Failed to connect to MongoDB",err))

app.listen(PORT, ()=>{
    console.log(`App Listening to: ${PORT}`)
})