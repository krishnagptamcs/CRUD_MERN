const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://krishnagptamcs:UXfbiugXGDbG6Mr5@cluster0.azhhrtr.mongodb.net/krishnaNewDatabase";
// Connect to MongoDB
const dbConnect = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));
};

module.exports = dbConnect;
