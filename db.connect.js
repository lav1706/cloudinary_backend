require("dotenv").config();
const mongoose = require("mongoose");

const mongoUrl = process.env.MongoUrl;

const initializeConnection = async () => {
  await mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database is connected");
    })
    .catch((error) => {
      console.log("Error in connecting Database", error.message);
      process.exit(1);
    });
};
module.exports = { initializeConnection };
