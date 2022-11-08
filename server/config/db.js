const mongoose = require("mongoose");

mongoose.connect(process.env.mongoURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB"))