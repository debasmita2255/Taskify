require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Connected to database");
  } catch (error) {
    console.log("Not connected");
  }
};

conn();
