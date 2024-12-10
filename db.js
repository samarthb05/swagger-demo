const mongoose = require("mongoose");

async function connectdb() {
  try {
    await mongoose.connect("mongodb://localhost:27017/books", {});
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
}
module.exports = connectdb;
