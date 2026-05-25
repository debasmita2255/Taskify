const mongoose = require("mongoose");

const conn = async () => {
  try {
    if (process.env.NODE_ENV !== "production") {
      require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
    }

    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log("Connected to database");
  } catch (error) {
    console.log("Not connected");
  }
};

conn();
